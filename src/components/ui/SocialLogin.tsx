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

      if (
        userData &&
        userData.data.some(
          (user: { email: string }) => user.email === result.user.email
        )
      ) {
        dispatch(
          setUser({
            name: result.user.displayName,
            email: result.user.email,
            role: false,
            token: "token will come",
          })
        );
        navigate("/");
        return;
      } else {
        const newAccount = {
          name: result.user.displayName,
          email: result.user.email,
          password: "123",
          isSeller: false,
        };

        const res = await registerAccount(newAccount);
        if (res.data.success) {
          dispatch(
            setUser({
              name: result.user.displayName,
              email: result.user.email,
              role: false,
              token: "token will come",
            })
          );
          navigate("/");
        } else {
          toast.error("Something went wrong during registration");
        }
      }
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
