# Solo Leveling Backend

This backend adds:

- Google account login
- JWT-based authenticated API access
- Per-user cloud state sync for cross-device usage

## 1) Setup

1. Create a Google OAuth client in Google Cloud Console.
2. Add this authorized JavaScript origin:
   - `http://localhost:4000`
3. Add this authorized redirect URI:
   - `http://localhost:4000/auth/google/callback`
4. In `backend`, copy `.env.example` to `.env` and fill values.
5. Use this value in `.env`:
   - `FRONTEND_URL=http://localhost:4000`
6. Install and run:

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:4000`

## 2) API

- `GET /health` - health check
- `GET /auth/google` - starts Google login
- `GET /api/me` - current user profile (Bearer token required)
- `GET /api/sync/state` - fetch saved state for logged-in user
- `PUT /api/sync/state` - save current state for logged-in user

## 2.1) Anytype Auto-Sync Bridge (no manual copy/paste)

This optional local bridge lets the frontend auto-create/update `Journal - YYYY-MM-DD` pages in Anytype when you log entries.

1. Fill these in `backend/.env`:
   - `ANYTYPE_API_BASE` (default: `http://127.0.0.1:31009`)
   - `ANYTYPE_API_KEY` (from Anytype local API)
   - `ANYTYPE_VERSION` (default: `2025-11-08`)
2. Start the bridge:

```bash
npm run anytype-bridge
```

3. In app Hub settings:
   - Turn on `Auto Sync to Anytype`
   - Keep bridge URL as `http://localhost:4010/api/anytype/sync-day`

When enabled, each new log entry auto-syncs to today’s Anytype journal body (mapped fields + raw timeline).

`PUT /api/sync/state` body:

```json
{
  "state": {
    "stats": {},
    "quests": []
  }
}
```

## 3) Current integration status

`ai_studio_code_fixed.html` is already wired for:

- Sign in with Google
- Auto-load cloud state after login
- Auto-push updates to cloud after local changes
- Manual pull/push controls in the Hub
