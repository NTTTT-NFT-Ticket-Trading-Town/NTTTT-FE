import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetDailyGachaQuery,
  usePostDailyGachaMutation,
} from "../store/reducers/gacha";
import { useMemo } from "react";
import Header from "../layout/Header";

export default function Draw() {
  return (
    <>
      <Header />
      <main className="relative mx-auto mb-4 mt-4 flex w-full max-w-xl grow justify-center px-4">
        <AnimatePresence mode={"wait"}>
          <DrawComponent />
        </AnimatePresence>
      </main>
    </>
  );
}

function DrawComponent() {
  const [postDailyGacha, { data: response }] = usePostDailyGachaMutation();
  const { data: chancesData } = useGetDailyGachaQuery();
  const chances = useMemo(() => {
    if (response?.data.chance) return response.data.chance;
    return chancesData?.data?.chance ?? 0;
  }, [response?.data.chance, chancesData?.data]);

  const navigate = useNavigate();

  const gacha = useMemo(() => {
    if (response?.data.token) return response.data.token;
    return chancesData?.data?.token;
  }, [response, chancesData]);
  const isSoldOut = gacha?.payment_state === "SOLD_OUT";
  const noChance = chances <= 0;

  return (
    <motion.div
      initial={{
        scale: 0.8,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3, type: "spring" },
      }}
      exit={{
        scale: 0.8,
        opacity: 0,
      }}
      className="grid w-full place-items-center"
    >
      <div className="relative grid h-auto place-items-center self-end">
        <div className="relative grid aspect-square w-72 place-items-center sm:w-80">
          {noChance ? (
            <>
              <img
                src="/see-1.png"
                className="absolute z-50 aspect-square w-full scale-110 animate-pulse blur-lg"
              />
              <img
                src="/see-1.png"
                className="absolute z-50 aspect-square w-full"
              />
            </>
          ) : (
            <>
              <img
                src="/see-2.png"
                className="absolute z-50 aspect-square w-full scale-110 animate-pulse blur-lg"
              />
              <img
                src="/see-2.png"
                className="absolute z-50 aspect-square w-full"
              />
            </>
          )}
        </div>
        <div className="pt-6 text-center text-2xl font-bold sm:pt-8 sm:text-3xl">
          {!noChance
            ? `오늘 ${chances}번 더 뽑을 수 있어요!`
            : "오늘 더 이상 뽑을 수 없어요!"}
        </div>
      </div>
      <div className="relative isolate flex h-min w-full flex-col gap-4 p-4 sm:p-8">
        <button
          onClick={async () => {
            try {
              await postDailyGacha().unwrap();
              navigate("/gacha");
            } catch (e: any) {
              alert(e.result.message + " " + "다른 아티스트를 선택해주세요!");
              navigate("/artists");
            }
          }}
          disabled={noChance}
          className="peer w-full self-end rounded border-4 border-purple-600 bg-purple-600 py-2 text-center text-xl font-bold text-purple-100 transition-all duration-100 hover:bg-purple-500 active:scale-95 active:bg-purple-700 disabled:cursor-not-allowed disabled:border-gray-600 disabled:bg-gray-600 disabled:opacity-50 disabled:active:scale-100 sm:py-4 sm:text-2xl"
        >
          오늘의 가챠 뽑기
        </button>
        <div className="absolute -inset-2 -z-10 animate-pulse bg-purple-300 blur-xl peer-disabled:bg-gray-300 sm:-inset-4"></div>
        {!isSoldOut && (
          <>
            <Link
              to="/gacha"
              className="w-full self-end rounded border-4 border-purple-600 bg-purple-200 py-2 text-center text-xl font-bold text-purple-900 transition-all duration-100 hover:bg-purple-300 active:scale-95 active:bg-purple-400 sm:py-4 sm:text-2xl"
            >
              마지막으로 뽑았던 가챠 보기
            </Link>
            <div className="absolute -inset-2 -z-10 animate-pulse bg-purple-100 blur-xl sm:-inset-4"></div>
          </>
        )}
      </div>
    </motion.div>
  );
}
