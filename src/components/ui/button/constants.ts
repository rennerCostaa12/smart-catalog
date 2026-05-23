import type { ButtonSize, ButtonVariant } from "./types";

export const buttonBaseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 outline-none disabled:pointer-events-none disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus-visible:ring-blue-500 active:bg-blue-800",
  secondary:
    "bg-slate-900 text-white shadow-sm hover:bg-slate-800 focus-visible:ring-slate-500 active:bg-slate-950",
  outline:
    "border border-slate-200 bg-white text-slate-900 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-blue-500",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-slate-400",
  whatsapp:
    "bg-green-500 text-white shadow-sm hover:bg-green-600 focus-visible:ring-green-500 active:bg-green-700",
  danger:
    "bg-red-500 text-white shadow-sm hover:bg-red-600 focus-visible:ring-red-500 active:bg-red-700",
  light:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-400",
};

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-11 w-11 p-0",
};