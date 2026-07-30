export default function LicenseButton({ lic, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "font-condensed font-bold text-[13.5px] tracking-[0.04em] uppercase",
        "px-3.5 py-2 border rounded-sm transition-colors duration-150",
        active
          ? "bg-gold text-navy border-gold"
          : "bg-transparent text-gold border-gold hover:bg-gold/10",
      ].join(" ")}
    >
      {lic.label}
    </button>
  );
}
