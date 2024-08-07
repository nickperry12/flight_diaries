import express from 'express';
import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = diaryService.getNonSensitiveEntries();
  res.json(data);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const diary = diaryService.findById(id);
  if (diary) {
    res.status(200).json(diary);
  } else {
    res.sendStatus(400);
  }
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { date, weather, visibility, comment } = req.body;
  const addedEntry = diaryService.addDiary({
    date,
    weather,
    visibility,
    comment
  });

  res.status(201).json(addedEntry);
});

export default router;