export type Debounce = {
  isPending: boolean;
};

export default function debounce<T extends (...args: never[]) => unknown>(
  fn: T,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const debounceObj: Debounce = {
    isPending: false,
  };
  return (...args: Parameters<T>): Debounce => {
    debounceObj.isPending = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      debounceObj.isPending = false;
    }, delay);
    return debounceObj;
  };
}
