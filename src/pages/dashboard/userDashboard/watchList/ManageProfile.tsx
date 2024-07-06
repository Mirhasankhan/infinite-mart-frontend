import { Button, Col, Form, Input, Row } from "antd";
import CustomForm from "../../../../components/form/CustomForm";
import CustomInput from "../../../../components/form/CustomInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useAppSelector } from "../../../../redux/hooks";
import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import {
  useActiveUserQuery,
  useUpdateUserMutation,
} from "../../../../redux/features/auth/authApi";
import CustomSelect from "../../../../components/form/CustomSelect";
import { provinceData, selectProvince } from "../../../../utils/districts";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageProfile = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data: userData, isLoading, isFetching } = useActiveUserQuery(email);
  const [updateCurrentUser] = useUpdateUserMutation();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const handleChangeProvince = (value: string) => {
    setSelectedProvince(value);
  };
  const handleChangeCity = (value: string) => {
    setSelectedCity(value);
  };

  useEffect(() => {
    const selectedProvinceData = provinceData.find(
      (province) => province.province === selectedProvince
    );

    if (selectedProvinceData) {
      setCityOptions(
        selectedProvinceData.districts.map((sub: string) => ({
          value: sub,
          label: sub,
        }))
      );
    } else {
      setCityOptions([]);
    }
  }, [selectedProvince]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.image) {
      toast.error("Please upload your image");
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
          city: selectedCity,
          province: selectedProvince,
          name: data.name,
          email: data.email,
          phone: data.phone,
          street: data.street,
        },
      },
    };
    updateCurrentUser(updatedUser);
    console.log(updatedUser);
  };

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  const { phone, name, _id } = userData.data;

  return (
    <div>
      <div></div>
      <div className="shadow-xl border rounded-lg p-4 mt-6 bg-white">
        <Row justify="center">
          <Col span={24}>
            <CustomForm onSubmit={onSubmit}>
              <Row gutter={8}>
                <Col span={12}>
                  <CustomInput
                    placeholder="Your name"
                    type="text"
                    name="name"
                    label="Your Name"
                    defaultValue={name}
                    readOnly
                  />
                </Col>
                <Col span={12}>
                  <CustomInput
                    placeholder="your email"
                    type="email"
                    name="email"
                    label="Your Email"
                    defaultValue={email ? email : ""}
                    readOnly
                  />
                </Col>
                <Col span={12}>
                  <CustomInput
                    placeholder="contact number"
                    type="number"
                    name="phone"
                    label="Phone"
                    defaultValue={phone ? phone : ""}
                  />
                </Col>

                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <Controller
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                      <Form.Item label="Your Image">
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
                <Col span={12}>
                  <CustomSelect
                    label="Province"
                    name="province"
                    options={selectProvince}
                    onChange={handleChangeProvince}
                  />
                  <CustomSelect
                    label="City/Town"
                    name="city"
                    options={cityOptions}
                    onChange={handleChangeCity}
                  />
                </Col>
                <Col span={12}>
                  <CustomInput
                    placeholder="address in detail"
                    type="text"
                    name="street"
                    label="Street Address"
                  />
                </Col>
              </Row>

              <Button
                className="w-full bg-orange-400 text-white font-semibold"
                htmlType="submit"
              >
                Update Your Profile
              </Button>
            </CustomForm>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ManageProfile;
