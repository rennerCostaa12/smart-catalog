export interface IProductsDetailsProps {
  url_img: string;
  category: string;
  name: string;
  price: number;
  className?: string;
  onAddToCart?: () => void;
  closeProductDetails?: () => void;
}
