import { useState } from "react";
import {
  ArrowRightIcon,
  BoltIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

interface FaqItem {
  q: string;
  a: string;
  tag: string;
}

const faqsList: FaqItem[] = [
  {
    q: "Vad är Karnor för någonting?",
    a: "Karnor samlar smarta mallar, årshjul och strukturstöd för dig som vill få fart på skolutveckling utan att drunkna i dokument.",
    tag: "Plattformen",
  },
  {
    q: "Vem är Karin Nordlund?",
    a: "Karin driver Karnor med skarp blick för fritidshemmets vardag, tydliga processer och verktyg som faktiskt går att använda när tempot är högt.",
    tag: "Bakom Karnor",
  },
  {
    q: "Hur använder jag årshjulet?",
    a: "Årshjulet hjälper dig att planera teman, uppföljning och viktiga aktiviteter över tid. När det är helt färdigt blir det navet för hela planeringsflödet.",
    tag: "Årshjul",
  },
  {
    q: "Gäller verktygen främst fritids?",
    a: "Ja, fritidshemmet är hjärtat. Samtidigt passar mycket av strukturen för arbetslag, skolledning och andra som vill göra planering tydligare.",
    tag: "Målgrupp",
  },
  {
    q: "Varför skulle jag lyssna på dig?",
    a: "För att Karnor är byggt för verkliga skolmiljöer: mindre fluff, mer riktning, tydligare ansvar och material som gör vardagen lättare.",
    tag: "Förtroende",
  },
];

const highlights = [
  {
    label: "Fokus",
    value: "100%",
    text: "Byggt för vardagen i fritidshem och skola.",
  },
  {
    label: "Tempo",
    value: "Snabbt",
    text: "Från lös idé till plan som går att följa.",
  },
  {
    label: "Känsla",
    value: "Tydligt",
    text: "Struktur som inte känns tungrodd.",
  },
];

const principles = [
  "Planering som håller ihop över tid",
  "Material som går att använda direkt",
  "Tydliga steg for arbetslag och ledning",
];

interface FaqsCardProps {
  item: FaqItem;
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqsCard: React.FC<FaqsCardProps> = ({ item, idx, isOpen, onToggle }) => {
  return (
    <article
      className={`group overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 ${
        isOpen
          ? "border-rose-300 shadow-xl shadow-rose-950/10"
          : "border-slate-200 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-950/10"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-5 px-5 py-5 text-left sm:px-6"
        aria-expanded={isOpen}
      >
        <span className="flex gap-4">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border text-sm font-black transition-colors ${
              isOpen
                ? "border-rose-200 bg-rose-50 text-rose-600"
                : "border-teal-200 bg-teal-50 text-teal-700 group-hover:bg-teal-100"
            }`}
          >
            {String(idx + 1).padStart(2, "0")}
          </span>
          <span>
            <span className="mb-2 inline-flex rounded-md bg-lime-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-lime-800">
              {item.tag}
            </span>
            <span className="block text-lg font-black leading-7 text-slate-950 sm:text-xl">
              {item.q}
            </span>
          </span>
        </span>
        <ChevronDownIcon
          className={`mt-1 h-6 w-6 shrink-0 text-slate-500 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-rose-500" : "group-hover:text-teal-600"
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pl-20 pr-6 sm:pl-24">
            <p className="max-w-2xl text-base leading-7 text-slate-600">{item.a}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

const FAQComponent: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative isolate overflow-hidden bg-[#f7fbfa] text-slate-950">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_42%,#fb7185_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:44px_44px] opacity-40" />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pb-24 lg:px-8">
        <div className="rounded-lg border border-white/30 bg-white/85 p-5 shadow-2xl shadow-slate-950/15 backdrop-blur md:p-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-3 py-2 text-sm font-bold text-white shadow-lg shadow-slate-950/20">
                <SparklesIcon className="h-4 w-4 text-lime-300" aria-hidden="true" />
                Om Karnor
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                Mindre krångel. Mer riktning. Snyggare skolvardag.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
                Karnor är platsen där planering, struktur och fritidshemmets kraft får en form som känns modern, tydlig och lite mer självsäker.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {principles.map((principle) => (
                  <span
                    key={principle}
                    className="inline-flex items-center gap-2 rounded-md border border-teal-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 shadow-sm"
                  >
                    <CheckCircleIcon className="h-5 w-5 text-teal-600" aria-hidden="true" />
                    {principle}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/25">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-lime-300">
                      Karnor-metoden
                    </p>
                    <p className="mt-1 text-2xl font-black">Planera smartare</p>
                  </div>
                  <BoltIcon className="h-9 w-9 text-rose-300" aria-hidden="true" />
                </div>
                <div className="mt-5 space-y-4">
                  {highlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-bold uppercase tracking-wide text-teal-200">
                          {item.label}
                        </p>
                        <p className="text-2xl font-black text-white">{item.value}</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <p className="inline-flex rounded-md bg-rose-100 px-3 py-2 text-sm font-black uppercase tracking-wide text-rose-700">
              Vanliga frågor
            </p>
            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
              Allt du undrar innan du kliver in.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Snabba svar, tydlig riktning och inget onödigt brus. Precis som resten av Karnor.
            </p>
            <a
              href="mailto:karnor@test.se"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-teal-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-teal-900/20 transition hover:-translate-y-0.5 hover:bg-teal-700"
            >
              Skicka en fråga
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="space-y-4">
            {faqsList.map((item, idx) => (
              <FaqsCard
                key={item.q}
                item={item}
                idx={idx}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;
