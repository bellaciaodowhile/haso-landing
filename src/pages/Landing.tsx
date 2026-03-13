import React from "react";
import Navbar from "../components/Navbar";
import slidePromo1 from "../assets/29/img promo 1.jpg";
import slidePromo2 from "../assets/29/img promo 2.jpg";
import slidePromo3 from "../assets/29/img promo 3.jpg";
import marca3B from "../assets/marcas/3B.png";
import marca4pck from "../assets/marcas/4pck.webp";
import marcaRotork from "../assets/marcas/16-rotork.png";
import marcaAAK from "../assets/marcas/AAK_ 2024-04-03 172051.png";
import marcaAdeac from "../assets/marcas/Adeac.png";
import marcaAgucatechahena from "../assets/marcas/agucatechahena.png";
import marcaAutocom from "../assets/marcas/Autocom_ 2024-04-03 172041.png";
import marcaCitelis from "../assets/marcas/citelis-logo-color.png";
import marcaContinental2 from "../assets/marcas/Continental_2.png";
import marcaDefrut from "../assets/marcas/defrut.png";
import marcaDriscolls from "../assets/marcas/Driscolls.jpg";
import marcaFarmaciaSimilares from "../assets/marcas/Farmaciasimilares.webp";
import marcaGasomich from "../assets/marcas/GASOMICH.png";
import marcaGlobalSolutions from "../assets/marcas/Global solutions.jpg";
import marcaGNU from "../assets/marcas/GNU.jfif";
import marcaGrupoRavisa from "../assets/marcas/Grupo_Ravisa_ 2024-04-03 171931.png";
import marcaIMSS from "../assets/marcas/imss.jpg";
import marcaJRS from "../assets/marcas/JRS.png";
import marcaLemart from "../assets/marcas/lemart.webp";
import marcaMindUp from "../assets/marcas/Logo-MindUp-Academy.png";
import marcaPlastiper from "../assets/marcas/plastiper.png";
import marcaProfertes from "../assets/marcas/profertes.png";
import webHaso03 from "../assets/logos/WEB_HASO-03.png";
import iconWhatsApp from "../assets/icon-whatsapp.webp";
import Footer from "../components/Footer";
import Cursos from "./Cursos";

const TESTIMONIALS = [
  {
    id: "citelis",
    body:
      "Agradezco sinceramente el apoyo y la disposición que nos han brindado a lo largo de estos años de trabajo en conjunto. Ha sido un gusto contar con su profesionalismo y compromiso, los cuales han sido clave para lograr buenos resultados, por lo que consideró que son una empresa ampliamente recomendable. Gracias por su acompañamiento y colaboración constante.",
    author: "Bella Esmeralda García",
    company: "CITELIS",
  },
  {
    id: "rafias",
    body:
      "Queremos expresar nuestro más sincero agradecimiento por el valioso apoyo y la asesoría especializada que nos han brindado en materia de seguridad laboral. Su compromiso, profesionalismo y dedicación han sido fundamentales para fortalecer nuestras prácticas y asegurar un entorno más seguro para todo nuestro equipo. Apreciamos profundamente la calidad de su trabajo, la claridad de sus recomendaciones y su acompañamiento constante. Gracias por ser un aliado confiable y por contribuir significativamente al bienestar de nuestra organización.",
    author: "Oriana Moreno",
    company: "RAFIAS",
  },
  {
    id: "ritz",
    body:
      "Por medio de la presente, quiero expresar mi más sincero reconocimiento a la empresa Haso por el excelente servicio brindado durante nuestro primer año de colaboración. A lo largo de estos doce meses, han demostrado ser un socio estratégico invaluable. Destacamos especialmente su experiencia en Seguridad e higiene, así como su puntualidad, capacidad de respuesta, lo cual ha sido fundamental para alcanzar nuestros objetivos de este año. La confianza es la base de cualquier relación comercial exitosa, y Haso se ha ganado la nuestra con creces. No dudamos en recomendarlos a cualquier organización que busque un proveedor comprometido y profesional. Esperamos continuar fortaleciendo este vínculo en los años por venir.",
    author: "Alexis García",
    company: "HOTEL RITZ",
  },
  {
    id: "gasomich",
    body:
      "Recomendamos ampliamente los servicios proporcionados por Grupo HASO en materia de capacitación en seguridad, así como el acompañamiento integral para la elaboración, actualización y trámite del Programa Interno de Protección Civil. La capacitación impartida por Grupo HASO se distingue por su enfoque práctico y alineado a la normatividad vigente, contribuyendo al cumplimiento de las disposiciones aplicables de la STPS y Protección Civil, al fortalecimiento de la cultura preventiva y a la reducción de riesgos dentro de las estaciones. Asimismo, el personal recibe información clara y aplicable que mejora su capacidad de respuesta ante situaciones de emergencia. En cuanto al Programa Interno de Protección Civil, Grupo HASO brinda un servicio completo que abarca desde el diagnóstico del centro de trabajo hasta la integración documental y el seguimiento de los trámites ante la autoridad correspondiente, asegurando que el programa cumpla con los requisitos técnicos vigentes. Por lo anterior, consideramos que los servicios de Grupo HASO representan una inversión estratégica en la seguridad del personal, la continuidad operativa y el cumplimiento normativo de la empresa.",
    author: "Ing. Sandra Paulina Pérez Quezada",
    company: "Jefe e Higiene de Grupo Gasomich",
  },
] as const;

