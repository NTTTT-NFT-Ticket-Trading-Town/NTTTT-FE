import { ReactNode } from "react";
import TicketTop from "../svg/TicketTop";
import TicketSplit from "../svg/TicketSplit";
import { motion, useMotionValue } from "framer-motion";

interface Children {
  children: ReactNode;
}

function Ticket({ children }: Children) {
  const x = useMotionValue(0);

  return (
    <motion.div
      drag
      dragSnapToOrigin
      whileDrag={{ scale: 0.9 }}
      onDragEnd={(event, info) => {
        if (info.offset.x > 100) {
          x.set(1000);
        }
        if (info.offset.x < -100) {
          x.set(-1000);
        }
        console.log(x.get());
      }}
      exit={{
        x: x.get(),
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.2 },
      }}
      className="pb-8 drop-shadow-2xl"
      style={{ x }}
    >
      <TicketTop className="w-full" />
      {children}
    </motion.div>
  );
}

function Top({ children }: Children) {
  return (
    <div className="isolate -mb-4 flex max-w-xl flex-col gap-4 bg-white p-6 pb-4 sm:gap-8 sm:p-10 sm:pb-4">
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
