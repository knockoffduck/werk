export const fetchExercises = async () => {
  const response = await fetch(
    "http://localhost:3000/api/v1/exercises/allExercises",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch workout templates");
  }
  const result = await response.json();

  if (!result.success || !result.data) throw new Error(result.message);

  return result.data;
};
