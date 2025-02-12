import { Goal } from '../models/Goal';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals' });
  }
});

router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goal' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, category, visibility } = req.body;
    const newGoal = new Goal({
      title,
      description,
      category,
      visibility,
      isGoal: false
    });
    await newGoal.save();
    res.status(201).json(newGoal.toObject({ virtuals: true }));
  } catch (error) {
    res.status(400).json({ message: 'Error creating idea' });
  }
});

router.put('/:id/convert', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { isGoal: true, status: 'In Progress' },
      { new: true }
    );
    res.json(goal);
  } catch (error) {
    res.status(400).json({ message: 'Error converting idea to goal' });
  }
});

export default router;