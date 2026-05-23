import { Typography } from "../ui/typography";

import { HelpCard } from "../HelpCard";
import { menuItems } from "./constants";

export function SideMenu() {
  return (
    <aside className="w-full max-w-xs border-r border-border bg-surface p-5 shadow-sm flex-1 mx-auto flex-col justify-between">
      <div className="flex flex-col justify-between h-full">
        <nav aria-label="Menu lateral">
          <ul className="space-y-2">
            {menuItems.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-text transition hover:border-primary-light hover:bg-primary-light hover:text-primary-dark"
                  href={href}
                >
                  <span>
                    <Icon size={25} />
                  </span>
                  <Typography className="font-medium">{label}</Typography>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <HelpCard />

          <div className="border-t border-border mt-4 py-4">
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
