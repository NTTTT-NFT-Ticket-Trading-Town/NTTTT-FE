import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useNavigate } from "react-router";

export default function ErrorContent({
  errorMessage,
  children,
}: {
  errorMessage: string | undefined;
  children?: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      className="isolate flex w-full grow flex-col items-center justify-center gap-6"
    >
      <div className="place-center grid text-9xl">☢️</div>
      <div className="text-center text-6xl font-bold">Error!</div>
      <div className="text-center text-2xl">
        <p className="text-sm">
          {errorMessage ?? "예기치 못한 에러가 발생했습니다."}
        </p>
        <p className="text-sm">다시 시도해주세요.</p>
      </div>
      <div className="relative flex h-min w-full flex-col gap-4 p-4 sm:p-8">
        <div className="relative">
          <button
            onClick={() => {
              navigate(0);
            }}
            className="w-full self-end rounded bg-purple-600 py-2 text-center text-xl font-bold text-purple-100 transition-all duration-100 hover:bg-purple-500 active:scale-95 active:bg-purple-700 sm:py-4 sm:text-2xl"
          >
            새로고침
          </button>
          <div className="absolute -inset-2 -z-10 animate-pulse bg-purple-300 blur-xl sm:-inset-4"></div>
        </div>
        {children && <div className="relative">{children}</div>}
      </div>
    </motion.div>
  );
}
