This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configurazione newsletter Mailchimp

L'iscrizione usa il form pubblico di Mailchimp e non richiede username, password o API key.

1. In Mailchimp apri **Forms**, scegli **Other forms** e crea un **Embedded form** per l'Audience desiderata.
2. Copia dall'HTML generato il valore completo dell'attributo `action` del form.
3. Inseriscilo in `MAILCHIMP_FORM_ACTION`, seguendo il modello presente in `.env.example`.
4. Verifica che i nomi dei campi generati da Mailchimp siano `EMAIL`, `FNAME` e `LNAME`. Se sono diversi, configura le tre variabili `MAILCHIMP_*_FIELD` con i valori presenti nel codice embedded.
5. Se il codice embedded contiene un campo consenso come `name="gdpr[123456]"`, copialo in `MAILCHIMP_GDPR_FIELD` e riporta il relativo valore in `MAILCHIMP_GDPR_VALUE`.
6. Riavvia l'applicazione e prova un'iscrizione completa, inclusa l'eventuale conferma double opt-in.

Il form invia i dati direttamente a Mailchimp. Le impostazioni single/double opt-in, reCAPTCHA e le email di conferma si gestiscono dall'Audience di Mailchimp. Per il flusso con email di conferma va abilitato il double opt-in.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
