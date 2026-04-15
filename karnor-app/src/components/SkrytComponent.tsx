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
    <section className="relative isolate overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-18rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%+8rem)] aspect-[1155/678] w-[34rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-15 sm:w-[60rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg shadow-indigo-950/5 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-6 lg:items-center">
            <div className="flex justify-center lg:col-span-1 lg:justify-start">
              <img
                alt="Karin Nordlund"
                src="CEO.jpg"
                className="h-24 w-24 rounded-full object-cover ring-4 ring-indigo-50 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
              />
            </div>

            <div className="text-center lg:col-span-5 lg:text-left">
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

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
