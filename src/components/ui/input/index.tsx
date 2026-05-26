import { forwardRef } from "react";
import { cn } from "../../../utils/mergeClass";
import { inputPaddingClasses, inputSizeClasses, inputWrapperVariantClasses } from "./constants";
import type { InputProps } from "./types";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    helperText,
    error,
    variant = "default",
    inputSize = "md",
    fullWidth = true,
    leftIcon,
    rightIcon,
    className,
    containerClassName,
    disabled,
    ...props
  }: InputProps,
  ref,
) {
  const inputId = id || props.name;
  const hasError = Boolean(error);

  return (
    <div className={cn("space-y-2", fullWidth && "w-full", containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "relative flex items-center rounded-xl border transition-all duration-200 focus-within:ring-4",
          inputWrapperVariantClasses[variant],
          hasError &&
            "border-red-500 bg-white focus-within:border-red-500 focus-within:ring-red-500/15",
          disabled && "cursor-not-allowed bg-slate-100 opacity-70",
        )}
      >
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 flex items-center text-slate-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={hasError}
          className={cn(
            "w-full rounded-xl bg-transparent text-slate-950 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed",
            inputSizeClasses[inputSize],
            leftIcon
              ? inputPaddingClasses.withLeftIcon
              : inputPaddingClasses.withoutLeftIcon,
            rightIcon
              ? inputPaddingClasses.withRightIcon
              : inputPaddingClasses.withoutRightIcon,
            className,
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 flex items-center text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>

      {(error || helperText) && (
        <p
          className={cn(
            "text-xs leading-5",
            error ? "text-red-500" : "text-slate-500",
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});
