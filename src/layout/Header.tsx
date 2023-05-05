import { useNavigate } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Header() {
  const navigate = useNavigate();

  const handleClickBackBtn = () => {
    navigate(-1);
  };

  return (
    <header className="mx-auto w-full max-w-xl">
      <nav className="flex items-center font-extrabold italic">
        <div className="grid w-full grid-cols-3 py-4 sm:py-6">
          <div className="ml-7 flex items-center">
            <ArrowBackIosIcon onClick={handleClickBackBtn} />
          </div>
          <div className="text-center text-lg text-neutral-400 sm:text-2xl">
            NTTTT
          </div>
        </div>
      </nav>
    </header>
  );
}
