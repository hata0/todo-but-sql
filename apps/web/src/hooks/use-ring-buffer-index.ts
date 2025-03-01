import { useCallback, useState } from "react";

export const useRingBufferIndex = (length: number, initialIndex = 0) => {
  const [index, setIndex] = useState(initialIndex);

  // 任意のn番目のインデックスを取得
  const getIndex = useCallback(
    (n = 0) => (index + n + length) % length,
    [index, length],
  );

  const setNext = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % length);
  }, [length]);

  const setPrev = useCallback(() => {
    setIndex((prevIndex) => (prevIndex - 1 + length) % length);
  }, [length]);

  const reset = useCallback(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  return [getIndex, { setNext, setPrev, reset, setIndex }] as const;
};
