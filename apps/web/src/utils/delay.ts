export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const infiniteDelay = () => new Promise(() => {});

export const waitUntil = (
  condition: () => boolean,
  timeout = 5000,
  interval = 100,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkCondition = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error("Timeout waiting for condition"));
      } else {
        setTimeout(checkCondition, interval);
      }
    };

    checkCondition();
  });
};
