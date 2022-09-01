export default (object: any) => {
  return object.sort((a: any, b: any) => a.order - b.order);
};
