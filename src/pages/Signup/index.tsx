import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  setToken,
  useLoginMutation,
  useSignupMutation,
} from "../../store/reducers/user";
import metamask from "../../assets/metamask.svg";
import { useMetaMask } from "./useMetaMask";
import { motion } from "framer-motion";
import { dispatch } from "../../store";
export default function Signup() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [walletAddr, setWalletAddr] = useState("");
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const navigate = useNavigate();

  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
  const [signup, { data, error, isLoading, isSuccess, status }] =
    useSignupMutation();
  const [login] = useLoginMutation();

  const response = data;
  const errorRes = error as any;

  const onClickMetamask = () => {
    if (!hasProvider) window.open("https://metamask.io", "_blank");
    connectMetaMask();
  };

  const onClickSignup = () => {
    if (!walletAddr || !nickname || !phoneNumber || !password)
      return setValidationErrorMessage("모든 정보를 입력해주세요.");
    else
      signup({
        walletAddr,
        nickname,
        phoneNumber,
        password,
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("ntttt-user-session");

    if (token) {
      alert("이미 로그인 되어 있습니다.");
      navigate("/gacha");
    }
  }, []);

  useEffect(() => {
    if (wallet.accounts.length > 0) setWalletAddr(wallet.accounts[0]);
  }, [wallet]);

  useEffect(() => {
    const loginRightAfterSignup = async () => {
      try {
        const loginData = await login({ nickname, password }).unwrap();
        dispatch(setToken(loginData.data));
        navigate("/artists");
      } catch (e) {
        throw e;
      }
    };

    if (isSuccess && response) {
      loginRightAfterSignup();
    }
  }, [isSuccess, response]);

  return (
    <>
      <main className="relative flex w-full max-w-xl grow">
        <div className="absolute isolate w-full max-w-xl overflow-hidden">
          <img
            src="/bg-dark.png"
            alt=""
            width={800}
            height={1131}
            className="h-screen object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="isolate grid w-full grow place-content-evenly justify-center pt-2 text-white ">
          <div className="relative  grid w-full gap-2">
            <div className="mb-10 flex flex-col justify-center">
              <h1
                onClick={() => navigate("/login")}
                className=" mx-auto cursor-pointer text-2xl font-bold italic xs:px-24 sm:px-32 "
              >
                NTTTT
              </h1>
              <span className="mx-auto text-2xl font-semibold">회원가입</span>
            </div>
            <div className=" grid w-full gap-4 pt-4">
              <div className="-mb-2 text-gray-1">아이디</div>
              <input
                onChange={(e) => setNickname(e.target.value)}
                value={nickname}
                className="block w-full rounded bg-neutral-300/30 px-2 py-2 "
              />
              <div className="-mb-2 text-gray-1">비밀번호</div>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="block w-full rounded bg-neutral-300/30 px-2 py-2"
              />
              <div className="-mb-2 text-gray-1">전화번호</div>
              <input
                type="tel"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                className="block w-full rounded bg-neutral-300/30 px-2 py-2"
              />
              <div className="text-gray-1">지갑주소</div>
              <div className="relative">
                <input
                  onChange={(e) => setWalletAddr(e.target.value)}
                  value={walletAddr}
                  className="absolute block w-full rounded bg-neutral-300/30 px-2 py-2 pr-16"
                />
                <div
                  onClick={onClickMetamask}
                  className="absolute right-0 mx-auto block h-10 w-14 cursor-pointer rounded bg-white bg-opacity-25 py-2 text-center"
                >
                  <img
                    className="mx-auto transition hover:scale-110"
                    src={metamask}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-5 text-center text-base text-red-500">
              {(status === "rejected" || validationErrorMessage) && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {status === "rejected" && errorRes.data.result.message}
                  {validationErrorMessage}
                </motion.span>
              )}
            </div>
            <button
              disabled={isConnecting}
              onClick={onClickSignup}
              className=" inline-flex w-full items-center justify-center rounded bg-neutral-300/30 py-2 text-center transition-all duration-100 hover:bg-neutral-300/40 active:scale-95 active:bg-neutral-300/50"
            >
              회원가입
              {isLoading && " 중..."}
              {isSuccess && " 성공!"}
            </button>
            <div className="mt-3 flex justify-between brightness-50">
              <div className="cursor-pointer text-sm">
                아이디 / 비밀번호 찾기
              </div>
              <div
                onClick={() => navigate("/login")}
                className="cursor-pointer text-sm"
              >
                로그인
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
