const defaultElementByVariant: Record<TypographyVariant, React.ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  subtitle: "p",
  body: "p",
  bodySmall: "p",
  caption: "span",
  label: "span",
  muted: "p",
  price: "strong",
  link: "a",
};

const typographyVariantClasses: Record<TypographyVariant, string> = {
  display: "text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl",
  h1: "text-3xl leading-tight tracking-tight md:text-4xl",
  h2: "text-2xl leading-tight tracking-tight md:text-3xl",
  h3: "text-xl leading-snug md:text-2xl",
  h4: "text-lg leading-snug",
  subtitle: "text-lg leading-8",
  body: "text-base leading-7",
  bodySmall: "text-sm leading-6",
  caption: "text-xs leading-5",
  label: "text-sm leading-none",
  muted: "text-sm leading-6",
  price: "text-2xl leading-none tracking-tight md:text-3xl",
  link: "text-sm leading-6 underline-offset-4 hover:underline",
};

const typographyColorClasses: Record<TypographyColor, string> = {
  default: "text-slate-950",
  muted: "text-slate-600",
  soft: "text-slate-400",
  primary: "text-blue-600",
  success: "text-green-600",
  danger: "text-red-500",
  white: "text-white",
};

const typographyWeightClasses: Record<TypographyWeight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const typographyAlignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const defaultWeightByVariant: Record<TypographyVariant, TypographyWeight> = {
  display: "bold",
  h1: "bold",
  h2: "bold",
  h3: "bold",
  h4: "semibold",
  subtitle: "regular",
  body: "regular",
  bodySmall: "regular",
  caption: "regular",
  label: "medium",
  muted: "regular",
  price: "bold",
  link: "semibold",
};

export {
  defaultWeightByVariant,
  typographyAlignClasses,
  typographyWeightClasses,
  typographyColorClasses,
  typographyVariantClasses,
  defaultElementByVariant,
};
