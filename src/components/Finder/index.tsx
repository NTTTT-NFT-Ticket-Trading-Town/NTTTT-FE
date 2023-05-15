import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import { dispatch, useSelector } from "../../store";
import { setSearch, toggleSearchActive } from "../../store/reducers/artist";

export default function Finder() {
  // states
  const search = useSelector((state) => state.artist.search);
  const searchActive = useSelector((state) => state.artist.searchActive);

  const inputRef = useRef<HTMLInputElement>(null);

  // handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const toggleFinderStatus = () => {
    dispatch(toggleSearchActive());
  };

  useEffect(() => {
    if (searchActive) inputRef.current?.focus();
  }, [searchActive]);

  return (
    <>
      <motion.div
        onClick={toggleFinderStatus}
        animate={{ width: searchActive ? "100%" : "36px" }}
        className={clsx(
          [searchActive ? "w-full justify-end" : "w-36 justify-center"],
          " flex h-full flex-shrink-0 items-center rounded-full bg-gray-1"
        )}
      >
        {searchActive && (
          <input
            value={search}
            ref={inputRef}
            onBlur={toggleFinderStatus}
            onChange={handleChange}
            className="ml-3 w-full bg-transparent outline-none"
          />
        )}
        <div className={searchActive ? "mr-2" : ""}>
          <SearchIcon />
        </div>
      </motion.div>
    </>
  );
}
