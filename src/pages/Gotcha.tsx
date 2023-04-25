export default function Gotcha() {
  return (
    <>
      <header className="mx-auto max-w-xl">
        <nav className="flex items-center font-extrabold italic">
          <div className="grow py-2 sm:py-4">
            <div className="text-center text-lg text-neutral-400 sm:text-2xl">
              NTTTT
            </div>
          </div>
        </nav>
      </header>
      <main className="relative mx-auto mb-4 max-w-xl px-4">
        <div className="isolate flex max-w-xl flex-col gap-3 overflow-scroll rounded bg-white p-4 drop-shadow-xl sm:gap-8 sm:p-8">
          <img
            src="/porterrobinson.jpeg"
            alt=""
            width={800}
            height={800}
            className="aspect-square rounded object-cover"
          />
          <div className="grid grow grid-cols-[auto_80px] gap-2 sm:gap-8">
            <div className="text-2xl font-bold sm:text-4xl">
              Nurture Live Seoul 2022
            </div>
            <div className="row-span-2 grid place-content-between justify-end">
              <div className="grid place-content-center justify-end gap-1">
                <div className="grid aspect-square w-10 place-content-center rounded-full bg-neutral-200 sm:w-12 sm:text-2xl">
                  ↻
                </div>
                <span className="text-center text-xs sm:text-base">3/5</span>
              </div>
              <div className="w-fit place-self-end text-lg font-light text-neutral-400">
                <span className="font-medium text-neutral-800">#45</span> / 100
              </div>
            </div>
            <div>
              <h2 className="font-light sm:text-lg">Live Nation</h2>
              <h3 className="text-xl font-semibold sm:text-2xl">
                Porter Robinson
              </h3>
            </div>
          </div>
          <div className="grow text-2xl sm:text-4xl">₩10,000</div>
          <div className="flex grow flex-col justify-end gap-4 sm:gap-8 md:justify-start">
            <div className=" border-2 border-dashed"></div>
            <button className="w-full self-end rounded bg-purple-600 py-2 text-xl font-bold text-purple-100 transition-all duration-100 hover:bg-purple-500 active:scale-95 active:bg-purple-700 sm:py-4 sm:text-2xl">
              구매하기
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
