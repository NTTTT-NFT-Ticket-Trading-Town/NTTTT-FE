import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleClickBackBtn = () => {
    navigate(-1);
  };

  const [isMypage, setIsMypage] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath === "/mypage") {
      setTimeout(() => {
        setIsMypage(true);
      }, 4000);
      setTimeout(() => {
        setIsMypage(false);
      }, 8000);
    } else {
      setIsMypage(false);
    }
  }, [currentPath]);

  return (
    <header className="sticky top-0 isolate z-20 mx-auto w-full max-w-xl bg-transparent backdrop-blur sm:mb-2">
      <nav className="relative z-10 flex items-center">
        <div className="flex w-full justify-between px-6 py-4 sm:py-4">
          <div
            className="flex cursor-pointer items-center text-gray-500"
            onClick={handleClickBackBtn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="aspect-square h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </div>
          <Link to="/draw">
            <div className="absolute left-0 right-0 top-4 z-10 mx-auto grid w-40 place-items-center py-1 text-xl font-extrabold italic text-gray-500 sm:text-2xl">
              <p>NTTTT</p>
            </div>

            {isMypage && <Ping />}
          </Link>
          <Link to="/mypage">
            <div className="relative grid place-items-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="aspect-square h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}

const Ping = () => {
  return (
    <div className=" translate-x-14">
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-primary/50"></span>
      </span>
    </div>
  );
};
