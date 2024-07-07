import { Col, Input, Row, Form, Button } from "antd";
import axios from "axios";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import CustomForm from "../form/CustomForm";
import {
  useActiveUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

const UploadImage = () => {
  const [updateCurrentUser] = useUpdateUserMutation();
  const { email } = useAppSelector(useCurrentUser);
  const { data: userData, isLoading, isFetching } = useActiveUserQuery(email);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  const { _id } = userData.data;

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
  return (
    <div>
      <Row justify="center">
        <Col span={24}>
          <CustomForm onSubmit={onSubmit}>
            <Row gutter={8}>
              <Col span={24} md={{ span: 24 }} lg={{ span: 24 }}>
                <Controller
                  name="image"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Form.Item>
                      <Input
                        className="bg-gray-100 border-2 border-gray-300"
                        type="file"
                        value={value?.fileName}
                        {...field}
                        onChange={(e) => onChange(e.target.files?.[0])}
                      />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>

            <Button
              className="w-full bg-green-400 text-white font-semibold"
              htmlType="submit"
            >
              Upload Image
            </Button>
          </CustomForm>
        </Col>
      </Row>
    </div>
  );
};

export default UploadImage;
