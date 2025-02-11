import express from 'express';
import { Dream } from '../models/Dream';

const router = express.Router();

// Alle Dreams abrufen
router.get('/', async (req, res) => {
  try {
    const dreams = await Dream.find();
    res.json(dreams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dreams' });
  }
});

// Neuen Dream erstellen
router.post('/', async (req, res) => {
  try {
    const { title, visibility, buddy } = req.body;
    const newDream = new Dream({ title, visibility, buddy });
    await newDream.save();
    res.status(201).json(newDream);
  } catch (error) {
    res.status(400).json({ message: 'Error creating dream' });
  }
});

export default router;