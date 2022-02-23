## Getting Started

Juan Zapata Gomez
juanzgc@bu.edu

Reproduction for Prisma Issue: [https://github.com/prisma/prisma/issues/11643](https://github.com/prisma/prisma/issues/11643)

I believe that the issue is caused by me including a `utilsDb` folder which imports `prisma`.
What is odd though, is that the folder is only called in a SSR page - not on the client.

My initial goal was to decouple similar prisma queries into a `utilsDb` folder but seems that won't be possible.


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