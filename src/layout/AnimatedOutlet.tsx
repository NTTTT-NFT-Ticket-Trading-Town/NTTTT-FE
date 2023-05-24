import { useEffect, useState } from "react";
import { useOutlet } from "react-router";

export default function AnimatedOutlet() {
  // useOutlet은 현재 라우터에 매칭되는 컴포넌트를 반환한다.
  // 이때, 이 반환받은 컴포넌트를 다시 useState로 설정하면 "동결된다"
  const [outlet] = useState(useOutlet());

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [outlet]);

  return <>{outlet}</>;
}
