// // import MCQ from '../../models/MCQs/mcq.model.js';
// // import Chapter from '../../models/Chapter/chapter.model.js';

// // // ✅ CORRECT MODELS
// // import SubSubject from '../../models/Sub-subject/subSubject.model.js';
// // import Subject from '../../models/Subject/subject.model.js';
// // import Tag from '../../models/Tags/tag.model.js';

// // /**
// //  * @desc    Create a new MCQ
// //  * @route   POST /api/admin/mcqs
// //  * @access  Private/Admin
// //  */
// // export const createMCQ = async (req, res, next) => {
// //   try {
// //     const {
// //       chapterId,
// //       tagId,
// //       question,
// //       options,
// //       correctAnswer,
// //       explanation,
// //       difficulty,
// //       marks,
// //       negativeMarks,
// //       previousYearTag,
// //       status,
// //     } = req.body;

    
// //     if (!tagId) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Tag is required',
// //       });
// //     }

// //     // 1️⃣ Verify chapter
// //     const chapter = await Chapter.findById(chapterId);
// //     if (!chapter) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Chapter not found',
// //       });
// //     }
// //     // 1️⃣ Verify Tag
// //     const tag = await Tag.findById(tagId);
// //     if (!tag) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Tag not found',
// //       });
// //     }

// //     // 2️⃣ Ensure tag belongs to same chapter
// //     if (tag.chapterId.toString() !== chapterId) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Tag does not belong to this chapter',
// //       });
// //     }

// //     // 2️⃣ Get SubSubject
// //     const subSubject = await SubSubject.findById(chapter.subSubjectId);
// //     if (!subSubject) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Sub-subject not found',
// //       });
// //     }

// //     // 3️⃣ Get Subject
// //     const subject = await Subject.findById(subSubject.subjectId);
// //     if (!subject) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Subject not found',
// //       });
// //     }

// //     // 4️⃣ Validate options
// //     if (!options || options.length < 2) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'MCQ must have at least 2 options',
// //       });
// //     }

// //     // 5️⃣ Validate correctAnswer
// //     if (correctAnswer === undefined || correctAnswer === null) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Correct answer is required',
// //       });
// //     }

// //     // 6️⃣ Create MCQ with FULL hierarchy
// //     const mcq = await MCQ.create({
// //       courseId: subject.courseId,
// //       subjectId: subject._id,
// //       subSubjectId: subSubject._id,
// //       chapterId,
// //       tagId,
// //       question,
// //       options,
// //       correctAnswer,
// //       explanation,

// //       difficulty: difficulty || 'medium',
// //       marks: marks || 4,
// //       negativeMarks: negativeMarks || 1,
// //       previousYearTag: previousYearTag || false,
// //       status: status || 'active',

// //       createdBy: req.admin._id,
// //       updatedBy: req.admin._id,
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: 'MCQ created successfully',
// //       data: mcq,
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /**
// //  * @desc    Get all MCQs
// //  * @route   GET /api/admin/mcqs
// //  * @access  Private/Admin
// //  */
// // export const getAllMCQs = async (req, res, next) => {
// //   try {
// //     const {
// //       courseId,
// //       tagId,
// //       subjectId,
// //       subSubjectId,
// //       chapterId,
// //       status,
// //       difficulty,
// //       previousYearTag,
// //     } = req.query;

// //     const filter = {};

// //     // 🔹 Scope filters
// //     if (courseId) filter.courseId = courseId;
// //     if (tagId) filter.tagId = tagId;
// //     if (subjectId) filter.subjectId = subjectId;
// //     if (subSubjectId) filter.subSubjectId = subSubjectId;
// //     if (chapterId) filter.chapterId = chapterId;

// //     // 🔹 Other filters
// //     if (status) filter.status = status;
// //     if (difficulty) filter.difficulty = difficulty;
// //     if (previousYearTag !== undefined) {
// //       filter.previousYearTag = previousYearTag === 'true';
// //     }

