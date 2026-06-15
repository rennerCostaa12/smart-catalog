export type Callback<T extends unknown[]> = (...args: T) => void;

export type DebouncedFunction<T extends unknown[]> = ((...args: T) => void) & {
  cancel: () => void;
};
