import { Button } from "../../../components/ui/button";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";
import { Typography } from "../../../components/ui/typography";

import { EmptyOrders } from "./components/EmptyOrders";
import { ModalDetailsOrder } from "./components/ModalDetailsOrder";
import { OrderCard } from "./components/OrderCard";
import { useMyOrders } from "./useMyOrders";

export function MyOrdersPage() {
  const {
    orders,
    error,
    hasOrders,
    isPending,
    refetch,
    handleCloseModal,
    orderSelected,
    setOrderSelected,
  } = useMyOrders();

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-2">
        <Typography variant="h1">Meus pedidos</Typography>
        <Typography variant="body" color="muted">
          Acompanhe o histórico e o status dos seus pedidos.
        </Typography>
      </div>

      {isPending && (
        <LoadingSpinner
          size={40}
          className="mt-8 flex w-full items-center justify-center"
        />
      )}

      {error && (
        <div className="mt-8 flex items-center gap-3">
          <Typography color="danger">
            Não foi possível carregar os pedidos.
          </Typography>
          <Button variant="outline" onClick={() => refetch()}>
            Tentar novamente
          </Button>
        </div>
      )}

      {!isPending && !error && !hasOrders && <EmptyOrders />}

      {!isPending && !error && hasOrders && (
        <div className="mt-8 flex flex-col gap-4">
          {orders.map((order, index) => (
            <OrderCard
              key={index}
              order={order}
              onDetails={setOrderSelected}
            />
          ))}
        </div>
      )}

      <ModalDetailsOrder
        open={Boolean(orderSelected)}
        order={orderSelected}
        onClose={handleCloseModal}
      />
    </div>
  );
}
