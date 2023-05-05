import { useEffect, useState } from "react";
import { GachaInterface } from "../../store/reducers/gacha/gachaTypes";
import { AnimatePresence, motion } from "framer-motion";
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
        <ShowWatchers gacha={gacha} />
      </motion.div>
    </motion.div>
  );
}

function ShowWatchers({ gacha }: { gacha: GachaInterface }) {
  const [showWatchers, setShowWatchers] = useState(false);
  const [blink, setBlink] = useState(true);

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
      className="absolute left-3 top-4 flex items-center rounded-full bg-black/40 px-3 py-2 text-white sm:left-6 sm:top-6"
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
          <RemoveRedEyeOutlined style={{ marginRight: "0.5rem" }} />
        ) : (
          <HorizontalRuleOutlined style={{ marginRight: "0.5rem" }} />
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
            animate={{ opacity: 1, width: "28px", margin: "0 0.3rem 0 0" }}
            exit={{ opacity: 0, width: 0, margin: 0 }}
          >
            현재
          </motion.span>
        )}
      </AnimatePresence>
      <span>{gacha.watchers}</span>
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
              width: "122px",
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
