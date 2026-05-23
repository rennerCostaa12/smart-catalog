type TypographyVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "subtitle"
  | "body"
  | "bodySmall"
  | "caption"
  | "label"
  | "muted"
  | "price"
  | "link";

type TypographyColor =
  | "default"
  | "muted"
  | "soft"
  | "primary"
  | "success"
  | "danger"
  | "white";

type TypographyWeight = "regular" | "medium" | "semibold" | "bold";

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  variant?: TypographyVariant;
  color?: TypographyColor;
  weight?: TypographyWeight;
  align?: "left" | "center" | "right";
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "color">;