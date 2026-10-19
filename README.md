# FoodDelivery

An early backend project for a food-delivery application. The implemented server work centers on user accounts, authentication, and email flows; this is not a complete ordering or delivery system.

## Included work

- NestJS applications for a GraphQL gateway and user service
- User registration and authentication code
- Activation and password-reset email templates
- Prisma models for users, roles, and avatars

## Stack

TypeScript, NestJS 10, Apollo GraphQL, Prisma 5, PostgreSQL, JWT, bcrypt, and Nodemailer.

## Project layout

```text
servers/
  apps/gateway/           Default NestJS application
  apps/users/             User service and authentication code
  apps/email-templates/   Activation and password-reset templates
  prisma/                Database schema and Prisma service
clients/                 Reserved client directory
```

## Local setup

Use Node.js and npm compatible with the dependencies in `servers/package.json`, plus a local PostgreSQL instance.

```bash
cd servers
npm install
npx prisma generate
```

Before connecting the application:

- Review the PostgreSQL datasource in `prisma/schema.prisma`; it currently uses a local placeholder connection string. Point it at your own development database.
- Provision the schema for your development database. Review any Prisma schema changes before applying them; do not run database-reset commands against a shared database.
- Review configuration usage in `apps/users/`. Authentication code references `JWT_SECRET`, `ACCESS_TOKEN_SECRET`, and `REFRESH_TOKEN_SECRET`; email configuration references `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS`. Supply private local values through the application's configuration, not committed source files.
- Check the service entry points and GraphQL configuration. End-to-end service wiring still needs verification.

The repository defines these development commands:

```bash
npm run start:dev                    # Default gateway application
npx nest start users --watch         # User application, in another terminal
npm run build
npm test
```

## Status

No completed customer checkout, restaurant catalog, courier workflow, or deployed client is documented here. Installing packages does not establish that the services run together successfully. This README describes the source layout and setup requirements; it does not certify a working deployment.
