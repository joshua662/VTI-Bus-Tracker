import brandLogo from "../../assets/ygbc-logo.png";

export const TownLogo = ({ className = "" }: { className?: string }) => (
  <img
    src={brandLogo}
    alt="YGBC"
    className={`h-28 w-auto ${className}`}
  />
);
