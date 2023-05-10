import { motion } from "framer-motion";
import { MiniImagePropsInterface } from "./MiniImageTypes";
import Image from "../Image";

export default function MiniImage(props: MiniImagePropsInterface) {
  // props
  const { src, alt, onClick } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="flex h-12 w-12 items-center justify-center rounded bg-gray-1 p-1"
      onClick={onClick}
    >
      <Image src={src} alt={alt} />
    </motion.div>
  );
}
