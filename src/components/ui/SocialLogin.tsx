import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.config";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import {
  useActiveUserQuery,
  useRegisterMutation,
} from "../../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const dispatch = useAppDispatch();
  const [registerAccount] = useRegisterMutation();
  const { data: userData } = useActiveUserQuery("");

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    // const result = await signInWithPopup(auth, googleProvider);
    // console.log(result?.user?.displayName);
    // dispatch(
    //   setUser({
    //     name: result?.user?.displayName,
    //     email: result?.user?.email,
    //     role: "user",
    //     token: "token will come",
    //   })
    // );
    // navigate("/");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/");

      if (
        userData &&
        userData?.data.some(
          (user: { email: string }) => user.email === result.user.email
        )
      ) {
        navigate("/");
        return;
      } else {
        const newAccount = {
          name: result.user.displayName,
          email: result.user.email,
          password: "123",
          isSeller: false,
        };
        console.log(newAccount);

        const res = await registerAccount(newAccount);
        if (res.data.success) {
          toast.success("account created successfully");
          navigate("/login");
        } else {
          toast.error("something went wrong");
        }
      }

      dispatch(
        setUser({
          name: result.user.displayName,
          email: result.user.email,
          role: false,
          token: "token will come",
        })
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default SocialLogin;
