import { GachaInterface } from "../../store/reducers/gacha/gachaTypes";
import Skeleton from "../Image/Skeleton";

export default function ImageWithSkeleton({
  gacha,
}: {
  gacha: GachaInterface;
}) {
  return (
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
  );
}
