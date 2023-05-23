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
  fetch("http://localhost:3000/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authoration: "Bearer" + localStorage.getItem("token"),
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
