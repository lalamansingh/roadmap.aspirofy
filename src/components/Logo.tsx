export default function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <defs>
        <linearGradient id="aspirofy-g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7b6bff" />
          <stop offset="1" stopColor="#4a36cf" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#aspirofy-g)" />
      <path d="M7.5 23.5 13 12l4 7.5 2.5-4.5 5 8.5" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="23.5" cy="8.5" r="2.4" fill="#ffc23d" />
    </svg>
  )
}
