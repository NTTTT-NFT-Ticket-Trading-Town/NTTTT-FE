import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useNavigate } from "react-router";

export default function ErrorContent({
  errorMessage,
  children,
}: {
  errorMessage: string;
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
        <p>{errorMessage}</p>
        <p>다시 시도해주세요.</p>
      </div>
      <div className="relative flex h-min w-full flex-col gap-4 p-4 sm:p-8">
        <button
          onClick={() => {
            navigate(0);
          }}
          className="w-full self-end rounded bg-purple-600 py-2 text-center text-xl font-bold text-purple-100 transition-all duration-100 hover:bg-purple-500 active:scale-95 active:bg-purple-700 sm:py-4 sm:text-2xl"
        >
          새로고침
        </button>
        <div className="absolute left-0 top-0 -z-10 h-full w-full animate-pulse bg-purple-300 blur-xl sm:inset-2"></div>
        {children}
      </div>
    </motion.div>
  );
}
