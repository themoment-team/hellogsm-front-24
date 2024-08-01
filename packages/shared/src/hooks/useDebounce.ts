//

// 사용 예시

// const [text, setText] = useState('');

// const debouncedSetText = useDebounce((value: string) => {
//   setText(value); // 여기 아래에 formatScore 등 추가로 작성 가능
// }, 500); // 500ms 디바운스 설정

// const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//   debouncedSetText(event.target.value);
// }, [debouncedSetText]);

import { useCallback, useRef } from "react";

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
};

export default useDebounce;
