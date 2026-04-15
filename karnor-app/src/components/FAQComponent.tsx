import { useState } from "react";
import {
  ArrowRightIcon,
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

const principles = [
  "Planering som håller ihop över tid",
  "Material som går att använda direkt",
  "Tydliga steg för arbetslag och ledning",
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
      className={`overflow-hidden rounded-lg border bg-white transition-all duration-300 ${
        isOpen
          ? "border-indigo-200 shadow-lg shadow-indigo-600/10"
          : "border-gray-200 shadow-sm hover:border-indigo-200 hover:shadow-md"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6"
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 gap-4">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
              isOpen ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600"
            }`}
          >
            {String(idx + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0">
            <span className="inline-flex rounded-md bg-pink-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-pink-700 ring-1 ring-pink-100">
              {item.tag}
            </span>
            <span className="mt-2 block text-lg font-bold leading-7 text-gray-900 sm:text-xl">
              {item.q}
            </span>
          </span>
        </span>
        <ChevronDownIcon
          className={`mt-2 h-5 w-5 shrink-0 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-indigo-600" : ""
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
          <p className="px-5 pb-6 text-base leading-7 text-gray-600 sm:px-20">
            {item.a}
          </p>
        </div>
      </div>
    </article>
  );
};

const FAQComponent: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative isolate overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm">
              <SparklesIcon className="h-4 w-4 text-pink-100" aria-hidden="true" />
              Om Karnor
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Mindre krångel. Mer riktning. Snyggare skolvardag.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Karnor är platsen där planering, struktur och fritidshemmets kraft får en form som känns modern, tydlig och enkel att använda.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {principles.map((principle) => (
                <div
                  key={principle}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircleIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold leading-6 text-gray-900">
                    {principle}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="mailto:karnor@test.se"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Skicka en fråga
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div>
            <p className="text-base font-semibold leading-7 text-indigo-600">
              Vanliga frågor
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Svar utan onödigt brus.
            </h2>
            <div className="mt-8 space-y-4">
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
      </div>
    </section>
  );
};

export default FAQComponent;
