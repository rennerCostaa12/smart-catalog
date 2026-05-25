import { TabContent } from "./TabContent";
import { TabList } from "./TabList";
import { TabRoot } from "./TabRoot";
import { TabTrigger } from "./TabTrigger";
import type { ITabType } from "./types";

export { TabContent, TabList, TabRoot, TabTrigger };

export const Tab: ITabType = {
  Root: TabRoot,
  List: TabList,
  Trigger: TabTrigger,
  Content: TabContent,
};
