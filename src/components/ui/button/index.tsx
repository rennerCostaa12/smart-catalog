import { cn } from "../../../utils/mergeClass";
import {
  buttonBaseClasses,
  buttonSizeClasses,
  buttonVariantClasses,
} from "./constants";
import type { ButtonProps } from "./types";

export function Button({
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonBaseClasses,
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        leftIcon
      )}

      {size !== "icon" && children}

      {!isLoading && rightIcon}
    </button>
  );
}
