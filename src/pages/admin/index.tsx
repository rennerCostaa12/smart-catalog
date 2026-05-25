import { Typography } from "../../components/ui/typography";

interface AdminPageProps {
  title: string;
  description?: string;
}

export function AdminPage({ title, description }: AdminPageProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">
      <section className="grid flex-1 gap-6 py-8 w-full">
        <article className="rounded-[2rem] border border-border bg-surface px-8 py-10 shadow-sm">
          <Typography variant="display" align="center">
            {title}
          </Typography>

          {description ? (
            <Typography
              className="mt-4"
              variant="body"
              color="muted"
              align="center"
            >
              {description}
            </Typography>
          ) : null}
        </article>
      </section>
    </main>
  );
}
