import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import React from "react";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  defaultValue?: object | null | string;
  readOnly?: boolean;
  placeholder?: string;
  prefix?: React.ReactNode;
  className?: string;
};

const CustomInput = ({
  type,
  name,
  label,
  disabled,
  defaultValue,
  readOnly,
  placeholder,
  prefix,
  className,
}: TInputProps) => {
  const isPassword = type === "password";

  return (
    <div className="mb-4">
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Form.Item
            label={
              label ? (
                <span className="text-sm font-medium text-slate-700">
                  {label}
                </span>
              ) : null
            }
            className="mb-0"
          >
            {isPassword ? (
              <Input.Password
                {...field}
                id={name}
                size="large"
                disabled={disabled}
                prefix={prefix}
                className={`rounded-lg border-slate-200 hover:border-slate-300 focus:border-[#874f6a] bg-slate-50/50 hover:bg-white focus:bg-white text-slate-800 transition-all ${
                  className || ""
                }`}
                required
                readOnly={readOnly}
                placeholder={placeholder}
              />
            ) : (
              <Input
                {...field}
                type={type}
                id={name}
                size="large"
                disabled={disabled}
                prefix={prefix}
                className={`rounded-lg border-slate-200 hover:border-slate-300 focus:border-[#874f6a] bg-slate-50/50 hover:bg-white focus:bg-white text-slate-800 transition-all ${
                  className || ""
                }`}
                required
                readOnly={readOnly}
                placeholder={placeholder}
              />
            )}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomInput;
