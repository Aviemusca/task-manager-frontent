const capitalize = (str) => {
  if (str.length === 0) return "";
  let wordArray = str.split(" ");
  let word = wordArray.pop();
  word = word[0].toUpperCase() + word.substr(1);
  return `${capitalize(wordArray.join(" "))} ${word}`;
};

export { capitalize };
