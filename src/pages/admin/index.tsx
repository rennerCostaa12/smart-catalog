import { Link } from "react-router";

export function AdminPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-10">
      <section className="rounded-[2rem] border border-border bg-surface p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-danger">
              Painel
            </p>
            <h1 className="mt-2 text-3xl font-bold text-text">Admin</h1>
          </div>
          <Link
            className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary-dark"
            to="/"
          >
            Ir para Home
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-primary-light p-5">
            <p className="text-sm text-primary-dark">Primária</p>
            <p className="mt-2 text-2xl font-bold text-primary-dark">#2563EB</p>
          </div>
          <div className="rounded-2xl border border-border bg-secondary-light p-5">
            <p className="text-sm text-secondary-dark">Secundária</p>
            <p className="mt-2 text-2xl font-bold text-secondary-dark">
              #22C55E
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface-soft p-5">
            <p className="text-sm text-textMuted">Neutros</p>
            <p className="mt-2 text-2xl font-bold text-text">Surface / Border</p>
          </div>
        </div>
      </section>
    </main>
  );
}
