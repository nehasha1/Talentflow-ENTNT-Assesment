export const delay = () =>
  new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 150));

export const maybeFail = () => {
  if (Math.random() < 0.02) {
    throw new Error('Simulated server error');
  }
};
  