const isEmptyObject = function (obj) {
  console.log(obj);
  if (obj) {
    console.log('not empty');
    if (Object.keys(obj).length !== 0) {
      return false;
    }
  }
  console.log('empty object');
  return true;
};

export default isEmptyObject;
