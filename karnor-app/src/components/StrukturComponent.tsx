import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Struktur',
    description:
      'Exempeltext som beskriver dokumentet. Exempeltext som beskriver dokumentet/länken. Exempeltext som beskriver dokumentet/länken.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Regler',
    description:
      'Exempeltext. Exempeltext som beskriver dokumentet/länken.. Exempeltext som beskriver dokumentet/länken.',
    icon: LockClosedIcon,
  },
  {
    name: 'Struktur ute',
    description:
      'Exempeltext',
    icon: ArrowPathIcon,
  },
  {
    name: 'Regler inne',
    description:
      'Exempeltext',
    icon: FingerPrintIcon,
  },
]

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className=" text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Verksamhetens struktur och regler
          </p>
          <p className="mt-5 text-lg leading-8 text-gray-600">
            Nedan hittar du länkar till respektive fil. Klicka på knapparna.
          </p>
        </div>
        <div className="mx-auto mt- max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
