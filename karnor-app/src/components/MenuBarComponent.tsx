import { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { NavLink, Link } from 'react-router-dom';
import { ArrowPathIcon, Bars3Icon, BookOpenIcon, ChartPieIcon, ChevronDownIcon, CursorArrowRaysIcon, FingerPrintIcon, PhoneIcon, PlayCircleIcon, ScaleIcon, ShoppingBagIcon, SquaresPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useShop } from '../shop/ShopContext';

const navigation = [
  { name: 'Materialbutik', href: '/butik' },
  { name: 'Läroplanen', href: 'https://www.skolverket.se/undervisning/fritidshemmet/laroplan-for-fritidshemmet' },
  { name: 'SPSM', href: '/spsm' },
  { name: 'Om Karnor', href: '/about' },
];

const menu = [
  { name: 'Årshjulet', description: 'Verktyget årshjulet', href: '/wheel', icon: FingerPrintIcon },
  { name: 'Verksamhetsberättelse', description: 'Årets verksamhetsberättelse', href: null, icon: CursorArrowRaysIcon },
  { name: 'Pedagogisk planering', description: 'För respektive kunskapsområde', href: '/planering', icon: SquaresPlusIcon },
  { name: 'Struktur & regler', description: 'Verksamhetens struktur och regler', href: '/struktur&regler', icon: ScaleIcon },
  { name: 'Processbeskrivning', description: 'Processbeskrivning för en pedagogisk planering', href: '/404', icon: ArrowPathIcon },
  { name: 'Rastaktiviteter', description: 'Läs mer om rastaktiviteter', href: '/404', icon: ChartPieIcon },
  { name: 'Relationsskapande', description: 'Skapa goda relationer', href: '/404', icon: BookOpenIcon },
];

const navClass = ({ isActive }: { isActive: boolean }) => `rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-indigo-100/80 hover:bg-white/10 hover:text-white'}`;

export default function MenuBarComponent() {
  const { cart, openCart } = useShop();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownloadPdf() {
    setLoading(true);
    setError(null);
    // Open during the click so browsers do not block the PDF after fetching it.
    const pdfWindow = window.open('about:blank', '_blank');
    try {
      if (!pdfWindow) throw new Error('Tillåt popup-fönster för att öppna verksamhetsberättelsen.');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/downloadPdfByFileName/verksamhetsberattelse.pdf`, {
        method: 'GET', headers: { 'Content-Type': 'application/pdf' },
      });
      if (!response.ok) throw new Error('Verksamhetsberättelsen kunde inte hämtas. Försök igen senare.');
      const pdfUrl = URL.createObjectURL(await response.blob());
      pdfWindow.location.href = pdfUrl;
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 60000);
    } catch (downloadError) {
      pdfWindow?.close();
      setError(downloadError instanceof Error ? downloadError.message : 'PDF-filen kunde inte öppnas.');
    } finally {
      setLoading(false);
    }
  }

  return <Disclosure as="nav" aria-label="Huvudmeny" className="sticky top-0 z-50 bg-indigo-950 text-white">
    {({ open }) => <>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-8">
          <DisclosureButton className="rounded-md p-2 text-indigo-100 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden">
            <span className="sr-only">{open ? 'Stäng menyn' : 'Öppna menyn'}</span>
            {open ? <XMarkIcon className="h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
          </DisclosureButton>
          <Link to="/" aria-label="Karnor – startsida" className="flex items-center gap-2.5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <BookOpenIcon className="hidden h-7 w-7 text-indigo-200 sm:block" aria-hidden="true" /><span className="text-xl tracking-tight sm:text-2xl">Karnor</span>
          </Link>
          <div className="hidden items-center gap-1 lg:flex">{navigation.map(item => <NavLink key={item.name} to={item.href} className={navClass}>{item.name}</NavLink>)}</div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <Link to="/butik" className="rounded px-1 py-2 text-xs font-medium text-indigo-100 hover:text-white lg:hidden">Materialbutik</Link>
          <Popover className="relative hidden lg:block">
            <PopoverButton className="inline-flex items-center gap-2 rounded-md border border-white/25 px-3 py-2 text-xs font-medium text-indigo-100 hover:bg-white/10">Meny och verktyg<ChevronDownIcon className="h-4 w-4" aria-hidden="true" /></PopoverButton>
            <PopoverPanel className="absolute right-0 z-10 mt-4 w-80 overflow-hidden rounded-xl bg-white text-gray-900 shadow-xl ring-1 ring-black/5">
              {({ close }) => <><div className="p-3">{menu.map(item => <div key={item.name} className="group relative flex items-center gap-3 rounded-lg p-2.5 hover:bg-indigo-50">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 text-gray-500 group-hover:text-indigo-600"><item.icon className="h-5 w-5" aria-hidden="true" /></div>
                <div>{item.href ? <Link to={item.href} onClick={() => close()} className="text-xs font-semibold">{item.name}<span className="absolute inset-0" /></Link> : <button type="button" disabled={loading} onClick={() => { close(); void handleDownloadPdf(); }} className="text-xs font-semibold">{loading ? 'Hämtar PDF…' : item.name}<span className="absolute inset-0" /></button>}<p className="mt-0.5 text-[10px] text-gray-500">{item.description}</p></div>
              </div>)}</div><div className="grid grid-cols-2 divide-x border-t bg-gray-50 text-xs font-medium"><a href="https://www.youtube.com/watch?v=XYZ6_n7Mpb0" className="flex items-center justify-center gap-2 p-4 hover:bg-gray-100"><PlayCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />Presentation</a><Link to="/about" onClick={() => close()} className="flex items-center justify-center gap-2 p-4 hover:bg-gray-100"><PhoneIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />Kontakt</Link></div></>}
            </PopoverPanel>
          </Popover>
          <button type="button" onClick={openCart} aria-label={`Öppna varukorgen, ${cart.length} material`} className="relative flex items-center gap-2 rounded-md p-1.5 text-indigo-100 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:p-2">
            <ShoppingBagIcon className="h-5 w-5" aria-hidden="true" /><span className="hidden text-xs xl:inline">Varukorg</span><span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-200 px-1 text-[10px] font-semibold text-indigo-950" aria-hidden="true">{cart.length}</span>
          </button>
        </div>
      </div>
      <DisclosurePanel className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 px-4 pb-5 pt-3 lg:hidden">
        <div className="space-y-1">{navigation.map(item => <DisclosureButton key={item.name} as={NavLink} to={item.href} className="block rounded-md px-3 py-2 text-sm text-indigo-100 hover:bg-white/10">{item.name}</DisclosureButton>)}</div>
        <p className="mb-2 mt-5 px-3 text-[10px] font-semibold uppercase tracking-widest text-indigo-300">Meny och verktyg</p>
        {menu.map(item => item.href ? <DisclosureButton key={item.name} as={Link} to={item.href} className="block rounded-md px-3 py-2 text-sm text-indigo-100 hover:bg-white/10">{item.name}</DisclosureButton> : <DisclosureButton key={item.name} onClick={() => void handleDownloadPdf()} disabled={loading} className="block rounded-md px-3 py-2 text-left text-sm text-indigo-100 hover:bg-white/10">{loading ? 'Hämtar PDF…' : item.name}</DisclosureButton>)}
      </DisclosurePanel>
      {loading && <p role="status" className="px-4 pb-2 text-center text-xs text-indigo-100">Hämtar verksamhetsberättelsen…</p>}
      {error && <div role="alert" className="flex items-center justify-center gap-3 bg-red-50 px-4 py-2 text-xs text-red-800"><p>{error}</p><button type="button" onClick={() => setError(null)} aria-label="Stäng felmeddelande"><XMarkIcon className="h-4 w-4" /></button></div>}
    </>}
  </Disclosure>;
}
