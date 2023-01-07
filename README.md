Установка проекта:
1. nvm use 16.16.0 & npm i
2. заполнить файлы env недостающими значениями, 
3. Скачать ключ сервисного аккаунта гугл https://console.cloud.google.com/iam-admin/serviceaccounts 
    и вставить свои значения в файл keys/google_key.json
4. Создать сертификаты с именем certificate.crt и certificate.key, поместить их папку key/. 
    Установить сертификаты (keys/certificate.crt) в доверенные корневые центры сертификации.
5. npm run serve  // Run dev server



Базы данных: (сейчас в проекте используется МонгоДБ, через библиотеку Мангуст)
npx prisma init --datasource-provider sqlite

Создает и применяет миграцию. Эта команда не поддерживается в MongoDB . Используйте db pushвместо этого.
npx prisma migrate dev

В производственных и тестовых средах используйте migrate deploy команду для применения миграции:
npx prisma migrate deploy

Для монгодб не делать миграции. Он создает базу данных, если база данных не существует.
npx prisma db push

Запустите Studio на порту по умолчанию и откройте для него новую вкладку браузера.
npx prisma studio

Как подружить монго Атлас с верселем https://www.mongodb.com/docs/atlas/reference/partner-integrations/vercel/