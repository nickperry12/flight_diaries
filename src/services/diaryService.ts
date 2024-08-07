import diaryData from '../../data/diaryEntries';
import { DiaryEntry,
  NonSensitiveDiaryEntry,
  NewDiaryEntry
} from '../types';

const diaries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => {
    return {
      id,
      date,
      weather,
      visibility
    };
  });
};

const findById = (id: number): NonSensitiveDiaryEntry | undefined => {
  const diary = diaries.find(diary => diary.id === id);
  return diary;
};

const addDiary = (newEntry: NewDiaryEntry): DiaryEntry => {
  const id = Math.max(...diaries.map(diary => diary.id)) + 1;
  const newDiaryEntry: DiaryEntry = {id, ...newEntry};
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById
};
