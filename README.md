# Xyflo - Green Initiative

## Technologies

Frontend: ReactJS, NextJS, TypeScript
Backend: Prisma ORM

## Run this project

Copy `.env.example` to create `.env` file with following variables 

```
DATABASE_URL="YOUR_DB_URL"
SESSION_SECRET=GENERATE_CODE_AND_ADD
```

To generate `SESSION_SECRET` key,

```bash
    openssl rand -base64 32
```

```bash
npm install
npx prisma generate
```

To run on dev server,

```bash
npm run dev
```
