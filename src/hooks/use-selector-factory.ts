import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export type FunctionType = (...args: any[]) => any;

export const useSelectorFactory = <T extends FunctionType>(
  selectorFactory: T,
  ...args: Parameters<T>
): ReturnType<ReturnType<T>> => {
  return useSelector(
    useMemo(() => selectorFactory(...args), [...args, selectorFactory])
  );
};
