Shopping List API (Node.js, Express)
REST API for shopping list items using Express and Knex.
URL: https://project-shopping-list.onrender.com/

Database configuration:
- Local development uses `sqlite3` with `./db/dev.sqlite3`.
- Render production uses PostgreSQL through the `DATABASE_URL` environment variable.

Suggested Render settings:
- `NODE_ENV=production`
- `DATABASE_URL=<your Render PostgreSQL external database URL>`

Commands:
- `npm run migrate`
- `npm run seed`
