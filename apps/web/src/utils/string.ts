/**
 * 文字列を数値に変換し、無効な値の場合はエラーをスローする。
 * @param {string} value - 数値に変換する文字列。
 * @returns {number} 変換された数値。
 * @throws 空文字列または無効な数値が入力された場合にエラーをスロー。
 */
export const toNumberOrError = (value: string): number => {
  if (value.trim() === "") {
    throw new Error("Value cannot be an empty string");
  }

  const num = Number(value);
  if (Number.isNaN(num)) {
    throw new Error(`Invalid number: "${value}"`);
  }
  return num;
};
