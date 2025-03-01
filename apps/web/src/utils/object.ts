/** あるオブジェクトから特定のプロパティを取り除く */
export const omit = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  const result = { ...obj };
  keys.map((key) => delete result[key]);
  return result;
};
