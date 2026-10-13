# Karnor CMS och Stripe

Kotlin/Spring är webbplatsens enda backend och finns i `C:\Users\TaraR\IdeaProjects\KarNor`. React-projektet ansvarar för gränssnitt, varukorg, formulär och presentation av API-svar. Produktregister, validering, inloggning, lagring, Stripe, orderbekräftelse, nedladdningsbehörighet och mejlleverans hanteras i Spring. Se backendens `CMS.md` för serverkonfiguration.

Node används bara för frontendens npm- och Vite-verktyg. React-projektet innehåller ingen separat backendserver eller kopia av serverns startregister.

## Mejlleverans med Kotlin

Skapa ett Resend-konto och verifiera en avsändardomän med tjänstens DNS-poster. Ange `RESEND_API_KEY` och `MAIL_FROM` som miljövariabler på Kotlin-servern. Exempel på avsändare: `Karnor <material@din-domän.se>`. `MAIL_REPLY_TO` är valfri och kan ange din vanliga kontaktadress. `APP_URL` ska vara webbplatsens publika HTTPS-origin i drift. Nyckeln ska inte finnas i klientens `VITE_`-variabler. Starta om servern efter konfigurationen.

Stripe samlar in köparens e-postadress i betalningen. När betalningen är bekräftad köar Kotlin-servern ett mejl med köpta filer bifogade upp till sammanlagt 15 MB. Större beställningar får skyddade länkar i mejlet. Mejlets länkar fungerar i andra webbläsare i 30 dagar från betalningen. Vanliga nedladdningar på beställningssidan finns kvar även om mejlleveransen misslyckas. Tillfälliga mejlfel får automatiska återförsök och orderns mejlstatus visas för köparen.

Klienten visar information om mejlleverans när API:t anger `emailDeliveryConfigured`. Detta visar att serverns inställningar finns; kontot, nyckeln och domänen behöver fortfarande vara giltiga hos Resend. Ingen historisk order skickas automatiskt vid aktivering. Se Kotlin-serverns `CMS.md` för köhantering och felstatus. I drift behöver `/api/*`, inklusive `/api/email-downloads/*`, gå till Kotlin-servern från samma origin som webbplatsen.

## Lokal konfiguration

1. Kopiera `.env.example` till `.env` i `karnor-app`.
2. Kopiera Kotlin-projektets `.env.example` till dess egen `.env` och ange databasinställningar, ett eget `ADMIN_PASSWORD` med minst 12 tecken samt `APP_URL=http://localhost:5173` där. Inget standardlösenord finns.
3. Starta Kotlin/Spring separat på port 8080, exempelvis via IntelliJ.
4. Kör `npm run dev` i `karnor-app` eller projektroten. Kommandot startar frontend på `http://localhost:5173`. `/api`, `/media` och äldre `/downloadPdf*`-anrop går genom Vites proxy till Spring. `KARNOR_BACKEND_URL` kan ändras om Spring körs på en annan adress.
5. Öppna `/admin` och logga in. Länken Administration finns också i sidfoten. `npm start` och `npm run preview` förhandsvisar en redan byggd `dist`-mapp med samma proxy och port; de startar inte Spring.

Lösenord, Stripe- och Resend-nycklar samt lagringsinställningar hör till Kotlin-projektet. React-projektets `.env` ska bara innehålla proxyadressen och publika frontendinställningar.

Ange även följande publika uppgifter vid frontend-bygget. De visas på kontaktsidan och i köpbekräftelsen. Köpvillkors- och integritetssidorna länkar till kontaktsidan. Betalningsknappen är avstängd tills juridiskt namn, organisationsnummer, e-post och postadress finns.

- `VITE_SELLER_LEGAL_NAME`
- `VITE_SELLER_ORG_NUMBER`
- `VITE_SELLER_EMAIL`
- `VITE_SELLER_PHONE` (valfri)
- `VITE_SELLER_ADDRESS`

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

