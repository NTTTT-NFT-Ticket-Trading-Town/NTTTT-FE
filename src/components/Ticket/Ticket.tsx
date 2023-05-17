import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import TicketTop from "../svg/TicketTop";
import TicketSplit from "../svg/TicketSplit";
import { motion, useMotionValue } from "framer-motion";

interface Children {
  children: ReactNode;
}

function Ticket({
  children,
  setIndex,
}: {
  children: ReactNode;
  setIndex: Dispatch<SetStateAction<number>>;
}) {
  const x = useMotionValue(0);
  const [leaveX, setLeaveX] = useState(0);
  const rotate = Math.random() > 0.5 ? " rotate-12 " : " -rotate-12 ";
  const OUT_ANIMATION_DURATION = 0.2;

  return (
    <motion.div
      drag="x"
      dragDirectionLock
      dragSnapToOrigin
      whileDrag={{ scale: 0.95 }}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0, right: 1, left: 1 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 200) {
          setLeaveX(x.get() + x.getVelocity() * OUT_ANIMATION_DURATION);
          setIndex((prev) => prev + 1);
        }
        if (info.offset.x < -200) {
          setLeaveX(x.get() - x.getVelocity() * OUT_ANIMATION_DURATION);
          setIndex((prev) => prev + 1);
        }
      }}
      initial={{
        scale: 0.8,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3, type: "spring" },
      }}
      exit={{
        x: leaveX,
        opacity: 0,
        scale: 0.5,
        transition: { duration: OUT_ANIMATION_DURATION },
      }}
      className={
        "relative mx-auto h-fit cursor-grab select-none pb-8 drop-shadow-2xl active:cursor-grabbing" +
        rotate
      }
      style={{ x }}
    >
      <TicketTop className="-mb-1 w-full" />
      {children}
    </motion.div>
  );
}

function Top({ children }: Children) {
  return (
    <div className="isolate flex max-w-xl flex-col gap-4 bg-white p-6 py-4 sm:gap-8 sm:p-10 sm:py-4">
      {children}
    </div>
  );
}

function Bottom({ children }: Children) {
  return (
    <>
      <div className="absolute bottom-8 h-20 w-full rounded-b-lg bg-white sm:h-28"></div>
      {children}
    </>
  );
}

function Split() {
  return (
    <>
      <TicketSplit className="-my-2" />
    </>
  );
}

Ticket.Top = Top;
Ticket.Bottom = Bottom;
Ticket.Split = Split;

export default Ticket;
