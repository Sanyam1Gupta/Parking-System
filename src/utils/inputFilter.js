const allowAlphabetsSpace = val => {
  return val.replace(/[^A-Za-z ]/g, '');
};

const allowNumeric = val => {
  return val.replace(/\D/g, '');
};

export { allowAlphabetsSpace, allowNumeric };
