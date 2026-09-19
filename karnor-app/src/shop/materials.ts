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
  pages: number;
  ages: string[];
  theme: MaterialTheme;
  motif: MaterialMotif;
  badge?: string;
  description: string;
  includes: string[];
  preview: { title: string; instruction: string; prompts: string[] };
}

export const categories: MaterialCategory[] = ['Lek & rörelse', 'Natur & uteliv', 'Skapande', 'Värdegrund', 'Planering'];

// Illustrative catalog only. Replace with published products when storage is added.
export const materials: Material[] = [
  {
    id: 'kompiskort', title: 'Kompiskort – små samtal, stor skillnad', coverTitle: 'Hej, kompis!',
    subtitle: 'Samtalskort för en snällare vardag', category: 'Värdegrund', price: 39, pages: 12,
    ages: ['F–3', '4–6'], theme: 'lilac', motif: 'friends', badge: 'Utvalt',
    description: 'Öppna upp för fina samtal om vänskap, känslor och att vara en del av gruppen. Korten passar lika bra i samlingen som i en liten samtalsgrupp på fritids.',
    includes: ['24 samtalskort om vänskap och känslor', 'Handledningsblad med förslag på följdfrågor', 'En gemensam kompisöverenskommelse'],
    preview: { title: 'En plats för alla', instruction: 'Läs tillsammans och låt alla som vill berätta.', prompts: ['Du ser någon som står ensam. Vad kan du göra?', 'Hur känns det när någon frågar om du vill vara med?', 'Hitta på tre sätt att bjuda in en ny kompis.'] },
  },
  {
    id: 'naturbingo', title: 'Naturbingo – på upptäcktsfärd tillsammans', coverTitle: 'Ut på äventyr!',
    subtitle: 'Ett nyfiket naturbingo', category: 'Natur & uteliv', price: 29, pages: 8,
    ages: ['F–3'], theme: 'sage', motif: 'nature', badge: 'Nyhet',
    description: 'Gör skogspromenaden till en upptäcktsfärd. Barnen får samarbeta, använda sina sinnen och upptäcka de små sakerna i naturen runt omkring dem.',
    includes: ['Fyra olika bingobrickor', 'Upptäckaruppdrag för små grupper', 'Pedagogtips för samtal före och efter utflykten'],
    preview: { title: 'Vad hittar ni i naturen?', instruction: 'Leta tillsammans. Kryssa för det ni upptäcker och låt naturen vara kvar.', prompts: ['Ett mjukt löv', 'Något som doftar', 'En rund sten', 'En fågel som sjunger', 'Något grönt', 'En riktigt liten insekt'] },
  },
  {
    id: 'skapargladje', title: 'Skaparglädje – kreativa uppdrag på fritids', coverTitle: 'Skapa loss!',
    subtitle: 'Små idéer. Stor fantasi.', category: 'Skapande', price: 49, pages: 18,
    ages: ['F–3', '4–6'], theme: 'peach', motif: 'craft',
    description: 'Ge fantasin plats med öppna skapandeuppdrag där processen får stå i centrum. Använd enkla material som redan finns på fritids och låt barnen hitta egna lösningar.',
    includes: ['16 skapandeuppdrag att klippa ut', 'Materiallistor med återbruk i fokus', 'Reflektionsfrågor till barnens skapande'],
    preview: { title: 'Bygg en fantasivärld', instruction: 'Ta hjälp av papper, kartong och annat som får ett nytt liv.', prompts: ['Vem bor i din värld?', 'Bygg en plats där alla kan mötas.', 'Berätta för en kompis om något oväntat i din värld.'] },
  },
  {
    id: 'rorelsekort', title: 'Rörelsekort – ge benen lite spring', coverTitle: 'Hela kroppen med!',
    subtitle: 'Lekfulla pauser för hela gruppen', category: 'Lek & rörelse', price: 35, pages: 10,
    ages: ['F–3'], theme: 'butter', motif: 'movement',
    description: 'Fyll eftermiddagen med rörelse och skratt. Dra ett kort för en kort rörelsepaus eller kombinera flera till en gemensam aktivitet, inne eller ute.',
    includes: ['20 rörelsekort', 'Förslag på lekar utan tävlingsmoment', 'Tips för att anpassa rörelserna till gruppen'],
    preview: { title: 'Rör er som naturen', instruction: 'Gör rörelserna på det sätt som passar din kropp.', prompts: ['Sträck dig som ett träd som växer.', 'Sväva som ett löv i vinden.', 'Rör dig långsamt som en snigel.'] },
  },
  {
    id: 'veckoplanering', title: 'Veckoplanering – skapa plats för det viktiga', coverTitle: 'Vår vecka på fritids',
    subtitle: 'Överblick, idéer och gemensam planering', category: 'Planering', price: 39, pages: 14,
    ages: ['F–3', '4–6'], theme: 'sky', motif: 'planner',
    description: 'Samla veckans aktiviteter, barnens önskemål och era tankar på ett ställe. Tydliga mallar ger stöd i planeringen och gör det lätt att följa upp tillsammans.',
    includes: ['Veckomallar i två utföranden', 'Mall för barnens önskemål', 'Reflektionsblad för arbetslaget'],
    preview: { title: 'Det här vill vi göra', instruction: 'Planera tillsammans och ge utrymme för barnens idéer.', prompts: ['Något vi vill utforska', 'Något vi vill skapa', 'Något vi vill göra tillsammans'] },
  },
  {
    id: 'lugna-stunder', title: 'Lugna stunder – återhämtning i vardagen', coverTitle: 'En liten stund av lugn',
    subtitle: 'Vila, lyssna och landa', category: 'Värdegrund', price: 29, pages: 8,
    ages: ['F–3', '4–6'], theme: 'rose', motif: 'calm',
    description: 'Skapa utrymme för lugna stunder under eftermiddagen. Enkla, frivilliga övningar hjälper gruppen att stanna upp, lyssna och växla tempo.',
    includes: ['12 kort för lugna stunder', 'Två korta fantasiresor att läsa högt', 'Tips för en lugn plats på fritids'],
    preview: { title: 'Lyssna en liten stund', instruction: 'Sätt dig bekvämt. Du väljer själv om du vill vara med.', prompts: ['Vilket ljud hör du närmast?', 'Kan du höra något långt bort?', 'Berätta eller rita något du lade märke till.'] },
  },
  {
    id: 'samarbetsuppdrag', title: 'Tillsammans! – kluriga samarbetsuppdrag', coverTitle: 'Bättre tillsammans',
    subtitle: 'Uppdrag där alla behövs', category: 'Lek & rörelse', price: 45, pages: 16,
    ages: ['F–3', '4–6'], theme: 'peach', motif: 'blocks',
    description: 'Låt barnen lösa kluriga uppdrag tillsammans. Här finns plats för olika idéer, nya roller och upptäckten att gruppen kan mer när alla får bidra.',
    includes: ['15 samarbetsuppdrag för mindre grupper', 'Förberedelser och materialtips', 'Samtalsfrågor om hur samarbetet gick'],
    preview: { title: 'En bro till andra sidan', instruction: 'Bygg tillsammans med papper och tejp.', prompts: ['Lyssna på allas idéer innan ni börjar.', 'Bygg en bro mellan två böcker.', 'Vad ändrade ni för att bron skulle hålla?'] },
  },
  {
    id: 'arstidsupptackare', title: 'Årstidsupptäckare – ett år av uteliv', coverTitle: 'Hej, alla årstider!',
    subtitle: 'Upptäck naturen, hela året', category: 'Natur & uteliv', price: 59, pages: 24,
    ages: ['F–3', '4–6'], theme: 'sage', motif: 'seasons', badge: 'Materialpaket',
    description: 'Följ förändringarna på samma plats under ett helt år. Samla upptäckter, skapa med inspiration från naturen och låt barnens frågor visa vägen.',
    includes: ['Fyra temablad, ett för varje årstid', '20 uppdrag för utflykter och skolgården', 'En upptäckardagbok att skriva och rita i'],
    preview: { title: 'Vår plats i naturen', instruction: 'Välj en plats att återvända till under året.', prompts: ['Vilka färger ser ni idag?', 'Rita något som har förändrats sedan sist.', 'Vad tror ni kommer att hända till nästa gång?'] },
  },
];

export const formatPrice = (price: number) => `${new Intl.NumberFormat('sv-SE').format(price)} kr`;
