import Test from '../../models/admin/testModel.js';
import Chapter from '../../models/admin/Chapter/chapter.model.js';
import Question from '../../models/admin/MCQs/mcq.model.js';

// @desc    Create New Test

export const createTest = async (req, res, next) => {
  console.log('Request Body:', req.body); // Debugging line
  try {
    const {
      month,
      academicYear,
      // courseId,
      testTitle,
      category,
      testMode,
      subjects = [],
      subSubjects = [],
      topics = [],
      chapters = [],
      mcqLimit,
      timeLimit,
    } = req.body;

    if (!month)
      return res.status(400).json({ success: false, message: 'Month missing' });

    if (!academicYear)
      return res
        .status(400)
        .json({ success: false, message: 'Academic year missing' });

    if (!testTitle)
      return res
        .status(400)
        .json({ success: false, message: 'Test title missing' });

    if (!category)
      return res
        .status(400)
        .json({ success: false, message: 'Category missing' });

    if (!testMode)
      return res
        .status(400)
        .json({ success: false, message: 'Test mode missing' });

    if (!mcqLimit)
      return res
        .status(400)
        .json({ success: false, message: 'MCQ limit missing' });

    if (testMode === 'exam' && !timeLimit) {
      return res
        .status(400)
        .json({ success: false, message: 'Time limit required for Exam Mode' });
    }
    const finalTimeLimit = testMode === 'exam' ? timeLimit : null;

    let questionFilter = { status: 'active' };

    if (category === 'grand') {
      // koi filter mat lagao
      // saare active questions uthao
      questionFilter = { status: 'active' };
    }

    if (category === 'subject') {
      if (
        !subjects.length &&
        !subSubjects.length &&
        !topics.length &&
        !chapters.length
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Select at least one Subject / SubSubject / Topic / Chapter for Subject Test',
        });
      }

      if (subjects.length) questionFilter.subjectId = { $in: subjects };
      if (subSubjects.length)
        questionFilter.subSubjectId = { $in: subSubjects };
      if (topics.length) questionFilter.topicId = { $in: topics };
      if (chapters.length) questionFilter.chapterId = { $in: chapters };
    }

    let questions = await Question.find(questionFilter);

    if (!questions.length) {
      return res.status(404).json({
        success: false,
        message: 'No questions found for selected filters',
      });
    }

    questions = questions.sort(() => 0.5 - Math.random());

    if (questions.length < mcqLimit) {
      return res.status(400).json({
        success: false,
        message: `Only ${questions.length} questions available, but MCQ limit is ${mcqLimit}`,
      });
    }

    questions = questions.slice(0, mcqLimit);

    const mappedQuestions = questions.map((q) => ({
      questionText: q.questionText,
      questionImage: q.questionImage,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      chapterId: q.chapterId,
    }));

    const test = await Test.create({
      month,
      academicYear,
      // courseId: courseId || null,
      testTitle,
      category,
      testMode,
      subjects,
      subSubjects,
      topics,
      chapters,
      mcqLimit,
      timeLimit: finalTimeLimit,
      questions: mappedQuestions,
      createdBy: req.admin._id,
    });

    res.status(201).json({
      success: true,
      message: 'Test Created Successfully',
      data: test,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Tests with Pagination/Filters
// @desc    Get All Tests (Admin)
// @route   GET /api/admin/tests
export const getAllTests = async (req, res, next) => {
  try {
    const {
      courseId,
      category,
      testMode,
      status,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (courseId && courseId !== 'null' && courseId !== 'undefined') {
      filter.courseId = courseId;
    }
    if (category) filter.category = category; // grand | subject
    if (testMode) filter.testMode = testMode; // regular | exam
    if (status) filter.status = status; // active | inactive

    const skip = (Number(page) - 1) * Number(limit);

    const tests = await Test.find(filter)
      .populate('courseId', 'name')
      .populate('subjects', 'name')
      .populate('subSubjects', 'name')
      .populate('topics', 'name')
      .populate('chapters', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Test.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: tests.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: tests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Single Test by ID
// @route   GET /api/admin/tests/:id
export const getTestById = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id)
      .populate('courseId', 'name')
      .populate('subjects', 'name')
      .populate('subSubjects', 'name')
      .populate('topics', 'name')
      .populate('chapters', 'name');

    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: 'Test not found' });
    }

    res.status(200).json({ success: true, data: test });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Test (Admin)
// @route   PUT /api/admin/tests/:id
export const updateTest = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: 'Test not found' });
    }

    const allowedFields = [
      'month',
      'academicYear',
      'testTitle',
      'status',
      'timeLimit',
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Exam mode validation
    if (test.testMode === 'exam' && updates.timeLimit === undefined) {
      updates.timeLimit = test.timeLimit;
    }
    if (test.testMode === 'regular') {
      delete updates.timeLimit;
    }

    updates.updatedBy = req.admin._id;

    const updatedTest = await Test.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Test Updated Successfully',
      data: updatedTest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Soft Delete Test (Admin)
// @route   DELETE /api/admin/tests/:id
export const deleteTest = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: 'Test not found' });
    }

    test.status = 'inactive';
    test.updatedBy = req.admin._id;
    await test.save();

    res.status(200).json({
      success: true,
      message: 'Test deactivated successfully',
    });
  } catch (error) {
    next(error);
  }
};
