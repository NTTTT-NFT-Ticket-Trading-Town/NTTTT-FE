import { ChipPropsInterface } from "./ChipTypes";

export default function Chip(props: ChipPropsInterface) {
  // props
  const { label, enabled = false } = props;

  // styles
  // DEVELOP: tailwind snippet을 볼 수 없을까?
  const basicStyle = [
    "min-w-[50px]",
    "inline-block",
    "text-center",
    "place-content-center",
    "rounded-full",
    "px-4",
    "py-1",
    "mx-1",
  ].join(" ");

  return (
    <div
      className={`${
        enabled ? "bg-primary text-white" : "bg-gray-1"
      } ${basicStyle} `}
    >
      {label}
    </div>
  );
}
