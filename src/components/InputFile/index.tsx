import { forwardRef, useId, useState } from "react";
import { cn } from "../../utils/mergeClass";
import type { IInputFileProps } from "./types";

export const InputFile = forwardRef<HTMLInputElement, IInputFileProps>(
  function InputFile(
    {
      accept,
      onChange,
      label,
      error,
      name,
      buttonText = "Escolher arquivo",
      emptyText = "Nenhum arquivo selecionado",
      className,
    },
    ref,
  ) {
    const inputId = useId();
    const [selectedFileName, setSelectedFileName] = useState("");

    return (
      <div className="w-full space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>

        <label
          htmlFor={inputId}
          className={cn(
            "flex min-h-14 w-full cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed bg-white px-4 py-3 transition-all duration-200 hover:border-blue-300 hover:bg-slate-50",
            error ? "border-red-500" : "border-slate-300",
            className,
          )}
        >
          <span className="inline-flex shrink-0 items-center justify-center rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
            {buttonText}
          </span>

          <span className="min-w-0 truncate text-sm text-slate-500">
            {selectedFileName || emptyText}
          </span>
        </label>

        <input
          id={inputId}
          ref={ref}
          type="file"
          accept={accept}
          name={name}
          className="sr-only"
          aria-invalid={Boolean(error)}
          onChange={(event) => {
            setSelectedFileName(event.target.files?.[0]?.name ?? "");
            onChange(event);
          }}
        />

        {error && <p className="text-xs leading-5 text-red-500">{error}</p>}
      </div>
    );
  },
);
