// src/components/ui/ServiceIcon.tsx
// Renders the correct SVG icon for a given service id

type Props = { icon: string; className?: string };

const icons: Record<string, React.ReactNode> = {
  drywall: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="1" strokeLinejoin="round"/>
      <path d="M9 4v16M15 4v16M3 10h6M15 10h6M3 16h6M15 16h6" strokeLinecap="round"/>
    </svg>
  ),
  flooring: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="1" strokeLinejoin="round"/>
      <path d="M2 9h20M2 14h20M8 4v5M14 9v5M8 14v6M14 4v5" strokeLinecap="round"/>
    </svg>
  ),
  tiling: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="0.5" strokeLinejoin="round"/>
      <rect x="13" y="3" width="8" height="8" rx="0.5" strokeLinejoin="round"/>
      <rect x="3" y="13" width="8" height="8" rx="0.5" strokeLinejoin="round"/>
      <rect x="13" y="13" width="8" height="8" rx="0.5" strokeLinejoin="round"/>
    </svg>
  ),
  parquet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M12 3l6 6-6 6-6-6z" strokeLinejoin="round"/>
      <path d="M12 15l6 6-6-6-6 6" strokeLinejoin="round"/>
      <path d="M2 9l4-4M22 9l-4-4M2 19l4-4M22 19l-4-4" strokeLinecap="round"/>
    </svg>
  ),
  plumbing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M6 3v6a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 13v4M14 9h4a3 3 0 0 1 3 3v2M18 14v7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 3h4M12 3h4" strokeLinecap="round"/>
    </svg>
  ),
  electrical: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" strokeLinejoin="round"/>
    </svg>
  ),
};

export default function ServiceIcon({ icon, className = "w-7 h-7" }: Props) {
  return (
    <span className={className} aria-hidden="true">
      {icons[icon] ?? icons["drywall"]}
    </span>
  );
}
