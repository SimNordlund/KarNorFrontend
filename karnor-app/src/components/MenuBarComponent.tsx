import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, BookOpenIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon, HomeIcon, PhoneIcon, PlayCircleIcon, ScaleIcon } from '@heroicons/react/20/solid';
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline';

// Define the type for navigation items
type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
};

const navigation: NavigationItem[] = [
  { name: 'Årshjulet', href: '/wheel.PNG', current: false },
  { name: 'Verksamhetsberättelse', href: '#', current: false },
  { name: 'Om Karnor', href: '/about', current: false },
];

const Meny = [
  { name: 'Struktur & regler', description: 'Verksamhetens struktur och regler', href: '/struktur&regler', icon: ScaleIcon },
  { name: 'Pedagogisk planering', description: 'För respektive kunskapsområde', href: '/planering', icon: SquaresPlusIcon },
  { name: 'Rastaktiviteter', description: 'Läs mer om rastaktiviteter', href: '/404', icon: ChartPieIcon },
  { name: 'Relationsskapande', description: 'Skapa goda relationer', href: '/404', icon: BookOpenIcon },
  { name: 'Processbeskrivning', description: 'Processbeskrivning för en pedagogisk planering', href: '/404', icon: ArrowPathIcon },
  { name: 'Läroplanen', description: "Läroplanen för fritids", href: 'https://www.skolverket.se/undervisning/fritidshemmet/laroplan-for-fritidshemmet', icon: FingerPrintIcon },
  { name: 'SPSM', description: 'Specialpedagogiska skolmyndigheten', href: 'https://www.spsm.se/', icon: CursorArrowRaysIcon },
];
const callsToAction = [
  { name: 'Presentation', href: 'https://www.youtube.com/watch?v=XYZ6_n7Mpb0', icon: PlayCircleIcon },
  { name: 'Kontakt', href: '/about', icon: PhoneIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function MenuBarComponent() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadPdf = async () => {
    setLoading(true);
    setError(null);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/downloadPdf/1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the PDF.');
      }

      const blob = await response.blob();

      const pdfUrl = window.URL.createObjectURL(blob);
      const newWindow = window.open(pdfUrl);

      if (newWindow) {
        newWindow.focus();
      } else {
        throw new Error("Failed to open the PDF.");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Disclosure as="nav" className="bg-indigo-950 sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center mb-1">
                  <a className="text-white text-2xl" href='/'>Karnor</a>
                </div>
                <div className="hidden sm:ml-10 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={item.name === 'Verksamhetsberättelse' ? handleDownloadPdf : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div>
              <Popover className="relative hidden sm:block">
                      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
                        <span>Meny</span>
                        <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
                      </PopoverButton>
                      <PopoverPanel
                        className="absolute z-10 mt-3 transform -translate-x-1/2 left-1/2 bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                      >
                        <div className="w-screen max-w-md overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                          <div className="p-4">
                            {Meny.map((item) => (
                              <div
                                key={item.name}
                                className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                              >
                                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                  <item.icon
                                    aria-hidden="true"
                                    className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                  />
                                </div>
                                <div>
                                  <a href={item.href} className="font-semibold text-gray-900">
                                    {item.name}
                                    <span className="absolute inset-0" />
                                  </a>
                                  <p className="mt-1 text-gray-600">{item.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                            {callsToAction.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                              >
                                <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <a  href='/' className="relative rounded-full bg-blue-600 p-1 text-gray-200 hover:text-white">
                  <span className="sr-only">View notifications</span>
                  <HomeIcon className="h-6 w-6" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}

              {/* Display the Meny items in the mobile version */}
              {Meny.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>

          {/* Handle loading and error */}
          {loading && <p>Loading PDF...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </>
      )}
    </Disclosure>
  );
}
