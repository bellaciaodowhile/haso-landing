import React from "react";
import icoCapAdd from "../assets/iconos/HASO capacitaciones adicionales.png";
import icoCapGen from "../assets/iconos/HASO capacitaciones generales.png";
import icoCumAmb from "../assets/iconos/HASO cumplimineto normativo ambiental.png";
import icoCum from "../assets/iconos/HASO cumplimineto normativo.png";
import icoMed from "../assets/iconos/HASO evaluaciones medicas laborales.png";
import icoIng from "../assets/iconos/HASO ingenieria.png";
import icoLab from "../assets/iconos/HASO laboratorio.png";
import icoOrg from "../assets/iconos/HASO normas de organizacion.png";
import icoSalud from "../assets/iconos/HASO normas de salud.png";
import icoSeg from "../assets/iconos/HASO normas de seguridad.png";
import icoEspecificas from "../assets/iconos/HASO normas especificas.png";
import icoPC from "../assets/iconos/HASO proteccion civil.png";
import icoMerc from "../assets/iconos/HASO proyectos especiales mercantiles.png";



const ICONS: Record<string, string> = {
  capacitacionesAdicionales: icoCapAdd,
  capacitacionesEspeciales: icoCapGen,
  cumplimientoAmbiental: icoCumAmb,
  cumplimientoNormativo: icoCum,
  evaluacionesMedicas: icoMed,
  ingenieria: icoIng,
  laboratorio: icoLab,
  normasOrganizacion: icoOrg,
  normasSalud: icoSalud,
  normasSeguridad: icoSeg,
  normasEspecificas: icoEspecificas,
  proteccionCivil: icoPC,
  proyectosMercantiles: icoMerc,
  cursosDelConocer: icoCapAdd,
};


type BadgeVariant = "add" | "remove";

type QuoteItem = {
  id: string;
  label: string;
  kind: "servicio" | "curso";
  /** texto con requisitos para cotizar (puede venir desde excel/json) */
  requirements?: string;
};

type LandingServicios = {
  generatedFrom?: string;
  topics: Topic[];
};

type LandingCursos = {
  meta?: any;
  categories: CursoCategory[];
};

type CursoCategory = {
  id?: string;
  title: string;
  // optional key for icon mapping (if you later add it to JSON)
  iconKey?: string;
  normas: CursoNorma[];
};

type CursoNorma = {
  id?: string;
  code?: string | null;
  tag?: string;
  normaTitle?: string;
  trainings: string[];
  quoteRequirements?: string[];
};

type Topic = {
  id?: string;
  title: string;
  iconKey?: string;
  // Topics “normales” pueden venir con pillar simple (legacy)
  pillar?: string | null;
  // Topics “normales” traen categories
  categories?: Category[];
  // Topic especial “laboratorio” (v2) trae pillars
  pillars?: Pillar[];
};

type Pillar = {
  id?: string;
  title: string;
  categories: Category[];
};

type Category = {
  id?: string;
  title: string;
  subcategories: Subcategory[];
};

type Subcategory = {
  id?: string;
  label?: string;
  code?: string | null;
  description?: string;
  services?: { name: string; quoteRequirements?: string }[];
};

