import { motion } from "framer-motion";

export default function LoadingSpinner() {
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
      className="grid h-full w-full grow place-items-center"
    >
      <div className="origin-center animate-spin text-9xl">🪙</div>
    </motion.div>
  );
}
