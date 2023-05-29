import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDailyGachaQuery } from "../../store/reducers/gacha";
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
  const {
    data: chancesData,
    isLoading: isGetLoading,
    error: getError,
  } = useGetDailyGachaQuery();
  const chances = useMemo(
    () => chancesData?.data?.chance ?? 0,
    [chancesData?.data]
  );
  const navigate = useNavigate();

  const [show, setShow] = useState(true);

  const getNextToken = () => {
    setShow(false);
    navigate("/draw");
    setTimeout(() => {
      setShow(true);
    }, 500);
  };

  const gacha = useMemo(() => chancesData?.data?.token, [chancesData]);
  const amount = useAmount(gacha?.price);
  const [currency, setCurrency] = useState<"won" | "eth">("won");

  useEffect(() => {
    setShow(true);
  }, []);

  if (isGetLoading && !gacha) {
    return (
      <button>
        <LoadingSpinner />
      </button>
    );
  }

  if (getError || !chancesData || !gacha) {
    const errorData = (getError as any)
      .data as ServerResponseInterface<GachaInterface>;
    return (
      <ErrorContent errorMessage={errorData?.result?.message}>
        <button
          onClick={() => {
            navigate("/draw");
          }}
          className="w-full self-end rounded border-4 border-purple-600 bg-purple-200 py-2 text-center text-xl font-bold text-purple-900 transition-all duration-100 hover:bg-purple-300 active:scale-95 active:bg-purple-400 sm:py-4 sm:text-2xl"
        >
          가챠 뽑기로 돌아가기
        </button>
        <div className="absolute -inset-2 -z-10 animate-pulse bg-purple-100 blur-xl sm:-inset-4"></div>
      </ErrorContent>
    );
  }

  if (!show) return <motion.div key="empty"></motion.div>;

  return (
    <Ticket key={gacha.image.url} getNextToken={getNextToken}>
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
                onClick={getNextToken}
                className="z-10 grid aspect-square w-12 cursor-pointer select-all place-items-center rounded-full border-2 border-gray-700 bg-neutral-300 text-xl sm:w-12 sm:text-2xl"
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
