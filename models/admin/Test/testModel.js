import mongoose from 'mongoose';

const testSchema = new mongoose.Schema(
  {
    month: { type: String, required: true },
    academicYear: { type: String, required: true },
    testTitle: { type: String, required: true, trim: true },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },

    category: {
      type: String,
      enum: ['grand', 'subject'],
      required: true,
    },

    testMode: {
      type: String,
      enum: ['regular', 'exam'],
      required: true,
    },

    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    subSubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubSubject' }],
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],

    mcqLimit: { type: Number, required: true, min: 1 },
    timeLimit: { type: Number, default: null },

    mcqs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MCQ' }],
    totalQuestions: { type: Number, default: 0 },

    description: { type: String, default: '' },

    status: {
      type: String,
      enum: ['active', 'inactive', 'draft'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Test', testSchema);
