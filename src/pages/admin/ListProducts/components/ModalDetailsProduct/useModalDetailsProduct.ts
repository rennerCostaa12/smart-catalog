import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import type { IProductsAdminProps } from "../../types";
import type { IModalDetailsProductFormData } from "./types";

const modalDetailsProductSchema: yup.ObjectSchema<IModalDetailsProductFormData> =
  yup
    .object({
      title: yup
        .string()
        .trim()
        .required("Informe o nome do produto")
        .min(3, "O nome precisa ter no minimo 3 caracteres"),
      image: yup
        .mixed<FileList>()
        .required("Selecione a imagem do produto")
        .test(
          "file-required",
          "Selecione a imagem do produto",
          (value) => Boolean(value && value.length > 0),
        ),
      stock: yup
        .number()
        .typeError("Informe a quantidade em estoque")
        .required("Informe a quantidade em estoque")
        .integer("A quantidade precisa ser um numero inteiro")
        .min(0, "O estoque nao pode ser negativo"),
      price: yup
        .number()
        .typeError("Informe o preco do produto")
        .required("Informe o preco do produto")
        .min(0.01, "O preco deve ser maior que zero"),
    })
    .required();

interface UseModalDetailsProductParams {
  product: IProductsAdminProps | null;
  onClose: () => void;
  onSubmitProduct: (product: IProductsAdminProps) => void;
}

export function useModalDetailsProduct({
  product,
  onClose,
  onSubmitProduct,
}: UseModalDetailsProductParams) {
  const [previewImage, setPreviewImage] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IModalDetailsProductFormData>({
    resolver: yupResolver(modalDetailsProductSchema),
    defaultValues: {
      title: "",
      image: null,
      stock: 0,
      price: 0,
    },
  });

  const imageFileList = watch("image");

  useEffect(() => {
    if (!product) {
      reset({
        title: "",
        image: null,
        stock: 0,
        price: 0,
      });
      setPreviewImage("");
      return;
    }

    reset({
      title: product.title,
      image: null,
      stock: product.stock,
      price: product.price,
    });
    setPreviewImage(product.image);
  }, [product, reset]);

  useEffect(() => {
    const file = imageFileList?.[0];

    if (!file) {
      if (product) {
        setPreviewImage(product.image);
      }
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageFileList, product]);

  const handleSubmitProduct = handleSubmit((values) => {
    if (!product) {
      return;
    }

    const imageFile = values.image?.[0];

    if (!imageFile) {
      return;
    }

    onSubmitProduct({
      ...product,
      title: values.title.trim(),
      image: previewImage,
      stock: Number(values.stock),
      price: Number(values.price),
    });

    onClose();
  });

  return {
    control,
    errors,
    isSubmitting,
    previewImage,
    handleSubmitProduct,
  };
}
