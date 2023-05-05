import Chip from "../components/Chip";
import Image from "../components/Image";
// import MiniTicket from "../components/MiniTicket";

export default function Test() {
  return (
    <div className={"flex-col"}>
      <Image
        src="https://avatars.githubusercontent.com/u/128919852?s=200&v=4"
        alt="image"
      ></Image>
      <Chip label="label"></Chip>
      <Chip label="label" enabled={true}></Chip>
      {/* <MiniTicket ></MiniTicket> */}
    </div>
  );
}
