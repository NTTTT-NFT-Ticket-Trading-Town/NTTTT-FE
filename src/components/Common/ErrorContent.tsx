import { motion } from "framer-motion";

export default function ErrorContent() {
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
      className="flex w-full grow flex-col items-center justify-center gap-6"
    >
      <div className="place-center grid text-9xl">☢️</div>
      <div className="text-center text-6xl">Error!</div>
      <div className="text-center text-2xl">
        <p>Something wrong happened.</p>
        <p>Please try again.</p>
      </div>
    </motion.div>
  );
}
