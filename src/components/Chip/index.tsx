import { ChipPropsInterface } from "./ChipTypes";

export default function Chip(props: ChipPropsInterface) {
  // props
  const { label, enabled = false } = props;

  // styles
  const basicStyle = [
    "rounded-full",
    "px-4",
    "py-1",
    "text-sm",
    "font-semibold",
  ].join(" ");

  // hooks
  // TODO: make it using useTheme hook & apply the color to the tailwind.config as shown in the Figma
  const theme = {
    color: {
      primary: "bg-primary-500",
      secondary: "bg-secondary-500",
      neutral: "bg-neutral-500",
    },
  };

  return (
    <div
      className={`${
        enabled ? theme.color.primary : theme.color.neutral
      } ${basicStyle} `}
    >
      {label}
    </div>
  );
}
