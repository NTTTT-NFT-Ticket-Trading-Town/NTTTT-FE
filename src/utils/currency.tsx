import { useEffect, useMemo, useState } from "react";
import { GachaInterface } from "../store/reducers/gacha/gachaTypes";

export function useCurrencyRate() {
  const [rate, setRate] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setRate(1 / 3246800);
    }, 1000);
  }, []);

  return rate;
}

export const Format = Intl.NumberFormat("ko-KR").format;

export function useAmount(gacha: GachaInterface | null) {
  const currencyRate = useCurrencyRate();

  return useMemo(() => {
    if (!gacha)
      return {
        won: `가격 정보 불러오기에 실패했습니다`,
        eth: `가격 정보 불러오기에 실패했습니다`,
      };
    if (currencyRate === 0)
      return {
        won: `₩ ${Format(gacha.price.amount)}`,
        eth: `로딩중..`,
      };
    return {
      won: `₩ ${Format(gacha.price.amount)}`,
      eth: `${String(gacha.price.amount * currencyRate).slice(0, 8)} ETH`,
    };
  }, [currencyRate, gacha]);
}
