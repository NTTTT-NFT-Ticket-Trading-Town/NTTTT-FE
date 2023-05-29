import { AnimatePresence } from "framer-motion";
import TicketFramedGacha from "../components/Gacha/TicketFramedGacha";
import Header from "../layout/Header";

export type SetIndexType = React.Dispatch<React.SetStateAction<number>>;
export type ShowDetailType = boolean;
export type SetShowDetailType = React.Dispatch<React.SetStateAction<boolean>>;

export default function Gacha() {
  return (
    <>
      <Header />
      <main className="relative mx-auto mb-4 mt-4 flex w-full max-w-xl grow justify-center px-4">
        <GachaComponent />
      </main>
    </>
  );
}

function GachaComponent() {
  return (
    <AnimatePresence mode={"wait"}>
      <TicketFramedGacha />
    </AnimatePresence>
  );
}
