import { HTMLAttributes } from "react";
import { useNavigate } from "react-router";

interface ButtonPropsInterface extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  to = "",
  onClick,
  ...props
}: ButtonPropsInterface) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(to);
  };

  return (
    <div {...props}>
      <div className="align-center flex flex-col items-center justify-center p-1">
        <button
          onClick={handleOnClick}
          className="h-full self-end rounded bg-purple-600 px-14 py-1 text-xl font-bold text-purple-100 transition-all duration-100 hover:bg-purple-500 active:scale-95 active:bg-purple-700"
        >
          {children}
        </button>
      </div>
    </div>
  );
}
