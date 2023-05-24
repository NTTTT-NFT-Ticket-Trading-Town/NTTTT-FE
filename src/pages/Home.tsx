import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Artist } from "./Login";

export default function Home() {
  return (
    <>
      <div className="absolute isolate flex w-full max-w-xl flex-col overflow-hidden">
        <img
          src="/bg-dark.png"
          alt=""
          width={800}
          height={1131}
          className="h-screen object-cover"
        />
      </div>

      <div className="relative isolate mx-auto h-full w-full max-w-md grow p-8 pt-10 text-white">
        <div className="absolute left-0 right-0 top-1/4 gap-2">
          <h1 className="mx-auto text-center text-6xl font-bold italic">
            NTTTT
          </h1>
          <div className="mt-4 grid w-full grid-cols-2 gap-2 border-b-4 text-3xl sm:text-4xl">
            <div className="py-2 text-end font-thin">내 손 안에</div>
            <div className="overflow-visible px-2 py-2 text-start font-bold">
              <AnimatePresence>
                <Artist />
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="absolute bottom-1/4 left-0 right-0 w-full">
          <Link
            to="/login"
            className="block w-full rounded bg-black/50 py-2 text-center transition-all duration-100 hover:bg-black/60 active:scale-95 active:bg-black/80"
          >
            시작하기
          </Link>
        </div>
      </div>
    </>
  );
}
