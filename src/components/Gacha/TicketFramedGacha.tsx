import { useState } from "react";
import { SetIndexType } from "../../pages/Gacha";
import { GachaInterface } from "../../store/reducers/gacha/gachaTypes";
import { useAmount } from "../../utils/currency";
import BuyButton from "../Button/BuyButton";
import ImageWithDetail from "../Ticket/ImageWithDetail";
import Ticket from "../Ticket/Ticket";

export default function TicketFramedGacha({
  gacha,
  setIndex,
}: {
  gacha: GachaInterface;
  setIndex: SetIndexType;
}) {
  const amount = useAmount(gacha);
  const [currency, setCurrency] = useState<"won" | "eth">("won");
  return (
    <Ticket key={gacha.image.url} setIndex={setIndex}>
      <Ticket.Top>
        <ImageWithDetail gacha={gacha} />
        <div className="grid grow grid-cols-[auto_80px] gap-4 sm:gap-8">
          <div className="text-2xl font-bold sm:text-4xl">
            {gacha.event.name}
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
              / 100
            </div>
          </div>
          <div>
            <h2 className="font-light sm:text-lg">{gacha.event.publisher}</h2>
            <h3 className="text-xl font-semibold sm:text-2xl">
              {gacha.artist.group} {gacha.artist.name}
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
