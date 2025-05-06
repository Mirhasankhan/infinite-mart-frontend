import { Button, Col, Form, Input, Row } from "antd";
import CustomForm from "../../../../components/form/CustomForm";
import CustomInput from "../../../../components/form/CustomInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import CustomSelect from "../../../../components/form/CustomSelect";
import { categories, categoriesSelect } from "../../../../utils/categories";
import axios from "axios";
import { useAppSelector } from "../../../../redux/hooks";
import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useCreateProdctMutation } from "../../../../redux/features/products/prouductManagement.api";
import { toast } from "sonner";

const AddProduct = () => {
  const { name, email } = useAppSelector(useCurrentUser);
  const [uploadProduct] = useCreateProdctMutation();
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCategoryOptions, setSubCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.image) {
      toast.error("Please upload product image");
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
    const newProduct = {
      product: {
        image: {
          ...data.image,
          imageUrl: imgUrl,
        },
        productName: data.productName,
        email: email,
        quantity: +data.quantity,
        price: +data.price,
        category: selectedCategory,
        seller: name,
        subCategory: selectedSubCategory,
        content: content,
        flashSale: false,
        reviews: [],
      },
    };
    uploadProduct(newProduct);
  };

  const handleChangeCategory = (value: string) => {
    setSelectedCategory(value);
  };
  const handleChangeSubCategory = (value: string) => {
    setSelectedSubCategory(value);
  };

  useEffect(() => {
    const selectedCategoryData = categories.find(
      (category) => category.name === selectedCategory
    );

    if (selectedCategoryData) {
      setSubCategoryOptions(
        selectedCategoryData.subCategories.map((sub: string) => ({
          value: sub,
          label: sub,
        }))
      );
    } else {
      setSubCategoryOptions([]);
    }
  }, [selectedCategory]);

  const handleChange = (value: string) => {
    setContent(value);
  };

  return (
    <div>
      <h1 className="text-xl font-medium">Add New Product</h1>
      <div className="shadow-xl bg-white border rounded-lg p-4 mt-6">
        <Row justify="center">
          <Col span={24}>
            <CustomForm onSubmit={onSubmit}>
              <Row gutter={8}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <CustomInput
                    placeholder="product name"
                    type="text"
                    name="productName"
                    label="Product Name"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <CustomInput
                    placeholder="quantity"
                    type="number"
                    name="quantity"
                    label="Quantity"
                  />
                </Col>

                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <CustomInput
                    placeholder="price"
                    type="number"
                    name="price"
                    label="Price"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <Controller
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                      <Form.Item label="Product Image">
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
              <Row gutter={8}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <label className="font-semibold" htmlFor="">
                    Write Product Description
                  </label>
                  <ReactQuill
                    className="my-3"
                    value={content}
                    onChange={handleChange}
                  />
                </Col>

                <Col
                  className="border-2 rounded-md mb-2 p-3"
                  span={24}
                  md={{ span: 12 }}
                  lg={{ span: 12 }}
                >
                  <CustomSelect
                    label="Category"
                    name="category"
                    options={categoriesSelect}
                    onChange={handleChangeCategory}
                  />
                  <CustomSelect
                    label="Sub Category"
                    name="subCategory"
                    options={subCategoryOptions}
                    onChange={handleChangeSubCategory}
                  />
                </Col>
              </Row>
              <Button
                className="w-full bg-primary text-white font-semibold"
                htmlType="submit"
              >
                Upload Product
              </Button>
            </CustomForm>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddProduct;