// //     const mcqs = await MCQ.find(filter)
// //       .populate('courseId', 'name')
// //       .populate('subjectId', 'name')
// //       .populate('subSubjectId', 'name')
// //       .populate('chapterId', 'name')
// //       .populate('tagId', 'name')
// //       .populate('createdBy', 'name')
// //       .populate('updatedBy', 'name')
// //       .sort({ createdAt: -1 });

// //     res.status(200).json({
// //       success: true,
// //       count: mcqs.length,
// //       data: mcqs,
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /**
// //  * @desc    Get single MCQ by ID
// //  * @route   GET /api/admin/mcqs/:id
// //  * @access  Private/Admin
// //  */
// // export const getMCQById = async (req, res, next) => {
// //   try {
// //     const mcq = await MCQ.findById(req.params.id)
// //       .populate('courseId', 'name')
// //       .populate('subjectId', 'name')
// //       .populate('subSubjectId', 'name')
// //       .populate('chapterId', 'name description')
// //       .populate('tagId', 'name description') // ✅ UPDATED
// //       .populate('createdBy', 'name')
// //       .populate('updatedBy', 'name');

// //     if (!mcq) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'MCQ not found',
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: mcq,
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /**
// //  * @desc    Update MCQ
// //  * @route   PUT /api/admin/mcqs/:id
// //  * @access  Private/Admin
// //  */

// // export const updateMCQ = async (req, res, next) => {
// //   try {
// //     const {
// //       chapterId,
// //       tagId,
// //       question,
// //       options,
// //       correctAnswer,
// //       explanation,
// //       difficulty,
// //       marks,
// //       negativeMarks,
// //       previousYearTag,
// //       status,
// //     } = req.body;

// //     const mcq = await MCQ.findById(req.params.id);
// //     if (!mcq) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'MCQ not found',
// //       });
// //     }

// //     /**
// //      * 🔹 If chapter is changed → update full hierarchy
// //      */
// //     if (chapterId && chapterId !== mcq.chapterId.toString()) {
// //       const chapter = await Chapter.findById(chapterId);
// //       if (!chapter) {
// //         return res.status(404).json({
// //           success: false,
// //           message: 'Chapter not found',
// //         });
// //       }

// //       // 🔴 IMPORTANT: chapter change → tag MUST be provided
// //       if (!tagId) {
// //         return res.status(400).json({
// //           success: false,
// //           message: 'Tag is required when changing chapter',
// //         });
// //       }

// //       const subSubject = await SubSubject.findById(chapter.subSubjectId);
// //       if (!subSubject) {
// //         return res.status(404).json({
// //           success: false,
// //           message: 'Sub-subject not found',
// //         });
// //       }

// //       const subject = await Subject.findById(subSubject.subjectId);
// //       if (!subject) {
// //         return res.status(404).json({
// //           success: false,
// //           message: 'Subject not found',
// //         });
// //       }

// //       // ✅ update hierarchy
// //       mcq.chapterId = chapterId;
// //       mcq.subSubjectId = subSubject._id;
// //       mcq.subjectId = subject._id;
// //       mcq.courseId = subject.courseId;
// //     }

// //     /**
// //      * 🔹 Handle TAG update (independent)
// //      */
// //     if (tagId && tagId !== mcq.tagId.toString()) {
// //       const tag = await Tag.findById(tagId);
// //       if (!tag) {
// //         return res.status(404).json({
// //           success: false,
// //           message: 'Tag not found',
// //         });
// //       }

// //       const chapterToCheck = chapterId || mcq.chapterId.toString();

// //       if (tag.chapterId.toString() !== chapterToCheck) {
// //         return res.status(400).json({
// //           success: false,
// //           message: 'Tag does not belong to this chapter',
// //         });
// //       }

// //       mcq.tagId = tagId;
// //     }

// //     /**
// //      * 🔹 Validate options
// //      */
// //     if (options && options.length < 2) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'MCQ must have at least 2 options',
// //       });
// //     }

