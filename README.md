Project installation:
1. nvm use 16.16.0 & npm i
2. Fill .env files with missing values, 
3. Download Google service account key https://console.cloud.google.com/iam-admin/serviceaccounts
     and paste your values into the file keys/google_key.json
4. Create certificates named certificate.crt and certificate.key, put them in the key/ folder.
     Install certificates (keys/certificate.crt) to trusted root CAs.
5. npm run serve  // Run dev server



Databases: (now the project uses MongoDB, via the Mongoose library)
npx prisma init --datasource-provider sqlite

Creates and applies a migration. This command is not supported in MongoDB . Use db push instead.
npx prisma migrate dev

In production and test environments, use the "migrate deploy" command to apply the migration:
npx prisma migrate deploy

For mongodb don't do migrations. It creates the database if the database doesn't exist.
npx prisma db push

Launch Studio on the default port and open a new browser tab for it.
npx prisma studio

How to make mongo atlas friends with versel https://www.mongodb.com/docs/atlas/reference/partner-integrations/vercel/
