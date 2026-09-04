// Interface
interface LogoProps {
  className?: string;
}

// The mark reads the publisher's name literally: a raw idea (the violet diamond)
// crossing into a shipped application (the rounded tile, in forge heat). The two
// shapes are kept separate by a cut-out so the overlap survives at favicon size.
function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="idea-forge-heat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8a3d" />
          <stop offset="100%" stopColor="#ffc24b" />
        </linearGradient>

        {/* The tile is punched where the diamond crosses it, so the two forms
            stay legible against each other without a drawn outline. */}
        <mask id="idea-forge-cut">
          <rect width="32" height="32" fill="white" />
          <path d="M12 5.4 22.6 16 12 26.6 1.4 16Z" fill="black" />
        </mask>
      </defs>

      {/* The shipped application. */}
      <rect
        x="14"
        y="8"
        width="16"
        height="16"
        rx="4.5"
        fill="url(#idea-forge-heat)"
        mask="url(#idea-forge-cut)"
      />

      {/* The idea. */}
      <path d="M12 7 21 16 12 25 3 16Z" fill="#6d4aff" />
    </svg>
  );
}

export default Logo;
