import { useState, useEffect } from "react";

export function useModalAnimation(isOpen: boolean, duration: number = 300) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isOpen) {
      setShouldRender(true);
      setIsAnimatingOut(false);
    } else if (shouldRender) {
      setIsAnimatingOut(true);
      timer = setTimeout(() => {
        setShouldRender(false);
        setIsAnimatingOut(false);
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, duration, shouldRender]);

  return { shouldRender, isAnimatingOut };
}
