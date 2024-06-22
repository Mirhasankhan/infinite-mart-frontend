import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useProductsQuery } from "../../../../redux/features/products/prouductManagement.api";
import { useAppSelector } from "../../../../redux/hooks";

const MyProducts = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data } = useProductsQuery(email);
  console.log(data);
  return <div>my products</div>;
};

export default MyProducts;
