import { useState } from "react";
import { usePostDailyGachaMutation } from "../../store/reducers/gacha";
import { GachaInterface } from "../../store/reducers/gacha/gachaTypes";
import { ServerResponseInterface } from "../../store/reducers/indexTypes";
import { useAmount } from "../../utils/currency";
import BuyButton from "../Button/BuyButton";
import ErrorContent from "../Common/ErrorContent";
import LoadingSpinner from "../Common/LoadingSpinner";
import ImageWithDetail from "../Ticket/ImageWithDetail";
import Ticket from "../Ticket/Ticket";
import { motion } from "framer-motion";

export default function TicketFramedGacha() {
  const [getDailyGacha, { data: response, isLoading, error, isError }] =
    usePostDailyGachaMutation();

  console.log(response);

  const [drawGacha, setDrawGacha] = useState(true);

  const gacha = response?.data as unknown as GachaInterface;
  const amount = useAmount(gacha?.price);
  const [currency, setCurrency] = useState<"won" | "eth">("won");

  if (drawGacha) {
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
          <div className="absolute animate-pulse text-9xl blur-lg">🔮</div>
          <div className="absolute text-8xl">🔮</div>
        </div>
        <div className="relative h-min w-full p-4 sm:p-8">
          <button
            onClick={() => {
              setDrawGacha(false);
              getDailyGacha();
            }}
            className="w-full self-end rounded bg-purple-600 py-2 text-center text-xl font-bold text-purple-100 transition-all duration-100 hover:bg-purple-500 active:scale-95 active:bg-purple-700 sm:py-4 sm:text-2xl"
          >
            오늘의 가챠 뽑기
          </button>
          <div className="absolute left-0 top-0 -z-10 h-full w-full animate-pulse bg-purple-300 blur-xl sm:inset-2"></div>
        </div>
      </motion.div>
    );
  }

  if (isError || error) {
    const errorData =
      error as unknown as ServerResponseInterface<GachaInterface>;

    if (errorData.result.code === 400002) {
      console.log(error);
      return <div>{errorData.result.message}</div>;
    }
    if (!gacha) return <ErrorContent />;
  }

  if ((isLoading || !response) && !gacha) {
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
          image={gacha.image}
          description={gacha.desc}
          watchers={gacha.watchers}
        />
        <div className="grid grow grid-cols-[auto_80px] gap-4 sm:gap-8">
          <div className="text-2xl font-bold sm:text-4xl">
            {gacha.event?.name}
          </div>
          <div className="row-span-2 flex flex-col justify-between">
            <div className="grid place-content-center justify-end gap-1">
              <div className="grid aspect-square w-10 place-content-center rounded-full bg-neutral-200 sm:w-12 sm:text-2xl">
                ↻
              </div>
              <span className="text-center text-xs sm:text-base">1/5</span>
            </div>
            <div className="w-fit place-self-end text-lg font-light text-neutral-400">
              <span className="font-medium text-neutral-800">#{gacha.seq}</span>{" "}
              / {gacha.event.quantity}
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
