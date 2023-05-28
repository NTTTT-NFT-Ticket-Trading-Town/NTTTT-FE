import { useEffect, useState } from "react";
import { ImageInterface } from "../../store/reducers/gacha/gachaTypes";
import { AnimatePresence, motion } from "framer-motion";
import {
  HorizontalRuleOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import ImageWithSkeleton from "../Common/ImageWithSkeleton";
import { useGetWatchersQuery } from "../../store/reducers/gacha";

export default function ImageWithDetail({
  id,
  image,
  description,
}: {
  id?: number;
  image: ImageInterface;
  description: string;
}) {
  const animationDuration = 0.5;
  const easingFunction = "easeInOut";
  const [showDetail, setShowDetail] = useState(false);

  return (
    <motion.div
      className="relative w-full cursor-pointer"
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
        <div
          style={{
            rotate: "y 180deg",
            translate: "0 0 -10px",
            backfaceVisibility: "hidden",
          }}
          className="absolute top-0 h-full w-full overflow-y-scroll rounded-md bg-black/60 p-6 text-xl text-white sm:p-8"
        >
          <h3 className="mb-4 text-xl font-bold sm:text-3xl">상세 설명</h3>
          <p className="text-base sm:text-xl">{description}</p>
        </div>
        <img
          loading="lazy"
          draggable={false}
          src={image.url}
          alt=""
          className="absolute inset-0 scale-105 animate-pulse rounded object-cover opacity-80 blur-xl"
        />
        <ImageWithSkeleton gacha={image} />
        {id && <ShowWatchers id={id} />}
      </motion.div>
    </motion.div>
  );
}

function ShowWatchers({ id }: { id: number }) {
  const [showWatchers, setShowWatchers] = useState(false);
  const [blink, setBlink] = useState(true);
  const { data, isLoading } = useGetWatchersQuery(id, {
    pollingInterval: 2000,
  });

  const doBlink = () => {
    setTimeout(() => {
      setBlink((prev) => !prev);
    }, 100);
    setBlink((prev) => !prev);
  };

  useEffect(() => {
    let blinkInterval = setInterval(() => {
      const random = Math.random() * 200 + 200;
      doBlink();
      setTimeout(() => {
        doBlink();
      }, random);
    }, 3000);
    return () => {
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <motion.div
      style={{ translate: "0 0 30px" }}
      className="absolute left-3 top-4 flex items-center rounded-full bg-black/40 px-3 py-2 text-sm text-white sm:left-6 sm:top-6 sm:text-base"
      onMouseOver={() => {
        setShowWatchers(true);
      }}
      onMouseLeave={() => {
        setShowWatchers(false);
      }}
      onTap={(e) => {
        e.stopPropagation();
        setShowWatchers(true);
      }}
      onTapCancel={(e) => {
        e.stopPropagation();
        setShowWatchers(false);
      }}
    >
      <>
        {blink ? (
          <RemoveRedEyeOutlined
            sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", lg: "2rem" } }}
            className="text-xs sm:text-lg"
            style={{ marginRight: "0.5rem" }}
          />
        ) : (
          <HorizontalRuleOutlined
            sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", lg: "2rem" } }}
            className="text-sm sm:text-base"
            style={{ marginRight: "0.5rem" }}
          />
        )}
      </>
      <AnimatePresence>
        {showWatchers && (
          <motion.span
            key="left-text"
            className="overflow-hidden whitespace-nowrap text-gray-400"
            initial={{ opacity: 0, width: 0, margin: 0 }}
            transition={{
              duration: 0.3,
            }}
            animate={{ opacity: 1, width: "auto", margin: "0 0.3rem 0 0" }}
            exit={{ opacity: 0, width: 0, margin: 0 }}
          >
            현재
          </motion.span>
        )}
      </AnimatePresence>
      <span>{isLoading || !data ? 1 : data.data}</span>
      <AnimatePresence>
        {showWatchers && (
          <motion.span
            key="right-text"
            className="overflow-hidden whitespace-nowrap text-gray-400"
            initial={{ opacity: 0, width: 0, margin: 0 }}
            transition={{
              duration: 0.3,
            }}
            animate={{
              opacity: 1,
              width: "auto",
              margin: "0 0 0 0.3rem",
            }}
            exit={{ opacity: 0, width: 0, margin: 0 }}
          >
            명이 보고 있습니다.
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
