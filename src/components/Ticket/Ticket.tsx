import { ReactNode } from "react";
import TicketTop from "../svg/TicketTop";
import TicketSplit from "../svg/TicketSplit";

interface Children {
  children: ReactNode;
}

function Ticket({ children }: Children) {
  return (
    <>
      <section className="drop-shadow-2xl pb-8">
        {/* <TicketTop className="w-full" /> */}
        {children}
      </section>
    </>
  );
}

function Top({ children }: Children) {
  return (
    <div className="bg-white isolate flex max-w-xl flex-col gap-3 p-6 sm:gap-8 sm:p-10 rounded-t-lg">
      {children}
    </div>
  );
}

function Bottom({ children }: Children) {
  return (
    <>
      <div className="absolute bottom-8 w-full h-20 sm:h-32 bg-white rounded-b-lg"></div>
      <div className="sticky bottom-4 flex grow flex-col gap-4 sm:gap-8 align-center justify-center p-4 sm:p-8">
        {children}
        <div className="absolute -z-10 bg-purple-300 px-4 -inset-0 blur-xl animate-pulse sm:inset-2"></div>
      </div>
    </>
  );
}

function Split() {
  return (
    <>
      <TicketSplit />
    </>
  );
}

Ticket.Top = Top;
Ticket.Bottom = Bottom;
Ticket.Split = Split;

export default Ticket;
