import { useLocation } from "react-router";
import Header from "../layout/Header";
import { useGetDailyGachaQuery } from "../store/reducers/gacha";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import ImageWithSkeleton from "../components/Common/ImageWithSkeleton";
import { MouseEventHandler, useState } from "react";
import ErrorContent from "../components/Common/ErrorContent";
import { useAmount } from "../utils/currency";

export default function Buy() {
  return (
    <>
      <Header />
      <Payment />
    </>
  );
}

function useGachaID() {
  const offset = 1;
  const unprocessedGachaID = Number(useLocation().pathname.split("/").pop());
  if (unprocessedGachaID < 0 || !unprocessedGachaID) throw Error();
  const gachaID = unprocessedGachaID - offset;
  return gachaID;
}

function useGacha(gachaID: number) {
  const { data, isLoading } = useGetDailyGachaQuery("/gacha.json");

  if (isLoading) {
    return {
      data: null,
      isLoading,
    };
  }

  if (!data) {
    return {
      data: null,
      isLoading,
    };
  }

  const gacha = data.gacha_list[gachaID];

  return {
    data: gacha,
    isLoading,
  };
}

function Payment() {
  const gachaID = useGachaID();
  const { data: gacha, isLoading } = useGacha(gachaID);
  const [currency, setCurrency] = useState<"won" | "eth">("won");
  const amount = useAmount(gacha);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!gacha) {
    return <ErrorContent />;
  }

  return (
    <>
      <main className="relative mx-auto mb-4 w-full max-w-xl grow px-4">
        <ImageWithSkeleton gacha={gacha} />
        <div className="flex w-full flex-col gap-6 py-6">
          <div className="grid grow grid-cols-[auto_80px] gap-4 sm:gap-8">
            <div className="col-span-2 text-2xl font-bold sm:text-4xl">
              {gacha.event.name}
            </div>
            <div>
              <h2 className="font-light sm:text-lg">{gacha.event.publisher}</h2>
              <h3 className="text-xl font-semibold sm:text-2xl">
                {gacha.artist.group} {gacha.artist.name}
              </h3>
            </div>
            <div className="flex flex-col justify-end">
              <div className="w-fit place-self-end text-lg font-light text-neutral-400">
                <span className="font-medium text-neutral-800">
                  #{gacha.seq}
                </span>{" "}
                / 100
              </div>
            </div>
          </div>
          <div className="grow text-2xl sm:text-4xl">{amount[currency]}</div>

          <div className="border-[1.5px] border-dashed border-neutral-300" />

          <div>{gacha.description}</div>

          <div className="border-[1.5px] border-dashed border-neutral-300" />

          <div className="text-2xl font-semibold">결제 수단</div>

          <div className="grid gap-2">
            <div>
              <input
                id="won"
                name="payment"
                type="radio"
                className="peer hidden"
                checked={currency === "won"}
                onChange={() => setCurrency("won")}
              />
              <label
                htmlFor="won"
                className="flex w-full cursor-pointer justify-between rounded-lg bg-gray-300 px-4 py-4 transition-colors active:bg-purple-600 peer-checked:bg-purple-500 peer-checked:text-white peer-hover:bg-gray-400 peer-checked:peer-hover:bg-purple-700 peer-active:bg-purple-800 peer-active:text-white"
              >
                <span>신용 카드</span>
                <span>{amount["won"]}</span>
              </label>
            </div>
            <div>
              <input
                id="eth"
                name="payment"
                type="radio"
                className="peer hidden"
                checked={currency === "eth"}
                onChange={() => setCurrency("eth")}
              />
              <label
                htmlFor="eth"
                className="flex w-full cursor-pointer justify-between rounded-lg bg-gray-300 px-4 py-4 transition-colors active:bg-purple-600 peer-checked:bg-purple-500 peer-checked:text-white peer-hover:bg-gray-400 peer-checked:peer-hover:bg-purple-700 peer-active:bg-purple-800 peer-active:text-white"
              >
                <span>이더리움</span>
                <span>{amount["eth"]}</span>
              </label>
            </div>
          </div>

          <div className="border-[1.5px] border-dashed border-neutral-300" />

          <div className="text-2xl font-semibold">전화 번호</div>

          <input
            type="text"
            placeholder="+82 010-0000-0000"
            className="flex w-full cursor-text justify-between rounded-lg bg-gray-300 px-4 py-4 outline-2 outline-purple-700 transition-colors"
          />

          <div className="border-[1.5px] border-dashed border-neutral-300" />

          <div className="text-2xl font-semibold">지갑 주소</div>

          <input
            type="text"
            placeholder="ZC42EWOU32SDFV431"
            className="flex w-full cursor-text justify-between rounded-lg bg-gray-300 px-4 py-4 outline-2 outline-purple-700 transition-colors"
          />

          <div>
            <div className="flex items-center">
              <input type="checkbox" className="h-6 w-6 accent-purple-600" />
              <label className="ml-2 text-lg font-semibold">
                다음의 약관에 동의하며, 주문을 진행합니다.
              </label>
            </div>
            <ul className="ml-8 mt-4 list-disc">
              <li>개인정보의 수집, 이용 목적: 결제에 대한 고객 안내</li>
              <li>수집하는 개인정보의 항목 : 휴대폰번호 개인정보의 보유</li>
              <li>
                이용 기간 : 개인정보 이용목적 달성 시까지 (단, 관계 법령 규정에
                의해 보존의 필요가 있는 경우 및 사전 동의를 득한 경우 해당 보유
                기간까지)
              </li>
              <li>
                개인정보의 수집 및 이용에 대한 동의를 거부할 수 있으며, 이 경우
                구매가 제한됩니다.
              </li>
            </ul>
          </div>

          <div className="border-[1.5px] border-dashed border-neutral-300" />

          <div className="flex justify-between text-2xl font-semibold">
            <span className="">총 금액</span>
            <span>{amount[currency]}</span>
          </div>
        </div>
      </main>

      <div className="group sticky bottom-0 flex grow flex-col justify-center pt-4 sm:gap-8">
        <button
          onClick={proceedPayment}
          className="w-full self-end rounded-t-lg bg-purple-600 pb-8 pt-4 text-center text-2xl font-bold text-purple-100 transition-all duration-100  hover:bg-purple-500 active:bg-purple-700 sm:py-4"
        >
          <p className="select-none transition-transform group-active:scale-90">
            {amount[currency]} 결제하기
          </p>
        </button>
        <div className="absolute -inset-0 -z-10 animate-pulse bg-purple-300 blur-xl"></div>
      </div>
    </>
  );
}

const proceedPayment: MouseEventHandler<HTMLButtonElement> = (e) => {};
