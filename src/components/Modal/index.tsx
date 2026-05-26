import { ModalCloseButton } from "./ModalCloseButton";
import { ModalContent } from "./ModalContent";
import { ModalOverlay } from "./ModalOverlay";
import { ModalRoot } from "./ModalRoot";
import type { IModalType } from "./types";

export { ModalCloseButton, ModalContent, ModalOverlay, ModalRoot };

export const Modal: IModalType = {
  Root: ModalRoot,
  Overlay: ModalOverlay,
  Content: ModalContent,
  CloseButton: ModalCloseButton,
};
