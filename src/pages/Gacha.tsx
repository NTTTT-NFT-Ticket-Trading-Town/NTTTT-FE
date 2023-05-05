import { AnimatePresence } from "framer-motion";
import Header from "../layout/Header";
import { useGetGachaQuery } from "../store/reducers/gacha";
import { useMemo, useState } from "react";
import TicketFramedGacha from "../components/Gacha/TicketFramedGacha";
import ReloadGacha from "../components/Gacha/ReloadGacha";

export type SetIndexType = React.Dispatch<React.SetStateAction<number>>;
export type ShowDetailType = boolean;
export type SetShowDetailType = React.Dispatch<React.SetStateAction<boolean>>;

export default function Gacha() {
  return (
    <>
      <Header />
      <main className="relative mx-auto mb-4 w-full max-w-xl grow px-4">
        <GachaComponent />
      </main>
    </>
  );
}

function GachaComponent() {
  const { data, isLoading } = useGetGachaQuery("gacha.json");
  const [index, setIndex] = useState(0);

  const showReload = useMemo(() => {
    if (isLoading || !data) return false;
    if (index == data.gacha_list.length) {
      return true;
    }
    return false;
  }, [index, data]);

  if (!data) {
    return (
      <div className="grid h-full w-full place-items-center">
        <div className="origin-center animate-spin text-9xl">🌼</div>
      </div>
    );
  }

  const gacha = data.gacha_list[index];

  return (
    <>
      <AnimatePresence mode={"wait"}>
        {showReload ? (
          <ReloadGacha key="Reload" setIndex={setIndex} />
        ) : (
          <TicketFramedGacha
            key={gacha.token_id}
            gacha={gacha}
            setIndex={setIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
