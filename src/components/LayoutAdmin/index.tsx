import { Container } from "../Container";
import { HeaderAdmin } from "../HeaderAdmin";
import { SideMenu } from "../SideMenu";
import { menuItemsAdmin } from "./constants";
import type { ILayoutAdminProps } from "./types";

export function LayoutAdmin({ children }: ILayoutAdminProps) {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <HeaderAdmin />

      {/* <MenuMobile
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      /> */}

      <Container className="flex flex-1 max-h-[89.3vh]">
        <section className="flex flex-1 flex-col overflow-hidden bg-surface shadow-sm lg:flex-row max-h-screen">
          <SideMenu className="max-lg:hidden" menuItems={menuItemsAdmin} />
          {children}
        </section>
      </Container>
    </main>
  );
}
