import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { SideMenu } from "../../components/SideMenu";

export function ProductsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Header />

      <Container className="flex flex-1 flex-row">
        <section className="flex flex-1 flex-row">
          <SideMenu />
          <div className="flex-1 bg-surface p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-text">ProductsPage</h1>
          </div>
        </section>
      </Container>
    </main>
  );
}
