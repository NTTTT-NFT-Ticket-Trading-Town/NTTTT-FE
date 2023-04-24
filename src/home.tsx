import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <main className="relative mx-auto h-full max-w-xl">
        <div className="absolute isolate w-full max-w-xl overflow-hidden">
          <img
            src="/bg-dark.png"
            alt=""
            width={800}
            height={1131}
            className="h-screen object-cover"
          />
        </div>

        <div className="isolate grid h-full place-content-evenly justify-center pt-10 text-white">
          <div className="relative grid gap-2">
            <h1 className="mx-auto text-6xl font-bold italic">NTTTT</h1>
            <span className="mx-auto text-2xl font-semibold">
              아이돌 토큰을 모아보세요!
            </span>
          </div>
          <div className="w-full">
            <Link
              to="login"
              className="block rounded bg-black/50 py-2 text-center transition-all duration-100 hover:bg-black/60 active:scale-95 active:bg-black/80"
            >
              로그인
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
