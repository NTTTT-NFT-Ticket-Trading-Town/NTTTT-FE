import { SetShowDetailType, ShowDetailType } from "../../pages/Gacha";
import { GachaInterface } from "../../store/reducers/gacha/gachaTypes";
import { motion } from "framer-motion";

export default function ImageWithDetail(
  gacha: GachaInterface,
  showDetail: ShowDetailType,
  setShowDetail: SetShowDetailType
) {
  const animationDuration = 0.5;
  const easingFunction = "easeInOut";

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{
        perspective: "800px",
      }}
      onTap={(_) => {
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
        <div
          className="relative"
          style={{
            aspectRatio: gacha.image.ratio,
            width: "100%",
          }}
        >
          <img
            draggable={false}
            src={gacha.image.url}
            alt=""
            className="absolute inset-0 -z-10 scale-105 animate-pulse rounded bg-gray-300 object-cover opacity-80 blur-xl"
          />
          <img
            draggable={false}
            src={gacha.image.url}
            alt=""
            className="absolute inset-0 rounded bg-gray-300 object-cover"
            style={{
              aspectRatio: gacha.image.ratio,
            }}
          />
        </div>
        <div
          style={{
            rotate: "y 180deg",
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
