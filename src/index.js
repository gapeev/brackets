module.exports = function check(str, bracketsConfig) {
  const stack = [];
  return str.split('').every((bracket) => {
    if (isBracketSame(bracket, bracketsConfig)) {
      stack[stack.length - 1] === bracket ? stack.pop() : stack.push(bracket);
      return true;
    }
    if (isBracketOpening(bracket, bracketsConfig)) {
      stack.push(bracket);
      return true;
    }
    if (stack[stack.length - 1] === getPairedBracket(bracket, bracketsConfig)) {
      stack.pop();
      return true;
    }
    return false;
  }) && stack.length === 0;
}

const isBracketOpening = (bracket, bracketsConfig) => bracketsConfig
  .some(([opening]) => opening === bracket);

const isBracketSame = (bracket, bracketsConfig) => bracketsConfig
  .some(([opening, closing]) => opening === bracket && closing === bracket);

const getPairedBracket = (closingBracket, bracketsConfig) => {
  const [opening] = bracketsConfig.find(([, closing]) => closing === closingBracket);
  return opening;
}
