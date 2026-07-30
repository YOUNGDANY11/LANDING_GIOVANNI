import { useState } from "react";
import giovanniImg from "./assets/Giovanni.png";
import teamImg from "./assets/team.jpg";
import LicenseButton from "./components/LicenseButton.jsx";
import TrainingAlert from "./components/TrainingAlert.jsx";
import { LICENSES, PHONES, EMAIL, waLink, telLink } from "./data/licenses.js";

export default function App() {
  const [activeId, setActiveId] = useState("pro");
  const [alertOpen, setAlertOpen] = useState(true);

  const active = LICENSES.find((l) => l.id === activeId);

  return (
    <div className="min-h-screen w-full bg-[#060d1c] flex justify-center px-2 py-6 sm:px-4 sm:py-8 font-sans">
      {alertOpen && <TrainingAlert onClose={() => setAlertOpen(false)} />}

      <div className="w-full max-w-[1000px] relative overflow-hidden bg-navy text-paper border border-white/5 shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
        {/* signature court-line motif */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
          <svg viewBox="0 0 1000 1500" preserveAspectRatio="none" className="w-full h-full">
            <circle cx="500" cy="230" r="150" fill="none" stroke="#FFCE00" strokeWidth="2" />
            <line x1="0" y1="230" x2="1000" y2="230" stroke="#FFCE00" strokeWidth="2" />
            <circle cx="500" cy="230" r="4" fill="#FFCE00" />
          </svg>
        </div>

        {/* header */}
        <div className="relative z-10 px-6 sm:px-12 pt-8 sm:pt-10 pb-6 sm:pb-7 border-b-2 border-gold">

          <h1 className="font-display font-normal text-[34px] sm:text-[50px] leading-[0.98] m-0 text-white uppercase">
            Eduard Giovanni
            <br />
            Morales Vera
          </h1>
          <p className="font-condensed text-lg sm:text-xl font-semibold text-gold uppercase tracking-[0.06em] mt-2">
            Director Técnico Profesional de Fútbol Sala
          </p>
        </div>

        {/* main grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[300px_1fr]">
          {/* photo column */}
          <div className="px-6 pt-6 sm:pl-10 sm:pt-8 md:pb-8 flex flex-col items-start">
            <div className="relative w-[220px] sm:w-[260px]">
              <div className="absolute -top-3 -left-3 w-full h-full border-2 border-gold z-0" />
              <img
                src={giovanniImg}
                alt="Eduard Giovanni Morales Vera"
                className="relative z-10 w-full block object-cover aspect-[260/318]"
              />
            </div>
            <div className="mt-4 w-[220px] sm:w-[260px] bg-crimson px-3 py-2 font-condensed font-bold tracking-[0.06em] text-[13px] text-center uppercase">
              Licencia PRO Futsal · Conmebol – FIFA – FCF
            </div>
          </div>

          {/* info column */}
          <div className="px-6 pt-6 pb-2 sm:pl-9 sm:pr-12 sm:pt-8">
            {/* formación */}
            <div className="mb-6">
              <p className="font-condensed text-sm font-bold tracking-[0.22em] uppercase text-gold m-0 mb-2.5 pb-2 border-b border-white/15">
                Formación académica
              </p>
              <p className="text-[16px] leading-relaxed text-[#EDEFF3] m-0 mb-1">
                Magíster en Ciencias del Deporte y la Actividad Física
              </p>
              <p className="text-sm text-[#9CA6B8] m-0">Universidad Pedagógica Nacional (UPN)</p>
            </div>

            {/* licencias */}
            <div className="mb-6">
              <p className="font-condensed text-sm font-bold tracking-[0.22em] uppercase text-gold m-0 mb-2.5 pb-2 border-b border-white/15">
                Licencias de entrenador
                <span className="block text-[11px] tracking-[0.04em] text-[#8B96AA] font-medium normal-case mt-1">
                  Toca una licencia para ver el detalle
                </span>
              </p>
              <div className="flex flex-wrap gap-2 mb-3.5">
                {LICENSES.map((lic) => (
                  <LicenseButton
                    key={lic.id}
                    lic={lic}
                    active={activeId === lic.id}
                    onClick={() => setActiveId(lic.id)}
                  />
                ))}
              </div>

              {active && (
                <div className="bg-navy3 border-l-[3px] border-gold px-4 py-3.5">
                  <p className="font-condensed font-bold text-base text-white uppercase tracking-[0.02em] m-0 mb-1">
                    {active.title}
                  </p>
                  <p className="font-condensed text-xs text-gold uppercase tracking-[0.08em] m-0 mb-2">
                    {active.org}
                  </p>
                  <p className="text-sm leading-relaxed text-[#C7CDDA] m-0">{active.body}</p>
                </div>
              )}
            </div>

            {/* trayectoria */}
            <div>
              <p className="font-condensed text-sm font-bold tracking-[0.22em] uppercase text-gold m-0 mb-2.5 pb-2 border-b border-white/15">
                Trayectoria / Clubes
              </p>
              <div className="grid grid-cols-[22px_1fr] gap-2.5 mb-3">
                <div className="w-[9px] h-[9px] rounded-full bg-crimson mt-1.5" />
                <div>
                  <p className="font-condensed font-bold text-[17px] uppercase text-white m-0">Vera FC</p>
                  <p className="text-sm text-[#C7CDDA] mt-0.5 mb-0">
                    Escuela deportiva y club deportivo formativo
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[22px_1fr] gap-2.5">
                <div className="w-[9px] h-[9px] rounded-full bg-crimson mt-1.5" />
                <div>
                  <p className="font-condensed font-bold text-[17px] uppercase text-white m-0">
                    SANPAS Boyacá
                  </p>
                  <p className="text-sm text-[#C7CDDA] mt-0.5 mb-0">
                    Club profesional de fútbol sala — Liga BetPlay Futsal FCF
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* team band */}
        <div className="relative z-10 mx-6 sm:mx-12 mt-1 pt-6 border-t border-dashed border-white/15">
          <p className="font-condensed text-sm font-bold tracking-[0.22em] uppercase text-gold m-0 mb-3.5">
            Equipo
          </p>
          <img src={teamImg} alt="Cuerpo técnico y plantel SANPAS Boyacá" className="w-full block" />
          <p className="font-condensed text-xs tracking-[0.04em] text-[#9CA6B8] mt-2 uppercase">
            Cuerpo técnico y plantel — SANPAS Boyacá, Liga BetPlay Futsal FCF
          </p>
        </div>

        {/* footer / contacts */}
        <div className="relative z-10 mt-8 bg-navy2 border-t-2 border-crimson px-6 py-5 sm:px-12 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-col gap-3">
            {PHONES.map((p) => (
              <div key={p.number} className="flex items-center gap-3 flex-wrap">
                <span className="font-condensed text-base font-semibold text-white">
                  {p.label}: {p.number.slice(0, 3)} {p.number.slice(3, 6)} {p.number.slice(6)}
                </span>
                <a
                  href={waLink(p.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-condensed font-bold text-xs tracking-[0.06em] uppercase text-white bg-whats px-2.5 py-1.5 rounded-sm no-underline hover:opacity-85 transition-opacity"
                >
                  WhatsApp
                </a>
              </div>
            ))}
            <a href={`mailto:${EMAIL}`} className="font-condensed text-sm font-semibold text-gold no-underline">
              {EMAIL}
            </a>
          </div>
          <div className="font-condensed text-xs tracking-[0.18em] uppercase text-[#7C879C]">
            Federación Colombiana de Fútbol · Liga BetPlay Futsal
          </div>
        </div>
      </div>
    </div>
  );
}
