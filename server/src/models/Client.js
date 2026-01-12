import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: String,
  email: String,
  phone: String,
  address: String,
  notes: String,
  leadStatus: { type: String, enum: ['New', 'In Progress', 'Converted', 'Lost'], default: 'New' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Client', clientSchema);
