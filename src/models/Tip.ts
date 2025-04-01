import mongoose from 'mongoose';

const TipSchema = new mongoose.Schema({
  sender: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  recipient: {
    name: { type: String, required: true },
    email: { type: String }
  },
  amount: { type: Number, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Tip || mongoose.model('Tip', TipSchema); 