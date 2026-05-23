import { Link } from "react-router";
import { Typography } from "../ui/typography";

import { HelpCard } from "../HelpCard";
import { menuItems } from "./constants";

import { type ISideMenuProps } from "./types";

export function SideMenu({ className }: ISideMenuProps) {
  return (
    <aside className={`w-full border-b border-border bg-surface shadow-sm lg:max-w-xs lg:border-r lg:border-b-0 ${className}`}>
      <div className="flex h-full flex-col justify-between gap-6 p-4 sm:p-5">
        <nav aria-label="Menu lateral">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {menuItems.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-text transition hover:border-primary-light hover:bg-primary-light hover:text-primary-dark"
                  to={href}
                >
                  <span className="shrink-0">
                    <Icon size={25} />
                  </span>
                  <Typography className="font-medium">{label}</Typography>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <HelpCard />

          <div className="mt-4 border-t border-border py-4">
            <Typography>© Smart Catalog</Typography>

            <Typography variant="bodySmall" color="muted">
              Todos os direitos reservados.
            </Typography>
          </div>
        </div>
      </div>
    </aside>
  );
}
