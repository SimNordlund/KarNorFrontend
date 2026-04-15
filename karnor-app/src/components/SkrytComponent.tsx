import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const proofPoints = [
  {
    label: "Skolvardag",
    text: "Byggt för pedagoger som behöver struktur som går att använda direkt.",
    icon: AcademicCapIcon,
  },
  {
    label: "Riktning",
    text: "Tydligare planering, mindre gissande och bättre överblick över året.",
    icon: ArrowTrendingUpIcon,
  },
  {
    label: "Känsla",
    text: "Ett arbetssätt som känns modernt utan att tappa fotfästet i verkligheten.",
    icon: SparklesIcon,
  },
];

export default function SkrytComponent() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-indigo-50/70"
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <div className="absolute -inset-3 -z-10 rounded-lg bg-gradient-to-tr from-pink-300 to-indigo-300 opacity-60 blur-2xl" />
            <div className="overflow-hidden rounded-lg border border-gray-900/10 bg-white p-3 shadow-2xl shadow-indigo-950/15">
              <img
                alt="Karin Nordlund"
                src="CEO.jpg"
                className="mx-auto aspect-[4/5] max-h-[28rem] w-full rounded-lg object-cover"
              />
              <div className="mt-3 rounded-lg bg-gray-900 p-4 text-white">
                <p className="text-sm font-bold uppercase tracking-wide text-pink-200">
                  Grundare
                </p>
                <p className="mt-1 text-2xl font-black">Karin Nordlund</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Driver Karnor med fokus på tydlighet, tempo och verklig nytta.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-600/20">
              <SparklesIcon className="h-4 w-4 text-pink-100" aria-hidden="true" />
              Lite skryt, ganska välförtjänt
            </div>

            <figure className="mt-6">
              <blockquote className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                <p>
                  “Det finns få som kan klå Karnor. Ödet var min väg.”
                </p>
              </blockquote>
              <figcaption className="mt-6 flex flex-wrap items-center gap-3 text-base">
                <span className="font-bold text-gray-900">Karin Nordlund</span>
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" aria-hidden="true" />
                <span className="text-gray-600">VD över Karnor</span>
              </figcaption>
            </figure>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {proofPoints.map((point) => (
                <div
                  key={point.label}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-950/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                    <point.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-sm font-black uppercase tracking-wide text-pink-700">
                    {point.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
