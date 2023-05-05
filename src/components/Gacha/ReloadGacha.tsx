import { SetIndexType } from "../../pages/Gacha";
import { motion } from "framer-motion";

export default function ReloadGacha({ setIndex }: { setIndex: SetIndexType }) {
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
        transition: { duration: 0.2 },
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
