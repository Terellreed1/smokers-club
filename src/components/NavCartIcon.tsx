const NavCartIcon = ({ size = 22 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 100"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Cart body */}
    <path d="M25 30 L35 30 L50 70 L95 70 L105 35 L40 35" strokeWidth="6" fill="none" />
    {/* Basket */}
    <path d="M42 45 L100 45 L95 70 L50 70 Z" strokeWidth="4" fill="currentColor" opacity="0.05" />
    {/* Handle */}
    <path d="M25 30 L15 15" strokeWidth="6" />
    <circle cx="15" cy="14" r="4" fill="currentColor" opacity="0.6" stroke="none" />
    {/* Grid lines */}
    <line x1="60" y1="45" x2="57" y2="70" strokeWidth="2" opacity="0.3" />
    <line x1="75" y1="45" x2="73" y2="70" strokeWidth="2" opacity="0.3" />
    <line x1="90" y1="45" x2="88" y2="70" strokeWidth="2" opacity="0.3" />
    <line x1="45" y1="55" x2="97" y2="55" strokeWidth="2" opacity="0.3" />
    {/* Wheels */}
    <circle cx="58" cy="82" r="10" strokeWidth="5" fill="none" />
    <circle cx="58" cy="82" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="90" cy="82" r="10" strokeWidth="5" fill="none" />
    <circle cx="90" cy="82" r="2.5" fill="currentColor" stroke="none" />
  </svg>
);

export default NavCartIcon;
