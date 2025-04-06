import mongoose  from "mongoose";

// Define the schema
const submittedCodeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Assignment'
  },
  classroomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Classroom'
  },
  code: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

// Static method to save submitted code
submittedCodeSchema.statics.saveCode = async function({ userId, assignmentId, classroomId, code }) {
  try {
    const submission = new this({
      userId,
      assignmentId,
      classroomId,
      code
    });

    return await submission.save();
  } catch (err) {
    console.error('Error in SubmittedCode.saveCode:', err);
    throw err;
  }
};

// Create and export the model
const SubmittedCode = mongoose.model('SubmittedCode', submittedCodeSchema);

export default SubmittedCode;
