import type { ChangeEventHandler, Ref } from "react";

export interface IInputFileProps {
  accept: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  name?: string;
  ref?: Ref<HTMLInputElement> | undefined;
  error?: string;
  buttonText?: string;
  emptyText?: string;
  className?: string;
}
