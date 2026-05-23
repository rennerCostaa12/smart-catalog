import { Link } from "react-router";

export function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">
      <header className="flex items-center justify-between rounded-3xl border border-border bg-surface px-6 py-4 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Smart Catalog
          </p>
          <h1 className="mt-1 text-2xl font-bold text-text">Home</h1>
        </div>
        <nav className="flex gap-3 text-sm font-medium">
          <Link
            className="rounded-full border border-border px-4 py-2 text-textMuted hover:border-primary hover:text-primary"
            to="/products"
          >
            Produtos
          </Link>
          <Link
            className="rounded-full bg-primary px-4 py-2 text-white hover:bg-primary-dark"
            to="/admin"
          >
            Admin
          </Link>
        </nav>
      </header>

      <section className="grid flex-1 gap-6 py-8 md:grid-cols-[1.5fr_1fr]">
        <article className="rounded-[2rem] border border-border bg-surface px-8 py-10 shadow-sm">
          <span className="inline-flex rounded-full bg-primary-light px-3 py-1 text-sm font-semibold text-primary-dark">
            Paleta aplicada
          </span>
          <h2 className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-text">
            A aplicação agora usa a mesma fonte de cores no runtime e no
            Tailwind.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-textMuted">
            Os tokens `primary`, `secondary`, `background`, `surface`, `border`
            e estados semânticos já estão disponíveis nas classes utilitárias.
          </p>
        </article>

        <aside className="space-y-4 rounded-[2rem] border border-border bg-surface-soft p-6">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm font-medium text-textMuted">Primária</p>
            <div className="mt-3 h-16 rounded-xl bg-primary" />
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm font-medium text-textMuted">Secundária</p>
            <div className="mt-3 h-16 rounded-xl bg-secondary" />
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm font-medium text-textMuted">Feedback</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="h-12 rounded-xl bg-success" />
              <div className="h-12 rounded-xl bg-warning" />
              <div className="h-12 rounded-xl bg-danger" />
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
