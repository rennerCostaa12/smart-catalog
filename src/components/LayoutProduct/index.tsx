import { useState } from "react";
import { Container } from "../Container";
import { Header } from "../Header";
import { MenuMobile } from "../Menu";
import { SideMenu } from "../SideMenu";

import type { ILayoutProps } from "./types";
import { menuItemsProducts } from "./constants";
import { AuthProvider } from "../../context/auth";

export function LayoutProduct({ children }: ILayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMobileMenuOpen(true);
  };

  return (
    <AuthProvider>
      <main className="flex min-h-screen flex-col bg-background">
        <Header onOpenMenu={handleOpenMenu} />

        <MenuMobile
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          menuItems={menuItemsProducts}
        />

        <Container className="flex flex-1 max-h-[89.3vh]">
          <section className="flex flex-1 flex-col overflow-hidden bg-surface shadow-sm lg:flex-row max-h-screen">
            <SideMenu className="max-lg:hidden" menuItems={menuItemsProducts} />
            {children}
          </section>
        </Container>
      </main>
    </AuthProvider>
  );
}
