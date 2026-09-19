# Karnor CMS och Stripe

Webbplatsen har en React-klient och en Node-server. Servern hanterar produktregistret, administratörens inloggning, filer, Stripe Checkout och betalda nedladdningar. Inga extra npm-beroenden har lagts till. Node 22 eller senare krävs.

## Lokal konfiguration

1. Kopiera `.env.example` till `.env` i `karnor-app`.
2. Ange ett eget `ADMIN_PASSWORD` med minst 12 tecken. Inget standardlösenord finns.
3. Behåll `APP_URL=http://localhost:5173` för lokal utveckling.
4. `npm run dev` startar både Vite och API-servern. `/api` och `/media` går genom Vites proxy till port 3001.
5. Öppna `/admin` och logga in. Länken Administration finns också i sidfoten.

Kommandona är dokumenterade här men har inte körts vid implementationen.

## Produkter och kategorier

- Skapa, redigera, duplicera eller ta bort en produkt i produktregistret.
- Ange titel, kort text, beskrivning, innehållspunkter, kategori, pris i SEK, sidantal, åldersgrupper och eventuell etikett.
- Utkast syns bara i administrationen. Publicerade produkter visas i `/butik`.
- Produktbilden är offentlig. Välj ett omslag eller smakprov. De sex tidigare bifogade affischerna ligger kvar som offentliga produktbilder.
- Ladda upp säljfilen separat. Den lagras utanför `public` och lämnas endast ut för en bekräftad, betald beställning. En produkt utan säljfil går att visa men inte köpa.
- Bilder: PNG/JPG/WebP, högst 8 MB. Säljfiler: PDF/PNG/JPG/WebP, högst 40 MB.
- Spara produkten efter uppladdning. Uppladdade filer aktiveras inte som en produkts säljfil förrän produkten sparas.
- Kategorier kan skapas och döpas om. Namnbyten flyttar med produkterna. Flytta bort produkterna innan du tar bort en kategori.
- Befintliga sex affischer är införda i startregistret. Kontrollera och sätt avsedda försäljningspriser och säljfiler innan försäljningen öppnas. Tidigare påhittade produkter ingår inte i det nya registret.

## Stripe

Ange `STRIPE_SECRET_KEY` och `STRIPE_WEBHOOK_SECRET` på servern. Lägg aldrig hemliga nycklar i variabler med prefixet `VITE_` eller i klientkoden.

Registrera webhook-adressen `https://din-domän.se/api/stripe/webhook` och händelserna `checkout.session.completed` samt `checkout.session.async_payment_succeeded`. Vid lokal utveckling kan Stripe CLI vidarebefordra till `http://localhost:3001/api/stripe/webhook`; använd då signeringshemligheten från den lokala lyssnaren.

Klienten skickar endast produkt-ID:n och ett återförsöks-ID. Servern läser publicerad status, pris och säljfil från sitt eget register och skapar en Stripe Checkout-session i SEK. Betalmetoder hanteras i Stripe Dashboard. En oföränderlig kopia av orderrader och säljfiler sparas innan betalningen startas. Upprepade försök använder samma Stripe-idempotensnyckel.

En lyckad omdirigering betraktas inte som betalningsbevis. Servern bekräftar belopp, valuta och betald status via Stripe-signaturen/webhooken eller genom att hämta sessionen direkt från Stripe. Först därefter visas nedladdningslänkar. Kvitton via e-post konfigureras i Stripe; webbplatsen skickar inga egna mejl.

Beställningssidan och säljfilerna är knutna till köparens HttpOnly-cookie i samma webbläsare, med en köpsession som gäller i 30 dagar. Köparen uppmanas att spara filerna. Kundkonton, återställning via e-post, refunderingar och en orderadministration ingår inte.

Referenser: [Checkout Sessions](https://docs.stripe.com/api/checkout/sessions/create), [webhooksignaturer](https://docs.stripe.com/webhooks/signature).

## Drift och lagring

`npm start` startar servern som levererar en befintlig `dist`-mapp och API:t. Statiskt Vite-hosting utan Node-server räcker inte för CMS och köp. Sätt `APP_URL` till webbplatsens exakta HTTPS-origin och använd en HTTPS-reverse proxy. `HOST` och `PORT` styr serverns lyssnaradress.

`server/data` innehåller ett atomiskt sparat JSON-register och en separat filkatalog. Mappen skapas vid första serverstarten och är git-ignorerad. Sätt `DATA_DIR` till en beständig, skrivbar volym **utanför `karnor-app`** i drift och säkerhetskopiera **hela** datamappen. Servern avvisar andra datamappar inne i klientprojektet. Vites utvecklingsserver blockerar serverfiler och direktåtkomst utanför appmappen. Kör en serverprocess mot samma datamapp; flera repliker kräver gemensam databas och objektlagring. Startregistret i `src/shop/catalog.seed.json` används endast när serverns register ännu inte finns.

Administratörssessioner varar i åtta timmar och finns i serverminnet. En omstart kräver ny inloggning. Muterande anrop kräver samma origin och administrationsanrop även CSRF-token. Servern begränsar inloggningsförsök, verifierar filsignaturer, validerar produktdata och skyddar mot att skriva över ändringar från en annan administrationsflik.

Äldre planerings- och SPSM-dokument använder fortfarande det separata `VITE_API_BASE_URL` som redan fanns i projektet. Om den tjänsten inte är konfigurerad visas ett begripligt felmeddelande. Verksamhetsberättelsen länkas till den befintliga filen i `public`.
