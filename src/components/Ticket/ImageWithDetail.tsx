import { useState } from "react";
import { GachaInterface } from "../../store/reducers/gacha/gachaTypes";
import { motion } from "framer-motion";
import Skeleton from "../Image/Skeleton";
import {
  HorizontalRuleOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";

export default function ImageWithDetail({ gacha }: { gacha: GachaInterface }) {
  const animationDuration = 0.5;
  const easingFunction = "easeInOut";
  const [showDetail, setShowDetail] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{
        perspective: "800px",
      }}
      onTap={() => {
        setShowDetail((prev) => !prev);
      }}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        initial={{
          rotateY: 0,
        }}
        animate={{
          rotateY: showDetail ? 180 : 0,
        }}
        transition={{
          duration: animationDuration,
          ease: easingFunction,
        }}
      >
        <img
          draggable={false}
          src={gacha.image.url}
          alt=""
          className="absolute inset-0 -z-10 scale-105 animate-pulse rounded object-cover opacity-80 blur-xl"
        />
        <div
          className="relative"
          style={{
            aspectRatio: gacha.image.ratio,
            width: "100%",
            translate: "0 0 10px",
          }}
        >
          <Skeleton />
          <img
            draggable={false}
            src={gacha.image.url}
            alt=""
            className="absolute inset-0 rounded object-cover"
            style={{
              aspectRatio: gacha.image.ratio,
            }}
          />
        </div>
        <div
          style={{
            rotate: "y 180deg",
            translate: "0 0 -10px",
            backfaceVisibility: "hidden",
          }}
          className="absolute top-0 h-full w-full overflow-y-scroll rounded-md bg-black/60 p-8 text-xl text-white"
        >
          <h3 className="mb-4 text-3xl font-bold">상세 설명</h3>
          <p>{gacha.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