// //     /**
// //      * 🔹 Update remaining fields
// //      */
// //     if (question !== undefined) mcq.question = question;
// //     if (options !== undefined) mcq.options = options;
// //     if (correctAnswer !== undefined) mcq.correctAnswer = correctAnswer;
// //     if (explanation !== undefined) mcq.explanation = explanation;
// //     if (difficulty !== undefined) mcq.difficulty = difficulty;
// //     if (marks !== undefined) mcq.marks = marks;
// //     if (negativeMarks !== undefined) mcq.negativeMarks = negativeMarks;
// //     if (previousYearTag !== undefined) mcq.previousYearTag = previousYearTag;
// //     if (status !== undefined) mcq.status = status;

// //     mcq.updatedBy = req.admin._id;
// //     await mcq.save();

// //     res.status(200).json({
// //       success: true,
// //       message: 'MCQ updated successfully',
// //       data: mcq,
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /**
// //  * @desc    Delete MCQ (soft delete - status change)
// //  * @route   DELETE /api/admin/mcqs/:id
// //  * @access  Private/Admin
// //  */
// // // export const deleteMCQ = async (req, res, next) => {
// // //   try {
// // //     const mcq = await MCQ.findById(req.params.id);

// // //     if (!mcq) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'MCQ not found',
// // //       });
// // //     }

// // //     // Soft delete - change status to inactive
// // //     mcq.status = 'inactive';
// // //     mcq.updatedBy = req.admin._id;
// // //     await mcq.save();

// // //     res.status(200).json({
// // //       success: true,
// // //       message: 'MCQ deleted successfully',
// // //     });
// // //   } catch (error) {
// // //     next(error);
// // //   }
// // // };
// // export const deleteMCQ = async (req, res, next) => {
// //   try {
// //     const mcq = await MCQ.findById(req.params.id);

// //     if (!mcq) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'MCQ not found',
// //       });
// //     }

// //     await MCQ.findByIdAndDelete(req.params.id);

// //     res.status(200).json({
// //       success: true,
// //       message: 'MCQ permanently deleted successfully',
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /**
// //  * @desc    Enable/Disable MCQ
// //  * @route   PATCH /api/admin/mcqs/:id/status
// //  * @access  Private/Admin
// //  */
// // export const toggleMCQStatus = async (req, res, next) => {
// //   try {
// //     const { status } = req.body;

// //     // 🔹 Validate status
// //     if (!status || !['active', 'inactive'].includes(status)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Status must be either active or inactive',
// //       });
// //     }

// //     const mcq = await MCQ.findById(req.params.id);

// //     if (!mcq) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'MCQ not found',
// //       });
// //     }

// //     // 🔹 No-op check (already same status)
// //     if (mcq.status === status) {
// //       return res.status(200).json({
// //         success: true,
// //         message: `MCQ already ${status}`,
// //         data: mcq,
// //       });
// //     }

// //     // 🔹 Update status
// //     mcq.status = status;
// //     mcq.updatedBy = req.admin._id;
// //     await mcq.save();

// //     res.status(200).json({
// //       success: true,
// //       message:
// //         status === 'active'
// //           ? 'MCQ enabled successfully'
// //           : 'MCQ disabled successfully',
// //       data: mcq,
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// import MCQ from '../../models/MCQs/mcq.model.js';
// import Chapter from '../../models/Chapter/chapter.model.js';
// import SubSubject from '../../models/Sub-subject/subSubject.model.js';
// import Subject from '../../models/Subject/subject.model.js';
// import Tag from '../../models/Tags/tag.model.js';

// /**
//  * @desc    Create a new MCQ (With Text/Image flexibility & Optional Tag)
//  * @route   POST /api/admin/mcqs
//  */
// export const createMCQ = async (req, res, next) => {
//   try {
//     const {
//       chapterId,
//       tagId, // Optional feature added
//       question, // { text: "", images: [] }
//       options, // [{ text: "", image: "" }]
//       correctAnswer,
//       explanation, // { text: "", images: [] }
//       difficulty,
//       marks,
//       negativeMarks,
//       previousYearTag,
//       status,
//     } = req.body;

//     // 1️⃣ Verify chapter (Mandatory)
//     const chapter = await Chapter.findById(chapterId);
//     if (!chapter) {
//       return res.status(404).json({ success: false, message: 'Chapter not found' });
//     }

