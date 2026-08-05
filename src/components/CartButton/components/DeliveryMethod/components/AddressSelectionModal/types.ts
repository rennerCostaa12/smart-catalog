import type { UserAddressProps } from "../../../../../../services/user_address";

export interface IAddressSelectionModalProps {
  open: boolean;
  addresses: UserAddressProps[];
  selectedAddressId?: number | null;
  onClose: () => void;
  onSelect: (address: UserAddressProps) => void;
}
