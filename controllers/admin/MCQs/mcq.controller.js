import MCQ from '../../../models/admin/MCQs/mcq.model.js';
import Chapter from '../../../models/admin/Chapter/chapter.model.js';
import Topic from '../../../models/admin/Topic/topic.model.js';
import SubSubject from '../../../models/admin/Sub-subject/subSubject.model.js';
import Subject from '../../../models/admin/Subject/subject.model.js';
// import Tag from '../../../models/admin/Tags/tag.model.js';
import fs from 'fs';
import path from 'path';

/**
 * @desc    Create a new MCQ with Images and Text
 * @route   POST /api/admin/mcqs
 */
export const createMCQ = async (req, res, next) => {
  console.log('UPLOADED FILES:', req.files);
  try {
    const {
      chapterId,
      tagId,
      mode,
      question,
      options,
      correctAnswer,
      explanation,
      difficulty,
      marks,
      negativeMarks,
      previousYearTag,
      status,
    } = req.body;

    const files = req.files;

    // 1️⃣ Verify Chapter & Hierarchy
    const chapter = await Chapter.findById(chapterId);
    if (!chapter)
      return res
        .status(404)
        .json({ success: false, message: 'Chapter not found' });

    const topic = await Topic.findById(chapter.topicId);
    if (!topic)
      return res
        .status(404)
        .json({ success: false, message: 'Topic not found' });

    const subSubject = await SubSubject.findById(chapter.subSubjectId);
    const subject = await Subject.findById(subSubject?.subjectId);
    if (!subject)
      return res.status(404).json({
        success: false,
        message: 'Full hierarchy (Subject/Course) not found',
      });

    // 2️⃣ Parse JSON strings from FormData
    const parsedQuestion =
      typeof question === 'string' ? JSON.parse(question) : question;
    const parsedOptions =
      typeof options === 'string' ? JSON.parse(options) : options;
    const parsedExplanation = explanation
      ? typeof explanation === 'string'
        ? JSON.parse(explanation)
        : explanation
      : null;

    // 3️⃣ Map Images from req.files
    const questionImages = files['questionImages']
      ? files['questionImages'].map((f) => `/uploads/mcq-images/${f.filename}`)
      : [];
    const explanationImages = files['explanationImages']
      ? files['explanationImages'].map(
          (f) => `/uploads/mcq-images/${f.filename}`
        )
      : [];

    const finalOptions = parsedOptions.map((opt, index) => ({
      text: opt.text || '',
      image: files[`optionImage_${index}`]
        ? `/uploads/mcq-images/${files[`optionImage_${index}`][0].filename}`
        : opt.image || null,
    }));

    // 4️⃣ Create MCQ
    const mcq = await MCQ.create({
      courseId: subject.courseId,
      subjectId: subject._id,
      subSubjectId: subSubject._id,
      topicId: topic._id,
      mode: mode || 'regular',
      chapterId,
      tagId: tagId || null,
      question: {
        text: parsedQuestion.text || '',
        images: questionImages,
      },
      options: finalOptions,
      correctAnswer,
      explanation: {
        text: parsedExplanation?.text || '',
        images: explanationImages,
      },

      difficulty: difficulty || 'medium',
      marks: marks || 4,
      negativeMarks: negativeMarks || 1,
      previousYearTag: previousYearTag === 'true' || previousYearTag === true,
      status: status || 'active',
      createdBy: req.admin._id,
      updatedBy: req.admin._id,
    });

    res
      .status(201)
      .json({ success: true, message: 'MCQ created successfully', data: mcq });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get All MCQs with Filters
 * @route   GET /api/admin/mcqs
 */
export const getAllMCQs = async (req, res, next) => {
  try {
    const {
      courseId,
      subjectId,
      subSubjectId,
      topicId,
      mode,
      chapterId,
      tagId,
      status,
      difficulty,
    } = req.query;
    const filter = {};

    if (courseId) filter.courseId = courseId;
    if (subjectId) filter.subjectId = subjectId;
    if (subSubjectId) filter.subSubjectId = subSubjectId;
    if (topicId) filter.topicId = topicId;
    if (mode) filter.mode = mode;
    if (chapterId) filter.chapterId = chapterId;
    if (tagId) filter.tagId = tagId;
    if (status) filter.status = status;
    if (difficulty) filter.difficulty = difficulty;

    const mcqs = await MCQ.find(filter)
      .populate('courseId subjectId subSubjectId chapterId tagId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: mcqs.length, data: mcqs });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get Single MCQ
 * @route   GET /api/admin/mcqs/:id
 */
export const getMCQById = async (req, res, next) => {
  try {
    const mcq = await MCQ.findById(req.params.id).populate(
      'courseId subjectId subSubjectId chapterId tagId'
    );

    if (!mcq)
      return res.status(404).json({ success: false, message: 'MCQ not found' });
    res.status(200).json({ success: true, data: mcq });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update MCQ (Images + Hierarchy + Validation)
 * @route   PUT /api/admin/mcqs/:id
 */
export const updateMCQ = async (req, res, next) => {
  try {
    const mcq = await MCQ.findById(req.params.id);
    if (!mcq) {
      return res.status(404).json({ success: false, message: 'MCQ not found' });
    }

    const {
      chapterId,
      tagId,
      mode,
      question,
      options,
      explanation,
      correctAnswer,
      status,
      ...rest
    } = req.body;

    const files = req.files || {};

    /* =======================
       MODE VALIDATION
    ======================= */
    if (mode !== undefined) {
      if (!['regular', 'exam'].includes(mode)) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'Invalid mode (regular/exam only)',
          });
      }
      mcq.mode = mode;
    }

    /* =======================
       STATUS VALIDATION
    ======================= */
    if (status !== undefined) {
      if (!['active', 'inactive'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status (active/inactive only)',
        });
      }
      mcq.status = status;
    }

    /* =======================
       HIERARCHY CHANGE
    ======================= */
    if (chapterId && chapterId !== mcq.chapterId.toString()) {
      const ch = await Chapter.findById(chapterId);
      if (!ch)
        return res
          .status(404)
          .json({ success: false, message: 'Chapter not found' });

      const topic = await Topic.findById(ch.topicId);
      if (!topic)
        return res
          .status(404)
          .json({ success: false, message: 'Topic not found' });

      const ss = await SubSubject.findById(ch.subSubjectId);
      if (!ss)
        return res
          .status(404)
          .json({ success: false, message: 'SubSubject not found' });

      const s = await Subject.findById(ss.subjectId);
      if (!s)
        return res
          .status(404)
          .json({ success: false, message: 'Subject not found' });

      mcq.courseId = s.courseId;
      mcq.subjectId = s._id;
      mcq.subSubjectId = ss._id;
      mcq.topicId = topic._id;
      mcq.chapterId = chapterId;
    }

    /* =======================
       TAG
    ======================= */
    if (tagId !== undefined) {
      mcq.tagId = tagId || null;
    }

    /* =======================
       QUESTION UPDATE
    ======================= */
    if (question) {
      const q = typeof question === 'string' ? JSON.parse(question) : question;

      // Replace old images if flag sent
      if (q.replaceImages === true) {
        mcq.question.images.forEach(deleteFile);
        mcq.question.images = [];
      }

      const newImgs = files['questionImages']
        ? files['questionImages'].map(
            (f) => `/uploads/mcq-images/${f.filename}`
          )
        : [];

      mcq.question = {
        text: q.text || mcq.question.text,
        images: [...(q.images || mcq.question.images), ...newImgs],
      };
    }

    /* =======================
       OPTIONS UPDATE
    ======================= */
    if (options) {
      const opts = typeof options === 'string' ? JSON.parse(options) : options;

      if (opts.length !== 4) {
        return res.status(400).json({
          success: false,
          message: 'Exactly 4 options are required',
        });
      }

      // delete old option images if replaced
      opts.forEach((opt, i) => {
        if (opt.replaceImage === true && mcq.options[i]?.image) {
          deleteFile(mcq.options[i].image);
        }
      });

      mcq.options = opts.map((opt, index) => ({
        text: opt.text || '',
        image: files[`optionImage_${index}`]
          ? `/uploads/mcq-images/${files[`optionImage_${index}`][0].filename}`
          : opt.image || mcq.options[index]?.image || null,
      }));

      // revalidate correctAnswer
      if (
        mcq.correctAnswer !== undefined &&
        mcq.correctAnswer > opts.length - 1
      ) {
        return res.status(400).json({
          success: false,
          message: 'correctAnswer index out of range after options update',
        });
      }
    }

    /* =======================
       EXPLANATION UPDATE
    ======================= */
    if (explanation) {
      const exp =
        typeof explanation === 'string' ? JSON.parse(explanation) : explanation;

      if (exp.replaceImages === true) {
        mcq.explanation.images.forEach(deleteFile);
        mcq.explanation.images = [];
      }

      const newExpImgs = files['explanationImages']
        ? files['explanationImages'].map(
            (f) => `/uploads/mcq-images/${f.filename}`
          )
        : [];

      mcq.explanation = {
        text: exp.text || mcq.explanation.text,
        images: [...(exp.images || mcq.explanation.images), ...newExpImgs],
      };
    }

    /* =======================
       CORRECT ANSWER
    ======================= */
    if (correctAnswer !== undefined) {
      const ans = Number(correctAnswer);
      if (![0, 1, 2, 3].includes(ans)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid correctAnswer index (0–3 only)',
        });
      }
      mcq.correctAnswer = ans;
    }

    /* =======================
       SIMPLE FIELDS
    ======================= */
    Object.assign(mcq, rest);
    mcq.updatedBy = req.admin._id;

    await mcq.save();

    res.status(200).json({
      success: true,
      message: 'MCQ updated successfully',
      data: mcq,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete MCQ (Permanent)
 * @route   DELETE /api/admin/mcqs/:id
 */
const deleteFile = (filePath) => {
  if (filePath && fs.existsSync(path.join(process.cwd(), filePath))) {
    fs.unlinkSync(path.join(process.cwd(), filePath));
  }
};

export const deleteMCQ = async (req, res, next) => {
  try {
    const mcq = await MCQ.findById(req.params.id);
    if (!mcq)
      return res.status(404).json({ success: false, message: 'MCQ not found' });

    // 🧹 Question images
    mcq.question?.images?.forEach(deleteFile);

    // 🧹 Option images
    mcq.options?.forEach((opt) => deleteFile(opt.image));

    // 🧹 Explanation images
    mcq.explanation?.images?.forEach(deleteFile);

    await mcq.deleteOne();

    res.status(200).json({ success: true, message: 'MCQ permanently deleted' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle MCQ Status (Active/Inactive)
 * @route   PATCH /api/admin/mcqs/:id/status
 */
export const toggleMCQStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const mcq = await MCQ.findById(req.params.id);
    if (!mcq)
      return res.status(404).json({ success: false, message: 'MCQ not found' });

    mcq.status = status;
    mcq.updatedBy = req.admin._id;
    await mcq.save();

    res
      .status(200)
      .json({ success: true, message: `MCQ status updated to ${status}` });
  } catch (error) {
    next(error);
  }
};
