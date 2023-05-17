import { useNavigate } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Header() {
  const navigate = useNavigate();

  const handleClickBackBtn = () => {
    navigate(-1);
  };

  return (
    <header className="sticky top-0 isolate z-20 mx-auto w-full max-w-xl bg-transparent backdrop-blur sm:mb-2">
      <nav className="z-10 flex items-center font-extrabold italic">
        <div className="grid w-full grid-cols-3 py-4 sm:py-4">
          <div className="ml-7 flex items-center">
            <ArrowBackIosIcon onClick={handleClickBackBtn} />
          </div>
          <p className="z-10 -rotate-2 border-2 border-dotted border-black bg-purple-300/50 text-center text-lg text-black backdrop-blur sm:text-2xl">
            NTTTT
          </p>
        </div>
      </nav>
    </header>
  );
}
