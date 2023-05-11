import { motion } from "framer-motion";
import { MiniImagePropsInterface } from "./MiniImageTypes";
import Image from "../Image";

export default function MiniImage(props: MiniImagePropsInterface) {
  // props
  const { src, alt, onClick } = props;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className=" flex h-12 w-12 flex-shrink-0 items-center justify-center rounded bg-gray-1 p-1"
      onClick={onClick}
    >
      <Image src={src} alt={alt} />
    </motion.div>
  );
}
