export type ExerciseProps = {
  id: string;
  name: string;
  category: string;
};

export type Set = {
  id: string;
  setNumber: number;
  weightKg: number;
  reps: number;
  completed: boolean;
  restTime: number;
};

export type ActiveExercise = ExerciseProps & {
  sets: Set[];
};

export type ExerciseDB = {
  bodyPart: string;
  category: string;
  id: string;
  name: string;
  imageUrl: string;
  videoUrl: string;
  instructions: string;
};
