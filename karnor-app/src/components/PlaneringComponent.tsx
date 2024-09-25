import { AcademicCapIcon, LightBulbIcon,  PencilIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Språk och kommunikation',
    description: 'Exempeltext',
    icon: PencilIcon,
    fileName: 'sprakochkommunikation.pdf' // Corresponding file name for the feature
  },
  {
    name: 'Skapande och estetiska uttrycksformer',
    description: 'Exempeltext.',
    icon: AcademicCapIcon,
    fileName: 'skapandeOchEstetiska.pdf'
  },
  {
    name: 'Natur och skapande',
    description: 'Exempeltext',
    icon: LightBulbIcon,
    fileName: 'naturochsamhalle.pdf'
  },
  {
    name: 'Lekar, fysiska aktiviteter och utevistelse',
    description: 'Exempeltext',
    icon: PresentationChartBarIcon,
    fileName: 'lekar.pdf'
  },
]

export default function PlaneringComponent() {
  const handleDownload = async (fileName: string) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      // Construct the URL using the fileName
      const response = await fetch(`${API_BASE_URL}/downloadPdfByFileName/${fileName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf', // Expect a PDF file
        },
      });

      if (response.ok) {
        // Convert the response to a Blob
        const blob = await response.blob();

        // Create a new object URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Open the PDF in a new tab
        window.open(url, '_blank');
      } else {
        console.error('Failed to download the PDF');
      }
    } catch (error) {
      console.error('Error while downloading the PDF:', error);
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Pedagogiska planeringar för respektive kunskapsområde och centrala innehåll
          </p>
          <p className="mt-5 text-lg leading-8 text-gray-600">
            Exempeltext
          </p>
        </div>
        <div className="mx-auto max-w-2xl mt-10 sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative pl-20 cursor-pointer rounded-lg border border-transparent hover:shadow-lg hover:border-gray-300 transition-shadow duration-300"
                onClick={() => handleDownload(feature.fileName)} // Add click handler
              >
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-9 w-9 text-white" />
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
  );
}
