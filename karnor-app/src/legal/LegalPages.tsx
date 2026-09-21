import { Link } from 'react-router-dom';
import { PageIntro } from '../site/SiteComponents';
import { business, termsVersion } from './business';

function Missing({ label }: { label: string }) {
  return <span className="site-legal-missing">{label} behöver anges före försäljningsstart.</span>;
}

function ContactDetails() {
  return <dl className="site-contact-details">
    <div><dt>Säljare</dt><dd>{business.legalName} ({business.brand})</dd></div>
    <div><dt>Organisationsnummer</dt><dd>{business.organizationNumber || <Missing label="Organisationsnummer" />}</dd></div>
    <div><dt>Postadress</dt><dd>{business.address || <Missing label="Postadress" />}</dd></div>
    <div><dt>E-post</dt><dd>{business.email ? <a href={`mailto:${business.email}`}>{business.email}</a> : <Missing label="E-postadress" />}</dd></div>
    {business.phone && <div><dt>Telefon</dt><dd><a href={`tel:${business.phone.replace(/\s/g, '')}`}>{business.phone}</a></dd></div>}
  </dl>;
}

export function TermsPage() {
  return <main id="main-content" className="site-container site-legal">
    <PageIntro eyebrow="Köpvillkor" title="Tydligt före, under och efter köpet." description="Här ser du vad som gäller när du köper digitalt material från Karnor." />
    <p className="site-legal-updated">Senast uppdaterad: 21 september 2026 · version {termsVersion}</p>
    <section><h2>1. Säljare och kontakt</h2><ContactDetails /><p>Säljaren ovan är din avtalspart. Frågor, reklamationer och begäran om återbetalning ska skickas till kontaktuppgifterna ovan.</p></section>
    <section><h2>2. Produkter och användning</h2><p>Produkterna är digitala filer för pedagogiskt bruk. Filformat, antal sidor, åldersgrupp, innehåll och pris visas på respektive produktsida innan köp.</p><p>Köpet ger köparen rätt att använda och skriva ut materialet i den egna verksamheten. Materialet får inte säljas vidare, publiceras öppet, delas som en fristående fil med andra verksamheter eller användas för att skapa en konkurrerande produkt.</p></section>
    <section><h2>3. Tekniska krav</h2><p>Du behöver internetanslutning, en modern webbläsare, lagringsutrymme och programvara som kan öppna produktens angivna filformat, exempelvis PDF, PNG, JPG eller WebP. Du kan behöva hjälpa till med skälig felsökning för att avgöra om ett fel beror på filen eller din utrustning.</p></section>
    <section><h2>4. Pris och betalning</h2><p>Alla priser visas i svenska kronor. Det pris som visas i varukorgen är totalpriset för de valda materialen. Eventuell moms ingår i det visade priset. Inga fraktkostnader tillkommer.</p><p>Betalningen genomförs hos Stripe med de betalningsmetoder som visas där, exempelvis Swish. Stripe behandlar betalningsuppgifter enligt sina egna villkor. Ett köp är genomfört när betalningen har godkänts och du får tillgång till beställningssidan.</p></section>
    <section><h2>5. Leverans</h2><p>Materialet levereras digitalt utan fysisk frakt. Efter bekräftad betalning visas nedladdningslänkar på beställningssidan. Där kan du även ladda ner en köpbekräftelse med beställningsuppgifter, gällande villkorsversion och ditt samtycke till omedelbar leverans. Spara filerna och bekräftelsen på din enhet direkt; sidan är tillgänglig i samma webbläsare i högst 30 dagar.</p><p>Kontakta Karnor om betalningen har genomförts men filen inte går att hämta.</p></section>
    <section><h2>6. Ångerrätt för digitalt innehåll</h2><p>Vid distansköp gäller normalt 14 dagars ångerrätt. För digitalt innehåll som levereras direkt upphör ångerrätten när leveransen börjar, om du först uttryckligen har samtyckt till omedelbar leverans och godkänt att ångerrätten därmed upphör.</p><p>Innan du går vidare till betalningen behöver du därför aktivt godkänna detta. Rutorna är inte förkryssade. Om leveransen ännu inte har börjat eller om lagens undantag inte gäller behåller du den ångerrätt som följer av tvingande lag.</p></section>
    <section><h2>7. Reklamation</h2><p>Om filen är felaktig, inte motsvarar beskrivningen eller inte kan levereras har du rätt att reklamera enligt konsumentköplagen. För digitalt innehåll ansvarar säljaren normalt för ursprungliga fel som visar sig inom tre år. Ett meddelande inom två månader från att du upptäckte felet anses alltid ha lämnats i rätt tid.</p><p>Ange ditt namn, datum för köpet, beställningsreferens, vilket material det gäller och en beskrivning av felet. Karnor försöker i första hand rätta felet eller ge dig en fungerande fil. Prisavdrag eller återbetalning kan bli aktuellt enligt lag om felet inte kan lösas.</p></section>
    <section><h2>8. Återbetalningar och tvister</h2><p>Godkända återbetalningar görs till samma betalningssätt som användes vid köpet. När återbetalningen har initierats kan det normalt ta 5–10 bankdagar innan den syns, beroende på betalningsmetod och bank.</p><p>Om vi inte kan komma överens kan du vända dig till <a href="https://www.arn.se/" target="_blank" rel="noopener noreferrer">Allmänna reklamationsnämnden (ARN)</a>. Karnor följer svensk tvingande konsumentlagstiftning.</p></section>
  </main>;
}