function GreenChevron({ dir = "right" }: { dir?: "left" | "right" }) {
  const rotate = dir === "left" ? "rotate-180" : "";
  return (
    <svg
      className={"h-6 w-6 shrink-0 text-[#62a95f] " + rotate}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Landing() {
  const [slides, setSlides] = React.useState([
    {
      id: "slide-1",
      src: slidePromo1,
      badges: ["Cumplimiento normativo"],
      title: "Contrata tu servicio de Diagnóstico y programa de seguridad y salud en el trabajo y adquiere la capacitación para que tu personal implemente el desarrollo y cumplimiento de la NOM-030-STPS-2009",
      cta: "Cotiza Aquí",
      msg: "Cumplimiento Normativo"
    },
    {
      id: "slide-2",
      src: slidePromo2,
      badges: ["Protección Civil"],
      title: "Contrata tu Programa Interno de Protección Civil y Capacita tu Brigadas por un 20% válido hasta el 30 de Enero de 2026.",
      cta: "Cotiza Aquí",
      msg: "Protección Civil"
    },
    {
      id: "slide-3",
      src: slidePromo3,
      badges: ["Ambiental"],
      title: "Precio especial por tiempo limitado. Descuento del 5% en el paquete integral si se agenda entre Enero y Febrero 2026. Aplica para empresas nuevas y clientes recurrentes.",
      cta: "Cotiza Aquí",
      msg: "Ambiental"
    },
  ]);

  // Cargar slides desde JSON
  React.useEffect(() => {
    // Intentar cargar desde API primero, si falla usar datos por defecto
    fetch('/api/hero-slides')
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error('Invalid data format');
        
        const imageMap: Record<string, string> = {
          '/src/assets/29/img promo 1.jpg': slidePromo1,
          '/src/assets/29/img promo 2.jpg': slidePromo2,
          '/src/assets/29/img promo 3.jpg': slidePromo3,
        };
        
        const loadedSlides = data.map((slide: any, idx: number) => ({
          id: `slide-${idx + 1}`,
          src: slide.image.startsWith('/uploads') 
            ? slide.image 
            : (imageMap[slide.image] || slidePromo1),
          badges: slide.category.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag),
          title: slide.title,
          cta: "Cotiza Aquí",
          msg: slide.subtitle
        }));
        
        setSlides(loadedSlides);
      })
      .catch(err => {
        console.error('Error cargando slides, usando datos por defecto:', err);
        // Mantener los slides por defecto si falla la carga
      });
  }, []);

  const clientLogos = [
    { id: "3b", alt: "3B", src: marca3B },
    { id: "4pck", alt: "4PCK", src: marca4pck },
    { id: "rotork", alt: "Rotork", src: marcaRotork },
    { id: "aak", alt: "AAK", src: marcaAAK },
    { id: "adeac", alt: "Adeac", src: marcaAdeac },
    { id: "agucatechahena", alt: "Agucatechahena", src: marcaAgucatechahena },
    { id: "autocom", alt: "Autocom", src: marcaAutocom },
    { id: "citelis", alt: "Citelis", src: marcaCitelis },
    { id: "continental-2", alt: "Continental", src: marcaContinental2 },
    { id: "defrut", alt: "Defrut", src: marcaDefrut },
    { id: "driscolls", alt: "Driscoll's", src: marcaDriscolls },
    { id: "farmacia-similares", alt: "Farmacia Similares", src: marcaFarmaciaSimilares },
    { id: "gasomich", alt: "GASOMICH", src: marcaGasomich },
    { id: "global-solutions", alt: "Global Solutions", src: marcaGlobalSolutions },
    { id: "gnu", alt: "GNU", src: marcaGNU },
    { id: "grupo-ravisa", alt: "Grupo Ravisa", src: marcaGrupoRavisa },
    { id: "imss", alt: "IMSS", src: marcaIMSS },
    { id: "jrs", alt: "JRS", src: marcaJRS },
    { id: "lemart", alt: "Lemart", src: marcaLemart },
    { id: "mindup", alt: "MindUp Academy", src: marcaMindUp },
    { id: "plastiper", alt: "Plastiper", src: marcaPlastiper },
    { id: "profertes", alt: "Profertes", src: marcaProfertes }
  ] as const;

  const [active, setActive] = React.useState(0);

  const [testimonialIdx, setTestimonialIdx] = React.useState(0);

  React.useEffect(() => {
    const t = window.setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 9000);
    return () => window.clearInterval(t);
  }, []);

  const activeTestimonial = TESTIMONIALS[testimonialIdx];

  const pauseUntilRef = React.useRef<number>(0);

  const goToSlide = (idx: number) => {
    setActive(idx);
    // Pausa el auto-rotate por 10s para que el usuario vea el slide elegido
    pauseUntilRef.current = Date.now() + 10_000;
  };

  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      setActive((a) => (a + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* HERO / SLIDER (estructura principal) */}
      <section className="w-full" id="inicio">
        <div className="mx-auto">
          <div className="px-4 md:px-16 mx-auto">
            <div className="relative overflow-hidden rounded-b-[40px] rounded-t-none bg-slate-900">
              {/* Imagen (placeholder). Si la ruta no existe aún, verás fondo oscuro igual */}
              <img
                src={slides[active].src}
                alt={slides[active].title.replace(/\n/g, " ")}
                className="h-[620px] w-full object-cover opacity-70 md:h-[620px]"
                loading="eager"
              />

              {/* Overlay para contraste */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/45" />

              {/* Dots (3) vertical izquierda */}
              <div className="absolute left-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Ir a ${s.id}`}
                    onClick={() => goToSlide(idx)}
                    className={
                      "h-3 w-3 cursor-pointer rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black/40 " +
                      (idx === active ? "bg-white" : "bg-white/40 hover:bg-white/80")
                    }
                  />
                ))}
              </div>

              {/* Contenido centrado */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
                {/* Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {slides[active].badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-full bg-[#0f1932]/80 px-4 py-1 text-[13px] font-extrabold text-white backdrop-blur"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="mt-6 whitespace-pre-line text-xl sm:text-2xl md:text-3xl leading-[1.1] text-white drop-shadow max-w-[720px] px-4">
                  {slides[active].title}
                </h2>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => {
                    // Construir mensaje para WhatsApp
                    const slideActual = slides[active];
                    const categoria = (slideActual as any).msg || (slideActual as any).badges[0] || "Información";
                    const titulo = (slideActual as any).title.replace(/\n/g, " ");
                    
                    let mensaje = `Hola, estoy interesado en información sobre:%0A%0A`;
                    mensaje += `*Categoría:* ${categoria}%0A%0A`;
                    mensaje += `*Detalle:* ${titulo}%0A%0A`;
                    mensaje += `Me gustaría recibir más información y una cotización.`;
                    
                    // Abrir WhatsApp
                    const whatsappUrl = `https://wa.me/5215534427319?text=${mensaje}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="mt-7 inline-flex h-[42px] items-center justify-center rounded-full bg-[#6bb16e] px-5 text-[22px] font-extrabold text-white shadow-[0_2px_0_rgba(0,0,0,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#5fa963]"
                >
                  {slides[active].cta}
                </button>
              </div>
            </div>
          </div>

          {/* Barra urgencia */}
          <div className="relative mt-10 w-full bg-[#6bb16e]">
            <div className="flex h-full p-3 items-center justify-center gap-2 sm:gap-3 text-center text-xs sm:text-sm md:text-[13px] font-extrabold text-white flex-wrap">
              <span className="text-base sm:text-lg md:text-xl font-semibold">Sí tienes una urgencia laboral</span>
              <button
                type="button"
                className="relative rounded-full bg-[#E8DD45] px-3 sm:px-4 py-1 sm:py-1.5 text-base sm:text-lg md:text-[20px] font-semibold text-[#4b4949] transition-all pt-0"
                onClick={() => {
                  window.history.pushState({}, "", "#contacto");
                  const el = document.querySelector("#contacto");
                  if (el) {
                    const headerOffset = 72;
                    const rect = el.getBoundingClientRect();
                    const top = window.scrollY + rect.top - headerOffset;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
              >
                contactanos aquí
              </button>
            </div>
          </div>

          {/* Mensaje principal (debajo del hero) */}
          <div className="py-10 px-4">
            <h3 className="mx-auto max-w-6xl font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black uppercase leading-[1.1] tracking-[0.06em] text-[#0f1932]">
              Capacitamos y asesoramos
              <br />
              a empresas en materia de prevencion de riesgos,
              <br />
              higiene laboral y medio ambiente.
            </h3>
          </div>

          {/* QUIÉNES SOMOS – SECCIÓN VISUAL */}
          <section className="w-full bg-[#0d1730] py-10" id="quienes-somos">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid grid-cols-12 items-center gap-6 md:gap-10">

                {/* Imagen recortada / abstracta */}
                <div className="relative col-span-12 md:col-span-7">
                  <div className="relative flex h-[280px] justify-end overflow-hidden">
                    <img
                      src={webHaso03}
                      alt="HASO - Quiénes somos"
                      className="h-full w-auto object-cover py-3"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Card verde */}
                <div className="col-span-12 md:col-span-5">
                  <div className="rounded-3xl bg-[#62a95f] p-6 sm:p-8 md:p-8 pt-5 text-white shadow-xl h-full">
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-2">¿Quiénes somos?</h3>
                    <p className="text-base sm:text-lg md:text-[20px] font-semibold text-justify leading-[1.1]">
                     Somos una empresa mexicana dedicada a la prestación de servicios de asesoría, capacitación, evaluación y gestión en materia de administración de riesgos en seguridad industrial, salud ocupacional, higiene industrial, medio ambiente y protección civil, apoyando a las empresas en el cumplimiento de la normatividad aplicable y obligatoria en los centros de trabajo, brindando resultados confiables.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      </section>

      {/* CLIENTES QUE NOS PREFIEREN (en sección cotiza por ahora) */}
      <section className="py-10 sm:py-16" id="cotiza">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Título centrado + línea */}
          <div className="flex flex-col items-center">
            <h3 className="text-center text-xl sm:text-2xl md:text-[26px] font-semibold text-[#0f1932]">
              Clientes que nos prefieren
            </h3>
            <div className="mt-5 h-[2px] w-[250px] sm:w-[310px] bg-[#2b3f7a]" />
          </div>

          {/* Logos */}
          <div className="mt-10">
            <div className="mx-auto flex max-w-[980px] flex-wrap items-center justify-center gap-x-3 sm:gap-x-5">
              {clientLogos.map((l) => (
                <div
                  key={l.id}
                  className="h-[40px] w-[120px] sm:h-[52px] sm:w-[160px]"
                  aria-label={l.alt}
                  role="img"
                  style={{
                    backgroundImage: `url(${l.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain", // ✅ estándar, sin recorte
                  }}
                />
              ))}
            </div>
          </div>

          {/* Testimonios */}
          <div className="mt-10 sm:mt-16">
            <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,25,50,0.10)]">
              <div className="absolute left-0 top-0 h-full w-[6px] sm:w-[10px] bg-[#62a95f]" aria-hidden="true" />

              <div className="px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12">
                <div className="flex items-start gap-6">
                  <div className="hidden md:block text-[64px] leading-none font-black text-[#62a95f] select-none" aria-hidden="true">“</div>

                  <div className="min-w-0 flex-1">
                    <p key={activeTestimonial.id} className="relative m-0 text-[18px] md:text-[20px] font-medium leading-relaxed text-slate-800">
                      {activeTestimonial.body}
                    </p>
   <span className="ml-1 mt-[-50px] [float:right] text-[64px] font-black text-[#62a95f]">”</span>
                   
                    <div className="mt-6 h-[1px] w-full bg-slate-200" />

                    <div className="mt-5 flex flex-col gap-1">
                      <div className="text-[18px] font-black text-[#0f1932]">{activeTestimonial.author}</div>
                      <div className="text-[16px] font-semibold text-slate-700">{activeTestimonial.company}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                      onClick={() => setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                      aria-label="Anterior comentario"
                    >
                      <GreenChevron dir="left" />
                    </button>

                    <button
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                      onClick={() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length)}
                      aria-label="Siguiente comentario"
                    >
                      <GreenChevron dir="right" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {TESTIMONIALS.map((t, idx) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTestimonialIdx(idx)}
                        aria-label={`Ir a comentario ${idx + 1}`}
                        className={
                          "h-2.5 w-2.5 rounded-full transition-all " +
                          (idx === testimonialIdx ? "bg-[#62a95f]" : "bg-slate-300 hover:bg-slate-400")
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Cursos></Cursos>
      {/* FOOTER */}
      <Footer></Footer>

      {/* BOTÓN FLOTANTE DE WHATSAPP */}
      <a
        href="https://wa.me/5215534427319?text=Hola!%20Quiero%20agendar%20una%20videollamada%20para%20cotizar%20mis%20capacitaciones."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="group fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full shadow-2xl transition-all hover:scale-110 hover:shadow-[0_10px_40px_rgba(37,211,102,0.5)]"
      >
        <img
          src={iconWhatsApp}
          alt="WhatsApp"
          className="h-full w-full object-contain"
          draggable={false}
        />
        
        {/* Tooltip siempre visible */}
        <span className="pointer-events-none absolute bottom-full right-0 mb-2 mr-2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-lg">
          Agendar videollamada
          {/* Flecha triangular diagonal apuntando hacia abajo-derecha */}
          <span 
            className="absolute bottom-1 right-0 translate-y-full -translate-x-1" 
            style={{
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderTop: '10px solid #0f172a'
            }}
          ></span>
        </span>
      </a>
    </div>
  );
}
