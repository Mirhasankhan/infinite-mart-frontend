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
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type TSocialLoginProps = {
  text?: string;
  className?: string;
};

const SocialLogin = ({
  text = "Continue with Google",
  className = "",
}: TSocialLoginProps) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const dispatch = useAppDispatch();
  const [registerAccount] = useRegisterMutation();
  const { data: userData } = useActiveUserQuery("");

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    setIsSigningIn(true);
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
        toast.success("Logged in successfully!");
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
          toast.success("Account created successfully!");
          navigate("/");
        } else {
          toast.error("Something went wrong during registration");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Google");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <button
      type="button"
      onClick={signInWithGoogle}
      disabled={isSigningIn}
      className={`w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm transition-all duration-200 shadow-sm hover:border-slate-300 active:scale-[0.99] disabled:opacity-60 cursor-pointer ${className}`}
    >
      {isSigningIn ? (
        <AiOutlineLoading3Quarters className="animate-spin text-slate-600 text-lg" />
      ) : (
        <FcGoogle className="text-xl shrink-0" />
      )}
      <span>{text}</span>
    </button>
  );
};

export default SocialLogin;
