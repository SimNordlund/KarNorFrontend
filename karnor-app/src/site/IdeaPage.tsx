import { useParams } from 'react-router-dom';
import { PageIntro, SiteCta } from './SiteComponents';

const content: Record<string, { eyebrow: string; title: string; description: string; cards: [string, string][] }> = {
  process: { eyebrow: 'Processbeskrivning', title: 'Från en tanke till ett gemensamt lärande.', description: 'En enkel struktur för att planera, genomföra och följa upp aktiviteter i arbetslaget.', cards: [
    ['01 · Utgå från gruppen', 'Samla barnens frågor, önskemål och intressen. Beskriv vad ni vill ge utrymme för och vilka förutsättningar gruppen behöver.'],
    ['02 · Gör en plan tillsammans', 'Välj innehåll, förbered material och fördela ansvar. Fundera på hur barnen kan vara med och påverka.'],
    ['03 · Prova och var nyfikna', 'Genomför aktiviteten och ge utrymme för oväntade idéer. Lägg märke till vad som väcker engagemang och när ni behöver anpassa.'],
    ['04 · Lyssna och utveckla', 'Prata med barnen om upplevelsen. Samla arbetslagets reflektioner och välj något att ta med till nästa tillfälle.'],
  ] },
  rastaktiviteter: { eyebrow: 'Rastaktiviteter', title: 'En rast med plats för alla.', description: 'Ge barnen flera sätt att vara med – i rörelse, i samarbete och i lite lugnare stunder.', cards: [
    ['Rörelse på egna villkor', 'Bjud in till lekar med tydliga ramar och möjlighet att anpassa tempo, avstånd och roller. Börja tillsammans och visa hur leken går till.'],
    ['Små uppdrag tillsammans', 'Prova en gemensam byggutmaning, en naturspaning eller en lek där gruppen löser något ihop. Låt olika idéer få utrymme.'],
    ['En lugn plats att landa', 'Erbjud ett alternativ till de fartfyllda aktiviteterna. Rita, samtala eller upptäck något i närmiljön i en mindre grupp.'],
    ['Barnens idéer får ta plats', 'Fråga vad barnen vill göra, låt dem hjälpa till att planera och följ upp vilka aktiviteter som gör att fler vill vara med.'],
  ] },
  relationer: { eyebrow: 'Relationsskapande', title: 'Gemenskap börjar i de små stunderna.', description: 'Skapa utrymme för samtal, omtanke och nya möten under dagen på fritids.', cards: [
    ['Se och välkomna', 'Möt varje barn och ge tid för en liten stund av kontakt. Ett välkomnande kan vara ett samtal, en blick eller en gemensam aktivitet.'],
    ['Sätt ord på känslor', 'Använd bilder, berättelser eller vardagssituationer som stöd. Barn kan berätta, peka eller rita – det finns många sätt att uttrycka sig.'],
    ['Öva på att bjuda in', 'Prata om hur man kan fråga om någon vill vara med och hur gruppen kan göra plats för olika sätt att delta.'],
    ['Hitta tillbaka tillsammans', 'Ge tid för att lugna sig efter en konflikt. Lyssna på varandra och hjälps åt att hitta ett nästa steg som känns tryggt.'],
  ] },
};

export default function IdeaPage() {
  const { topic = 'process' } = useParams();
  const page = content[topic];
  if (!page) return <main id="main-content" className="site-container site-section"><h1>Sidan kunde inte hittas.</h1></main>;
  return <main id="main-content" className="site-container"><PageIntro {...page} /><div className="site-card-grid site-card-grid--two">{page.cards.map(([title, description]) => <article className="site-card" key={title}><h2>{title}</h2><p>{description}</p></article>)}</div><SiteCta /></main>;
}
