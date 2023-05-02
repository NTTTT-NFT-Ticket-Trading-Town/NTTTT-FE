import {
  SetIndexType,
  SetShowDetailType,
  ShowDetailType,
} from "../../pages/Gotcha";
import { GatchaInterface } from "../../store/reducers/gotcha/gotchaTypes";
import BuyButton from "../Button/BuyButton";
import ImageWithDetail from "../Ticket/ImageWithDetail";
import Ticket from "../Ticket/Ticket";

export default function TicketFramedGotcha(
  gotcha: GatchaInterface,
  setIndex: SetIndexType,
  showDetail: ShowDetailType,
  setShowDetail: SetShowDetailType
) {
  return (
    <Ticket key={gotcha.image.url} setIndex={setIndex}>
      <Ticket.Top>
        {ImageWithDetail(gotcha, showDetail, setShowDetail)}
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
