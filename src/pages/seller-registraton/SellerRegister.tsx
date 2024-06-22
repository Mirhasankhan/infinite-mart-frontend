import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CustomForm from "../../components/form/CustomForm";
import CustomInput from "../../components/form/CustomInput";

import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";

const SellerRegister = () => {
  const [registerAccount] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newAccount = {
      ...data,
      isSeller: true,
    };
    const res = await registerAccount(newAccount);
    if (res.data.success) {
      toast.success("account created successfully");
      navigate("/login");
    } else {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="mb-8">
      <h1 className="text-xl md:text-3xl font-semibold text-center py-4">
        Become <span className="text-orange-400">Seller</span>
      </h1>
      <div className="shadow-xl border rounded-lg p-4 w-3/4 md:w-1/3 mx-auto mt-6">
        <Row justify="center">
          <Col span={24}>
            <CustomForm onSubmit={onSubmit}>
              <Row gutter={8}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 24 }}>
                  <CustomInput
                    placeholder="Company Name"
                    type="text"
                    name="name"
                    label="Company Name"
                  />
                </Col>
              </Row>
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

              <Button
                className="w-full bg-orange-400 text-white  font-semibold"
                htmlType="submit"
              >
                Create Account
              </Button>
              <h1 className="pt-3">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600">
                  Login
                </Link>
              </h1>
            </CustomForm>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SellerRegister;
