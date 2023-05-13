import { ChipPropsInterface } from "./ChipTypes";

export default function Chip(props: ChipPropsInterface) {
  // props
  const { handleClick, label, active } = props;

  // styles
  // DEVELOP: tailwind snippet을 볼 수 없을까?
  const basicStyle = [
    "min-w-[25px]",
    "inline-block",
    "text-center",
    "place-content-center",
    "rounded-full",
    "px-4",
    "py-1",
    "mx-1",
    "flex-shrink-0",
    "flex",
    "justify-center",
    "items-center",
  ].join(" ");

  return (
    <div
      onClick={handleClick}
      className={`${
        active ? "bg-primary text-white" : "bg-gray-1"
      } ${basicStyle} `}
    >
      {label}
    </div>
  );
}
