export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const infiniteDelay = () => new Promise(() => {});
