export type TProduct = {
  _id: string;
  category: string;
  flashSale: boolean;
  price: string;
  image: {
    imageUrl: string;
  };
  productName: string;
  subCategory: string;
  content: string;
  productId: string;
  email: string;
  cartQuantity: number;
  quantity: number;
  totalCost: number;
  seller: string;
  sold: number;
  reviews: [{ username: string; rating: number; review: string }];
};
