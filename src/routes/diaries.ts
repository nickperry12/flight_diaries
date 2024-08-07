import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

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
  // /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  // const { date, weather, visibility, comment } = req.body;
  // const addedEntry = diaryService.addDiary({
  //   date,
  //   weather,
  //   visibility,
  //   comment
  // });

  // res.status(201).json(addedEntry);

  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.status(201).json(addedEntry);
  } catch (error) {
    let errorMessage: string = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;