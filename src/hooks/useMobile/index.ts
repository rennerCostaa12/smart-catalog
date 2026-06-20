import { useEffect, useState } from "react";
import type { IUseMobileOptions } from "./types";
import { BREAKPOINTS } from "./constants";

export function useMobile({ breakpoint = BREAKPOINTS.md }: IUseMobileOptions) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    function handleChange() {
      setIsMobile(mediaQuery.matches);
    }

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return isMobile;
}
