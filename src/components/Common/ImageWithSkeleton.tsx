import { ImageInterface } from "../../store/reducers/gacha/gachaTypes";
import Skeleton from "../Image/Skeleton";

export default function ImageWithSkeleton({
  gacha,
}: {
  gacha: ImageInterface;
}) {
  const imageRatio =
    gacha.ratio === "string" || !gacha.ratio ? "1" : gacha.ratio;
  return (
    <div
      className="relative"
      style={{
        aspectRatio: imageRatio,
        width: "100%",
      }}
    >
      <Skeleton />
      <img
        draggable={false}
        src={gacha.url}
        alt=""
        className="absolute inset-0 rounded object-cover"
        style={{
          aspectRatio: gacha.ratio,
        }}
      />
    </div>
  );
}
