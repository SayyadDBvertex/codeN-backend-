import Test from '../../models/testModel.js';
import MCQ from '../../models/MCQs/mcq.model.js';

export const createTest = async (req, res) => {
  try {
    const {
      courseId,
      subjectId,
      subSubjectId,
      chapterId,
      scopeType,
      testType,
      totalQuestions,
    } = req.body;

    let filter = {};

    if (scopeType === 'chapter') filter.chapterId = chapterId;
    if (scopeType === 'sub-subject') filter.subSubjectId = subSubjectId;
    if (scopeType === 'subject') filter.subjectId = subjectId;

    const count = await MCQ.countDocuments(filter);
    if (count < totalQuestions) {
      return res.status(400).json({ message: 'Not enough MCQs' });
    }

    const duration = testType === 'exam' ? totalQuestions : null;

    const test = await Test.create({
      courseId,
      subjectId,
      subSubjectId,
      chapterId,
      scopeType,
      testType,
      totalQuestions,
      duration,
    });

    res.status(201).json({ success: true, test });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/**
 * ADMIN – GET ALL TESTS (FOR TABLE)
 */
export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find()
      .populate('courseId', 'name')
      .populate('subjectId', 'name')
      .populate('subSubjectId', 'name')
      .populate('chapterId', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: tests.length,
      tests,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updateTest = async (req, res) => {
  try {
    const {
      courseId,
      subjectId,
      subSubjectId,
      chapterId,
      scopeType,
      testType,
      totalQuestions,
    } = req.body;

    // 🔴 BASIC VALIDATION
    if (!courseId || !scopeType || !testType || !totalQuestions) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 🔴 SCOPE BASED VALIDATION
    if (scopeType === 'subject' && !subjectId) {
      return res.status(400).json({ message: 'Subject required' });
    }

    if (scopeType === 'sub-subject' && !subSubjectId) {
      return res.status(400).json({ message: 'Sub-subject required' });
    }

    if (scopeType === 'chapter' && !chapterId) {
      return res.status(400).json({ message: 'Chapter required' });
    }

    // 🔥 MCQ COUNT CHECK (VERY IMPORTANT)
    let filter = {};

    if (scopeType === 'subject') filter.subjectId = subjectId;
    if (scopeType === 'sub-subject') filter.subSubjectId = subSubjectId;
    if (scopeType === 'chapter') filter.chapterId = chapterId;

    const mcqCount = await MCQ.countDocuments(filter);

    if (mcqCount < totalQuestions) {
      return res
        .status(400)
        .json({ message: 'Not enough MCQs for this scope' });
    }

    // 🔥 UPDATE DATA
    let updateData = {
      courseId,
      subjectId: scopeType === 'subject' ? subjectId : null,
      subSubjectId:
        scopeType === 'sub-subject' || scopeType === 'chapter'
          ? subSubjectId
          : null,
      chapterId: scopeType === 'chapter' ? chapterId : null,
      scopeType,
      testType,
      totalQuestions,
    };

    // 🔥 duration auto update
    updateData.duration = testType === 'exam' ? totalQuestions : null;

    const test = await Test.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.json({ success: true, test });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * ADMIN – DELETE TEST
 */
export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    await test.deleteOne();

    res.json({ success: true, message: 'Test deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const publishTest = async (req, res) => {
  const test = await Test.findByIdAndUpdate(
    req.params.id,
    { isPublished: true },
    { new: true }
  );
  res.json({ success: true, test });
};

export const unpublishTest = async (req, res) => {
  const test = await Test.findByIdAndUpdate(
    req.params.id,
    { isPublished: false },
    { new: true }
  );

  if (!test) {
    return res.status(404).json({ message: 'Test not found' });
  }

  res.json({ success: true, test });
};
