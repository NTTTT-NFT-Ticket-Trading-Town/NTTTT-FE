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

  return (
    <motion.div
      drag="x"
      dragDirectionLock
      dragSnapToOrigin
      whileDrag={{ scale: 0.95 }}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0, right: 1, left: 1 }}
      onDragEnd={(event, info) => {
        if (info.offset.x > 100) {
          setLeaveX(1000);
          setIndex((prev) => prev + 1);
        }
        if (info.offset.x < -100) {
          setLeaveX(-1000);
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
        transition: { duration: 0.3 },
      }}
      exit={{
        x: leaveX,
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.3 },
      }}
      className={
        "absolute left-8 right-8 mx-auto pb-8 drop-shadow-2xl " + rotate
      }
      style={{ x }}
    >
      <TicketTop className="w-full" />
      {children}
    </motion.div>
  );
}

function Top({ children }: Children) {
  return (
    <div className="isolate flex max-w-xl flex-col gap-4 bg-white p-6 pb-4 sm:gap-8 sm:p-10 sm:pb-4">
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
      <TicketSplit className="-my-1" />
    </>
  );
}

Ticket.Top = Top;
Ticket.Bottom = Bottom;
Ticket.Split = Split;

export default Ticket;
