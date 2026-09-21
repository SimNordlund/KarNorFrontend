import { Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { NavLink, Link } from 'react-router-dom';
import { Bars3Icon, BookOpenIcon, ChevronDownIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useShop } from '../shop/ShopContext';
const navigation = [['Materialbutik', '/butik'], ['Planering', '/planering'], ['Om Karnor', '/about']];
const tools = [['Årshjulet', '/wheel'], ['Struktur & regler', '/struktur&regler'], ['Processbeskrivning', '/inspiration/process'], ['Rastaktiviteter', '/inspiration/rastaktiviteter'], ['Relationsskapande', '/inspiration/relationer'], ['SPSM', '/spsm']];
export default function MenuBarComponent() {
  const { cart, openCart } = useShop();
  return <><a href="#main-content" className="site-skip-link">Hoppa till innehållet</a><Disclosure as="nav" aria-label="Huvudmeny" className="site-header">
    {({ open }) => <><div className="site-header-inner">
      <Link to="/" className="site-brand" aria-label="Karnor – startsida"><BookOpenIcon aria-hidden="true" /><span>Karnor<small>FÖR FRITIDSHEMMET</small></span></Link>
      <div className="site-desktop-nav">{navigation.map(([name, href]) => <NavLink key={href} to={href} className={({ isActive }) => isActive ? 'is-active' : ''}>{name}</NavLink>)}
        <Popover className="site-tools"><PopoverButton>Verktyg & inspiration <ChevronDownIcon aria-hidden="true" /></PopoverButton><PopoverPanel className="site-tools-panel">{({ close }) => <>{tools.map(([name, href]) => <Link key={href} to={href} onClick={() => close()}>{name}</Link>)}<a href="/verksamhet.pdf" target="_blank" rel="noopener noreferrer">Verksamhetsberättelse ↗</a></>}</PopoverPanel></Popover>
      </div>
      <div className="site-header-actions"><button type="button" onClick={openCart} className="site-cart-button" aria-label={'Öppna varukorgen, ' + cart.length + ' material'}><ShoppingBagIcon aria-hidden="true" /><span>Varukorg</span><b aria-hidden="true">{cart.length}</b></button><DisclosureButton className="site-mobile-toggle" aria-label={open ? 'Stäng menyn' : 'Öppna menyn'}>{open ? <XMarkIcon aria-hidden="true" /> : <Bars3Icon aria-hidden="true" />}</DisclosureButton></div>
    </div><DisclosurePanel className="site-mobile-menu">{[...navigation, ...tools].map(([name, href]) => <DisclosureButton key={href} as={NavLink} to={href}>{name}</DisclosureButton>)}<a href="/verksamhet.pdf" target="_blank" rel="noopener noreferrer">Verksamhetsberättelse ↗</a></DisclosurePanel></>}
  </Disclosure></>;
}