//     // 2️⃣ Verify Tag (Optional - if admin provides it)
//     if (tagId) {
//       const tag = await Tag.findById(tagId);
//       if (!tag) {
//         return res.status(404).json({ success: false, message: 'Selected Tag not found' });
//       }
//     }

//     // 3️⃣ Content Validation (Text or Image must exist)
//     // Question Validation
//     if (!question?.text && (!question?.images || question.images.length === 0)) {
//       return res.status(400).json({ success: false, message: 'Question must have either text or an image' });
//     }

//     // Options Validation
//     if (!options || options.length < 2) {
//       return res.status(400).json({ success: false, message: 'MCQ must have at least 2 options' });
//     }
//     for (let i = 0; i < options.length; i++) {
//       if (!options[i].text && !options[i].image) {
//         return res.status(400).json({ success: false, message: `Option ${i + 1} must have text or an image` });
//       }
//     }

//     // Explanation Validation (Optional but if exists, must have text/image)
//     if (explanation && !explanation.text && (!explanation.images || explanation.images.length === 0)) {
//        return res.status(400).json({ success: false, message: 'Explanation must have text or an image if provided' });
//     }

//     // 4️⃣ Get Hierarchy (Auto-fetch Subject & SubSubject)
//     const subSubject = await SubSubject.findById(chapter.subSubjectId);
//     const subject = await Subject.findById(subSubject?.subjectId);
//     if (!subject) {
//       return res.status(404).json({ success: false, message: 'Hierarchy (Subject) not found' });
//     }

//     // 5️⃣ Correct Answer Validation
//     if (correctAnswer === undefined || correctAnswer === null) {
//       return res.status(400).json({ success: false, message: 'Correct answer index is required' });
//     }

//     // 6️⃣ Create MCQ with Full Hierarchy
//     const mcq = await MCQ.create({
//       courseId: subject.courseId,
//       subjectId: subject._id,
//       subSubjectId: subSubject._id,
//       chapterId,
//       tagId: tagId || null, // Optional handling
//       question: {
//         text: question.text || "",
//         images: question.images || [] // Multiple images array
//       },
//       options: options.map(opt => ({
//         text: opt.text || "",
//         image: opt.image || null // Single image per option
//       })),
//       correctAnswer,
//       explanation: {
//         text: explanation?.text || "",
//         images: explanation?.images || []
//       },
//       difficulty: difficulty || 'medium',
//       marks: marks || 4,
//       negativeMarks: negativeMarks || 1,
//       previousYearTag: previousYearTag || false,
//       status: status || 'active',
//       createdBy: req.admin._id,
//       updatedBy: req.admin._id,
//     });

//     res.status(201).json({ success: true, message: 'MCQ created successfully', data: mcq });
//   } catch (error) { next(error); }
// };

// /**
//  * @desc    Get all MCQs (With Filters)
//  */
// export const getAllMCQs = async (req, res, next) => {
//   try {
//     const { courseId, tagId, subjectId, chapterId, status } = req.query;
//     const filter = {};

//     if (courseId) filter.courseId = courseId;
//     if (tagId) filter.tagId = tagId;
//     if (subjectId) filter.subjectId = subjectId;
//     if (chapterId) filter.chapterId = chapterId;
//     if (status) filter.status = status;

//     const mcqs = await MCQ.find(filter)
//       .populate('courseId subjectId chapterId tagId', 'name')
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, count: mcqs.length, data: mcqs });
//   } catch (error) { next(error); }
// };

// /**
//  * @desc    Get single MCQ by ID
//  */
// export const getMCQById = async (req, res, next) => {
//   try {
//     const mcq = await MCQ.findById(req.params.id)
//       .populate('courseId subjectId subSubjectId chapterId tagId');

//     if (!mcq) return res.status(404).json({ success: false, message: 'MCQ not found' });
//     res.status(200).json({ success: true, data: mcq });
//   } catch (error) { next(error); }
// };

// /**
//  * @desc    Update MCQ (Flexible Fields)
//  */
// export const updateMCQ = async (req, res, next) => {
//   try {
//     const { chapterId, tagId, question, options, explanation, ...rest } = req.body;

