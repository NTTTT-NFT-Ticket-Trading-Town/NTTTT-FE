import { Link } from "react-router-dom";

export default function Login() {
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

          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="isolate grid h-full place-content-evenly justify-center pt-10 text-white">
          <div className="relative grid gap-2">
            <h1 className="mx-auto text-6xl font-bold italic">NTTTT</h1>
            <span className="mx-auto text-2xl font-semibold">
              아이돌 토큰을 모아보세요!
            </span>
            <div className="grid gap-4 pt-4">
              <input className="block w-full rounded bg-neutral-300/30 px-2 py-2" />
              <input className="block w-full rounded bg-neutral-300/30 px-2 py-2" />
            </div>
          </div>
          <div>
            <Link
              to="/gotcha"
              className="block rounded bg-neutral-300/30 py-2 text-center transition-all duration-100 hover:bg-neutral-300/40 active:scale-95 active:bg-neutral-300/50"
            >
              토큰 모으러 가기
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}