import React from "react";
import hasoLogo from "../assets/logos/logo_haso-02.png";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "¿Quiénes somos?", href: "#quienes-somos" },
  { label: "Cursos", href: "#cursos" },
  { label: "Consultorías", href: "#cursos" },
  { label: "Contáctanos", href: "#contacto" },
];

function scrollToHash(hash: string) {
  if (!hash || !hash.startsWith("#")) return;
  const el = document.querySelector(hash);
  if (!el) return;

  // Respeta el header fijo (navbar alto 72px)
  const headerOffset = 72;
  const rect = el.getBoundingClientRect();
  const top = window.scrollY + rect.top - headerOffset;

  window.scrollTo({ top, behavior: "smooth" });
}

export type NavbarProps = {
  /** Si tienes el logo en assets, pásalo acá (ej: import logo from '../assets/haso-logo.png') */
  logoSrc?: string;
  /** Alt del logo */
  logoAlt?: string;
};

export default function Navbar({ logoSrc, logoAlt = "HASO" }: NavbarProps) {
  React.useEffect(() => {
    // Si llegas con hash en la URL, hace scroll suave.
    if (window.location.hash) {
      setTimeout(() => scrollToHash(window.location.hash), 0);
    }

    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 h-[60px] w-full bg-gradient-to-b from-[#111f3d] to-[#0d1730]"
      aria-label="Navegación principal"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between">
        {/* Logo (volver al home) */}
        <div className="flex items-center">
          <a
            href="/"
            aria-label="Ir al inicio"
            className="inline-flex items-center"
          >
            <img
              src={logoSrc ?? hasoLogo}
              alt={logoAlt}
              className="h-[36px] pl-5 w-auto select-none"
              draggable={false}
            />
          </a>
        </div>

        {/* Links centrados (desktop) */}
        <nav className="hidden flex-1 items-center justify-center gap-14 md:flex" aria-label="Secciones">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[14px] font-extrabold uppercase tracking-[0.09em] text-white hover:text-white visited:text-white"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", item.href);
                scrollToHash(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA derecha */}
        <div className="flex items-center">
          <button
            type="button"
            className="inline-flex h-[34px] mr-2 items-center justify-center rounded-full bg-[#6bb16e] px-6 text-[16px] font-extrabold text-white shadow-[0_2px_0_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 hover:bg-[#5fa963] active:translate-y-0"
            onClick={() => {
              window.history.pushState({}, "", "#cotiza");
              scrollToHash("#cotiza");
            }}
          >
            Cotiza aquí
          </button>
        </div>
      </div>
    </header>
  );
}