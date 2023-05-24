import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setToken, useLoginMutation } from "../store/reducers/user";
import { AnimatePresence, motion } from "framer-motion";

export default function Login() {
  const [login, { data, error, isLoading, isSuccess, status }] =
    useLoginMutation();
  const response = data;
  const errorRes = error as any;
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && response) {
      dispatch(setToken(response.data));
      navigate("/gacha");
    }
  }, [isSuccess, response]);

  const onClick = () => {
    login({ nickname, password });
  };

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

        <div className="relative isolate mx-auto h-full w-full max-w-md grow p-8 pt-10 text-white">
          <div className="absolute left-0 right-0 top-1/4 gap-2">
            <h1 className="mx-auto text-center text-6xl font-bold italic">
              NTTTT
            </h1>
            <div className="mt-4 grid w-full grid-cols-2 gap-2 border-b-4 text-3xl sm:text-4xl">
              <div className="py-2 text-end font-thin">내 손 안에</div>
              <div className="overflow-visible px-2 py-2 text-start font-bold">
                <AnimatePresence>
                  <Artist />
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="absolute bottom-1/4 left-0 right-0 flex flex-col justify-center">
            <div className="mt-4 grid gap-4 pt-4">
              <input
                onChange={(e) => setNickname(e.target.value)}
                value={nickname}
                className="block w-full rounded bg-neutral-300/30 px-2 py-2"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="block w-full rounded bg-neutral-300/30 px-2 py-2"
              />
              <div className="mt-8 text-center text-base text-red-500">
                {status === "rejected" && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={status}
                  >
                    {errorRes.data.result.message}
                  </motion.span>
                )}
              </div>
            </div>
            <button
              onClick={onClick}
              className="block w-full rounded bg-neutral-300/30 py-2 text-center transition-all duration-100 hover:bg-neutral-300/40 active:scale-95 active:bg-neutral-300/50"
            >
              로그인
              {isLoading && " 중..."}
              {isSuccess && " 성공!"}
            </button>
            <div className="mt-3 flex justify-between brightness-50">
              <div className="cursor-pointer text-sm">
                아이디 / 비밀번호 찾기
              </div>
              <div
                onClick={() => navigate("/signup")}
                className="cursor-pointer text-sm"
              >
                회원가입
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const Artist = () => {
  const artistList = [
    "사쿠라",
    "윈터",
    "카리나",
    "지수",
    "닝닝",
    "뷔",
    "제니",
    "로제",
    "리사",
    "채원",
    "민지",
    "다니엘",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % artistList.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key={artistList[index]}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-fit"
    >
      {artistList[index]}
    </motion.div>
  );
};
