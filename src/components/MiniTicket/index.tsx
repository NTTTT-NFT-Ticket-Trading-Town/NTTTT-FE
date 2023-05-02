import Image from "../Image";
import { MiniticketPropsInterface } from "./MiniTicketTypes";
import TicketFrame from "./TicketFrame.svg";

export default function MiniTicket(props: MiniticketPropsInterface) {
  const { title = "Default", img_url } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 124,
        height: 165,
        backgroundImage: "url(" + TicketFrame + ")",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          marginTop: "10px",
          width: "100px",
          height: "100px",
        }}
      >
        <Image src={img_url} alt="img" />
      </div>
      <div
        style={{
          bottom: "0px",
          width: "100%",
          height: "50px",
          textAlign: "center",
          lineHeight: "50px",
        }}
      >
        <div>{title}</div>
      </div>
    </div>
  );
}
