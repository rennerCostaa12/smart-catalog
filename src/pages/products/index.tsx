import { Link } from "react-router";

export function ProductsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary-dark">
              Catalogo
            </p>
            <h1 className="mt-2 text-3xl font-bold text-text">Produtos</h1>
          </div>
          <Link
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-textMuted hover:border-primary hover:text-primary"
            to="/"
          >
            Voltar
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["surface", "surface-soft", "primary-light"].map((tone) => (
            <div
              className="rounded-2xl border border-border bg-surfaceSoft p-5"
              key={tone}
            >
              <p className="text-sm text-textMuted">Token</p>
              <p className="mt-2 text-lg font-semibold text-text">{tone}</p>
              <div className="mt-4 h-20 rounded-xl border border-border bg-surface" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
