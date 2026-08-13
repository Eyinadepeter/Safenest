interface InfoCardProps {
  title: string;
  description: string;
}

/**
 * Plain mint card (heading + paragraph, no icon) used for the "Common
 * questions" FAQ grid. Visually related to the icon feature cards in
 * app/whyChoose.tsx, but that component is reused wholesale elsewhere and
 * is left untouched — this is a lighter variant for icon-less content.
 */
export default function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="rounded-2xl bg-mint p-8">
      <h3 className="text-base font-bold text-navy">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-navy/70">
        {description}
      </p>
    </div>
  );
}