//     const mcq = await MCQ.findById(req.params.id);
//     if (!mcq) return res.status(404).json({ success: false, message: 'MCQ not found' });

//     // Hierarchy update if chapter changes
//     if (chapterId && chapterId !== mcq.chapterId.toString()) {
//       const ch = await Chapter.findById(chapterId);
//       const ss = await SubSubject.findById(ch.subSubjectId);
//       const s = await Subject.findById(ss.subjectId);
      
//       mcq.courseId = s.courseId;
//       mcq.subjectId = s._id;
//       mcq.subSubjectId = ss._id;
//       mcq.chapterId = chapterId;
//     }

//     // Tag update (Can be set to null)
//     if (tagId !== undefined) mcq.tagId = tagId || null;

//     // Content updates
//     if (question) mcq.question = question;
//     if (options) mcq.options = options;
//     if (explanation) mcq.explanation = explanation;

//     // Other fields (difficulty, marks, etc.)
//     Object.assign(mcq, rest);
//     mcq.updatedBy = req.admin._id;

//     await mcq.save();
//     res.status(200).json({ success: true, message: 'MCQ updated successfully', data: mcq });
//   } catch (error) { next(error); }
// };

// /**
//  * @desc    Delete MCQ (Permanent)
//  */
// export const deleteMCQ = async (req, res, next) => {
//   try {
//     const mcq = await MCQ.findByIdAndDelete(req.params.id);
//     if (!mcq) return res.status(404).json({ success: false, message: 'MCQ not found' });
//     res.status(200).json({ success: true, message: 'MCQ permanently deleted' });
//   } catch (error) { next(error); }
// };
// //  export const toggleMCQStatus = async (req, res, next) => {
// //   try {
// //     const { status } = req.body;

// //     // 🔹 Validate status
// //     if (!status || !['active', 'inactive'].includes(status)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Status must be either active or inactive',
// //       });
// //     }

// //   }

import MCQ from '../../models/MCQs/mcq.model.js';
import Chapter from '../../models/Chapter/chapter.model.js';
import SubSubject from '../../models/Sub-subject/subSubject.model.js';
import Subject from '../../models/Subject/subject.model.js';
import Tag from '../../models/Tags/tag.model.js';
import fs from 'fs';
import path from 'path';

/**
 * @desc    Create a new MCQ with Images and Text
 * @route   POST /api/admin/mcqs
 */
