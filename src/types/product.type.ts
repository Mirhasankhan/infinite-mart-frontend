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
  reviews: [{ username: string; rating: number; review: string }];
};
