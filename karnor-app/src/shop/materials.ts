export type MaterialCategory = 'Lek & rörelse' | 'Natur & uteliv' | 'Skapande' | 'Värdegrund' | 'Planering';
export type MaterialTheme = 'lilac' | 'sage' | 'peach' | 'butter' | 'sky' | 'rose';
export type MaterialMotif = 'friends' | 'nature' | 'craft' | 'movement' | 'planner' | 'calm' | 'blocks' | 'seasons';

export interface Material {
  id: string;
  title: string;
  coverTitle: string;
  subtitle: string;
  category: MaterialCategory;
  price: number;
  format: 'PDF' | 'PNG';
  pages: number;
  ages: string[];
  ageLabel?: string;
  theme: MaterialTheme;
  motif: MaterialMotif;
  badge?: string;
  description: string;
  includes: string[];
  image?: { src: string; alt: string; width: number; height: number };
  preview?: { title: string; instruction: string; prompts: string[] };
}

export const categories: MaterialCategory[] = ['Lek & rörelse', 'Natur & uteliv', 'Skapande', 'Värdegrund', 'Planering'];

// Uploaded materials appear first, followed by the original example catalog.
// All prices are still illustrative until purchasing is implemented.
export const materials: Material[] = [
  {
    id: 'argsolen',
    title: 'Argsolen – det är okej att vara arg',
    coverTitle: 'Det är okej att vara arg',
    subtitle: 'Bildstöd för att prata om ilska',
    category: 'Värdegrund', price: 29, format: 'PNG', pages: 1,
    ages: ['F–3'], theme: 'butter', motif: 'friends', badge: 'Utvalt',
    description: 'En färgglad sol med ett viktigt budskap: alla känslor får finnas, men vi får inte göra varandra illa. Solens strålar visar olika sätt att hantera ilska och hitta tillbaka till lugnet.',
    includes: ['En illustrerad affisch om känslan arg', 'Åtta förslag på vad man kan göra när man är arg', 'Bildstöd att använda i samtal på fritids'],
    image: {
      src: '/shop/argsolen.png', width: 1054, height: 1492,
      alt: 'En gul sol med budskapet att det är okej att vara arg men aldrig att göra någon illa. Strålarna visar bland annat att använda sina ord, räkna, ta djupa andetag och be en vuxen om hjälp.',
    },
  },
  {
    id: 'jag-kanner-mig-radd',
    title: 'Jag känner mig rädd – samtal om trygghet',
    coverTitle: 'Jag känner mig rädd',
    subtitle: 'Berätta, peka eller rita',
    category: 'Värdegrund', price: 29, format: 'PNG', pages: 1,
    ages: ['F–3'], theme: 'sky', motif: 'calm',
    description: 'Ett illustrerat samtalsstöd som ger barn utrymme att berätta om rädsla och trygghet. Fyra frågor öppnar för samtal om hur rädsla känns och vem eller vad som kan hjälpa.',
    includes: ['En affisch med fyra samtalsfrågor', 'Bilder om känslor, kroppens signaler och trygghet', 'Förslag på att svara genom att berätta, peka eller rita'],
    image: {
      src: '/shop/jag-kanner-mig-radd.png', width: 1054, height: 1492,
      alt: 'Affischen Jag känner mig rädd med fyra frågor: När brukar du bli rädd? Hur känns det i kroppen? Vad hjälper dig att känna dig trygg? Vem kan hjälpa dig?',
    },
  },
  {
    id: 'vildhastarna',
    title: 'Vildhästarna – rastaktivitet med rockringar',
    coverTitle: 'Vildhästarna',
    subtitle: 'En lekfull rastaktivitet',
    category: 'Lek & rörelse', price: 35, format: 'PNG', pages: 1,
    ages: ['F–3', '4–6'], theme: 'sage', motif: 'movement',
    description: 'En aktivitetsaffisch för leken Vildhästarna. Här finns materiallista, instruktioner i tre steg och exempel på vad gruppen får öva genom leken.',
    includes: ['En illustrerad aktivitetsaffisch', 'Materiallista med två rockringar och åtta koner', 'Lekinstruktioner och fokusområden som samspel, motorik och rörelseglädje'],
    image: {
      src: '/shop/vildhastarna.png', width: 1054, height: 1492,
      alt: 'Vildhästarna, en rastaktivitet där barn leker på skolgården med rockringar och koner. Affischen innehåller materiallista, regler i tre steg och lekens pedagogiska fokusområden.',
    },
  },
  {
    id: 'kanslan-arg',
    title: 'Känslan arg – förstå känslan tillsammans',
    coverTitle: 'Känslan arg',
    subtitle: 'Från starka känslor till att bli sams igen',
    category: 'Värdegrund', price: 29, format: 'PNG', pages: 1,
    ages: ['F–3'], theme: 'rose', motif: 'friends',
    description: 'En överskådlig affisch om vad ilska är, när den kan uppstå och hur den kan kännas. Illustrationer och korta texter ger stöd för att prata om känslor, lugn och att bli sams igen.',
    includes: ['En affisch om känslan arg', 'Exempel på vad man kan göra när ilskan blir stor', 'Samtalsstöd om vad som händer efteråt och hur man blir sams'],
    image: {
      src: '/shop/kanslan-arg.png', width: 1055, height: 1491,
      alt: 'Känslan arg: en affisch med illustrerade rutor om när man blir arg, hur stark ilska känns, vad man kan göra istället för att skada någon och hur man blir sams igen.',
    },
  },
  {
    id: 'dans-och-musikvideos',
    title: 'Dans och musikvideos – rörelse till musik',
    coverTitle: 'Dans och musikvideos',
    subtitle: 'Rör på kroppen och dansa tillsammans',
    category: 'Lek & rörelse', price: 35, format: 'PNG', pages: 1,
    ages: ['F–3', '4–6'], ageLabel: '2–12 år', theme: 'peach', motif: 'movement',
    description: 'En färgglad översikt med tio tips på dans- och musikvideor för barn. Varje tips har en kort beskrivning, en åldersangivelse samt en tryckt webbadress och QR-kod i bilden.',
    includes: ['En tipsaffisch med tio dans- och musikvideor', 'Korta beskrivningar och åldersangivelser', 'Webbadresser och QR-koder i affischen; videorna ingår inte i materialet'],
    image: {
      src: '/shop/dans-och-musikvideos.png', width: 1055, height: 1491,
      alt: 'Dans och musikvideos för barn: en affisch med tio videotips, däribland Danny Go, GoNoodle, Just Dance Kids och Freeze Dance, med beskrivningar, åldrar och QR-koder.',
    },
  },
  {
    id: 'samtalsfragor-om-ilska',
    title: 'Samtalsfrågor om ilska – för 5–6-åringar',
    coverTitle: 'Frågor om känslan arg',
    subtitle: 'Alla känslor är viktiga',
    category: 'Värdegrund', price: 29, format: 'PNG', pages: 1,
    ages: ['F–3'], ageLabel: '5–6 år', theme: 'lilac', motif: 'friends',
    description: 'Ett bildrikt samtalsunderlag för yngre barn om känslan arg. Frågorna handlar om kroppens signaler, vad som kan väcka ilska och hur vi kan hjälpa oss själva och varandra.',
    includes: ['En affisch med fjorton samtalsfrågor', 'Illustrerade situationer och exempel som stöd för samtalet', 'Frågor om omtanke, empati och att hitta lugnet tillsammans'],
    image: {
      src: '/shop/samtalsfragor-om-ilska.png', width: 1055, height: 1491,
      alt: 'Frågor till 5–6-åringar om känslan arg. Fjorton illustrerade samtalsrutor om hur ilska känns, vad som hjälper, vem man kan prata med och hur man stöttar en arg kompis.',
    },
  },
  {
    id: 'kompiskort', title: 'Kompiskort – små samtal, stor skillnad', coverTitle: 'Hej, kompis!',
    subtitle: 'Samtalskort för en snällare vardag', category: 'Värdegrund', price: 39, format: 'PDF', pages: 12,
    ages: ['F–3', '4–6'], theme: 'lilac', motif: 'friends', badge: 'Utvalt',
    description: 'Öppna upp för fina samtal om vänskap, känslor och att vara en del av gruppen. Korten passar lika bra i samlingen som i en liten samtalsgrupp på fritids.',
    includes: ['24 samtalskort om vänskap och känslor', 'Handledningsblad med förslag på följdfrågor', 'En gemensam kompisöverenskommelse'],
    preview: { title: 'En plats för alla', instruction: 'Läs tillsammans och låt alla som vill berätta.', prompts: ['Du ser någon som står ensam. Vad kan du göra?', 'Hur känns det när någon frågar om du vill vara med?', 'Hitta på tre sätt att bjuda in en ny kompis.'] },
  },
  {
    id: 'naturbingo', title: 'Naturbingo – på upptäcktsfärd tillsammans', coverTitle: 'Ut på äventyr!',
    subtitle: 'Ett nyfiket naturbingo', category: 'Natur & uteliv', price: 29, format: 'PDF', pages: 8,
    ages: ['F–3'], theme: 'sage', motif: 'nature', badge: 'Nyhet',
    description: 'Gör skogspromenaden till en upptäcktsfärd. Barnen får samarbeta, använda sina sinnen och upptäcka de små sakerna i naturen runt omkring dem.',
    includes: ['Fyra olika bingobrickor', 'Upptäckaruppdrag för små grupper', 'Pedagogtips för samtal före och efter utflykten'],
    preview: { title: 'Vad hittar ni i naturen?', instruction: 'Leta tillsammans. Kryssa för det ni upptäcker och låt naturen vara kvar.', prompts: ['Ett mjukt löv', 'Något som doftar', 'En rund sten', 'En fågel som sjunger', 'Något grönt', 'En riktigt liten insekt'] },
  },
  {
    id: 'skapargladje', title: 'Skaparglädje – kreativa uppdrag på fritids', coverTitle: 'Skapa loss!',
    subtitle: 'Små idéer. Stor fantasi.', category: 'Skapande', price: 49, format: 'PDF', pages: 18,
    ages: ['F–3', '4–6'], theme: 'peach', motif: 'craft',
    description: 'Ge fantasin plats med öppna skapandeuppdrag där processen får stå i centrum. Använd enkla material som redan finns på fritids och låt barnen hitta egna lösningar.',
    includes: ['16 skapandeuppdrag att klippa ut', 'Materiallistor med återbruk i fokus', 'Reflektionsfrågor till barnens skapande'],
    preview: { title: 'Bygg en fantasivärld', instruction: 'Ta hjälp av papper, kartong och annat som får ett nytt liv.', prompts: ['Vem bor i din värld?', 'Bygg en plats där alla kan mötas.', 'Berätta för en kompis om något oväntat i din värld.'] },
  },
  {
    id: 'rorelsekort', title: 'Rörelsekort – ge benen lite spring', coverTitle: 'Hela kroppen med!',
    subtitle: 'Lekfulla pauser för hela gruppen', category: 'Lek & rörelse', price: 35, format: 'PDF', pages: 10,
    ages: ['F–3'], theme: 'butter', motif: 'movement',
    description: 'Fyll eftermiddagen med rörelse och skratt. Dra ett kort för en kort rörelsepaus eller kombinera flera till en gemensam aktivitet, inne eller ute.',
    includes: ['20 rörelsekort', 'Förslag på lekar utan tävlingsmoment', 'Tips för att anpassa rörelserna till gruppen'],
    preview: { title: 'Rör er som naturen', instruction: 'Gör rörelserna på det sätt som passar din kropp.', prompts: ['Sträck dig som ett träd som växer.', 'Sväva som ett löv i vinden.', 'Rör dig långsamt som en snigel.'] },
  },
  {
    id: 'veckoplanering', title: 'Veckoplanering – skapa plats för det viktiga', coverTitle: 'Vår vecka på fritids',
    subtitle: 'Överblick, idéer och gemensam planering', category: 'Planering', price: 39, format: 'PDF', pages: 14,
    ages: ['F–3', '4–6'], theme: 'sky', motif: 'planner',
    description: 'Samla veckans aktiviteter, barnens önskemål och era tankar på ett ställe. Tydliga mallar ger stöd i planeringen och gör det lätt att följa upp tillsammans.',
    includes: ['Veckomallar i två utföranden', 'Mall för barnens önskemål', 'Reflektionsblad för arbetslaget'],
    preview: { title: 'Det här vill vi göra', instruction: 'Planera tillsammans och ge utrymme för barnens idéer.', prompts: ['Något vi vill utforska', 'Något vi vill skapa', 'Något vi vill göra tillsammans'] },
  },
  {
    id: 'lugna-stunder', title: 'Lugna stunder – återhämtning i vardagen', coverTitle: 'En liten stund av lugn',
    subtitle: 'Vila, lyssna och landa', category: 'Värdegrund', price: 29, format: 'PDF', pages: 8,
    ages: ['F–3', '4–6'], theme: 'rose', motif: 'calm',
    description: 'Skapa utrymme för lugna stunder under eftermiddagen. Enkla, frivilliga övningar hjälper gruppen att stanna upp, lyssna och växla tempo.',
    includes: ['12 kort för lugna stunder', 'Två korta fantasiresor att läsa högt', 'Tips för en lugn plats på fritids'],
    preview: { title: 'Lyssna en liten stund', instruction: 'Sätt dig bekvämt. Du väljer själv om du vill vara med.', prompts: ['Vilket ljud hör du närmast?', 'Kan du höra något långt bort?', 'Berätta eller rita något du lade märke till.'] },
  },
  {
    id: 'samarbetsuppdrag', title: 'Tillsammans! – kluriga samarbetsuppdrag', coverTitle: 'Bättre tillsammans',
    subtitle: 'Uppdrag där alla behövs', category: 'Lek & rörelse', price: 45, format: 'PDF', pages: 16,
    ages: ['F–3', '4–6'], theme: 'peach', motif: 'blocks',
    description: 'Låt barnen lösa kluriga uppdrag tillsammans. Här finns plats för olika idéer, nya roller och upptäckten att gruppen kan mer när alla får bidra.',
    includes: ['15 samarbetsuppdrag för mindre grupper', 'Förberedelser och materialtips', 'Samtalsfrågor om hur samarbetet gick'],
    preview: { title: 'En bro till andra sidan', instruction: 'Bygg tillsammans med papper och tejp.', prompts: ['Lyssna på allas idéer innan ni börjar.', 'Bygg en bro mellan två böcker.', 'Vad ändrade ni för att bron skulle hålla?'] },
  },
  {
    id: 'arstidsupptackare', title: 'Årstidsupptäckare – ett år av uteliv', coverTitle: 'Hej, alla årstider!',
    subtitle: 'Upptäck naturen, hela året', category: 'Natur & uteliv', price: 59, format: 'PDF', pages: 24,
    ages: ['F–3', '4–6'], theme: 'sage', motif: 'seasons', badge: 'Materialpaket',
    description: 'Följ förändringarna på samma plats under ett helt år. Samla upptäckter, skapa med inspiration från naturen och låt barnens frågor visa vägen.',
    includes: ['Fyra temablad, ett för varje årstid', '20 uppdrag för utflykter och skolgården', 'En upptäckardagbok att skriva och rita i'],
    preview: { title: 'Vår plats i naturen', instruction: 'Välj en plats att återvända till under året.', prompts: ['Vilka färger ser ni idag?', 'Rita något som har förändrats sedan sist.', 'Vad tror ni kommer att hända till nästa gång?'] },
  },
];

export const formatPrice = (price: number) => `${new Intl.NumberFormat('sv-SE').format(price)} kr`;

export const formatMaterialMeta = (material: Material) =>
  `${material.format} · ${material.pages} ${material.pages === 1 ? 'sida' : 'sidor'}`;

export const formatMaterialAge = (material: Material) =>
  material.ageLabel ?? `Åk ${material.ages.length === 2 ? 'F–6' : material.ages[0]}`;
