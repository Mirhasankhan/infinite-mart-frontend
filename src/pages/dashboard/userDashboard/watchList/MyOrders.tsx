import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useAddReviewMutation } from "../../../../redux/features/products/prouductManagement.api";
import { usePurchasedProductsQuery } from "../../../../redux/features/purchase/purchase.api";
import { useAppSelector } from "../../../../redux/hooks";
import { TProduct } from "../../../../types/product.type";

const MyOrders = () => {
  const { email, name } = useAppSelector(useCurrentUser);
  const { data } = usePurchasedProductsQuery(email);
  const [addReview] = useAddReviewMutation();
  const handleAddReview = (id: string) => {
    const reviewData = {
      username: name,
      rating: 3,
      review: "this is my review for this product, they are really goood",
    };
    addReview({ id, reviewData });
    console.log(reviewData);
  };
  return (
    <div>
      {data?.data.map((p: TProduct) => (
        <button
          onClick={() => handleAddReview(p.productId)}
          className="bg-green-300 p-2 mx-6"
          key={p._id}
        >
          Add Review For {p.productId}
        </button>
      ))}
    </div>
  );
};

export default MyOrders;
