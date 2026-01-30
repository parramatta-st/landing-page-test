export function Section({
  id,
  title,
  subtitle,
  children,
  tone = "plain",
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  tone?: "plain" | "orange" | "blue";
}) {
  const toneClass =
    tone === "orange"
      ? "bg-cream/70"
      : tone === "blue"
        ? "bg-mint2/70"
        : "bg-transparent";

  return (
    <section id={id} className={`relative py-12 ${toneClass}`}>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h2 className="text-2xl font-semibold tracking-tight text-brand-orange md:text-3xl">
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-2 max-w-2xl text-neutral-600">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
