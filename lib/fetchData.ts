export const fetchExercises = async () => {
  const response = await fetch(
    "https://werk.dvcklab.com/api/v1/exercises/allExercises",
  );
  console.log("result", response);
  if (!response.ok) {
    throw new Error("Failed to fetch workout templates");
  }
  const result = await response.json();

  if (!result.success || !result.data) throw new Error(result.message);
  console.log(result.data);
  return result.data;
};

export const fetchWorkoutTemplates = async () => {
  const response = await fetch(
    "https://werk.dvcklab.com/api/v1/templates/workouts",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch workout templates");
  }
  const result = await response.json();

  if (!result.success || !result.data) throw new Error(result.message);

  return result.data;
};
