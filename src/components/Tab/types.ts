import type { ITabContentProps } from "./TabContent/types";
import type { ITabListProps } from "./TabList/types";
import type { ITabRootProps } from "./TabRoot/types";
import type { ITabTriggerProps } from "./TabTrigger/types";

export type {
  ITabContentProps,
  ITabListProps,
  ITabRootProps,
  ITabTriggerProps,
};

export interface ITabType {
  Root: (props: ITabRootProps) => React.JSX.Element;
  List: (props: ITabListProps) => React.JSX.Element;
  Trigger: (props: ITabTriggerProps) => React.JSX.Element;
  Content: (props: ITabContentProps) => React.JSX.Element | null;
}
