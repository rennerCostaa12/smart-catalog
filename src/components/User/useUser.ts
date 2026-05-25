import { useEffect, useRef, useState } from "react";
import type { IUseUserProps } from "./types";

export function useUser({ onLogout, onSettings }: IUseUserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleSettings() {
    setIsOpen(false);
    onSettings?.();
  }

  function handleLogout() {
    setIsOpen(false);
    onLogout?.();
  }

  return {
    isOpen,
    setIsOpen,
    containerRef,
    handleSettings,
    handleLogout,
  };
}
