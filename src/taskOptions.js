const getPriorityColor = (level) => {
  // returns the color of the priority level, yellow -> red from low -> high
  // assumes level starts at 1
  const steps = 9;
  const r = 255;
  const g = Math.floor(255 * (1 - (level - 1) / steps));
  const b = 0;
  const a = 0.7;
  return [r, g, b, a];
};

const getDifficultyColor = (level) => {
  // returns the color of the difficulty level, green -> red from low -> high
  // assumes level starts at 1
  const steps = 9;
  const r = Math.floor(255 * ((level - 1) / steps));
  const g = Math.floor(255 * (1 - (level - 1) / steps));
  const b = 0;
  const a = 0.7;
  return [r, g, b, a];
};

const getStateColor = (level) => {
  // returns the color of the task state level, blue -> green from no progress -> complete
  // assumes level starts at 0
  const steps = 2;
  const r = 0;
  const g = Math.floor(255 * (level / steps));
  const b = Math.floor(255 * (1 - level / steps));
  const a = 0.5;
  return [r, g, b, a];
};

const taskStates = {
  levels: ["Not Started", "In Progress", "Completed"],
  colors: ["#0000ff", "#0d98ba", "#00ff00"],
};

export { taskStates, getPriorityColor, getDifficultyColor, getStateColor };
