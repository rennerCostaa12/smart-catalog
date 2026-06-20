import { Typography } from "../../../../../components/ui/typography";
import pathEmpty from "../../../../../assets/images/box-empty.png";

export function EmptyProducts() {
  return (
    <div className="flex items-center justify-between">
      <div className="w-full">
        <div className="flex justify-center">
          <img src={pathEmpty} className="w-[250px]" />
        </div>
        <Typography variant="h3" align="center">
          Nenhum produto encontrado
        </Typography>
        <Typography variant="bodySmall" align="center" color="muted">
          Ainda não temos produtos cadastrados nessa categoria no momento. Tente
          buscar por outro termo ou veja os produtos disponíveis.
        </Typography>
      </div>
    </div>
  );
}
