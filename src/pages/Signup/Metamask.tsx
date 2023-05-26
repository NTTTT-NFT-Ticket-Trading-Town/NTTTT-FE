import { motion } from "framer-motion";
import metamask from "../../assets/metamask.svg";

interface MetamaskImagePropsInterface {
  isRotating: boolean;
  onAnimationComplete: () => void;
}

export default function MetamaskImage({
  isRotating,
  onAnimationComplete,
}: MetamaskImagePropsInterface) {
  const variants = {
    initial: { rotate: 0 },
    rotate: { rotate: 180 },
  };

  return (
    <motion.img
      initial={"initial"}
      animate={isRotating ? "rotate" : "initial"}
      onAnimationComplete={onAnimationComplete}
      variants={variants}
      className="mx-auto"
      src={metamask}
    />
  );
}
