import { CloseSharp, DoubleArrowOutlined } from "@mui/icons-material";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";
import ErrorContent from "../components/Common/ErrorContent";
import ImageWithSkeleton from "../components/Common/ImageWithSkeleton";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import Header from "../layout/Header";
import { useGetDailyGachaQuery } from "../store/reducers/gacha";
import { GachaInterface } from "../store/reducers/gacha/gachaTypes";
import { ServerResponseInterface } from "../store/reducers/indexTypes";
import { usePostPaymentMutation } from "../store/reducers/payment";
import { useAmount } from "../utils/currency";
import { useDetailQuery } from "../store/reducers/user";
import MetamaskImage from "./Signup/Metamask";

export default function Buy() {
  return (
    <>
      <Header />
      <Payment />
    </>
  );
}

function Payment() {
  const { data, isLoading, error } = useGetDailyGachaQuery();
  const { data: userData } = useDetailQuery();
  const [currency, setCurrency] = useState<"won" | "eth">("won");
  const amount = useAmount(data?.data?.token?.price);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const gacha = data?.data.token;

  const isSoldOut = gacha?.payment_state === "SOLD_OUT";

  useEffect(() => {
    if (isSoldOut) {
      setTimeout(() => {
        alert("이미 매진된 토큰입니다.");
        navigate("/draw", { replace: true });
      }, 500);
    }
  }, [isSoldOut]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!data || !data.data || !data.data.token || !gacha) {
    const errorData =
      error as unknown as ServerResponseInterface<GachaInterface>;
    return <ErrorContent errorMessage={errorData?.result?.message} />;
  }

  if (
    !userData ||
    !userData.data ||
    !userData.data.wallet_addr ||
    !userData.data.phone_number
  ) {
    const errorData =
      error as unknown as ServerResponseInterface<GachaInterface>;
    return <ErrorContent errorMessage={errorData?.result?.message} />;
  }

  return (
    <>
      <main className="relative mx-auto mb-4 mt-4 w-full max-w-xl grow px-4">
        <div className="relative">
          <ImageWithSkeleton gacha={gacha.image} />
          {isSoldOut && (
            <div className="absolute inset-4 isolate mx-auto grid -rotate-6 place-items-center rounded-lg border-8 border-dashed border-black bg-yellow-300/90 px-8 py-4 text-center text-5xl">
              판매 완료
            </div>
          )}
        </div>
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
                / {gacha.event.quantity}
              </div>
            </div>
          </div>
          <div className="grow text-2xl sm:text-4xl">{amount[currency]}</div>

          <div className="border-[1.5px] border-dashed border-neutral-300" />

          <div>{gacha.desc}</div>

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
            value={userData.data.phone_number}
            className="flex w-full cursor-text justify-between rounded-lg bg-gray-300 px-4 py-4 outline-2 outline-purple-700 transition-colors"
            readOnly={!!userData.data.phone_number}
          />

          <div className="border-[1.5px] border-dashed border-neutral-300" />

          <div className="text-2xl font-semibold">지갑 주소</div>

          <div className="relative overflow-hidden rounded-lg">
            <input
              type="text"
              placeholder="ZC42EWOU32SDFV431"
              value={userData.data.wallet_addr}
              className="flex w-full cursor-text justify-between bg-gray-300 px-4 py-4 outline-2 outline-purple-700 transition-colors"
              readOnly={!!userData.data.wallet_addr}
            />
            <div className="absolute right-0 top-0 mx-auto block h-14 w-16 bg-gray-200 py-4 text-center">
              <MetamaskImage
                isRotating={false}
                onAnimationComplete={() => {}}
              />
            </div>
          </div>

          <div className="focus-within:ring-4 focus-within:ring-red-600">
            <div className="flex items-center ">
              <input
                ref={checkboxRef}
                type="checkbox"
                id="check"
                className="h-6 w-6 accent-purple-600"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <label
                htmlFor="check"
                className="ml-2 text-lg font-semibold peer-focus-within:border-2 peer-focus-within:border-red-600"
              >
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

      <div className="sticky bottom-0 flex grow flex-col justify-center pt-4 sm:gap-8">
        <button
          onClick={() => {
            if (checked) {
              setShowModal(true);
            } else {
              alert("약관에 동의해주세요.");
              checkboxRef.current?.focus();
              checkboxRef.current?.scrollIntoView();
            }
          }}
          disabled={isSoldOut}
          className="group peer w-full self-end rounded-t-lg bg-purple-600 pb-6 pt-3 text-center text-2xl font-bold text-purple-100 transition-all duration-100  hover:bg-purple-500 active:bg-purple-700 disabled:bg-gray-400 disabled:text-gray-100 sm:pt-3"
        >
          <p className="select-none transition-transform group-active:scale-90">
            {!isSoldOut ? `${amount[currency]} 결제하기` : "판매 완료"}
          </p>
        </button>
        <div className="absolute -inset-0 -z-10 animate-pulse bg-purple-300 blur-xl peer-disabled:bg-gray-400"></div>
      </div>
      {showModal && <BuyModal tokenId={gacha.id} setShowModal={setShowModal} />}
    </>
  );
}

const BuyModal: FC<{
  tokenId: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ tokenId, setShowModal }) => {
  return (
    <div className="fixed inset-0 isolate z-50 flex items-center justify-center bg-black/50">
      <section className="relative flex w-[80%] max-w-lg flex-col overflow-hidden rounded-lg border-4 ">
        <div className="text-semibold relative w-full border-b-4 bg-white px-4 pb-8 pt-12 text-center text-2xl">
          밀어서 결제 완료
        </div>
        <SwipeToPay tokenId={tokenId} />
        <button
          className="absolute right-0 top-0 z-10 border-0 p-4"
          onClick={() => setShowModal(false)}
        >
          <CloseSharp fontSize="large" />
        </button>
      </section>
    </div>
  );
};

const SwipeToPay: FC<{ tokenId: number }> = ({ tokenId }) => {
  const swipeBox = useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = useState(0);
  const navigate = useNavigate();
  const [status, setStatus] = useState("오른쪽으로 미세요");
  const [processPayment, { isSuccess }] = usePostPaymentMutation();

  const x = useMotionValue(0);
  const background = useTransform(x, [0, boxWidth], ["#7700ff", "#ff008c"]);

  useEffect(() => {
    if (swipeBox.current) setBoxWidth(swipeBox.current.clientWidth);
  }, [swipeBox]);

  useEffect(() => {
    if (boxWidth === 0) return;
    x.onChange((v) => {
      if (v + 64 >= boxWidth - 10) {
        setStatus("놓아서 결제 완료");
      } else {
        setStatus("오른쪽으로 미세요");
      }
    });
  }, [boxWidth]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/mypage");
    }
  }, [isSuccess]);

  const buyToken = () => {
    if (status === "놓아서 결제 완료") {
      processPayment(tokenId);
    }
  };

  return (
    <footer
      className="relative flex w-full bg-gray-300 text-lg font-semibold text-white"
      ref={swipeBox}
    >
      <div className="absolute grid h-full w-full place-content-center border-0">
        {status}
      </div>
      <motion.div
        drag="x"
        dragSnapToOrigin
        dragConstraints={swipeBox}
        onDragEnd={buyToken}
        className="pointer-events-auto z-10 grid aspect-square w-16 cursor-grab place-items-center bg-purple-600 active:cursor-grabbing"
        style={{ x, background }}
      >
        <DoubleArrowOutlined />
      </motion.div>
    </footer>
  );
};
