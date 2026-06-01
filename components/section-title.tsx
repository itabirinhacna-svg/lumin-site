type SectionTitleProps = {
  kicker: string;
  title: string;
  description: string;
};

export function SectionTitle({ kicker, title, description }: SectionTitleProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div className="kicker">{kicker}</div>
      <h2>{title}</h2>
      <p style={{ maxWidth: 760 }}>{description}</p>
    </div>
  );
}

