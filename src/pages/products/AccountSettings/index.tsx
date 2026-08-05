import { Typography } from "../../../components/ui/typography";
import { SectionAccount } from "./components/SectionAccount";
import { SectionAddress } from "./components/SectionAddress";

export function AccountSettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="flex max-w-3xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Typography variant="h1">Configurações da conta</Typography>
          <Typography variant="body" color="muted">
            Visualize os dados cadastrados na sua conta.
          </Typography>
        </div>

        <SectionAccount />
        <SectionAddress />
      </div>
    </div>
  );
}
