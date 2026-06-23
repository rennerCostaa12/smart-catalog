import { useMobile } from "../../../../../hooks/useMobile";

import { OrderCardDesktop } from "./Desktop";
import { OrderCardMobile } from "./Mobile";
import type { IOrderCardProps } from "./types";

import { BREAKPOINTS } from "../../../../../hooks/useMobile/constants";

export function OrderCard(props: IOrderCardProps) {
  const isMobile = useMobile({
    breakpoint: BREAKPOINTS.lg,
  });

  return isMobile ? (
    <OrderCardMobile {...props} />
  ) : (
    <OrderCardDesktop {...props} />
  );
}
