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
  code: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  score: {
    type: Number,
    default: null
  },
});

// Static method to save submitted code
submittedCodeSchema.statics.saveCode = async function({ userId, assignmentId, code ,score}) {
  try {
    const submission = new this({
      userId,
      assignmentId,
      code,
      score
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
