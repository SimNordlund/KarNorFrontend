import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, BookOpenIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Define the type for navigation items
type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
};

const navigation: NavigationItem[] = [
  { name: 'Startsida', href: '/', current: false },
  { name: 'Verksamhetsberättelse', href: '#', current: false },
  { name: 'Kontakt', href: '/', current: false },
  { name: 'Om Karnor', href: '/AboutUs', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function MenuBarComponent() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadPdf = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/downloadPdf/2`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the PDF.');
      }

      const blob = await response.blob();

      // Ensure the browser handles the PDF blob correctly
      const pdfUrl = window.URL.createObjectURL(blob);
      const newWindow = window.open(pdfUrl);

      if (newWindow) {
        newWindow.focus();
      } else {
        throw new Error("Failed to open the PDF.");
      }

      setPdfUrl(pdfUrl); // Optionally, keep track of the URL in case you want to revoke it later
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
                  <p className="text-white text-2xl">Karnor</p>
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
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button type="button" className="relative rounded-full bg-blue-800 p-1 text-gray-400 hover:text-white">
                  <span className="sr-only">View notifications</span>
                  <BookOpenIcon className="h-6 w-6" aria-hidden="true" />
                </button>
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
