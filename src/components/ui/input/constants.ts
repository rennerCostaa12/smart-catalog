import type { InputSize, InputVariant } from "./types";

export const inputWrapperVariantClasses: Record<InputVariant, string> = {
  default:
    "border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-blue-500/15",
  filled:
    "border-transparent bg-slate-100 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-blue-500/15",
  search:
    "border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-blue-500/15",
};

export const inputSizeClasses: Record<InputSize, string> = {
  sm: "h-9 text-sm",
  md: "h-11 text-sm",
  lg: "h-12 text-base",
};

export const inputPaddingClasses = {
  withLeftIcon: "pl-10",
  withoutLeftIcon: "pl-4",
  withRightIcon: "pr-10",
  withoutRightIcon: "pr-4",
};