import mongoose from 'mongoose';

const DreamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  visibility: { type: String, enum: ['private', 'public'], default: 'private' },
  buddy: { type: String, default: null }, 
  createdAt: { type: Date, default: Date.now }
});

export const Dream = mongoose.model('Dream', DreamSchema);