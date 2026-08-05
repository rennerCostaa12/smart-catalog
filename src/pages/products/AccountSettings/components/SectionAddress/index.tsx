import { MapPin, Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "../../../../../components/ui/button";
import { Typography } from "../../../../../components/ui/typography";
import { AddressModal } from "./components/AddressModal";
import { useSectionAddress } from "./useSectionAddress";
import { LIMIT_ADDRESS } from "./constants";

export function SectionAddress() {
  const {
    addresses,
    editingAddress,
    isAddressModalOpen,
    isEditingAddress,
    isLoadingAddresses,
    isSavingAddress,
    deletingAddressId,
    lengthAddress,
    handleOpenAddAddressModal,
    handleOpenEditAddressModal,
    handleCloseAddressModal,
    handleSaveAddress,
    handleDeleteAddress,
  } = useSectionAddress();

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <Typography variant="h2">Endereços</Typography>
            <Typography variant="body" color="muted">
              Gerencie os endereços cadastrados para entrega.
            </Typography>
            <Typography variant="bodySmall" color="muted">
              Limite: {lengthAddress}/{LIMIT_ADDRESS}
            </Typography>
          </div>

          {lengthAddress < LIMIT_ADDRESS && (
            <Button
              type="button"
              className="cursor-pointer max-sm:w-full"
              leftIcon={<Plus size={18} />}
              onClick={handleOpenAddAddressModal}
              disabled={isLoadingAddresses || isSavingAddress}
              size="md"
            >
              Adicionar endereço
            </Button>
          )}
        </div>

        {isLoadingAddresses ? (
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <Typography variant="body" color="muted">
              Carregando endereços...
            </Typography>
          </div>
        ) : addresses.length > 0 ? (
          <div className="flex flex-col gap-3">
            {addresses.map((address) => (
              <article
                key={address.id}
                className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <MapPin size={20} />
                  </div>

                  <div className="min-w-0">
                    <Typography variant="h4">{address.label}</Typography>
                    <Typography variant="body" color="muted">
                      {address.street}, {address.number}
                      {address.complement ? ` - ${address.complement}` : ""}
                    </Typography>
                    <Typography variant="bodySmall" color="muted">
                      {address.neighborhood}, {address.city} - {address.state} |
                      CEP {address.zipCode}
                    </Typography>
                  </div>
                </div>

                <div className="flex gap-2 max-sm:w-full">
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    className="cursor-pointer max-sm:flex-1"
                    leftIcon={<Pencil size={16} />}
                    onClick={() => handleOpenEditAddressModal(address)}
                    disabled={isSavingAddress || Boolean(deletingAddressId)}
                  >
                    Editar
                  </Button>

                  <Button
                    type="button"
                    variant="danger"
                    size="md"
                    className="cursor-pointer max-sm:flex-1"
                    leftIcon={<Trash2 size={16} />}
                    isLoading={deletingAddressId === address.id}
                    disabled={isSavingAddress || Boolean(deletingAddressId)}
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6">
            <Typography variant="body" color="muted">
              Nenhum endereço cadastrado.
            </Typography>
          </div>
        )}
      </section>

      <AddressModal
        open={isAddressModalOpen}
        initialValues={editingAddress}
        isEditing={isEditingAddress}
        onClose={handleCloseAddressModal}
        onSave={handleSaveAddress}
        isSaving={isSavingAddress}
      />
    </>
  );
}
