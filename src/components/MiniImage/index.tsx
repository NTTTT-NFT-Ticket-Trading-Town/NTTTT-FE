import { MiniImagePropsInterface } from "./MiniImageTypes";
import Image from "../Image";

export default function MiniImage(props: MiniImagePropsInterface) {
  // props
  const { src, alt, onClick } = props;

  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded bg-gray-1 p-1"
      onClick={onClick}
    >
      <Image src={src} alt={alt} />
    </div>
  );
}
