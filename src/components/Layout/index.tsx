import type { ReactNode } from "react";
import { Container } from "../Container";
import { Header } from "../Header";
import { SideMenu } from "../SideMenu";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Header />

      <Container className="flex flex-1 max-h-[89.3vh]">
        <section className="flex flex-1 flex-col overflow-hidden bg-surface shadow-sm lg:flex-row max-h-screen">
          <SideMenu />
          {children}
        </section>
      </Container>
    </main>
  );
}
