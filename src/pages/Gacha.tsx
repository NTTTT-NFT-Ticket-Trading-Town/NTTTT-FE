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
  const { data, isLoading } = useGetGachaQuery("gacha.json");
  const [index, setIndex] = useState(0);

  const showReload = useMemo(() => {
    if (isLoading || !data) return false;
    if (index == data.gacha_list.length) {
      return true;
    }
    return false;
  }, [index, data]);

  let GachaComponent: JSX.Element | null = null;

  if (!data) {
    GachaComponent = <div>로딩중...</div>;
  } else if (showReload) {
    GachaComponent = (
      <AnimatePresence mode={"wait"}>{ReloadGacha(setIndex)}</AnimatePresence>
    );
  } else {
    const gacha = data.gacha_list[index];
    GachaComponent = <TicketFramedGacha gacha={gacha} setIndex={setIndex} />;
  }

  return (
    <>
      <Header />
      <main className="relative mx-auto mb-4 w-full max-w-xl px-4">
        {GachaComponent}
      </main>
    </>
  );
}
