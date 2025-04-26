import { ActiveExercise } from "./exercises";

import { v4 as uuidv4 } from "uuid";

export type ActiveWorkout = {
  id: string;
  templateId: string | null;
  name: string;
  startTime: string;
  endTime: string | null;
  durationSeconds: number | null;
  totalVolumeKg: number;
  prsAchieved: number;
  isSynced: boolean;
  isDeleted: boolean;
  exercises: ActiveExercise[];
};
