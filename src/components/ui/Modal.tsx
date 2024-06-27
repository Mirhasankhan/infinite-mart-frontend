import { TProduct } from "../../types/product.type";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { toast } from "sonner";
import { Button } from "antd";
import { useAddReviewMutation } from "../../redux/features/products/prouductManagement.api";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const Modal = ({ selectedProduct }: { selectedProduct: TProduct | null }) => {
  const { name } = useAppSelector(useCurrentUser);
  const [ratings, setRatings] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const [addReview] = useAddReviewMutation();
  const handleRating = (rating: number) => {
    setRatings(rating);
  };
  const closeModal = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    modal?.close();
  };
  const handleAddReview = (id: string) => {
    const reviewData = {
      username: name,
      rating: ratings,
      review: review,
    };

    if (review && ratings) {
      toast.success("review provided successfully");
      return addReview({ id, reviewData });
    } else {
      toast.error("select rating");
    }
  };
  return (
    <dialog id="my_modal_3" className="modal text-black">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
        </form>
        {selectedProduct && (
          <>
            <div className="flex items-center gap-3 border py-3 pl-2 rounded-md">
              <img
                className="w-12 h-12 rounded-md border-2"
                src={selectedProduct.image.imageUrl}
                alt=""
              />
              <div>
                <h3 className=" text-xl">{selectedProduct.productName}</h3>
                <p>{selectedProduct.seller}</p>
              </div>
            </div>
            <div className="py-6">
              <h1 className="pb-2">Select Product Rating:-</h1>
              <div className="flex justify-center text-orange-300 gap-6 text-xl">
                <button onClick={() => handleRating(1)}>
                  {(ratings as number) > 0 ? (
                    <FaStar></FaStar>
                  ) : (
                    <CiStar></CiStar>
                  )}
                </button>
                <button onClick={() => handleRating(2)}>
                  {(ratings as number) > 1 ? (
                    <FaStar></FaStar>
                  ) : (
                    <CiStar></CiStar>
                  )}
                </button>
                <button onClick={() => handleRating(3)}>
                  {(ratings as number) > 2 ? (
                    <FaStar></FaStar>
                  ) : (
                    <CiStar></CiStar>
                  )}
                </button>
                <button onClick={() => handleRating(4)}>
                  {(ratings as number) > 3 ? (
                    <FaStar></FaStar>
                  ) : (
                    <CiStar></CiStar>
                  )}
                </button>
                <button onClick={() => handleRating(5)}>
                  {(ratings as number) > 4 ? (
                    <FaStar></FaStar>
                  ) : (
                    <CiStar></CiStar>
                  )}
                </button>
              </div>
            </div>
            <div className="flex">
              <h1 className="pr-3">Review Message: </h1>
              <textarea
                onChange={(e) => setReview(e.target.value)}
                className="border p-2 rounded-md flex-grow"
                placeholder="how was the product?"
              ></textarea>
            </div>
            <Button
              className="w-full mt-6 bg-green-400"
              onClick={() => {
                handleAddReview(selectedProduct.productId);
                closeModal();
              }}
            >
              Submit
            </Button>
          </>
        )}
      </div>
    </dialog>
  );
};

export default Modal;
