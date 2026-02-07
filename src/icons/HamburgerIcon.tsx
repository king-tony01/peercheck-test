import * as React from "react";

const HamburgerIcon: React.FC<React.SVGProps<SVGElement>> = ({
  color = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      d="M3 6H21M3 12H21M3 18H21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default HamburgerIcon;
