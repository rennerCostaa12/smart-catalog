import type { IModalCloseButtonProps } from "./ModalCloseButton/types";
import type { IModalContentProps } from "./ModalContent/types";
import type { IModalOverlayProps } from "./ModalOverlay/types";
import type { IModalRootProps } from "./ModalRoot/types";

export type {
  IModalCloseButtonProps,
  IModalContentProps,
  IModalOverlayProps,
  IModalRootProps,
};

export interface IModalType {
  Root: (props: IModalRootProps) => React.JSX.Element | null;
  Overlay: (props: IModalOverlayProps) => React.JSX.Element;
  Content: (props: IModalContentProps) => React.JSX.Element;
  CloseButton: (props: IModalCloseButtonProps) => React.JSX.Element;
}
