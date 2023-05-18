import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setToken, useLoginMutation } from "../store/reducers/user";

export default function Login() {
  const [login, { data: response, isLoading, isSuccess }] = useLoginMutation();
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (isSuccess && response) {
    dispatch(setToken(response.data));
    navigate("/gacha");
  }

  const onClick = async () => {
    await login({ nickname, password });
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

        <div className="isolate grid grow place-content-evenly justify-center pt-10 text-white">
          <div className="relative grid gap-2">
            <h1 className="mx-auto text-6xl font-bold italic">NTTTT</h1>
            <span className="mx-auto text-2xl font-semibold">
              아이돌 토큰을 모아보세요!
            </span>
            <div className="grid gap-4 pt-4">
              <input
                onChange={(e) => setNickname(e.target.value)}
                value={nickname}
                className="block w-full rounded bg-neutral-300/30 px-2 py-2"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="block w-full rounded bg-neutral-300/30 px-2 py-2"
              />
            </div>
          </div>
          <div>
            <button
              onClick={onClick}
              className="block w-full rounded bg-neutral-300/30 py-2 text-center transition-all duration-100 hover:bg-neutral-300/40 active:scale-95 active:bg-neutral-300/50"
            >
              로그인
              {isLoading && " 중..."}
              {isSuccess && " 성공!"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
