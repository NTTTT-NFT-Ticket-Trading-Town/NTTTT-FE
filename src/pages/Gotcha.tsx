import { AnimatePresence } from "framer-motion";
import BuyButton from "../components/Button/BuyButton";
import Ticket from "../components/Ticket/Ticket";
import Header from "../layout/Header";
import { useGetGotchaQuery } from "../store/reducers/gotcha";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function Gotcha() {
  const { data, error, isLoading } = useGetGotchaQuery("gotcha.json");
  const [index, setIndex] = useState(0);

  const showReload = useMemo(() => {
    if (isLoading || !data) return false;
    if (index == data.gatcha_list.length) {
      return true;
    }
    return false;
  }, [index]);
  if (isLoading || !data) return <div>로딩중...</div>;

  return (
    <>
      <Header />
      <main className="relative mx-auto mb-4 w-full max-w-xl px-4">
        <AnimatePresence mode={"wait"}>
          {showReload && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.3, type: "spring" },
              }}
              className="inset-0 flex h-[calc(100vh_-_10rem)] place-content-center place-items-center py-5 text-4xl"
            >
              <button
                className="flex place-content-center place-items-center gap-4 rounded-full bg-white p-6 shadow-lg"
                onClick={() => setIndex(0)}
              >
                <div className="grid aspect-square w-10 place-content-center rounded-full bg-neutral-200 sm:w-12 sm:text-2xl">
                  ↻
                </div>
                <span className="text-center text-lg sm:text-2xl">
                  다시보기
                </span>
              </button>
            </motion.div>
          )}
          {data.gatcha_list
            .filter((gotcha, idx) => index == idx)
            .map((gotcha) => (
              <Ticket key={gotcha.image_url} setIndex={setIndex}>
                <Ticket.Top>
                  <div className="relative">
                    <img
                      draggable={false}
                      src={gotcha.image_url}
                      alt=""
                      className="absolute inset-0 -z-10 scale-105 animate-pulse rounded bg-gray-300 object-cover opacity-80 blur-xl"
                    />
                    <img
                      draggable={false}
                      src={gotcha.image_url}
                      alt=""
                      className="rounded bg-gray-300 object-cover"
                    />
                  </div>
                  <div className="grid grow grid-cols-[auto_80px] gap-4 sm:gap-8">
                    <div className="text-2xl font-bold sm:text-4xl">
                      {gotcha.event.title}
                    </div>
                    <div className="row-span-2 grid place-content-between justify-end">
                      <div className="grid place-content-center justify-end gap-1">
                        <div className="grid aspect-square w-10 place-content-center rounded-full bg-neutral-200 sm:w-12 sm:text-2xl">
                          ↻
                        </div>
                        <span className="text-center text-xs sm:text-base">
                          1/5
                        </span>
                      </div>
                      <div className="w-fit place-self-end text-lg font-light text-neutral-400">
                        <span className="font-medium text-neutral-800">
                          #{gotcha.token_id}
                        </span>{" "}
                        / 100
                      </div>
                    </div>
                    <div>
                      <h2 className="font-light sm:text-lg">
                        {gotcha.event.publisher}
                      </h2>
                      <h3 className="text-xl font-semibold sm:text-2xl">
                        {gotcha.artist}
                      </h3>
                    </div>
                  </div>
                  <div className="grow text-2xl sm:text-4xl">
                    {gotcha.price.type} {gotcha.price.amount}
                  </div>
                </Ticket.Top>
                <Ticket.Split />
                <Ticket.Bottom>
                  <BuyButton>구매하기</BuyButton>
                </Ticket.Bottom>
              </Ticket>
            ))}
        </AnimatePresence>
      </main>
    </>
  );
}
