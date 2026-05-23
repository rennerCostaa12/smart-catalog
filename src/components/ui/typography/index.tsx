import { cn } from "../../../utils/mergeClass";
import {
  defaultElementByVariant,
  defaultWeightByVariant,
  typographyAlignClasses,
  typographyColorClasses,
  typographyVariantClasses,
  typographyWeightClasses,
} from "./constants";

export function Typography<T extends React.ElementType = "p">({
  as,
  variant = "body",
  color = "default",
  weight,
  align = "left",
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const Component = as || defaultElementByVariant[variant];
  const resolvedWeight = weight || defaultWeightByVariant[variant];

  return (
    <Component
      className={cn(
        typographyVariantClasses[variant],
        typographyColorClasses[color],
        typographyWeightClasses[resolvedWeight],
        typographyAlignClasses[align],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
