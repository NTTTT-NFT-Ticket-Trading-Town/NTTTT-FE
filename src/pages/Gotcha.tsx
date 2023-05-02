import { AnimatePresence, useMotionValue } from "framer-motion";
import BuyButton from "../components/Button/BuyButton";
import Ticket from "../components/Ticket/Ticket";
import Header from "../layout/Header";
import { useGetGotchaQuery } from "../store/reducers/gotcha";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GatchaInterface } from "../store/reducers/gotcha/gotchaTypes";

export default function Gotcha() {
  const { data, error, isLoading } = useGetGotchaQuery("gotcha.json");
  const [index, setIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const showReload = useMemo(() => {
    if (isLoading || !data) return false;
    if (index == data.gatcha_list.length) {
      return true;
    }
    return false;
  }, [index]);

  if (isLoading || !data) return <div>로딩중...</div>;

  const gotcha = data.gatcha_list[index];

  return (
    <>
      <Header />
      <main className="relative mx-auto mb-4 w-full max-w-xl px-4">
        <AnimatePresence mode={"wait"}>
          {!showReload
            ? TicketFramedGotcha(gotcha, setIndex, showDetail, setShowDetail)
            : ReloadGotcha(setIndex)}
        </AnimatePresence>
      </main>
    </>
  );
}

type SetIndexType = React.Dispatch<React.SetStateAction<number>>;
type ShowDetailType = boolean;
type SetShowDetailType = React.Dispatch<React.SetStateAction<boolean>>;

function TicketFramedGotcha(
  gotcha: GatchaInterface,
  setIndex: SetIndexType,
  showDetail: ShowDetailType,
  setShowDetail: SetShowDetailType
) {
  return (
    <Ticket key={gotcha.image.url} setIndex={setIndex}>
      <Ticket.Top>
        {ImageWithDetails(gotcha, showDetail, setShowDetail)}
        <div className="grid grow grid-cols-[auto_80px] gap-4 sm:gap-8">
          <div className="text-2xl font-bold sm:text-4xl">
            {gotcha.event.title}
          </div>
          <div className="row-span-2 grid place-content-between justify-end">
            <div className="grid place-content-center justify-end gap-1">
              <div className="grid aspect-square w-10 place-content-center rounded-full bg-neutral-200 sm:w-12 sm:text-2xl">
                ↻
              </div>
              <span className="text-center text-xs sm:text-base">1/5</span>
            </div>
            <div className="w-fit place-self-end text-lg font-light text-neutral-400">
              <span className="font-medium text-neutral-800">
                #{gotcha.token_id}
              </span>{" "}
              / 100
            </div>
          </div>
          <div>
            <h2 className="font-light sm:text-lg">{gotcha.event.publisher}</h2>
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
  );
}

function ImageWithDetails(
  gotcha: GatchaInterface,
  showDetail: ShowDetailType,
  setShowDetail: SetShowDetailType
) {
  const animationDuration = 0.5;
  const easingFunction = "easeInOut";

  return (
    <motion.div
      className="relative cursor-pointer "
      style={{
        perspective: "800px",
      }}
      onTap={() => {
        setShowDetail((prev) => !prev);
      }}
    >
      <motion.div
        className="relative"
        style={{
          aspectRatio: gotcha.image.ratio,
          width: "100%",
        }}
        initial={false}
        transition={{
          duration: animationDuration,
          ease: easingFunction,
        }}
        animate={{
          rotateY: showDetail ? 180 : 0,
        }}
      >
        <img
          draggable={false}
          src={gotcha.image.url}
          alt=""
          className="absolute inset-0 -z-10 scale-105 animate-pulse rounded bg-gray-300 object-cover opacity-80 blur-xl"
        />
        <img
          draggable={false}
          src={gotcha.image.url}
          alt=""
          className="rounded bg-gray-300 object-cover"
          style={{
            aspectRatio: gotcha.image.ratio,
          }}
        />
      </motion.div>
      <motion.div
        initial={false}
        transition={{
          duration: animationDuration,
          ease: easingFunction,
        }}
        animate={{
          rotateY: showDetail ? 0 : -180,
          opacity: showDetail ? 1 : 0,
        }}
        className="absolute top-0 h-full w-full rounded-md bg-black/60 p-8 text-xl text-white"
      >
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa porro
          quam ratione recusandae eius possimus inventore provident distinctio
          quae consectetur aspernatur vero pariatur nesciunt magni tempora
          dolore numquam, praesentium ex.
        </p>
      </motion.div>
    </motion.div>
  );
}

function ReloadGotcha(setIndex: SetIndexType) {
  return (
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
      exit={{
        opacity: 0,
        scale: 0.8,
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
        <span className="text-center text-lg sm:text-2xl">다시보기</span>
      </button>
    </motion.div>
  );
}
