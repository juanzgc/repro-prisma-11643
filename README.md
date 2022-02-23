## Getting Started

Juan Zapata Gomez
juanzgc@bu.edu

Reproduction for Prisma Issue: [https://github.com/prisma/prisma/issues/11643](https://github.com/prisma/prisma/issues/11643)

I'm not exactly sure what is causing the issues - these are only occuring when testing locally. 

Install Dependencies
```bash
yarn
```

Create `.env` file with the db credentials given to [https://github.com/janpio](https://github.com/janpio)


Generate Prisma Client
```bash
yarn prisma db pull
yarn prisma generate
```


Run the development server:
```bash
yarn dev
```

Open [http://0.0.0.0:3000/locations](http://0.0.0.0:3000/locations) with your browser to see the result.

Once there, refresh about 3-5 times and you'll begin seeing errors.