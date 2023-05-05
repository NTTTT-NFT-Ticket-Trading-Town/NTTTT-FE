export default function TicketSplit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 346 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H346L346 11C337.163 11 330 18.1634 330 27C330 35.8366 337.163 43 346 43L346 54H0V43C8.83648 42.9999 15.9998 35.8365 15.9998 27C15.9998 18.1635 8.83648 11.0001 0 11V0Z"
        fill="white"
      />
      <path opacity="0.2" d="M18 27H329" stroke="black" strokeDasharray="4 4" />
    </svg>
  );
}
