# BizBoard

BizBoard is a monorepo web application for creating and sharing digital business cards and professional profiles.

This implementation starts the Core MVP scope:
- Authentication flow scaffold (placeholder for Firebase token verification)
- Profile card CRUD endpoints
- Template listing
- Public shareable card route
- QR code generation for each card
- Document upload endpoint with MIME plus magic-byte validation

## Monorepo structure

```
apps/
	api/        Node.js + Express API (TypeScript)
	web/        React + Vite web client (TypeScript)
packages/
	shared/     Shared contracts and types
docs/         Project docs
```

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Run API and web in separate terminals:

```bash
npm run dev:api
```

```bash
npm run dev:web
```

3. Open the app:

- Web UI: `http://localhost:5173`
- API health: `http://localhost:4000/health`

## Current API routes

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/templates`
- `GET /api/cards`
- `POST /api/cards`
- `PUT /api/cards/:cardId`
- `DELETE /api/cards/:cardId`
- `GET /api/cards/:cardId/qr`
- `POST /api/uploads`
- `GET /api/uploads/:cardId`
- `GET /api/public/cards/:slug`

## Notes

- The auth middleware currently accepts demo bearer tokens and is ready to be replaced by Firebase Admin SDK verification.
- Data is currently in-memory for implementation bootstrap and will be migrated to PostgreSQL in the next step.