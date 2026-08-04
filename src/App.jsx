import { useState, useEffect, useRef } from "react";
import giovanniImg from "./assets/Giovanni.png";
import teamImg from "./assets/team.jpg";
// TODO: importa aquí tus fotos adicionales, por ejemplo:
import teamImg2 from "./assets/vera.png";
// TODO: agrega la foto real de Camilo en /src/assets y ajusta el nombre del archivo
import camiloImg from "./assets/CAMILO.png";
// TODO: agrega el PDF del certificado de la Licencia PRO Futsal en /src/assets
import certProPdf from "./assets/coachLicense_FCF_FUTSAL PRO_5475680.pdf";
import certCPdf from "./assets/coachLicense_FCF_C_5475680.pdf";
import certBPdf from "./assets/lic_B.pdf";
// TODO: agrega el PDF de la Tarjeta de Entrenador COCED en /src/assets
import cocedPdf from "./assets/tarjeta_coced.pdf";
import LicenseButton from "./components/LicenseButton.jsx";
import TrainingAlert from "./components/TrainingAlert.jsx";
import { LICENSES, PHONES, EMAIL, waLink, telLink } from "./data/licenses.js";
import facebookIcon from "./assets/FACEBOOK.svg";
import instagramIcon from "./assets/instagram.svg";
import xIcon from "./assets/x.svg";
import youtubeIcon from "./assets/youtube.svg";
import tiktokIcon from "./assets/tiktok.svg";
import linkedinIcon from "./assets/threads.svg";
import gmailIcon from "./assets/gmail.svg";
import logoImg from "./assets/logo.png";
import certProFutsal2026Pdf from "./assets/lic_pro.pdf";
import teamVideo from "./assets/grito-guerra.mp4";
// ---- PDFs asociados a cada licencia (por id) ----
// Agrega aquí una entrada por cada licencia que deba tener botón "Más información" + modal PDF.
// El "id" debe coincidir exactamente con el id definido en data/licenses.js
const LICENSE_CERTS = {
  pro: { pdf: certProPdf, title: "Certificado — Licencia PRO Futsal" },
  c: {pdf: certCPdf, title:"Licencia C — FCF"},
  b: {pdf: certBPdf, title:"Licencia B — FCF"},
  coced: { pdf: cocedPdf, title: "Tarjeta de Entrenador — COCED" },
};

const PRO_FUTSAL_2026_CERT = {
  pdf: certProFutsal2026Pdf,
  title: "Certificado Licencia Pro Futsal 2026 Conmebol",
};
// ---- Redes sociales ----
// TODO: reemplaza cada "url" por el enlace real de cada red/página
// Para Gmail, el enlace normalmente es un mailto: con el correo de contacto
const SOCIAL_LINKS = [
  { name: "Facebook", url: "https://facebook.com/verafc", icon: facebookIcon },
  { name: "Instagram", url: "https://www.instagram.com/verafutbolclub", icon: instagramIcon },
  { name: "X (Twitter)", url: "https://x.com/verafutbolclub", icon: xIcon },
  { name: "YouTube", url: "https://www.youtube.com/@verafutbolclub", icon: youtubeIcon },
  { name: "TikTok", url: "https://tiktok.com/@verafutbolclub", icon: tiktokIcon },
  { name: "Threads", url: "https://threads.net/@verafutbolclub", icon: linkedinIcon },
  { name: "Gmail", url: `mailto:${EMAIL}`, icon: gmailIcon },
];

const FOOTER_SOCIAL_LINKS = [
  { name: "Facebook", url: "https://facebook.com/verafc", icon: facebookIcon },
  { name: "Instagram", url: "https://www.instagram.com/verafutbolclub", icon: instagramIcon },
  { name: "TikTok", url: "https://tiktok.com/@verafutbolclub", icon: tiktokIcon },
];
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
  { type: "video", src: teamVideo, caption: "Video del equipo — VERA FUTBOL CLUB" },
  { src: teamImg, caption: "Cuerpo técnico y plantel — SANPAS Boyacá, Liga BetPlay Futsal FCF" },
  { src: teamImg2, caption: "VERA FUTBOL CLUB - MARCAS LIGA DE FÚTBOL DE BOGOTÁ" },
];

// Duración de cada imagen del slider, en milisegundos
const SLIDER_INTERVAL_MS = 3000;

