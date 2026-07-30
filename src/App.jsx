import { useState, useEffect, useRef } from "react";
import giovanniImg from "./assets/Giovanni.png";
import teamImg from "./assets/team.jpg";
// TODO: importa aquí tus fotos adicionales, por ejemplo:
import teamImg2 from "./assets/vera.png";
// TODO: agrega la foto real de Camilo en /src/assets y ajusta el nombre del archivo
import camiloImg from "./assets/camilo.png";
// TODO: agrega el PDF del certificado de la Licencia PRO Futsal en /src/assets
import certProPdf from "./assets/lic_pro.pdf";
// TODO: agrega el PDF de la Tarjeta de Entrenador COCED en /src/assets
import cocedPdf from "./assets/tarjeta_coced.pdf";
import LicenseButton from "./components/LicenseButton.jsx";
import TrainingAlert from "./components/TrainingAlert.jsx";
import { LICENSES, PHONES, EMAIL, waLink, telLink } from "./data/licenses.js";

// ---- PDFs asociados a cada licencia (por id) ----
// Agrega aquí una entrada por cada licencia que deba tener botón "Más información" + modal PDF.
// El "id" debe coincidir exactamente con el id definido en data/licenses.js
const LICENSE_CERTS = {
  pro: { pdf: certProPdf, title: "Certificado — Licencia PRO Futsal" },
  coced: { pdf: cocedPdf, title: "Tarjeta de Entrenador — COCED" },
};

// ---- Educación académica ampliada ----
const EDUCATION = [
  {
    title: "Mg. Ciencias del Deporte y la Actividad Física",
    org: "Universidad Pedagógica Nacional (UPN), Bogotá",
  },
  {
    title: "Licenciado en Educación Física, Deporte y Recreación",
    org: "UPN CVT, Bogotá",
  },
  {
    title: "Administrador Deportivo",
    org: "Universidad Distrital, Bogotá",
  },
  {
    title: "Especialista en Fútbol",
    org: "Universidad del Tolima, Ibagué",
  },
  {
    title: "Diplomado en Fútbol",
    org: "IEU Escuela Nacional del Deporte, Cali",
  },
  {
    title: "Licencia PRO Futsal FCF",
    org: "IEU Escuela Nacional del Deporte, Cali",
  },
  {
    title: "Licencia A Fútbol",
    org: "Universidad Sergio Arboleda, Bogotá",
  },
  {
    title: "Licencia B Fútbol",
    org: "Universidad de San Buenaventura, Cali",
  },
  {
    title: "Licencia C Fútbol",
    org: "Difutbol FCF, Bogotá",
  },
];

// ---- Reconocimientos / logros ----
const ACHIEVEMENTS = [
  "Mejor Entrenador de Bogotá — IDRD, 1997",
  "Mejor Escuela Deportiva Bogotá, 1998",
  "Campeón Escuelas Deportivas Bogotá, 1998, 1999, 2000, 2001, 2002, 2003",
  "Campeón Mundialito Fútbol IDRD – Cafam, 1998, Bogotá",
  "Campeón Distrital Fútbol Sala, 2002, 2003, 2004, Bogotá",
  "Subcampeón 1er. Semiprofesional Colombia Fútbol Sala, 2003, Bogotá",
  "Campeón Departamental Futsal y Fútbol Infantil, Boyacá, 2006–2011",
  "Campeón Intercolegiado Boyacá, 2006, 2008, 2009",
  "Subcampeón Liga Argos Futsal 2012 — Sanpas, Tunja",
  "Entrenador/formador de deportistas de Selecciones Bogotá, Boyacá, Cundinamarca y Selección Colombia, en Fútbol y Futsal (campeones nacionales y mundiales)",
];

// ---- Fotos del equipo (agrega más aquí) ----
const teamImages = [
  { src: teamImg, caption: "Cuerpo técnico y plantel — SANPAS Boyacá, Liga BetPlay Futsal FCF" },
  { src: teamImg2, caption: "VERA FUTBOL CLUB - MARCAS LIGA DE FÚTBOL DE BOGOTÁ" },
  // { src: teamImg3, caption: "Descripción de la tercera foto" },
];

// Duración de cada imagen del slider, en milisegundos
const SLIDER_INTERVAL_MS = 3000;

