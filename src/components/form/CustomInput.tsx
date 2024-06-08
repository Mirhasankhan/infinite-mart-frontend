import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  defaultValue?: object | null | string;
  readOnly?: boolean;
  placeholder?: string;
};

const CustomInput = ({
  type,
  name,
  label,
  disabled,
  defaultValue,
  readOnly,
  placeholder,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
              className="bg-gray-100 border-2 border-green-200"
              required
              readOnly={readOnly}
              placeholder={placeholder}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomInput;
