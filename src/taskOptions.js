export const getPriorityColor = (level) => {
  // returns the color of the priority level, yellow -> red from low -> high
  // assumes level starts at 1
  const steps = 9;
  const r = 255;
  const g = Math.floor(255 * (1 - (level - 1) / steps));
  const b = 0;
  const a = 1;
  return [r, g, b, a];
};

export const getDifficultyColor = (level) => {
  // returns the color of the difficulty level, green -> red from low -> high
  // assumes level starts at 1
  const steps = 9;
  const r = 0;
  const g = Math.floor(255 * (1 - (level - 1) / steps));
  const b = Math.floor(255 * ((level - 1) / steps));
  const a = 1;
  return [r, g, b, a];
};

export const getStateColor = (level) => {
  // returns the color of the task state level, blue -> green from no progress -> complete
  // assumes level starts at 0
  const steps = 2;
  const r = 0;
  const g = Math.floor(255 * (level / steps));
  const b = Math.floor(255 * (1 - level / steps));
  const a = 0.5;
  return [r, g, b, a];
};

export const taskStatuses = [
  {
    color: "red",
    iconName: "minus circle",
    popupContent: "Not Started",
  },
  {
    color: "blue",
    iconName: "hourglass half",
    popupContent: "In Progress",
  },
  {
    color: "green",
    iconName: "check circle outline",
    popupContent: "Completed",
  },
];

export const taskDeadlines = [
  { color: "red", popupContent: "Deadline Has Passed!" },
  { color: "orange", popupContent: "Deadline Under 24h Away!" },
  { color: "yellow", popupContent: "Deadline Under 48h Away!" },
];
