import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "../../store";

export default function Modal() {
  const { message, showModal } = useSelector((state) => state.modal);

  const dropIn = {
    hidden: {
      opacity: 0,
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="z-50 h-32 w-40 rounded bg-gray-2"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dropIn as any}
        >
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
