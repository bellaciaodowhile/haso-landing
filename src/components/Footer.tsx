import certCNPC from "../assets/certificaciones/CNPC.png";
import certConagua from "../assets/certificaciones/Logo_de_la_Conagua.svg.png";
import certProfepa from "../assets/certificaciones/Logo_PROFEPA.png";
import certPCMichoacan from "../assets/certificaciones/PCMichoacàn.png";
import certSemarnat from "../assets/certificaciones/SEMARNAT_Logo_(2024).png";
import certSTPS from "../assets/certificaciones/STPS_Logo_(2024).png";
import certConocer from "../assets/certificaciones/conocer_logo.jpg";
import politicaPrivacidadPDF from "../assets/PoliticaPrivacidad.pdf";

export default function Footer() {
  return (
    <footer className="w-full bg-white" aria-label="Footer">
      {/* CERTIFICACIONES */}
      <section className="w-full py-10 sm:py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-12 items-start gap-6 sm:gap-8 md:gap-10">
            {/* Texto izquierda */}
            <div className="col-span-12 md:col-span-5 text-center md:text-left flex flex-col items-center md:items-start">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black leading-[1.05] text-[#0f1932]">
                Nuestras
                <br />
                certificaciones
              </h3>
              <p className="mt-4 sm:mt-5 max-w-[360px] text-sm sm:text-[15px] font-semibold leading-relaxed text-slate-700">
                Contamos con laboratorios acreditados y con gran variedad de servicios bajo
                las siguientes normas.
              </p>
            </div>

            {/* Logos derecha (placeholders) */}
            <div className="col-span-12 md:col-span-7">
              <div className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-4 sm:gap-x-10 sm:gap-y-6 sm:grid-cols-3 md:grid-cols-4 md:justify-items-end">
                {[
                  { src: certCNPC, alt: "CNPC" },
                  { src: certConagua, alt: "CONAGUA" },
                  { src: certProfepa, alt: "PROFEPA" },
                  { src: certPCMichoacan, alt: "PC Michoacán" },
                  { src: certSemarnat, alt: "SEMARNAT" },
                  { src: certSTPS, alt: "STPS" },
                  { src: certConocer, alt: "Conocer" },
                ].map((c) => (
                  <img
                    key={c.alt}
                    src={c.src}
                    alt={c.alt}
                    className="h-[36px] w-[100px] sm:h-[42px] sm:w-[120px] md:h-[46px] md:w-[140px] object-contain opacity-95"
                    draggable={false}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO CARD */}
      <section id="contacto" className="w-full pb-16 scroll-mt-[96px]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="rounded-[20px] sm:rounded-[28px] bg-[#f3f3f3] p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="grid grid-cols-12 items-start gap-6 sm:gap-8 md:gap-10">
              {/* Columna izquierda */}
              <div className="col-span-12 md:col-span-7">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-black">Contacto</h3>
                <p className="mt-3 max-w-[520px] text-sm sm:text-[15px] font-semibold leading-relaxed text-slate-700">
                  Para dudas relacionadas a capacitación o fines comerciales <br className="hidden sm:block" /> por favor
                  contactarse a los siguientes números.
                </p>

                <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 sm:grid-cols-2">
                  {/* Contacto 1 */}
                  <div>
                    <div className="text-base sm:text-lg md:text-[18px] font-extrabold leading-[1.1] text-[#62a95f]">
                      Coordinador
                      <br />
                      de capacitacion
                    </div>
                    <div className="mt-4 sm:mt-5 text-base sm:text-lg md:text-[18px] font-extrabold text-slate-700 leading-[1.1]">
                      Rene Madrigal
                    </div>
                    <div className="mt-3 sm:mt-4 space-y-1 text-sm sm:text-base md:text-[17px] font-semibold text-slate-700">
                      <div className="leading-[1.1]">44 31668551</div>
                      <div className="leading-[1.1]">capacitacion@grupohaso.com.mx</div>
                    </div>
                    <div className="mt-3 sm:mt-4 text-base sm:text-lg md:text-[18px] font-extrabold leading-[1.1] text-[#62a95f]">
                      Oficina: <span className="text-slate-700 leading-[1.1]">443 382 6927</span>
                    </div>
                  </div>

                  {/* Contacto 2 */}
                  <div>
                    <div className="text-base sm:text-lg md:text-[18px] font-extrabold leading-[1.1] text-[#62a95f]">
                      Directora
                      <br />
                      de ventas
                    </div>
                    <div className="mt-4 sm:mt-5 text-base sm:text-lg md:text-[18px] font-extrabold leading-[1.1] text-slate-700">
                       Anahí Hernandez
                    </div>
                    <div className="mt-3 sm:mt-4 space-y-1 text-sm sm:text-base md:text-[17px] font-semibold text-slate-700">
                      <div className="leading-[1.1]">+52 1 55 3442 7319</div>
                      <div className="leading-[1.1]">ventas@grupohaso.com.mx</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mapa derecha (placeholder) */}
              <div className="col-span-12 md:col-span-5">
                <div className="h-[220px] sm:h-[260px] md:h-[280px] w-full overflow-hidden rounded-[14px] bg-white shadow-sm">
                  <iframe
                    title="Ubicación HASO"
                    src="https://www.google.com/maps?q=C.+Pedro+Aranda+564,+Alcalde+Ignacio+Pérez,+58190+Morelia,+Michoacán,+México&output=embed"
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL + TEXTO + PRIVACIDAD */}
      <section className="w-full pb-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-8">
            {/* Íconos arriba */}
            <div className="flex items-center justify-center gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/hasoambientalocupacional"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 transition-transform hover:scale-110"
              >
                <svg
                  className="h-6 w-6 shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/feed/update/urn:li:activity:7421658204322951169"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0077b5] transition-transform hover:scale-110"
              >
                <svg
                  className="h-6 w-6 shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/p/1AVLqQfJcU/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1877f2] transition-transform hover:scale-110"
              >
                <svg
                  className="h-6 w-6 shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@consultoria_haso?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black transition-transform hover:scale-110"
              >
                <svg
                  className="h-6 w-6 shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>

            {/* Texto + privacidad abajo */}
            <div className="flex flex-col items-center text-center">
              <p className="max-w-[620px] text-[14px] font-semibold leading-relaxed text-slate-700">
                © HASO. Empresa especializada en gestión de riesgos y cumplimiento normativo, cada cliente es un proyecto, cada proyecto un compromiso.
              </p>

              <a
                href={politicaPrivacidadPDF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-[14px] font-semibold text-slate-800 underline underline-offset-4"
              >
                Politica de privacidad
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* COPYRIGHT */}
      <div className="w-full border-t border-slate-200 py-6">
        <div className="mx-auto max-w-6xl px-6 text-center text-[13px] font-semibold text-slate-600">
          Haso Group todos los derechos reservados - 2025
        </div>
      </div>
    </footer>
  );
}
