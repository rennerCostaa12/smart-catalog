import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { SideMenu } from "../../components/SideMenu";
import { ListProducts } from "./components/ListProducts";

export function ProductsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Header />

      <Container className="flex flex-1 py-4 sm:py-6">
        <section className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm lg:flex-row">
          <SideMenu />
          <ListProducts />
        </section>
      </Container>
    </main>
  );
}
