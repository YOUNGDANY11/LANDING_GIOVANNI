import { useEffect, useState } from "react";

export default function TrainingAlert({ onClose }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setEntered(false);
    setTimeout(onClose, 400);
  };

  return (
    <div
      className={[
        "fixed top-20 right-3 z-50 w-[82vw] max-w-[280px] sm:right-5 sm:max-w-xs",
        "pointer-events-none",
      ].join(" ")}
      aria-live="polite"
    >
      <div
        className={[
          "pointer-events-auto relative rounded-lg border-2 border-crimson",
          "bg-gold/85 backdrop-blur-md shadow-2xl shadow-black/50",
          "px-4 py-4 transition-transform duration-500 ease-out will-change-transform",
          entered ? "translate-x-0" : "translate-x-[140%]",
        ].join(" ")}
      >
        <button
          onClick={handleClose}
          aria-label="Cerrar aviso"
          className="absolute top-1.5 right-2 font-condensed font-bold text-lg leading-none text-navy hover:text-crimson transition-colors"
        >
          ×
        </button>
        <p className="font-condensed font-bold text-[13px] tracking-[0.16em] uppercase text-crimson m-0">
          Primer entrenamiento
        </p>
        <p className="font-sans font-semibold text-[15px] leading-snug text-navy mt-1 mb-0">
          Lunes 3 de agosto · 4:00 PM
          <br />
          Parque Zonal El Redentor
        </p>
      </div>
    </div>
  );
}
