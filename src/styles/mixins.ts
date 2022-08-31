export const hexagonGridItem = (rows, amount) => {
  let styles = '';
  for (let i = 1; i <= amount; i++) {
    // console.log(i + i - i);
    styles += `
        &:nth-of-type(${amount}n + ${i}) {
            grid-column: ${i + i - 1}/span 3;
            ${
              i % 2 === 0
                ? `grid-row: calc(var(--counter) + var(--counter) - 1)/span 2;`
                : ''
            }

        }

    `;
  }
  for (let i = 1; i <= rows; i++) {
    styles += `
        &:nth-of-type(n + ${i * amount + 1}) {
            --counter: ${i + i};
        }
    `;
  }
  // console.log(styles);
  return styles;
};