function slugify(input: string) {
  return (input || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Normaliza un código de norma para búsqueda flexible.
 * Ejemplos:
 * - "NOM-001-STPS-2008" -> "nom0012008stps"
 * - "NOM 1 STPS" -> "nom1stps"
 * - "NUM-01" -> "num01"
 */
function normalizeNormCode(input: string): string {
  return (input || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "") // Elimina guiones, espacios, etc.
    .trim();
}

/**
 * Verifica si el texto contiene el query de búsqueda,
 * con normalización especial para códigos de normas.
 */
function matchesSearch(text: string, query: string): boolean {
  if (!query) return true;
  
  const normalizedText = text.toLowerCase();
  const normalizedQuery = query.toLowerCase();
  
  // Búsqueda normal (incluye espacios, guiones, etc.)
  if (normalizedText.includes(normalizedQuery)) return true;
  
  // Búsqueda normalizada para códigos (sin guiones ni espacios)
  const normalizedTextCode = normalizeNormCode(text);
  const normalizedQueryCode = normalizeNormCode(query);
  
  return normalizedTextCode.includes(normalizedQueryCode);
}

function titleCaseLikeDesign(input: string) {
  const s = (input ?? "").trim();
  if (!s) return s;

  // If the title is effectively ALL CAPS, convert to sentence-case
  const isAllCaps = s === s.toUpperCase();
  const normalized = isAllCaps ? s.toLowerCase() : s;

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function resolveIconKeyFromText(text: string): string | null {
  const t = (text || "").toLowerCase();

  // cursos
  if (t.includes("normas-de-seguridad") || t.includes("normas de seguridad")) return "normasSeguridad";
  if (t.includes("normas-de-salud") || t.includes("normas de salud")) return "normasSalud";
  if (t.includes("normas-de-organizacion") || t.includes("normas de organiz")) return "normasOrganizacion";

  // Normas específicas (ahora con su propio icono)
  if (t.includes("normas-especificas") || t.includes("normas específicas") || t.includes("normas especificas"))
    return "normasEspecificas";

  if (t.includes("capacitaciones adicionales")) return "capacitacionesAdicionales";

  // Capacitaciones Especiales (usa el mismo icono que capacitaciones adicionales)
  if (
    t.includes("capacitaciones-especiales") ||
    t.includes("capacitaciones especiales") ||
    t.includes("capacitaciónes especiales")
  )
    return "capacitacionesAdicionales";

  // servicios
  if (t.includes("laboratorio")) return "laboratorio";
  if (t.includes("ingenier")) return "ingenieria";
  if (t.includes("evaluaciones med") || t.includes("medicas")) return "evaluacionesMedicas";
  if (t.includes("proteccion civil") || t.includes("protección civil")) return "proteccionCivil";
  if (t.includes("mercantil") || t.includes("proyectos especiales")) return "proyectosMercantiles";
   if (t.includes("conocer") || t.includes("cursos del conocer")) return "cursosDelConocer";
  if (t.includes("cumplimiento") && t.includes("ambient")) return "cumplimientoAmbiental";
  if (t.includes("cumplimiento")) return "cumplimientoNormativo";

  return null;
}

function iconSrcFor(key: string | null | undefined): string | null {
  if (!key) return null;
  return ICONS[key] ?? null;
}

function iconForServicioTopic(t: Topic): string | null {
  // prefer explicit iconKey if present
  const explicit = iconSrcFor(t.iconKey);
  if (explicit) return explicit;

  const fromId = iconSrcFor(resolveIconKeyFromText(t.id ?? ""));
  if (fromId) return fromId;

  const fromTitle = iconSrcFor(resolveIconKeyFromText(t.title ?? ""));
  if (fromTitle) return fromTitle;

  return null;
}

function iconForCursoCategory(c: CursoCategory): string | null {
  const explicit = iconSrcFor(c.iconKey);
  if (explicit) return explicit;

  const fromId = iconSrcFor(resolveIconKeyFromText(c.id ?? ""));
  if (fromId) return fromId;

  const fromTitle = iconSrcFor(resolveIconKeyFromText(c.title ?? ""));
  if (fromTitle) return fromTitle;

  return null;
}




function Chevron({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <svg
      className={
        "h-6 w-6 shrink-0 transition-transform duration-200 " +
        (open ? "rotate-180 " : "rotate-0 ") +
        className
      }
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}



function RoundBullet() {
  return <span className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-slate-900" aria-hidden="true" />;
}

function Pill({
  variant,
  children,
  onClick,
  selected,
}: {
  variant: BadgeVariant;
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}) {
  const cls =
    variant === "add"
      ? selected
        ? "bg-[#0f1932] text-white"
        : "bg-[#62a95f] text-white"
      : "bg-[#f0b24a] text-white";

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex items-center rounded-full px-4 py-2 text-[12px] font-extrabold shadow-sm transition-colors " +
        cls
      }
    >
      {children}
    </button>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-8 sm:mb-10">
      {/* w-fit para que la línea calce el ancho del texto */}
      <div className="inline-flex w-fit flex-col items-start">
        <h1 className="text-2xl sm:text-3xl md:text-[40px] font-black leading-[1] text-[#0f1932] font-semibold m-0">
          {titleCaseLikeDesign(title)}
        </h1>
        <div className="mt-2 sm:mt-3 h-[2px] w-full bg-[#0f1932]" />
      </div>
    </div>
  );
}

function Collapsible({
  title,
  iconSrc,
  open,
  onToggle,
  children,
  level = 0,
}: {
  title: React.ReactNode;
  iconSrc?: string | null;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  level?: number;
}) {
  const pad = level === 0 ? "" : level === 1 ? "pl-2" : level === 2 ? "pl-4" : "pl-6";
  const textSize = level === 0 ? "text-xl sm:text-2xl md:text-[24px]" : level === 1 ? "text-lg sm:text-xl md:text-[20px]" : level === 2 ? "text-base sm:text-lg md:text-[18px]" : "text-sm sm:text-base md:text-[16px]";

  const showIcon = level === 0 && !!iconSrc;
  // When a top-level item has an icon, indent the expanded body so it starts under the title text.
  // 62px avatar + 24px gap = 86px
  const bodyIndent = showIcon ? "pl-[70px] sm:pl-[86px]" : "";

  return (
    <div className={"w-full " + pad}>
      <div className={showIcon ? "flex items-start gap-4 sm:gap-6" : "flex"}>
        {showIcon ? (
          <div
            className="mt-1 h-[50px] w-[50px] sm:h-[62px] sm:w-[62px] shrink-0 overflow-hidden rounded-full bg-slate-200"
            aria-hidden="true"
          >
            <img src={iconSrc as string} alt="" className="h-full w-full object-cover" />
          </div>
        ) : null}

        <div className="flex flex-1 min-w-0 flex-col items-start text-left">
          {level === 0 ? (
            <>
              <div className={"" + textSize + " font-medium leading-tight text-left w-full"}>{title}</div>
              <div className="mt-2 h-[1px] w-full bg-slate-900" />

              <button
                type="button"
                onClick={onToggle}
                className="mt-2 inline-flex items-center text-base sm:text-lg md:text-[18px] font-semibold text-left"
                aria-expanded={open}
              >
                {open ? "Ver menos" : "Ver más"}
                <Chevron open={open} className="ml-2 text-[#2e7d32]" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onToggle}
                className={"inline-flex items-start gap-2 w-full " + textSize + " font-medium leading-tight text-left"}
                aria-expanded={open}
              >
                <Chevron open={open} className="text-[#2e7d32] shrink-0" />
                <span className="flex-1 min-w-0 break-words">{title}</span>
              </button>
              <div className="mt-2 h-[1px] w-full bg-slate-900" />
            </>
          )}
        </div>
      </div>

      <div
        className={
          "mt-4 w-full origin-top transform overflow-hidden transition-all duration-200 ease-out " +
          bodyIndent +
          (open ? " opacity-100 scale-100 max-h-none" : " opacity-0 scale-95 max-h-0 pointer-events-none")
        }
      >
        {children}
      </div>
    </div>
  );
}




export default function Cursos() {
  const [showAllLeft, setShowAllLeft] = React.useState(false);
  const [showAllRight, setShowAllRight] = React.useState(false);

  const [openTopic, setOpenTopic] = React.useState<Record<string, boolean>>({});
  const [openPillar, setOpenPillar] = React.useState<Record<string, boolean>>({});
  const [openCat, setOpenCat] = React.useState<Record<string, boolean>>({});
  const [openSub, setOpenSub] = React.useState<Record<string, boolean>>({});
  const [openCursoCat, setOpenCursoCat] = React.useState<Record<string, boolean>>({});
  const [openCursoNorma, setOpenCursoNorma] = React.useState<Record<string, boolean>>({});

  const keyOf = (id: string | undefined, fallback: string) => (id?.trim() ? id : slugify(fallback));

  const [quoteItems, setQuoteItems] = React.useState<QuoteItem[]>([]);
  const [quoteModalOpen, setQuoteModalOpen] = React.useState(false);

  const [formNombre, setFormNombre] = React.useState("");
  const [formCorreo, setFormCorreo] = React.useState("");
  const [formTelefono, setFormTelefono] = React.useState("");
  const [formEmpresa, setFormEmpresa] = React.useState("");
  const [formCargo, setFormCargo] = React.useState("");
  const [formComentario, setFormComentario] = React.useState("");

  // Cerrar con ESC
  React.useEffect(() => {
    if (!quoteModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuoteModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [quoteModalOpen]);

  const isSelected = (id: string) => quoteItems.some((x) => x.id === id);

  const toggleQuote = (item: QuoteItem) => {
    setQuoteItems((prev) => {
      const exists = prev.some((x) => x.id === item.id);
      return exists ? prev.filter((x) => x.id !== item.id) : [...prev, item];
    });
  };

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    key: string
  ) => {
    setter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState<LandingServicios | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [cursosData, setCursosData] = React.useState<LandingCursos | null>(null);
  const [cursosLoading, setCursosLoading] = React.useState(true);
  const [cursosError, setCursosError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        // El JSON está en la raíz del proyecto y debe servirse desde /public para Vite.
        // Si lo dejaste en la raíz del repo, muévelo a `public/landing_servicios_v1.json`.
        const timestamp = new Date().getTime();
        const res = await fetch(`/landing_servicios_v1.json?v=${timestamp}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`No se pudo cargar landing_servicios_v1.json (HTTP ${res.status})`);
        const json = (await res.json()) as LandingServicios;
        if (!cancelled) setData(json);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Error cargando servicios");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setCursosLoading(true);
        setCursosError(null);
        // JSON de cursos en /public/landing_cursos_v1.json
        const timestamp = new Date().getTime();
        const res = await fetch(`/landing_cursos_v1.json?v=${timestamp}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`No se pudo cargar landing_cursos_v1.json (HTTP ${res.status})`);
        const json = (await res.json()) as LandingCursos;
        if (!cancelled) setCursosData(json);
      } catch (e: any) {
        if (!cancelled) setCursosError(e?.message ?? "Error cargando cursos");
      } finally {
        if (!cancelled) setCursosLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const q = query.trim().toLowerCase();

  const topics = data?.topics ?? [];
  const isCapacitacionTopic = (t: Topic) => {
    const p = (t.pillar ?? "").toString().toLowerCase();
    const tt = (t.title ?? "").toLowerCase();
    const id = (t.id ?? "").toLowerCase();
    return p.includes("capacit") || tt.includes("capacit") || id.includes("capacit");
  };

  const matchesSub = (s: Subcategory) => {
    if (!q) return true;
    const searchableText = `${s.code ?? ""} ${s.label ?? ""} ${s.description ?? ""} ${(s.services ?? [])
      .map((x) => x.name)
      .join(" ")}`;
    return matchesSearch(searchableText, q);
  };

  const pruneCategories = (cats: Category[]) =>
    (cats ?? [])
      .map((c) => {
        const subs = (c.subcategories ?? []).filter(matchesSub);
        if (!q) return c;
        const catMatches = matchesSearch(c.title, q);
        if (catMatches || subs.length) return { ...c, subcategories: subs };
        return null;
      })
      .filter(Boolean) as Category[];

  const pruneTopic = (t: Topic): Topic | null => {
    if (!q) return t;

    const titleHit = matchesSearch(t.title ?? "", q);

    if (t.pillars?.length) {
      const prunedPillars = t.pillars
        .map((p) => {
          const cats = pruneCategories(p.categories ?? []);
          const hit = matchesSearch(p.title ?? "", q);
          if (hit || cats.length) return { ...p, categories: cats };
          return null;
        })
        .filter(Boolean) as Pillar[];

      if (titleHit || prunedPillars.length) return { ...t, pillars: prunedPillars };
      return null;
    }

    const cats = pruneCategories(t.categories ?? []);
    if (titleHit || cats.length) return { ...t, categories: cats };
    return null;
  };

  const prunedTopics = (topics ?? []).map(pruneTopic).filter(Boolean) as Topic[];

  // LEFT: servicios (excluye temas de capacitación si venían mezclados en el JSON de servicios)
  const leftTopics2 = prunedTopics.filter((t) => !isCapacitacionTopic(t));
  const leftSlice = showAllLeft ? leftTopics2 : leftTopics2.slice(0, 4);

  const renderServicesLeaf = (subs: Subcategory[]) => {
    return (
      <div className="space-y-4">
        {subs.map((s, i) => {
          const subKey = keyOf(s.id, s.label || (s.code ?? "") || `sub-${i}`);
          const open = !!openSub[subKey];

          const code = (s.code ?? "").toString().trim();
          const desc = (s.description ?? "").trim();
          const label = (s.label ?? "").trim();

          const titleLine = code || label || `Item ${i + 1}`;
          // Solo mostrar subLine si description no está vacía
          const subLine = desc ? desc : (code && label ? label.replace(code, "").trim() : "");

          // Filtrar servicios que sean solo "Diplomado" o "Capacitación"
          const validServices = (s.services ?? []).filter((sv) => {
            if (!sv.name || !sv.name.trim()) return false;
            const normalized = sv.name.trim().toLowerCase();
            // Excluir si es exactamente "diplomado", "capacitación" o "capacitacion" (con o sin punto)
            if (normalized === 'diplomado' || normalized === 'capacitación' || normalized === 'capacitacion' || 
                normalized === 'diplomado.' || normalized === 'capacitación.' || normalized === 'capacitacion.') {
              return false;
            }
            return true;
          });

          return (
            <Collapsible
              key={subKey}
              level={3}
              open={open}
              onToggle={() => toggle(setOpenSub, subKey)}
              title={
                <div className="flex flex-col items-start">
                  <span className="font-black">{titleLine}</span>
                  {subLine && desc ? <span className="font-medium opacity-90">{subLine}</span> : null}
                </div>
              }
            >
              {validServices.length > 0 ? (
                <ul className="pl-4 sm:pl-5 mt-3 space-y-3 text-base sm:text-lg md:text-[18px] font-semibold leading-snug text-slate-900">
                  {validServices.map((sv) => {
                    const item: QuoteItem = {
                      id: `servicio:${subKey}:${slugify(sv.name)}`,
                      label: sv.name,
                      kind: "servicio",
                      requirements: (sv.quoteRequirements ?? s.services?.[0]?.quoteRequirements ?? "").toString(),
                    };
                    const selected = isSelected(item.id);

                    return (
                      <li key={sv.name} className="m-0 pl-5">
                        <div className="flex items-start gap-2 min-w-0">
                          <RoundBullet />
                          <span className="min-w-0 whitespace-pre-line">{sv.name}</span>
                        </div>

                        {/* Botón debajo del bullet, alineado con el texto */}
                        <div className="mt-2 pl-[14px]">
                          <Pill variant="add" selected={selected} onClick={() => toggleQuote(item)}>
                            {selected ? "Quitar" : "Sumar a cotización"}
                          </Pill>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                // Si no hay servicios válidos, mostrar botón de cotización con el título del padre
                <div className="mt-2 pl-4 sm:pl-5">
                  {(() => {
                    const item: QuoteItem = {
                      id: `servicio:${subKey}:directo`,
                      label: titleLine,
                      kind: "servicio",
                      requirements: "",
                    };
                    const selected = isSelected(item.id);
                    
                    return (
                      <Pill variant="add" selected={selected} onClick={() => toggleQuote(item)}>
                        {selected ? "Quitar" : "Sumar a cotización"}
                      </Pill>
                    );
                  })()}
                </div>
              )}
            </Collapsible>
          );
        })}
      </div>
    );
  };

  const renderCategoryTree = (cats: Category[], levelBase: number) => {
    if (!cats?.length) {
      return <div className="text-[16px] font-medium text-slate-700">Sin detalle disponible.</div>;
    }

    return (
      <div className="space-y-10">
        {cats.map((cat) => {
          const catKey = keyOf(cat.id, cat.title);
          const open = !!openCat[catKey];

          return (
            <Collapsible
              key={catKey}
              level={levelBase}
              open={open}
              onToggle={() => toggle(setOpenCat, catKey)}
              title={<span className="font-medium">{titleCaseLikeDesign(cat.title)}</span>}
            >
              {renderServicesLeaf(cat.subcategories ?? [])}
            </Collapsible>
          );
        })}
      </div>
    );
  };

  const renderTopicTree = (t: Topic) => {
    const tKey = keyOf(t.id, t.title);
    const tOpen = !!openTopic[tKey];

    return (
      <Collapsible
        key={tKey}
        level={0}
        open={tOpen}
        onToggle={() => toggle(setOpenTopic, tKey)}
        iconSrc={iconForServicioTopic(t)}
        title={<span className="font-medium">{titleCaseLikeDesign(t.title)}</span>}
      >
        {t.pillars?.length ? (
          <div className="space-y-10">
            {t.pillars.map((p) => {
              const pKey = `${tKey}::${keyOf(p.id, p.title)}`;
              const pOpen = !!openPillar[pKey];

              return (
                <Collapsible
                  key={pKey}
                  level={1}
                  open={pOpen}
                  onToggle={() => toggle(setOpenPillar, pKey)}
                  title={<span className="font-medium">{titleCaseLikeDesign(p.title)}</span>}
                >
                  {renderCategoryTree(p.categories ?? [], 2)}
                </Collapsible>
              );
            })}
          </div>
        ) : (
          renderCategoryTree(t.categories ?? [], 1)
        )}
      </Collapsible>
    );
  };

  const cursosQ = q;

  const matchesCursoNorma = (n: CursoNorma) => {
    if (!cursosQ) return true;
    const searchableText = `${n.code ?? ""} ${n.tag ?? ""} ${n.normaTitle ?? ""} ${(n.trainings ?? []).join(" ")}`;
    return matchesSearch(searchableText, cursosQ);
  };

  const pruneCursoCategories = (cats: CursoCategory[]) =>
    (cats ?? [])
      .map((c) => {
        const normas = (c.normas ?? []).filter(matchesCursoNorma);
        if (!cursosQ) return c;
        const catMatches = matchesSearch(c.title, cursosQ);
        if (catMatches || normas.length) return { ...c, normas };
        return null;
      })
      .filter(Boolean) as CursoCategory[];

  const cursosCatsAll = pruneCursoCategories(cursosData?.categories ?? []);
  const cursosCatsSlice = showAllRight ? cursosCatsAll : cursosCatsAll.slice(0, 4);

  const renderCursosNorma = (catKey: string, n: CursoNorma, idx: number) => {
    const normaKey = `${catKey}::${keyOf(n.id, (n.code ?? "") || n.normaTitle || `norma-${idx}`)}`;
    const open = !!openCursoNorma[normaKey];

    const code = (n.code ?? "").toString().trim();
    const tag = (n.tag ?? "").trim();
    const normaTitle = (n.normaTitle ?? "").trim();

    const header = (
      <div className="flex flex-col items-start w-full">
        <div className="flex flex-wrap items-center gap-2 w-full">
          <span className="font-black break-words">{code || (n.normaTitle ?? "Norma")}</span>
          {tag ? <Pill variant="add">{tag}</Pill> : null}
        </div>
        {code && normaTitle ? <span className="font-medium opacity-90 w-full break-words">{normaTitle}</span> : null}
      </div>
    );

    // Filtrar trainings vacíos o que sean solo "Diplomado" o "Capacitación"
    const validTrainings = (n.trainings ?? []).filter((t) => {
      if (!t || !t.trim()) return false;
      const normalized = t.trim().toLowerCase();
      // Excluir si es exactamente "diplomado", "capacitación" o "capacitacion"
      if (normalized === 'diplomado' || normalized === 'capacitación' || normalized === 'capacitacion' || normalized === 'diplomado.' || normalized === 'capacitación.' || normalized === 'capacitacion.') {
        return false;
      }
      return true;
    });

    return (
      <Collapsible
        key={normaKey}
        level={2}
        open={open}
        onToggle={() => toggle(setOpenCursoNorma, normaKey)}
        title={header}
      >
        {validTrainings.length > 0 ? (
          <ul className="pl-4 sm:pl-5 mt-2 space-y-3 text-base sm:text-lg md:text-[18px] font-semibold leading-snug text-slate-900">
            {validTrainings.map((t) => {
              const item: QuoteItem = {
                id: `curso:${normaKey}:${slugify(t)}`,
                label: t,
                kind: "curso",
                requirements: (n.quoteRequirements ?? []).filter(Boolean).join("\n"),
              };
              const selected = isSelected(item.id);

              return (
                <li key={t} className="m-0">
                  <div className="pl-5 flex items-start gap-2 min-w-0">
                    <RoundBullet />
                    <span className="min-w-0 whitespace-pre-line">{t}</span>
                  </div>

                  {/* Botón debajo del bullet, alineado con el texto */}
                  <div className="mt-2 pl-[14px]">
                    <Pill variant="add" selected={selected} onClick={() => toggleQuote(item)}>
                      {selected ? "Quitar" : "Sumar a cotización"}
                    </Pill>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          // Si no hay trainings válidos, mostrar botón de cotización con el título de la norma
          <div className="mt-2 pl-4 sm:pl-5">
            {(() => {
              // Usar normaTitle completo si existe, sino el código
              const normaLabel = normaTitle || code || "Capacitación";
              const item: QuoteItem = {
                id: `curso:${normaKey}:directo`,
                label: normaLabel,
                kind: "curso",
                requirements: (n.quoteRequirements ?? []).filter(Boolean).join("\n"),
              };
              const selected = isSelected(item.id);
              
              return (
                <Pill variant="add" selected={selected} onClick={() => toggleQuote(item)}>
                  {selected ? "Quitar" : "Sumar a cotización"}
                </Pill>
              );
            })()}
          </div>
        )}
      </Collapsible>
    );
  };

  const renderCursosCategory = (c: CursoCategory, idx: number) => {
    const catKey = keyOf(c.id, c.title || `cat-${idx}`);
    const open = !!openCursoCat[catKey];

    return (
      <Collapsible
        key={catKey}
        level={0}
        open={open}
        onToggle={() => toggle(setOpenCursoCat, catKey)}
        iconSrc={iconForCursoCategory(c)}
        title={<span className="font-medium">{titleCaseLikeDesign(c.title)}</span>}
      >
        <div className="space-y-10">
          {(c.normas ?? []).map((n, i) => renderCursosNorma(catKey, n, i))}
        </div>
      </Collapsible>
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900" id="cursos">

      {/* MAIN CONTENT CURSOS */}
      <main className="w-full py-8 sm:py-10 pb-20 sm:pb-28">
        {/* BUSCADOR */}
        <div className="mb-10 sm:mb-14 flex w-full justify-center px-4">
          <div className="relative w-full max-w-4xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder=" "
              className="peer h-[52px] sm:h-[64px] w-full rounded-full border-2 border-slate-900 bg-white px-5 sm:px-6 text-lg sm:text-[22px] font-semibold text-slate-700 focus:outline-none focus:ring-0"
            />

            {/* Overlay centrado: icono + placeholder alineados (solo cuando está vacío) */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 sm:gap-3 text-slate-400 opacity-0 transition-opacity duration-150 peer-placeholder-shown:opacity-100 px-4">
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-base sm:text-lg md:text-[22px] font-semibold text-center">Buscar por palabra clave o código (ej: NOM 1, NOM-001)</span>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Wrapper con divisor verde central (no altura completa) */}
          <div className="relative">
            {/* Divider sólo en desktop */}
            <div className="pointer-events-none absolute left-1/2 top-[110px] bottom-0 hidden w-[2px] -translate-x-1/2 bg-[#62a95f] md:block" />

            <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-20">
              {/* COLUMNA IZQUIERDA */}
              <section aria-label="Nuestros servicios">
                <SectionTitle title="Nuestros servicios" />

                {loading ? (
                  <div className="text-[16px] font-semibold text-slate-700">Cargando servicios…</div>
                ) : error ? (
                  <div className="text-[16px] font-semibold text-red-600">{error}</div>
                ) : leftSlice.length === 0 ? (
                  <div className="text-[16px] font-semibold text-slate-700">
                    No hay resultados para tu búsqueda.
                  </div>
                ) : (
                  <div className="space-y-12">
                    {leftSlice.map((t) => (
                      <div key={keyOf(t.id, t.title)}>{renderTopicTree(t)}</div>
                    ))}
                  </div>
                )}

                {/* VER TODOS – columna izquierda */}
                <button
                  type="button"
                  onClick={() => setShowAllLeft((v) => !v)}
                  className="mt-6 inline-flex items-center text-[20px] font-bold"
                >
                  <Chevron open={showAllLeft} className="mr-2 h-7 w-7" />
                  {showAllLeft ? "Ver menos" : "Ver todos"}
                </button>
              </section>

              {/* COLUMNA DERECHA */}
              <section aria-label="Nuestros cursos y capacitaciones">
                <SectionTitle title="Nuestros cursos y capacitaciones" />

                {cursosLoading ? (
                  <div className="text-[16px] font-semibold text-slate-700">Cargando cursos…</div>
                ) : cursosError ? (
                  <div className="text-[16px] font-semibold text-red-600">{cursosError}</div>
                ) : cursosCatsSlice.length === 0 ? (
                  <div className="text-[16px] font-semibold text-slate-700">No hay cursos para mostrar.</div>
                ) : (
                  <div className="space-y-12">
                    {cursosCatsSlice.map((c, i) => (
                      <div key={keyOf(c.id, c.title)}>{renderCursosCategory(c, i)}</div>
                    ))}
                  </div>
                )}

                {/* VER TODOS – columna derecha */}
                <button
                  type="button"
                  onClick={() => setShowAllRight((v) => !v)}
                  className="mt-6 inline-flex items-center text-[20px] font-bold"
                >
                  <Chevron open={showAllRight} className="mr-2 h-7 w-7" />
                  {showAllRight ? "Ver menos" : "Ver todos"}
                </button>
              </section>
            </div>
          </div>
        </div>
      </main>

      {quoteItems.length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
          <button
            type="button"
            onClick={() => setQuoteModalOpen(true)}
            className="rounded-full bg-[#62a95f] px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base md:text-[16px] font-bold text-white shadow-lg transition-colors hover:bg-[#5a9f57]"
          >
            Enviar cotización de seleccionados ({quoteItems.length})
          </button>
        </div>
      )}

      {quoteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
          {/* overlay */}
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Cerrar"
            onClick={() => setQuoteModalOpen(false)}
          />

          {/* card */}
          <div className="relative w-full max-w-[720px] overflow-hidden rounded-[24px] bg-white shadow-2xl">
            <div className="p-6 md:p-8">
              <h3 className="mb-6 text-2xl font-bold text-[#0f1932]">Solicitar Cotización</h3>
              
              {/* Inputs en 2 columnas */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  value={formNombre}
                  onChange={(e) => setFormNombre(e.target.value)}
                  placeholder="Nombre y apellidos"
                  className="h-10 rounded-full bg-slate-200 px-5 text-[14px] font-semibold text-slate-700 outline-none placeholder:text-slate-500"
                />
                <input
                  value={formCorreo}
                  onChange={(e) => setFormCorreo(e.target.value)}
                  placeholder="Correo electrónico"
                  type="email"
                  className="h-10 rounded-full bg-slate-200 px-5 text-[14px] font-semibold text-slate-700 outline-none placeholder:text-slate-500"
                />
                <input
                  value={formTelefono}
                  onChange={(e) => setFormTelefono(e.target.value)}
                  placeholder="Teléfono / WhatsApp"
                  type="tel"
                  className="h-10 rounded-full bg-slate-200 px-5 text-[14px] font-semibold text-slate-700 outline-none placeholder:text-slate-500"
                />
                <input
                  value={formEmpresa}
                  onChange={(e) => setFormEmpresa(e.target.value)}
                  placeholder="Nombre de la empresa"
                  className="h-10 rounded-full bg-slate-200 px-5 text-[14px] font-semibold text-slate-700 outline-none placeholder:text-slate-500"
                />
                <input
                  value={formCargo}
                  onChange={(e) => setFormCargo(e.target.value)}
                  placeholder="Cargo o puesto"
                  className="h-10 rounded-full bg-slate-200 px-5 text-[14px] font-semibold text-slate-700 outline-none placeholder:text-slate-500"
                />
                <textarea
                  value={formComentario}
                  onChange={(e) => setFormComentario(e.target.value)}
                  placeholder="Descripción o comentario"
                  rows={1}
                  className="h-10 rounded-full bg-slate-200 px-5 py-2 text-[14px] font-semibold text-slate-700 outline-none placeholder:text-slate-500 resize-none"
                />
              </div>

              {/* Resumen de seleccionados */}
              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <div className="text-[14px] font-extrabold text-slate-700">Seleccionados ({quoteItems.length})</div>
                <ul className="mt-2 space-y-1 text-[13px] font-semibold text-slate-600">
                  {quoteItems.map((x) => (
                    <li key={x.id} className="flex items-start gap-2">
                      <span className="mt-[6px] h-[4px] w-[4px] shrink-0 rounded-full bg-slate-500" />
                      <span>{x.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA + helper */}
              <div className="mt-5 flex items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    // Separar servicios y cursos
                    const servicios = quoteItems.filter(item => item.kind === "servicio");
                    const cursos = quoteItems.filter(item => item.kind === "curso");

                    // Construir mensaje para WhatsApp
                    let mensaje = `Hola, mi nombre es ${formNombre}`;
                    if (formEmpresa) mensaje += ` de la empresa ${formEmpresa}`;
                    if (formCargo) mensaje += `, soy ${formCargo}`;
                    mensaje += `.%0A%0A`;

                    // Datos de contacto
                    mensaje += `*Datos de contacto:*%0A`;
                    if (formCorreo) mensaje += `Email: ${formCorreo}%0A`;
                    if (formTelefono) mensaje += `Teléfono: ${formTelefono}%0A`;
                    mensaje += `%0A`;

                    // Servicios seleccionados
                    if (servicios.length > 0) {
                      mensaje += `*Servicios a cotizar:*%0A`;
                      servicios.forEach((s, i) => {
                        mensaje += `${i + 1}. ${s.label}%0A`;
                      });
                      mensaje += `%0A`;
                    }

                    // Cursos seleccionados
                    if (cursos.length > 0) {
                      mensaje += `*Cursos o capacitaciones:*%0A`;
                      cursos.forEach((c, i) => {
                        mensaje += `${i + 1}. ${c.label}%0A`;
                      });
                      mensaje += `%0A`;
                    }

                    // Comentario adicional
                    if (formComentario) {
                      mensaje += `*Comentario adicional:*%0A${formComentario}%0A`;
                    }

                    // Abrir WhatsApp
                    const whatsappUrl = `https://wa.me/5215534427319?text=${mensaje}`;
                    window.open(whatsappUrl, '_blank');
                    
                    setQuoteModalOpen(false);
                  }}
                  className="rounded-full bg-[#62a95f] px-6 py-3 text-[14px] font-extrabold text-white shadow-md transition-colors hover:bg-[#5a9f57]"
                >
                  Enviar por WhatsApp
                </button>

                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(false)}
                  className="text-[14px] font-semibold text-slate-500 hover:text-slate-700"
                >
                  Cerrar
                </button>
              </div>

              <div className="mt-3 text-[12px] font-semibold text-slate-500">
                Te responderemos en menos de 5 minutos.
              </div>
            </div>
          </div>
        </div>
      )}
      {/* FOOTER */}
    </div>
  );
}
