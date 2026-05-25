// src/components/ui/ServiceIcon.tsx
// Renders the correct SVG icon for a given service id

type Props = { icon: string; className?: string };

const icons: Record<string, React.ReactNode> = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinejoin="round"/>
      <polyline points="9 22 9 12 15 12 15 22" strokeLinejoin="round"/>
    </svg>
  ),
  kitchen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="2" y="3" width="20" height="18" rx="2" strokeLinejoin="round"/>
      <path d="M2 9h20M9 21V9" strokeLinecap="round"/>
    </svg>
  ),
  bath: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4z" strokeLinejoin="round"/>
      <path d="M6 12V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" strokeLinecap="round"/>
      <path d="M4 20l-1 2M20 20l1 2" strokeLinecap="round"/>
    </svg>
  ),
  interior: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeLinejoin="round"/>
      <path d="M3 9h18M9 21V9" strokeLinecap="round"/>
    </svg>
  ),
  paint: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M2 13.5A7.5 7.5 0 0 1 9.5 6H18l2 2-2 2H9.5A3.5 3.5 0 0 0 6 13.5v0A3.5 3.5 0 0 0 9.5 17H11" strokeLinecap="round"/>
      <path d="M13 17c0 2.5 2 5 2 5s2-2.5 2-5a2 2 0 0 0-4 0z" strokeLinejoin="round"/>
    </svg>
  ),
  roof: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M3 12L12 3l9 9" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-4h4v4h4a1 1 0 0 0 1-1v-9" strokeLinejoin="round"/>
    </svg>
  ),
};

export default function ServiceIcon({ icon, className = "w-7 h-7" }: Props) {
  return (
    <span className={className} aria-hidden="true">
      {icons[icon] ?? icons["home"]}
    </span>
  );
}
