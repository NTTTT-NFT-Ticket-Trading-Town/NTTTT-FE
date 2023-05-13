import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FinderPropsInterface } from "./FinderTypes";
import clsx from "clsx";

export default function Finder(props: FinderPropsInterface) {
  // states
  const [active, setActive] = useState<boolean>(false);

  // props
  const { onChange } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  // handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClick = () => {
    setActive(true);
  };

  const handleBlur = () => {
    setActive(false);
  };

  useEffect(() => {
    if (active) inputRef.current?.focus();
  }, [active]);

  return (
    <>
      <motion.div
        onClick={handleClick}
        animate={{ width: active ? "100%" : "36px" }}
        className={clsx(
          [active ? "w-full justify-end" : "w-36 justify-center"],
          "flex h-full items-center rounded-full bg-gray-1"
        )}
      >
        {active && (
          <input
            ref={inputRef}
            onBlur={handleBlur}
            onChange={handleChange}
            className="ml-3 w-full bg-transparent outline-none"
          ></input>
        )}
        <SearchIcon className={active && "mr-2"} />
      </motion.div>
      {/* <motion.input
      animate={{ width: active ? "100%" : "", opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      ref={inputRef}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
      className="h-full rounded-full bg-gray-1 outline-none"
    /> */}
    </>
  );
}
