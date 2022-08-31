export default (object) => {
  return object.sort((a, b) => a.order - b.order);
};
