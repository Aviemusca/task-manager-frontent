const replaceItem = (itemArray, item, itemIndex) => {
  // Replaces an array element at given index with another
  const newItems = [
    ...itemArray.slice(0, itemIndex),
    item,
    ...itemArray.slice(itemIndex + 1),
  ];
  return newItems;
};

export { replaceItem };
