const Button = ({ buttonName }: { buttonName: string }) => {
  return <button className="bg-primary py-2 text-white rounded-md px-4">{buttonName}</button>;
};

export default Button;
