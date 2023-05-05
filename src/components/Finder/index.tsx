import SearchIcon from "@mui/icons-material/Search";
import { useAnimate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FinderPropsInterface } from "./FinderTypes";

export default function Finder(props: FinderPropsInterface) {
  // props
  const { onChange } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [animateRef, animate] = useAnimate();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      if (inputRef.current === null) return;
      inputRef.current.focus();
      animate(animateRef.current, {
        width: "100%",
        justifyContent: "flex-end",
        backgroundColor: "#9E00FF",
      });
    } else {
      // flex aspect-square w-full items-center justify-end rounded-full bg-gray-1 pr-1
      animate(animateRef.current, {
        aspectRatio: "1",
        width: "36px",
        justifyContent: "flex-end",
        backgroundColor: "#D9D9D9",
      });
    }
  }, [clicked]);

  // handlers
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleOnClick = () => {
    setClicked(true);
  };

  const handleOnBlur = () => {
    setClicked(false);
  };

  return (
    <div
      className="flex items-center justify-end rounded-full pr-1"
      ref={animateRef}
    >
      <input
        ref={inputRef}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        className=" z-10 h-full w-full rounded-full bg-transparent pl-2 text-white outline-none"
      />

      <SearchIcon onClick={handleOnClick} />
    </div>
  );
}
