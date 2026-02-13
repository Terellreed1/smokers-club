const NavCartIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Handle */}
    <path d="M4 4 L6 6" />
    {/* Frame */}
    <path d="M6 6 L8 6 L11 18 L20 18 L22 8 L9 8" />
    {/* Basket lines */}
    <path d="M10 11 L21 11" strokeWidth="1" opacity="0.4" />
    <path d="M10.5 14 L20.5 14" strokeWidth="1" opacity="0.4" />
    {/* Wheels */}
    <circle cx="12.5" cy="21" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="18.5" cy="21" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

export default NavCartIcon;
