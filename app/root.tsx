import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { CSSProperties } from "react";

import type { Route } from "./+types/root";
import "./app.css";
import { colors } from "../src/constants/themeColors";
import { CartProvider } from "../src/context/cart";

const themeCssVariables = Object.fromEntries(
  Object.entries(colors).map(([name, value]) => [`--theme-${name}`, value]),
) as CSSProperties;

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" style={themeCssVariables}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background text-text antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Ops!";
  let details = "Ocorreu um erro inesperado.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "A página solicitada não foi encontrada."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
      <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-danger">
          Erro
        </p>
        <h1 className="mt-4 text-4xl font-bold text-text">{message}</h1>
        <p className="mt-3 text-base text-textMuted">{details}</p>
      </div>
      {stack && (
        <pre className="mt-6 w-full overflow-x-auto rounded-2xl border border-border bg-surfaceSoft p-4 text-sm text-text">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