const formatPhone = (num) => `${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6)}`;

function TeamSlider({ images }) {
  const [index, setIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const total = images.length;
  const current = images[index];
  const intervalRef = useRef(null);
  const videoRef = useRef(null);

  const clearAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    clearAutoplay();
    if (total <= 1) return;

    if (current.type === "video") {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = isMuted;
        videoRef.current.play().catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, SLIDER_INTERVAL_MS);

    return () => clearAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);
  const goTo = (i) => setIndex(i);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  };

  return (
    <div className="relative w-full max-w-[820px] mx-auto">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg border border-gold/25 bg-black shadow-[0_20px_45px_rgba(0,0,0,0.5)]">
        {/* slides */}
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {img.type === "video" ? (
              <video
                ref={i === index ? videoRef : null}
                src={img.src}
                className="w-full h-full object-cover"
                muted={isMuted}
                playsInline
                onEnded={i === index ? goNext : undefined}
              />
            ) : (
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}

        {/* degradado inferior para legibilidad */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 to-transparent z-20 pointer-events-none" />

        {/* caption sobre el degradado */}
        <p className="absolute left-4 right-16 bottom-3 z-30 font-condensed text-xs sm:text-sm tracking-[0.04em] text-white/90 uppercase m-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {current.caption}
        </p>

        {/* botón de sonido, solo para video */}
        {current.type === "video" && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            title={isMuted ? "Activar sonido" : "Silenciar"}
            className="absolute bottom-3 right-3 z-30 w-9 h-9 flex items-center justify-center bg-gold/90 hover:bg-gold text-navy rounded-full shadow-md transition-colors"
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
                <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.2l2.45 2.45c.03-.21.05-.43.05-.65Z" />
                <path d="M19 12a6.97 6.97 0 0 1-1.17 3.88l1.45 1.45A8.93 8.93 0 0 0 21 12c0-4.28-3-7.85-7-8.72v2.06c2.89.81 5 3.44 5 6.66Z" />
                <path d="M4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.53-1.42.95-2.25 1.19v2.06a8.94 8.94 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3Z" />
                <path d="M16.5 12A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4Z" />
                <path d="M14 4v2.06c2.89.81 5 3.44 5 6.66s-2.11 5.85-5 6.66V21c4-.86 7-4.43 7-9s-3-8.14-7-8Z" />
              </svg>
            )}
          </button>
        )}

        {/* flechas de navegación */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-gold hover:text-navy backdrop-blur-sm text-white text-xl font-bold rounded-full transition-all"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-gold hover:text-navy backdrop-blur-sm text-white text-xl font-bold rounded-full transition-all"
            >
              ›
            </button>
          </>
        )}

        {/* etiqueta de conteo */}
        {total > 1 && (
          <span className="absolute top-3 right-3 z-30 font-condensed text-[11px] tracking-[0.08em] text-white/85 bg-black/45 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {index + 1} / {total}
          </span>
        )}
      </div>

      {/* indicadores tipo barra de progreso */}
      {total > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a la foto ${i + 1}`}
              className={`h-[3px] rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-gold" : "w-4 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
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
function SocialLinks({ links }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
      {links.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          title={s.name}
          className="inline-flex items-center justify-center rounded-md shadow-sm hover:opacity-85 hover:-translate-y-0.5 transition-all"
        >
          <img src={s.icon} alt={s.name} className="h-9 sm:h-14 w-auto block" />
        </a>
      ))}
    </div>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.52 3.48A11.92 11.92 0 0 0 12.04 0C5.42 0 .04 5.38.04 12c0 2.12.56 4.2 1.62 6.04L0 24l6.17-1.62A11.98 11.98 0 0 0 12.04 24h.01c6.62 0 12-5.38 12-12a11.9 11.9 0 0 0-3.53-8.52Zm-8.48 18.5h-.01a10 10 0 0 1-5.1-1.39l-.37-.22-3.66.96.98-3.56-.24-.37A9.95 9.95 0 0 1 2.04 12c0-5.51 4.49-10 10-10 2.67 0 5.18 1.04 7.07 2.93a9.92 9.92 0 0 1 2.94 7.07c0 5.51-4.49 10-10.01 10Zm5.48-7.49c-.3-.15-1.76-.86-2.04-.96-.27-.1-.47-.15-.67.15-.2.3-.76.95-.93 1.15-.17.2-.34.22-.63.08-.3-.15-1.26-.47-2.4-1.51a9.06 9.06 0 0 1-1.67-2.08c-.17-.29-.02-.45.13-.6.14-.13.3-.34.45-.51.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.48-.49-.67-.5h-.57c-.2 0-.52.08-.8.37-.27.3-1.04 1.01-1.04 2.46 0 1.44 1.07 2.84 1.22 3.04.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.62.71.22 1.36.18 1.87.11.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}
