import { useState, useRef } from "react";
import { Col, Row, Form, Button } from "antd";
import axios from "axios";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import CustomForm from "../form/CustomForm";
import {
  useActiveUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { FaCamera } from "react-icons/fa";
import profile from "../../assets/images/profile.png";
import { FaLocationDot } from "react-icons/fa6";

const UploadImage = () => {
  const [updateCurrentUser] = useUpdateUserMutation();
  const { email } = useAppSelector(useCurrentUser);
  const { data: userData, isLoading, isFetching } = useActiveUserQuery(email);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { control, handleSubmit } = useForm();

  const [fileChosen, setFileChosen] = useState(false);
  const profileImage = userData?.data?.image
    ? userData?.data?.image.imageUrl
    : profile;

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  const { _id, name, isSeller, address } = userData.data;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.image) {
      toast.error("Please choose your image");
      return;
    }
    const formData = new FormData();
    formData.append("image", data.image);
    const imgbbResponse = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_UPLOAD_TOKEN
      }`,
      formData
    );
    const imgUrl = imgbbResponse.data.data.url;

    const updatedUser = {
      user: {
        _id: _id,
        updatedUser: {
          image: {
            ...data.image,
            imageUrl: imgUrl,
          },
        },
      },
    };
    updateCurrentUser(updatedUser);
    console.log(updatedUser);
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: any) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      setFileChosen(true);
    } else {
      setFileChosen(false);
    }
  };

  return (
    <div className="text-white flex relative flex-col items-center justify-center">
      <img className="w-28 h-28 rounded-full" src={profileImage} alt="" />
      <h1 className="text-xl font-medium pt-2">{name}</h1>
      <p>{isSeller ? "Seller" : "Buyer"}</p>
      {address?.city && (
        <div className="flex gap-1 items-center">
          <FaLocationDot />
          <p>
            {address.city},{address.province}
          </p>
        </div>
      )}
      <div className="absolute md:right-6 md:top-16 right-16 top-20">
        <Row justify="center">
          <Col span={24}>
            <CustomForm onSubmit={handleSubmit(onSubmit)}>
              <Row gutter={8}>
                <Col span={24} md={{ span: 24 }} lg={{ span: 24 }}>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Item>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={(e) => handleFileChange(e, onChange)}
                        />
                        <div
                          onClick={handleIconClick}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            backgroundColor: "#f0f0f0",
                          }}
                        >
                          <FaCamera size={16} color="#4CAF50" />
                        </div>
                      </Form.Item>
                    )}
                  />
                </Col>
              </Row>
              {fileChosen && (
                <Button
                  className="w-full bg-green-400 text-white font-semibold"
                  htmlType="submit"
                >
                  Upload Image
                </Button>
              )}
            </CustomForm>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UploadImage;
