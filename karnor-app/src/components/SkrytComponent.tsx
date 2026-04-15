import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const proofPoints = [
  {
    label: "Skolvardag",
    text: "Struktur som går att använda direkt.",
    icon: AcademicCapIcon,
  },
  {
    label: "Riktning",
    text: "Bättre överblick över året.",
    icon: ArrowTrendingUpIcon,
  },
  {
    label: "Känsla",
    text: "Modernt utan att bli krångligt.",
    icon: SparklesIcon,
  },
];

export default function SkrytComponent() {
  return (
    <section className="bg-white px-4 pb-20 pt-4 sm:px-6 sm:pb-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-gray-200 bg-white shadow-xl shadow-indigo-950/5">
          <div className="h-1 rounded-t-lg bg-gradient-to-r from-[#ff80b5] to-[#9089fc]" />

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[180px_1fr] lg:gap-10 lg:p-10">
            <div className="flex justify-center lg:justify-start">
              <img
                alt="Karin Nordlund"
                src="CEO.jpg"
                className="rounded-lg object-cover ring-1 ring-gray-200"
                style={{
                  width: "clamp(128px, 12vw, 176px)",
                  height: "clamp(128px, 12vw, 176px)",
                  maxWidth: "176px",
                  maxHeight: "176px",
                }}
              />
            </div>

            <div className="min-w-0 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
                <SparklesIcon className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                Lite skryt, ganska välförtjänt
              </div>

              <figure className="mt-5">
                <blockquote className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  <p>“Det finns få som kan klå Karnor. Ödet var min väg.”</p>
                </blockquote>
                <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-3 text-base lg:justify-start">
                  <span className="font-semibold text-gray-900">Karin Nordlund</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" aria-hidden="true" />
                  <span className="text-gray-600">VD över Karnor</span>
                </figcaption>
              </figure>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {proofPoints.map((point) => (
                  <div
                    key={point.label}
                    className="rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                        <point.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-pink-700">
                        {point.label}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{point.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
