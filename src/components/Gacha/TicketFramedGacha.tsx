import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetDailyGachaQuery,
  usePostDailyGachaMutation,
} from "../../store/reducers/gacha";
import { GachaInterface } from "../../store/reducers/gacha/gachaTypes";
import { ServerResponseInterface } from "../../store/reducers/indexTypes";
import { useAmount } from "../../utils/currency";
import BuyButton from "../Button/BuyButton";
import ErrorContent from "../Common/ErrorContent";
import LoadingSpinner from "../Common/LoadingSpinner";
import ImageWithDetail from "../Ticket/ImageWithDetail";
import Ticket from "../Ticket/Ticket";

export default function TicketFramedGacha() {
  const [getDailyGacha, { data: response, isLoading, error: postError }] =
    usePostDailyGachaMutation();
  const { data: chancesData, error: getError } = useGetDailyGachaQuery();
  const chances = useMemo(() => {
    if (response?.data.chance) return response.data.chance;
    return chancesData?.data?.chance ?? 0;
  }, [response?.data.chance, chancesData?.data]);

  const [drawGacha, setDrawGacha] = useState(true);

  const gacha = useMemo(() => {
    if (response?.data.token) return response.data.token;
    return chancesData?.data?.token;
  }, [response, chancesData]);
  const amount = useAmount(gacha?.price);
  const [currency, setCurrency] = useState<"won" | "eth">("won");
  const isSoldOut = gacha?.payment_state === "SOLD_OUT";

  if (drawGacha && gacha) {
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
        className="grid w-full place-items-center "
      >
        <div className="grid h-auto scale-150 place-items-center self-end">
          <div className="relative grid h-40 w-full place-items-center">
            <div className="absolute animate-pulse text-9xl blur-lg">🔮</div>
            <div className="absolute text-8xl">🔮</div>
          </div>
          <div className="text-center text-lg font-bold">
            {chances > 0
              ? `오늘 ${chances}번 더 뽑을 수 있어요!`
              : "오늘 더 이상 뽑을 수 없어요!"}
          </div>
        </div>
        <div className="relative isolate flex h-min w-full flex-col gap-4 p-4 sm:p-8">
          <button
            onClick={() => {
              setDrawGacha(false);
              getDailyGacha();
            }}
            disabled={chances <= 0}
            className="peer w-full self-end rounded border-4 border-purple-600 bg-purple-600 py-2 text-center text-xl font-bold text-purple-100 transition-all duration-100 hover:bg-purple-500 active:scale-95 active:bg-purple-700 disabled:cursor-not-allowed disabled:border-gray-600 disabled:bg-gray-600 disabled:opacity-50 disabled:active:scale-100 sm:py-4 sm:text-2xl"
          >
            오늘의 가챠 뽑기
          </button>
          <div className="absolute -inset-2 -z-10 animate-pulse bg-purple-300 blur-xl peer-disabled:bg-gray-300 sm:-inset-4"></div>
          {!isSoldOut && (
            <>
              <Link
                to="/buy"
                className="w-full self-end rounded border-4 border-purple-600 bg-purple-200 py-2 text-center text-xl font-bold text-purple-900 transition-all duration-100 hover:bg-purple-300 active:scale-95 active:bg-purple-400 sm:py-4 sm:text-2xl"
              >
                마지막으로 뽑았던 가챠 구매하기
              </Link>
              <div className="absolute -inset-2 -z-10 animate-pulse bg-purple-100 blur-xl sm:-inset-4"></div>
            </>
          )}
        </div>
      </motion.div>
    );
  }

  if (postError) {
    const errorData =
      postError as any as ServerResponseInterface<GachaInterface>;
    return <ErrorContent errorMessage={errorData?.result?.message} />;
  }

  if (getError) {
    const errorData = (getError as any)
      .data as ServerResponseInterface<GachaInterface>;
    return (
      <ErrorContent errorMessage={errorData?.result?.message}>
        <button
          onClick={() => {
            getDailyGacha();
          }}
          className="w-full self-end rounded border-4 border-purple-600 bg-purple-200 py-2 text-center text-xl font-bold text-purple-900 transition-all duration-100 hover:bg-purple-300 active:scale-95 active:bg-purple-400 sm:py-4 sm:text-2xl"
        >
          새 토큰 받기
        </button>
        <div className="absolute -inset-2 -z-10 animate-pulse bg-purple-100 blur-xl sm:-inset-4"></div>
      </ErrorContent>
    );
  }

  if (isLoading || !response || !gacha || !chancesData) {
    return (
      <button>
        <LoadingSpinner />
      </button>
    );
  }

  return (
    <Ticket key={gacha.image.url} getNextToken={setDrawGacha}>
      <Ticket.Top>
        <ImageWithDetail
          id={gacha.id}
          image={gacha.image}
          description={gacha.desc}
        />
        <div className="grid grow grid-cols-[auto_80px] gap-4 sm:gap-8">
          <div className="text-2xl font-bold sm:text-4xl">
            {gacha.event?.name}
          </div>
          <div className="row-span-2 flex flex-col justify-between">
            <div className="grid place-items-center justify-end gap-1">
              <div
                onClick={() => {
                  setDrawGacha(true);
                }}
                className="z-10 grid aspect-square w-10 cursor-pointer select-all place-items-center rounded-full border-2 border-gray-700 bg-neutral-300 sm:w-14 sm:text-2xl"
              >
                ↻
              </div>
              <span className="text-center text-xs sm:text-base">
                {chances}/100
              </span>
            </div>
            <div className="w-fit place-self-end text-lg font-light text-neutral-400">
              <span className="font-medium text-neutral-800">#{gacha.seq}</span>{" "}
              / {gacha.event?.quantity}
            </div>
          </div>
          <div>
            <h2 className="font-light sm:text-lg">{gacha.event?.publisher}</h2>
            <h3 className="text-xl font-semibold sm:text-2xl">
              {gacha.artist?.group} {gacha.artist?.name}
            </h3>
          </div>
        </div>
        <div
          className="-m-2 w-fit grow animate-pulse cursor-pointer rounded-lg p-2 text-2xl transition-all hover:bg-gray-200 active:scale-95 active:bg-gray-300 sm:text-4xl"
          onClick={() =>
            setCurrency((prev) => (prev === "won" ? "eth" : "won"))
          }
        >
          {amount[currency]}
        </div>
      </Ticket.Top>
      <Ticket.Split />
      <Ticket.Bottom>
        <BuyButton gacha_id={gacha.id}>구매하기</BuyButton>
      </Ticket.Bottom>
    </Ticket>
  );
}
