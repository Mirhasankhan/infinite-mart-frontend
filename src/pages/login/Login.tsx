import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CustomForm from "../../components/form/CustomForm";
import CustomInput from "../../components/form/CustomInput";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [loginAccount] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await loginAccount(data).unwrap();

    dispatch(
      setUser({
        email: res.data.email,
        role: res.data.role,
        token: "token will come",
      })
    );
    navigate("/");
  };

  return (
    <div className="mb-8">
      <h1 className="text-xl md:text-3xl font-semibold text-center py-4 my-6">
        Log Into <span className="text-orange-400">YourAccount</span>
      </h1>
      <div className=" w-2/4 mx-auto ">
        <div className="rounded-lg shadow-lg p-6 h-80 w-full border">
          <Row justify="center">
            <Col span={24}>
              <CustomForm onSubmit={onSubmit}>
                <Row gutter={8}>
                  <Col span={24}>
                    <CustomInput
                      placeholder="email"
                      type="email"
                      name="email"
                      label="Email"
                    />
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={24}>
                    <CustomInput
                      placeholder="password"
                      type="password"
                      name="password"
                      label="Password"
                    />
                  </Col>
                </Row>
                <Link to="">
                  <h1 className="pb-2 text-red-600">Forgot Password?</h1>
                </Link>

                <Button
                  className="w-full bg-orange-400 font-semibold text-white"
                  htmlType="submit"
                >
                  Login
                </Button>
                <h1 className="pt-3">
                  Don't have an account?
                  <Link to="/register" className="text-blue-600">
                    Create New Account
                  </Link>
                </h1>
              </CustomForm>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Login;