export const createMCQ = async (req, res, next) => {
  try {
    const {
      chapterId,
      tagId,
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
    if (!chapter) return res.status(404).json({ success: false, message: 'Chapter not found' });

    const subSubject = await SubSubject.findById(chapter.subSubjectId);
    const subject = await Subject.findById(subSubject?.subjectId);
    if (!subject) return res.status(404).json({ success: false, message: 'Full hierarchy (Subject/Course) not found' });

    // 2️⃣ Parse JSON strings from FormData
    const parsedQuestion = typeof question === 'string' ? JSON.parse(question) : question;
    const parsedOptions = typeof options === 'string' ? JSON.parse(options) : options;
    const parsedExplanation = explanation ? (typeof explanation === 'string' ? JSON.parse(explanation) : explanation) : null;

    // 3️⃣ Map Images from req.files
    const questionImages = files['questionImages'] ? files['questionImages'].map(f => `/uploads/mcq-images/${f.filename}`) : [];
    const explanationImages = files['explanationImages'] ? files['explanationImages'].map(f => `/uploads/mcq-images/${f.filename}`) : [];

    const finalOptions = parsedOptions.map((opt, index) => ({
      text: opt.text || "",
      image: files[`optionImage_${index}`] ? `/uploads/mcq-images/${files[`optionImage_${index}`][0].filename}` : (opt.image || null)
    }));

    // 4️⃣ Create MCQ
    const mcq = await MCQ.create({
      courseId: subject.courseId,
      subjectId: subject._id,
      subSubjectId: subSubject._id,
      chapterId,
      tagId: tagId || null,
      question: {
        text: parsedQuestion.text || "",
        images: [...(parsedQuestion.images || []), ...questionImages]
      },
      options: finalOptions,
      correctAnswer,
      explanation: {
        text: parsedExplanation?.text || "",
        images: [...(parsedExplanation?.images || []), ...explanationImages]
      },
      difficulty: difficulty || 'medium',
      marks: marks || 4,
      negativeMarks: negativeMarks || 1,
      previousYearTag: previousYearTag === 'true' || previousYearTag === true,
      status: status || 'active',
      createdBy: req.admin._id,
      updatedBy: req.admin._id,
    });

    res.status(201).json({ success: true, message: 'MCQ created successfully', data: mcq });
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
    const { courseId, subjectId, subSubjectId, chapterId, tagId, status, difficulty } = req.query;
    const filter = {};

    if (courseId) filter.courseId = courseId;
    if (subjectId) filter.subjectId = subjectId;
    if (subSubjectId) filter.subSubjectId = subSubjectId;
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
    const mcq = await MCQ.findById(req.params.id)
      .populate('courseId subjectId subSubjectId chapterId tagId');

    if (!mcq) return res.status(404).json({ success: false, message: 'MCQ not found' });
    res.status(200).json({ success: true, data: mcq });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update MCQ (Handles new image uploads and hierarchy changes)
 * @route   PUT /api/admin/mcqs/:id
 */
export const updateMCQ = async (req, res, next) => {
  try {
    const mcq = await MCQ.findById(req.params.id);
    if (!mcq) return res.status(404).json({ success: false, message: 'MCQ not found' });

    const { chapterId, tagId, question, options, explanation, ...rest } = req.body;
    const files = req.files;

    // Hierarchy change logic
    if (chapterId && chapterId !== mcq.chapterId.toString()) {
      const ch = await Chapter.findById(chapterId);
      const ss = await SubSubject.findById(ch.subSubjectId);
      const s = await Subject.findById(ss.subjectId);
      mcq.courseId = s.courseId;
      mcq.subjectId = s._id;
      mcq.subSubjectId = ss._id;
      mcq.chapterId = chapterId;
    }

    if (tagId !== undefined) mcq.tagId = tagId || null;

    // Update Question/Options/Explanation if provided
    if (question) {
      const q = typeof question === 'string' ? JSON.parse(question) : question;
      const newImgs = files['questionImages'] ? files['questionImages'].map(f => `/uploads/mcq-images/${f.filename}`) : [];
      mcq.question = { text: q.text, images: [...(q.images || []), ...newImgs] };
    }

    if (options) {
      const opts = typeof options === 'string' ? JSON.parse(options) : options;
      mcq.options = opts.map((opt, index) => ({
        text: opt.text,
        image: files[`optionImage_${index}`] ? `/uploads/mcq-images/${files[`optionImage_${index}`][0].filename}` : opt.image
      }));
    }

    if (explanation) {
      const exp = typeof explanation === 'string' ? JSON.parse(explanation) : explanation;
      const newExpImgs = files['explanationImages'] ? files['explanationImages'].map(f => `/uploads/mcq-images/${f.filename}`) : [];
      mcq.explanation = { text: exp.text, images: [...(exp.images || []), ...newExpImgs] };
    }

    Object.assign(mcq, rest);
    mcq.updatedBy = req.admin._id;

    await mcq.save();
    res.status(200).json({ success: true, message: 'MCQ updated successfully', data: mcq });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete MCQ (Permanent)
 * @route   DELETE /api/admin/mcqs/:id
 */
export const deleteMCQ = async (req, res, next) => {
  try {
    const mcq = await MCQ.findByIdAndDelete(req.params.id);
    if (!mcq) return res.status(404).json({ success: false, message: 'MCQ not found' });
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
    if (!mcq) return res.status(404).json({ success: false, message: 'MCQ not found' });

    mcq.status = status;
    mcq.updatedBy = req.admin._id;
    await mcq.save();

    res.status(200).json({ success: true, message: `MCQ status updated to ${status}` });
  } catch (error) {
    next(error);
  }
};