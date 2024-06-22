import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useWatchListQuery } from "../../../../redux/features/watchList/watchList.api";
import { useAppSelector } from "../../../../redux/hooks";

const MyWatchList = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data } = useWatchListQuery(email);

  return <div>total watchlist {data?.data?.length}</div>;
};

export default MyWatchList;
