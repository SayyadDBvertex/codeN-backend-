import Test from '../../models/admin/Test/testModel.js';
import TestAttempt from '../../models/user/testAttemptModel.js';
import MCQ from '../../models/admin/MCQs/mcq.model.js';

/**
 * 🔥 AUTO SUBMIT HELPER
 */
const autoSubmitTest = async (attempt, test) => {
  if (attempt.submittedAt) return attempt;

  let score = 0;

  // simple scoring: 1 mark per correct answer
  attempt.answers.forEach((a) => {
    if (a.isCorrect) score += 1;
  });

  attempt.score = score;
  attempt.submittedAt = new Date();
  await attempt.save();

  return attempt;
};

/**
 * USER – GET AVAILABLE TESTS
 * GET /api/tests?courseId=xxxx
 */
export const getAvailableTests = async (req, res) => {
  try {
    const { courseId } = req.query;

    const filter = { status: 'active' };
    if (courseId) filter.courseId = courseId;

    const tests = await Test.find(filter)
      .select('_id testTitle category testMode mcqLimit timeLimit')
      .sort({ createdAt: -1 });

    res.json({ success: true, tests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * USER – START TEST
 * POST /api/tests/:testId/start
 */
export const startTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);

    if (!test || test.status !== 'active') {
      return res.status(404).json({ message: 'Test not available' });
    }

    let endsAt = null;

    if (test.testMode === 'exam') {
      endsAt = new Date(Date.now() + test.timeLimit * 60 * 1000);
    }

    const existing = await TestAttempt.findOne({
      userId: req.user._id,
      testId: test._id,
      submittedAt: { $exists: false },
    });

    if (existing) {
      return res.json({
        success: true,
        attemptId: existing._id,
        testMode: test.testMode,
        timeLimit: test.timeLimit,
        endsAt: existing.endsAt,
        resumed: true,
      });
    }

    const attempt = await TestAttempt.create({
      userId: req.user._id,
      testId: test._id,
      startedAt: new Date(),
      endsAt,
    });

    res.json({
      success: true,
      attemptId: attempt._id,
      testMode: test.testMode,
      timeLimit: test.timeLimit,
      endsAt,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * USER – GET NEXT QUESTION
 * GET /api/tests/attempt/:attemptId/question
 */
export const getNextQuestion = async (req, res) => {
  try {
    const attempt = await TestAttempt.findById(req.params.attemptId);
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    const test = await Test.findById(attempt.testId);

    // ⏱️ AUTO SUBMIT WHEN TIME OVER
    if (test.testMode === 'exam' && new Date() > attempt.endsAt) {
      const submittedAttempt = await autoSubmitTest(attempt, test);

      return res.json({
        success: true,
        message: 'Time over. Test auto submitted',
        score: submittedAttempt.score,
      });
    }

    // const mcqs = await MCQ.find({ _id: { $in: test.mcqs } });
    const mcqs = await MCQ.find({ _id: { $in: test.mcqs } }).lean();

    const mcqMap = new Map(mcqs.map((m) => [m._id.toString(), m]));

    const orderedMcqs = test.mcqs
      .map((id) => mcqMap.get(id.toString()))
      .filter(Boolean);

    if (attempt.currentIndex >= orderedMcqs.length) {
      const submittedAttempt = await autoSubmitTest(attempt, test);

      return res.json({
        success: true,
        message: 'Test completed',
        score: submittedAttempt.score,
      });
    }

    // const mcq = mcqs[attempt.currentIndex];
    const mcq = orderedMcqs[attempt.currentIndex];

    res.json({
      success: true,
      mcq,
      timeLeft:
        test.testMode === 'exam'
          ? Math.max(0, Math.floor((attempt.endsAt - Date.now()) / 1000))
          : null,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * USER – SUBMIT ANSWER
 * POST /api/tests/attempt/:attemptId/answer
 */
export const submitAnswer = async (req, res) => {
  try {
    const { selectedOption } = req.body;

    const attempt = await TestAttempt.findById(req.params.attemptId);
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    const test = await Test.findById(attempt.testId);
    if (attempt.answers.length > attempt.currentIndex) {
      return res.status(400).json({
        message: 'Answer already submitted for this question',
      });
    }

    // ⏱️ AUTO SUBMIT WHEN TIME OVER
    if (test.testMode === 'exam' && new Date() > attempt.endsAt) {
      const submittedAttempt = await autoSubmitTest(attempt, test);

      return res.json({
        success: true,
        message: 'Time over. Test auto submitted',
        score: submittedAttempt.score,
      });
    }

    const mcqs = await MCQ.find({ _id: { $in: test.mcqs } }).lean();

    const mcqMap = new Map(mcqs.map((m) => [m._id.toString(), m]));

    const orderedMcqs = test.mcqs
      .map((id) => mcqMap.get(id.toString()))
      .filter(Boolean);

    const mcq = orderedMcqs[attempt.currentIndex];

    if (!mcq) {
      return res.status(400).json({ message: 'No question found' });
    }

    const isCorrect = mcq.correctAnswer === selectedOption;

    attempt.answers.push({
      mcqId: mcq._id,
      selectedOption,
      isCorrect,
    });

    attempt.currentIndex += 1;
    await attempt.save();

    res.json({ success: true, isCorrect });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * USER – SUBMIT TEST (MANUAL)
 * POST /api/tests/attempt/:attemptId/submit
 */
export const submitTest = async (req, res) => {
  try {
    const attempt = await TestAttempt.findById(req.params.attemptId);
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    if (attempt.submittedAt) {
      return res.status(400).json({
        message: 'Test already submitted',
      });
    }

    const test = await Test.findById(attempt.testId);
    const submittedAttempt = await autoSubmitTest(attempt, test);

    res.json({
      success: true,
      score: submittedAttempt.score,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * USER – GET TEST RESULT
 * GET /api/tests/test-result/:userId/:testId
 */
export const getTestResult = async (req, res) => {
  try {
    const { userId, testId } = req.params;

    const attempt = await TestAttempt.findOne({ userId, testId });

    if (!attempt) {
      return res.status(404).json({
        message: 'Test attempt not found',
      });
    }

    const totalQuestions = attempt.answers.length;

    const correct = attempt.answers.filter(
      (ans) => ans.isCorrect === true
    ).length;

    const wrong = attempt.answers.filter(
      (ans) => ans.isCorrect === false
    ).length;

    const notAttempted = totalQuestions - (correct + wrong);

    const performance =
      totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

    return res.status(200).json({
      totalQuestions,
      correct,
      wrong,
      notAttempted,
      performance,
      score: attempt.score,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * USER – GET TEST REVIEW
 * GET /api/tests/test-review/:userId/:testId
 */
export const getTestReview = async (req, res) => {
  try {
    const { userId, testId } = req.params;

    const attempt = await TestAttempt.findOne({ userId, testId }).lean();

    if (!attempt) {
      return res.status(404).json({ message: 'Test attempt not found' });
    }

    const mcqIds = attempt.answers.map((a) => a.mcqId);

    const mcqs = await MCQ.find({ _id: { $in: mcqIds } }).lean();

    const mcqMap = new Map(mcqs.map((m) => [m._id.toString(), m]));

    const review = attempt.answers
      .map((ans) => {
        const mcq = mcqMap.get(ans.mcqId.toString());
        if (!mcq) return null;

        let status = 'Not Attempted';
        if (ans.selectedOption !== undefined) {
          status = ans.isCorrect ? 'Correct' : 'Wrong';
        }

        return {
          mcqId: mcq._id,
          question: mcq.question,
          options: mcq.options,
          selectedOption: ans.selectedOption ?? null,
          correctAnswer: mcq.correctAnswer,
          status,
        };
      })
      .filter(Boolean);

    return res.status(200).json({
      testId,
      totalQuestions: review.length,
      review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
