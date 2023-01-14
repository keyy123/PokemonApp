function capitalize(string) {
  let otherLetters = string.slice(1),
    firstLetter = string.slice(0, 1).toUpperCase();
  let capString = firstLetter + otherLetters;
  return capString;
}

export default capitalize;
