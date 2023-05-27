// {
//   "eventId": 0,
//   "artistId": 0,
//   "imgUrl": "string",
//   "ratio": "string",
//   "price": 0,
//   "desc": "string"
// }

export interface makeTokenProps {
  eventId: number;
  artistId: number;
  imgUrl: string;
  ratio: string;
  price: number;
  desc: string;
}

export const makeToken = ({
  eventId,
  artistId,
  imgUrl,
  ratio,
  price,
  desc,
}: makeTokenProps) => {
  fetch("https://ntttt.dxworks.co.kr/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authoration: "Bearer " + localStorage.getItem("ntttt-user-session"),
    },
    body: JSON.stringify({
      eventId,
      artistId,
      imgUrl,
      ratio,
      price,
      desc,
    }),
  });
};