function TeamSlider({ images }) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const current = images[index];
  const intervalRef = useRef(null);

  const resetAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (total > 1) {
      intervalRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % total);
      }, SLIDER_INTERVAL_MS);
    }
  };

  // Arranca el autoplay al montar y cada vez que cambie el número de imágenes
  useEffect(() => {
    resetAutoplay();
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const goPrev = () => {
    setIndex((i) => (i - 1 + total) % total);
    resetAutoplay();
  };
  const goNext = () => {
    setIndex((i) => (i + 1) % total);
    resetAutoplay();
  };
  const goTo = (i) => {
    setIndex(i);
    resetAutoplay();
  };

  return (
    <div className="relative">
      <div className="relative overflow-hidden">
        <img
          src={current.src}
          alt={current.caption}
          className="w-full block"
        />
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/50 hover:bg-black/70 transition-colors text-white text-lg font-bold rounded-full"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Foto siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/50 hover:bg-black/70 transition-colors text-white text-lg font-bold rounded-full"
            >
              ›
            </button>
          </>
        )}
      </div>
      {total > 1 && (
        <div className="flex justify-center gap-2 mt-2.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a la foto ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? "bg-gold" : "bg-white/25"
              }`}
            />
          ))}
        </div>
      )}
      <p className="font-condensed text-xs tracking-[0.04em] text-[#9CA6B8] mt-2 uppercase">
        {current.caption}
      </p>
    </div>
  );
}

// Tarjeta de Camilo Andrés Gómez Vanegas con su foto
function CamiloCard({ img }) {
  return (
    <div className="flex items-center gap-5 bg-navy3 border border-white/10 rounded-sm p-4 mt-3">
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0">
        <div className="absolute -top-2 -left-2 w-full h-full z-0 rounded-full" />
        <img
          src={img}
          alt="Camilo Andrés Gómez Vanegas"
          className="relative z-10 w-full h-full object-cover rounded-full "
        />
      </div>
      <div>
        <p className="font-condensed font-bold text-white uppercase tracking-[0.02em] text-lg m-0">
          Camilo Andrés Gómez Vanegas
        </p>
        <p className="font-condensed text-xs text-gold uppercase tracking-[0.08em] m-0 mt-1">
          Campeón Mundial de Futsal
        </p>
      </div>
    </div>
  );
}

// Modal simple para mostrar el certificado (PDF) de una licencia
function CertModal({ open, onClose, pdf, title }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-[640px] w-full bg-navy border border-gold shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-crimson text-white font-bold flex items-center justify-center hover:opacity-85 transition-opacity"
        >
          ×
        </button>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <p className="font-condensed font-bold text-gold uppercase text-sm tracking-[0.08em] m-0">
              {title}
            </p>
            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="font-condensed text-xs font-bold tracking-[0.06em] uppercase text-navy bg-gold px-3 py-1.5 rounded-sm no-underline hover:opacity-90 transition-opacity"
            >
              Abrir PDF ↗
            </a>
          </div>
          {/* Visor embebido del PDF; si el navegador no lo soporta, usar el botón de arriba */}
          <object
            data={pdf}
            type="application/pdf"
            className="w-full h-[70vh] border border-white/10 bg-white"
          >
            <p className="text-sm text-[#C7CDDA] p-4">
              Tu navegador no puede mostrar el PDF aquí. Usa el botón "Abrir PDF ↗" para verlo.
            </p>
          </object>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState("pro");
  const [alertOpen, setAlertOpen] = useState(true);
  // Guarda el certificado (pdf + title) que se está mostrando en el modal, o null si está cerrado
  const [activeCert, setActiveCert] = useState(null);
  const active = LICENSES.find((l) => l.id === activeId);
  // Certificado asociado a la licencia actualmente seleccionada (si existe)
  const currentCert = active ? LICENSE_CERTS[active.id] : null;

  return (
    <div className="min-h-screen w-full bg-[#060d1c] flex justify-center px-2 py-6 sm:px-4 sm:py-8 font-sans">
      {alertOpen && <TrainingAlert onClose={() => setAlertOpen(false)} />}
      <div className="w-full max-w-[1000px] relative overflow-hidden bg-navy text-paper border border-white/5 shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
        {/* signature court motif: cancha de fútbol sala (proporción real 2:1, sin deformar) */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center pt-20 sm:pt-28 opacity-[0.07]">
          <div className="w-[88%] max-w-[820px] aspect-[2/1]">
            <svg
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full"
            >
              {/* contorno de la cancha */}
              <rect x="10" y="10" width="980" height="480" fill="none" stroke="#FFCE00" strokeWidth="4" />
              {/* línea de mediocampo */}
              <line x1="500" y1="10" x2="500" y2="490" stroke="#FFCE00" strokeWidth="4" />
              {/* círculo central */}
              <circle cx="500" cy="250" r="80" fill="none" stroke="#FFCE00" strokeWidth="4" />
              <circle cx="500" cy="250" r="5" fill="#FFCE00" />
              {/* arcos de esquina */}
              <path d="M 10 45 A 35 35 0 0 1 45 10" fill="none" stroke="#FFCE00" strokeWidth="4" />
              <path d="M 955 10 A 35 35 0 0 1 990 45" fill="none" stroke="#FFCE00" strokeWidth="4" />
              <path d="M 990 455 A 35 35 0 0 1 955 490" fill="none" stroke="#FFCE00" strokeWidth="4" />
              <path d="M 45 490 A 35 35 0 0 1 10 455" fill="none" stroke="#FFCE00" strokeWidth="4" />
              {/* área y arco de penal — lado izquierdo */}
              <rect x="10" y="140" width="90" height="220" fill="none" stroke="#FFCE00" strokeWidth="4" />
              <path d="M 100 190 A 60 60 0 0 1 100 310" fill="none" stroke="#FFCE00" strokeWidth="4" />
              <circle cx="70" cy="250" r="4" fill="#FFCE00" />
              <circle cx="130" cy="250" r="4" fill="#FFCE00" />
              {/* área y arco de penal — lado derecho */}
              <rect x="900" y="140" width="90" height="220" fill="none" stroke="#FFCE00" strokeWidth="4" />
              <path d="M 900 190 A 60 60 0 0 0 900 310" fill="none" stroke="#FFCE00" strokeWidth="4" />
              <circle cx="930" cy="250" r="4" fill="#FFCE00" />
              <circle cx="870" cy="250" r="4" fill="#FFCE00" />
            </svg>
          </div>
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
              <div className="grid grid-cols-1 gap-2.5">
                {EDUCATION.map((ed, i) => (
                  <div key={i} className="grid grid-cols-[14px_1fr] gap-2.5">
                    <div className="w-[7px] h-[7px] rounded-full bg-gold mt-2" />
                    <div>
                      <p className="text-[15px] leading-snug text-[#EDEFF3] m-0">{ed.title}</p>
                      <p className="text-[13px] text-[#9CA6B8] m-0">{ed.org}</p>
                    </div>
                  </div>
                ))}
              </div>
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

                  {/* Botón "Más información" para cualquier licencia que tenga PDF asociado en LICENSE_CERTS */}
                  {currentCert && (
                    <button
                      type="button"
                      onClick={() => setActiveCert(currentCert)}
                      className="mt-3.5 inline-flex items-center gap-2 bg-gold text-navy font-condensed font-bold text-xs tracking-[0.08em] uppercase px-4 py-2.5 rounded-sm hover:opacity-90 transition-opacity"
                    >
                      Más información
                    </button>
                  )}
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
              <div className="grid grid-cols-[22px_1fr] gap-2.5 mb-3">
                <div className="w-[9px] h-[9px] rounded-full bg-crimson mt-1.5" />
                <div>
                  <p className="font-condensed font-bold text-[17px] uppercase text-white m-0">
                    Condor Santa Fe
                  </p>
                  <p className="text-sm text-[#C7CDDA] mt-0.5 mb-0">
                    Club profesional de fútbol sala — Liga Argos Futsal FCF
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[22px_1fr] gap-2.5 mb-3">
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

        {/* reconocimientos */}
        <div className="relative z-10 mx-6 sm:mx-12 mt-1 pt-6 border-t border-dashed border-white/15">
          <p className="font-condensed text-sm font-bold tracking-[0.22em] uppercase text-gold m-0 mb-3.5">
            Reconocimientos / Logros
          </p>
          <ul className="list-none p-0 m-0 grid grid-cols-1 gap-2 mb-4">
            {ACHIEVEMENTS.map((a, i) => (
              <li key={i} className="grid grid-cols-[16px_1fr] gap-2.5">
                <div className="w-[7px] h-[7px] rounded-full bg-crimson mt-2" />
                <p className="text-sm leading-relaxed text-[#C7CDDA] m-0">{a}</p>
              </li>
            ))}
          </ul>
          <div className="bg-navy3 border-l-[3px] border-gold px-4 py-3.5">
            <p className="text-sm leading-relaxed text-[#C7CDDA] m-0">
              Máximo referente de Vera Fútbol Club:{" "}
              <span className="font-semibold text-white">Camilo Andrés Gómez Vanegas</span>,
              Campeón Mundial de Futsal, múltiple campeón nacional, suramericano, de los
              Juegos Mundiales y Panamericanos.
            </p>
            <a
              href="https://www.ceroacero.com.co/jugador/camilo-gomez/709420/resultados?edicao_id=159954&eve=gol&tpstats=national&id=709420&op=zoomstats"
              target="_blank"
              rel="noopener noreferrer"
              className="font-condensed text-xs font-bold tracking-[0.06em] uppercase text-gold no-underline mt-2 inline-block"
            >
              Ver estadísticas →
            </a>

            {/* Tarjeta con la foto de Camilo Andrés Gómez */}
            <CamiloCard img={camiloImg} />
          </div>
        </div>

        {/* team band */}
        <div className="relative z-10 mx-6 sm:mx-12 mt-8 pt-6 border-t border-dashed border-white/15">
          <p className="font-condensed text-sm font-bold tracking-[0.22em] uppercase text-gold m-0 mb-3.5">
            Equipo
          </p>
          <TeamSlider images={teamImages} />
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

      {/* Modal del certificado/PDF de la licencia seleccionada */}
      <CertModal
        open={!!activeCert}
        onClose={() => setActiveCert(null)}
        pdf={activeCert?.pdf}
        title={activeCert?.title}
      />
    </div>
  );
}
