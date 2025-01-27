const Button = ({ buttonName }: { buttonName: string }) => {
  return (
    <button className="relative px-6 py-2 overflow-hidden text-white bg-black mt-2  rounded-lg group">
      <span className="relative z-10">{buttonName}</span>
      <span className="absolute inset-0 bg-[#3975c3] transform scale-x-0 origin-left transition-transform duration-1000 group-hover:scale-x-100"></span>
    </button>
  );
};

export default Button;
