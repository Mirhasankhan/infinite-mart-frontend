import React from "react";
import { HiArrowSmRight } from "react-icons/hi";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName: string;
  icon?: boolean;
  className?: string;
}

const Button = ({ buttonName, icon = true, className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`group inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-[#724158] active:scale-[0.98] text-white font-medium text-sm py-2 px-4 md:px-5 rounded-lg shadow-sm hover:shadow transition-all duration-200 ${className}`}
      {...props}
    >
      <span>{buttonName}</span>
      {icon && (
        <HiArrowSmRight className="text-base transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </button>
  );
};

export default Button;