// Modal simple para mostrar el certificado (PDF) de una licencia
function CertModal({ open, onClose, pdf, title }) {
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 px-0 sm:px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-[760px] bg-navy border border-gold shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden rounded-t-lg sm:rounded-none max-h-[100dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 rounded-full bg-crimson text-white font-bold flex items-center justify-center hover:opacity-85 transition-opacity z-10"
        >
          ×
        </button>
        <div className="p-3 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pr-10 sm:pr-12">
            <p className="font-condensed font-bold text-gold uppercase text-xs sm:text-sm tracking-[0.08em] m-0">
              {title}
            </p>
            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center self-start sm:self-auto font-condensed text-xs font-bold tracking-[0.06em] uppercase text-navy bg-gold px-3 py-2 rounded-sm no-underline hover:opacity-90 transition-opacity"
            >
              Abrir PDF ↗
            </a>
          </div>
          <div className="h-[calc(100dvh-8.5rem)] min-h-[320px] max-h-[calc(100dvh-8.5rem)] sm:h-[78vh] sm:min-h-[520px] sm:max-h-[calc(100dvh-9rem)] border border-white/10 bg-white overflow-hidden rounded-sm">
            <iframe
              src={pdf}
              title={title}
              className="w-full h-full border-0"
            />
          </div>
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

  useEffect(() => {
    if (!activeCert) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [activeCert]);

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
          <div className="px-6 pt-6 sm:pl-10 sm:pt-8 md:pb-8 flex flex-col items-center md:items-start">
            <div className="relative w-[220px] sm:w-[260px] mx-auto md:mx-0">
              <div className="absolute -top-3 -left-3 w-full h-full border-2 border-gold z-0" />
              <img
                src={giovanniImg}
                alt="Eduard Giovanni Morales Vera"
                className="relative z-10 w-full block object-cover aspect-[260/318]"
              />
            </div>
            <div className="mt-4 w-[220px] sm:w-[260px] mx-auto md:mx-0 bg-crimson px-3 py-2 font-condensed font-bold tracking-[0.06em] text-[13px] text-center uppercase">
              Licencia PRO Futsal · Conmebol – FIFA – FCF
            </div>

            <div className="mt-5 w-[220px] sm:w-[260px] mx-auto md:mx-0 rounded-sm border border-gold/35 bg-gradient-to-b from-[#102042] to-[#0a1429] p-3.5 shadow-[0_14px_32px_rgba(0,0,0,0.35)]">
              <p className="font-condensed text-xs font-bold tracking-[0.16em] uppercase text-gold m-0 mb-2.5">
                Contacto directo
              </p>
              <div className="grid gap-2.5">
                {PHONES.map((p) => (
                  <div key={p.number} className="flex items-center justify-between gap-2 border border-white/10 bg-navy3/80 px-2.5 py-2 rounded-sm">
                    <a
                      href={telLink(p.number)}
                      className="font-condensed text-sm font-semibold text-white no-underline hover:text-gold transition-colors"
                    >
                      {p.label}: {formatPhone(p.number)}
                    </a>
                    <a
                      href={waLink(p.number)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp ${p.label}`}
                      title={`WhatsApp ${p.label}`}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-whats text-white shadow-md shadow-black/30 hover:scale-105 hover:brightness-105 transition-all"
                    >
                      <WhatsAppIcon className="w-[18px] h-[18px]" />
                    </a>
                  </div>
                ))}
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-3 inline-flex items-center font-condensed text-sm font-semibold text-gold no-underline hover:text-white transition-colors"
              >
                {EMAIL}
              </a>
            </div>
            {/* Certificado Licencia PRO Futsal 2026 Conmebol */}
            <div className="mt-5 w-[220px] sm:w-[260px] mx-auto md:mx-0 rounded-sm border border-gold/35 bg-gradient-to-b from-[#102042] to-[#0a1429] p-3.5 shadow-[0_14px_32px_rgba(0,0,0,0.35)]">
              <p className="font-condensed text-xs font-bold tracking-[0.16em] uppercase text-gold m-0 mb-2.5">
                Certificado Licencia Pro Futsal 2026 Conmebol
              </p>
              <button
                type="button"
                onClick={() => setActiveCert(PRO_FUTSAL_2026_CERT)}
                className="inline-flex items-center gap-2 bg-gold text-navy font-condensed font-bold text-xs tracking-[0.08em] uppercase px-4 py-2.5 rounded-sm hover:opacity-90 transition-opacity w-full justify-center"
              >
                Ver certificado
              </button>
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

        {/* redes sociales */}
        <div className="relative z-10 mx-6 sm:mx-12 mt-8 pt-6 border-t border-dashed border-white/15">
          <p className="font-condensed text-sm font-bold tracking-[0.22em] uppercase text-gold m-0 mb-3.5">
            Redes sociales
          </p>
          <SocialLinks links={SOCIAL_LINKS} />
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

            <div className="mt-4 rounded-sm border border-gold/35 bg-gradient-to-b from-[#0d1a34] to-[#0a1429] p-3 sm:p-4">
              <p className="font-condensed text-xs font-bold tracking-[0.14em] uppercase text-gold m-0 mb-2.5">
                Video destacado
              </p>
              <div className="relative w-full overflow-hidden rounded-sm border border-white/10 shadow-[0_16px_30px_rgba(0,0,0,0.35)]">
                <div className="w-full aspect-video bg-black">
                  <iframe
                    src="https://www.youtube.com/embed/OXhEgwxUwdQ"
                    title="Camilo Gómez - Video destacado"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* team band */}
        <div className="relative z-10 mx-6 sm:mx-12 mt-8 pt-6 border-t border-dashed border-white/15">
          <p className="font-condensed text-sm font-bold tracking-[0.22em] uppercase text-gold m-0 mb-3.5">
            Equipo
          </p>
          <TeamSlider images={teamImages} />
        </div>

        {/* footer */}
        <footer className="relative z-10 mt-10 bg-[#070b14] border-t border-white/10">
          <div className="px-6 sm:px-12 py-8 sm:py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-3">
                  <img src={logoImg} alt="Logo Vera Futbol Club" className="w-9 h-9 object-contain" />
                  <p className="m-0 font-condensed text-2xl text-[#E7E9EE] uppercase tracking-[0.05em]">
                    Vera Futbol Club
                  </p>
                </div>
                <p className="m-0 mt-4 max-w-[340px] mx-auto md:mx-0 text-[15px] leading-relaxed text-[#A8AFBD]">
                  Plataforma de gestión deportiva enfocada al fútbol y al fútbol sala, con planificación integral de entrenamientos y analítica de rendimiento.
                </p>
              </div>

              <div className="text-center md:text-left">
                <p className="m-0 font-condensed text-xs font-bold tracking-[0.16em] uppercase text-[#B8C0D1] mb-4">
                  Síguenos
                </p>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  {FOOTER_SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      title={s.name}
                      className="w-14 h-14 rounded-xl inline-flex items-center justify-center hover:bg-white/[0.08] hover:border-white/30 transition-all"
                    >
                      <img src={s.icon} alt={s.name} className="h-8 w-auto block opacity-90" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-center md:text-left">
                <p className="m-0 font-condensed text-xs font-bold tracking-[0.16em] uppercase text-[#B8C0D1] mb-3">
                  Desarrollado por
                </p>
                <p className="m-0 text-white font-semibold text-xl">Daniel Jose Morales Teatino</p>
                <a
                  href="mailto:danielmoralesteatino2004@gmail.com"
                  className="inline-block mt-2 text-[15px] text-[#A8AFBD] no-underline hover:text-white transition-colors"
                >
                  danielmoralesteatino2004@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-12 border-t border-white/10 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <p className="m-0 text-sm text-[#7E8697]">© 2026 VERA FUTBOL CLUB. Todos los derechos reservados.</p>
              <p className="m-0 text-sm text-[#7E8697]">Ingeniería de software: Daniel Jose Morales Teatino</p>
            </div>
          </div>
        </footer>
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
