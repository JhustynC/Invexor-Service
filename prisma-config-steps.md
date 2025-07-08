## Configuring Prisma with PostgreSQL

To use Prisma ORM with PostgreSQL in your Clean Architecture project, follow these steps:

### 1. Install Prisma
```bash
npm install prisma @prisma/client
```

### 2. Initialize Prisma
```bash
npx prisma init
```

### 3. Configure the `.env` file
Create or update the `.env` file in your project root:
Check .env.template to make your own .env file

THIS IS AN EXAMPLE!

```
POSTGRES_URL=postgresql://root:root@localhost:5433/chat_app_db?schema=public&timezone=America/Guayaquil
```

### 4. Configure `schema.prisma`
Update the `prisma/schema.prisma` file:

THIS IS AN EXAMPLE!

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URL")
}

model User {
  id       Int      @id @default(autoincrement())
  username String
  email    String   @unique
  password String
  lastSeen DateTime @default(now())
}
```

### 5. Generate Prisma Client (Optional)
```bash
npx prisma generate
```

### 6. Create database tables (Mandatory)
```bash
npx prisma migrate dev --name init
```