Registrera webhook-adressen `https://din-domän.se/api/stripe/webhook` och händelserna `checkout.session.completed` samt `checkout.session.async_payment_succeeded`. Vid lokal utveckling kan Stripe CLI vidarebefordra till `http://localhost:8080/api/stripe/webhook`; använd då signeringshemligheten från den lokala lyssnaren.

Klienten skickar produkt-ID:n, ett återförsöks-ID och kundens två aktiva samtycken. Servern kräver samtyckena, läser publicerad status, pris och säljfil från sitt eget register och skapar en Stripe Checkout-session i SEK med Swish som enda betalmetod. Swish måste även vara aktiverat på Stripe-kontot. En oföränderlig kopia av orderrader, säljfiler, villkorsversion och samtyckestid sparas innan betalningen startas. Upprepade försök använder samma Stripe-idempotensnyckel.

En lyckad omdirigering betraktas inte som betalningsbevis. Servern bekräftar belopp, valuta och betald status via Stripe-signaturen/webhooken eller genom att hämta sessionen direkt från Stripe. Först därefter visas nedladdningslänkar. Spring bestämmer och validerar minsta totalbelopp för Swish, för närvarande 3 kr, och skickar `minimumCheckoutTotal` till klienten för presentation. Kvitton via e-post konfigureras i Stripe; materialmejlet skickas separat av Kotlin-servern när Resend är konfigurerat.

Beställningssidan och säljfilerna är knutna till köparens HttpOnly-cookie i samma webbläsare, med en köpsession som gäller i 30 dagar. Köparen kan ladda ner en köpbekräftelse med orderuppgifter, villkorsversion och samtycke. Kundkonton, återställning via e-post, refunderingar och en orderadministration ingår inte.

Referenser: [Checkout Sessions](https://docs.stripe.com/api/checkout/sessions/create), [webhooksignaturer](https://docs.stripe.com/webhooks/signature).

## Drift och lagring

Publicera frontendens `dist` som statiska filer och kör Kotlin/Spring separat. Hosting eller en reverse proxy ska skicka `/api/*` och `/media/*` till Spring innan webbplatsens SPA-fallback till `index.html`. Detta inkluderar webhooken och mejlets nedladdningslänkar. Om äldre PDF-länkar ska fungera, vidarebefordra även `/downloadPdf*`. Sätt Kotlin-serverns `APP_URL` till webbplatsens exakta HTTPS-origin. `PORT` i Kotlin-projektet styr Spring-serverns port. Vites utvecklings- och förhandsvisningsproxy används bara lokalt och följer inte med i frontendbygget.

Kotlin-serverns `KARNOR_DATA_DIR` innehåller ett atomiskt sparat JSON-register och en separat filkatalog. Sätt den till en beständig, privat volym utanför frontendprojektet i drift och säkerhetskopiera **hela** datamappen. Kör en Spring-instans mot samma datamapp; flera repliker kräver gemensam databas och objektlagring. Startregistret finns bara i Kotlin-projektets `src/main/resources/catalog.seed.json` och används när serverns register ännu inte finns.

Eventuella äldre filer i React-projektets `server/data` är bevarade, git-ignorerade och blockerade i Vite. De används inte av frontend eller Spring och har inte automatiskt slagits samman med Kotlin-serverns aktiva register.

Administratörssessioner varar i åtta timmar och finns i serverminnet. En omstart kräver ny inloggning. Muterande anrop kräver samma origin och administrationsanrop även CSRF-token. Servern begränsar inloggningsförsök, verifierar filsignaturer, validerar produktdata och skyddar mot att skriva över ändringar från en annan administrationsflik.

Planerings- och SPSM-dokument hämtas från Spring via `/api/resources/pdfs/by-name/{name}` på samma origin som övriga API-anrop. De tidigare `/downloadPdfByFileName/{name}`-länkarna finns kvar som alias i Spring. Verksamhetsberättelsen länkas till den befintliga filen i `public`.