export function PrivacyPage() {
  return <main id="main-content" className="site-container site-legal">
    <PageIntro eyebrow="Integritet" title="Så hanterar Karnor personuppgifter." description="Information om uppgifter som behandlas när du använder webbplatsen, handlar eller kontaktar oss." />
    <p className="site-legal-updated">Senast uppdaterad: 21 september 2026</p>
    <section><h2>Personuppgiftsansvarig</h2><ContactDetails /></section>
    <section><h2>Vilka uppgifter behandlas?</h2><ul><li>Betalnings- och kontaktuppgifter som du lämnar till Stripe i samband med köp.</li><li>Beställningsreferens, valda produkter, belopp, betalningsstatus och tidpunkter som behövs för leverans, support och bokföring.</li><li>Tekniska uppgifter i en nödvändig köpsession som gör att samma webbläsare kan nå sina filer.</li><li>Uppgifter du själv lämnar när du kontaktar oss om frågor eller reklamationer.</li></ul></section>
    <section><h2>Varför behandlas uppgifterna?</h2><p>Uppgifter behandlas för att fullgöra köpet och leverera material, hantera support och reklamationer, förebygga missbruk samt uppfylla rättsliga skyldigheter som bokföring. Behandlingen grundas på avtal, rättslig förpliktelse och berättigat intresse beroende på ändamålet.</p></section>
    <section><h2>Stripe och mottagare</h2><p>Stripe behandlar betalningsuppgifter som betalningsleverantör. Karnor lagrar inte fullständiga kort- eller bankuppgifter. Uppgifter lämnas endast till leverantörer som behövs för drift, betalning och lagstadgade skyldigheter.</p><p>Läs <a href="https://stripe.com/se/privacy" target="_blank" rel="noopener noreferrer">Stripes integritetspolicy</a> för information om deras behandling och eventuella överföringar till länder utanför EU/EES.</p></section>
    <section><h2>Lagring och webbläsardata</h2><p>Order- och betalningsunderlag sparas så länge det krävs för att fullgöra avtalet, hantera rättsliga anspråk och följa bokföringsregler. Supportärenden sparas så länge de behövs för ärendet och tillhörande skyldigheter.</p><p>Varukorg och favoriter sparas lokalt i din webbläsare. En nödvändig, säker köpsessionskaka används för att skydda åtkomsten till betalda filer i upp till 30 dagar. Webbplatsen använder inga annonseringskakor.</p></section>
    <section><h2>Dina rättigheter</h2><p>Du kan begära tillgång, rättelse eller radering och i vissa fall begränsning eller invända mot behandling. Rätten kan begränsas när uppgifter måste sparas enligt lag. Kontakta oss via uppgifterna ovan. Du kan också lämna klagomål till <a href="https://www.imy.se/" target="_blank" rel="noopener noreferrer">Integritetsskyddsmyndigheten (IMY)</a>.</p></section>
  </main>;
}

export function ContactPage() {
  return <main id="main-content" className="site-container site-legal">
    <PageIntro eyebrow="Kontakt & reklamation" title="Vi hjälper dig med ditt köp." description="Kontakta Karnor om betalning, leverans, reklamation eller återbetalning." />
    <section><h2>Kontaktuppgifter</h2><ContactDetails /><p>Vi svarar så snart som möjligt på vardagar. Undvik att skicka känsliga personuppgifter eller fullständiga betalningsuppgifter via e-post.</p></section>
    <section><h2>Reklamera ett digitalt material</h2><p>Skicka ditt namn, köpdatum, beställningsreferens, materialets namn och en tydlig beskrivning av problemet. Bifoga gärna en skärmbild, men skicka aldrig fullständiga kort- eller bankuppgifter.</p>{business.email && <a className="shop-button shop-button--primary" href={`mailto:${business.email}?subject=${encodeURIComponent('Reklamation av digitalt material')}`}>Skicka reklamation via e-post</a>}</section>
    <section><h2>Ångra eller avbryta ett köp</h2><p>Digitalt material levereras direkt efter betalningen. Om du uttryckligen har samtyckt till omedelbar leverans och godkänt att ångerrätten upphör finns normalt ingen ångerrätt efter att leveransen har börjat. Läs mer i <Link to="/kopvillkor">köpvillkoren</Link>.</p><p>Kontakta oss om leveransen inte har börjat eller om du anser att ångerrätten fortfarande gäller. Ange samma uppgifter som ovan och skriv tydligt att du vill frånträda avtalet.</p></section>
  </main>;
}
