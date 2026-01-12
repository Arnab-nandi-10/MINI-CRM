import mongoose from 'mongoose';

const commLogSchema = new mongoose.Schema({
  type: { type: String, enum: ['Email', 'SMS'], required: true },
  to: String,
  subject: String,
  message: String,
  status: String,
  sentAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }
});

export default mongoose.model('CommLog', commLogSchema);
