import { useEffect, useRef, useState } from "react";

export const useOverflowsScreenBottom = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const { bottom } = ref.current.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      setOverflows(bottom > viewportHeight);
    }
  }, []);

  return { ref, overflows };
};
