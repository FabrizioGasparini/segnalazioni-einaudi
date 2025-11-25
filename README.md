# Segnalazioni Einaudi

Web application per la gestione delle segnalazioni e proposte degli studenti dell'Istituto Tecnico Statale L.Einaudi di Correggio.

## Funzionalità

- **Autenticazione**: Accesso riservato agli studenti con email `@einaudicorreggio.it`.
- **Segnalazioni**: Gli studenti possono segnalare problemi.
- **Proposte**: Gli studenti possono proporre nuove idee.
- **Admin Dashboard**: Gestione delle segnalazioni (approvazione, rifiuto, completamento) riservata agli amministratori.

## Tecnologie

- **Framework**: Next.js 15 (App Router)
- **Database**: SQLite (con Prisma ORM)
- **Auth**: NextAuth.js (Google Provider)
- **Styling**: Tailwind CSS

## Setup

1.  Clona il repository.
2.  Installa le dipendenze: `npm install`.
3.  Configura il file `.env` con le tue chiavi Google OAuth:
    ```env
    GOOGLE_CLIENT_ID="tuo-client-id"
    GOOGLE_CLIENT_SECRET="tuo-client-secret"
    ```
4.  Assicurati che il file `token.json` (Service Account Key) sia presente nella root del progetto.
5.  Esegui le migrazioni del database: `npx prisma migrate dev`.
6.  Avvia il server di sviluppo: `npm run dev`.
