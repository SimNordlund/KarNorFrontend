import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';
import { BookOpenIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Digitalt.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Kvalitetssäkrat.',
    icon: LockClosedIcon,
  },
  {
    name: 'Håll koll på aktiviteter.',
    icon: ServerIcon,
  },
  {
    name: 'Håll koll på aktiviteter.',
    icon: BookOpenIcon,
  },
  
]

export default function FeatureComponent() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Årshjulet</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Enkelt arbetssätt</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Ett simpelt och enkelt verktyg. Integrera läroplanen och få guidning. Årshjulet är för tillfället under utveckling. Kommer lanceras inom kort.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                      {feature.name}
                    </dt>{' '}
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="/wheel.PNG"
            width={2432}
            height={1442}
            className="w-full sm:w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-14 lg:-ml-12"
          />
        </div>
      </div>
    </div>
  )
}
