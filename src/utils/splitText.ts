export default (fullText: string) => {
  const text = fullText.split('\n');
  const half = Math.ceil(text.length / 2);
  const firstColumn = text.splice(0, half);
  const secondColumn = text.splice(-half);
  return [firstColumn, secondColumn];
};
