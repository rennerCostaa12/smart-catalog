import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "../Container";
import { Header } from "../Header";
import { MenuMobile } from "../Menu";
import { SideMenu } from "../SideMenu";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMobileMenuOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Header onOpenMenu={handleOpenMenu} />

      <MenuMobile
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <Container className="flex flex-1 max-h-[89.3vh]">
        <section className="flex flex-1 flex-col overflow-hidden bg-surface shadow-sm lg:flex-row max-h-screen">
          <SideMenu className="max-lg:hidden" />
          {children}
        </section>
      </Container>
    </main>
  );
}
