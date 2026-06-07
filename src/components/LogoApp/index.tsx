import pathLogo from "../../assets/images/logo-smart-catalog.png";
import type { ILogoAppProps } from "./types";

export function LogoApp({ className }: ILogoAppProps) {
  return (
    <img
      src={pathLogo}
      className={`!max-lg:w-[70%] min-w-[150px] ${className ?? ""}`}
    />
  );
}
