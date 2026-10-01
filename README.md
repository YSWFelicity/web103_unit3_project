# WEB103 Project 3 - UnityGrid Plaza

Submitted by: **Yingshu Wang**

About this web app: **UnityGrid Plaza is a virtual music community where users explore four interactive map landmarks, browse events at each venue, and filter all events by venue. React retrieves venue and event data from an Express API backed by Render PostgreSQL. Events are fictional examples.**

Time spent: **6 hours**

## Required Features

The following **required** functionality is completed:

- [x] The web app uses React to display data from the API.
- [x] The web app is connected to a PostgreSQL database.
  - [x] The web app is connected to a Render PostgreSQL database.
  - [x] The database contains an appropriately structured events table.
- [x] Front page of web app is functional and appropriately styled.
  - [x] The web app displays a title.
  - [x] Website includes a visual interface that allows users to select a location they would like to view.
- [x] Each location has a corresponding page.
  - [x] Each location has a detail page with its own unique URL.
  - [x] Clicking on a location navigates to its corresponding detail page and displays all events associated with that location.

## Optional Features

The following **optional** features are implemented:

- [x] The app includes an additional Events page.
  - [x] An additional page shows all possible events.
  - [x] Users can filter events by location.
- [x] Each event includes a countdown to when the event will occur.
  - [x] Events display a countdown showing the time remaining before that event.
  - [x] Events appear with different formatting when the event has passed.

## Additional Features

- Loading, error, and empty-state messages.
- Keyboard-accessible map links and responsive layouts.
- Database initialization that preserves existing records and avoids duplicate seed data.
- Parameterized database queries and JSON responses for invalid IDs and missing records.

## Video Walkthrough

**TODO: Record a GIF walkthrough and add it here before submission.**

Suggested file: `docs/walkthrough.gif`. Once the file exists, replace this TODO with:

```markdown
![Video Walkthrough](docs/walkthrough.gif)
```

Suggested walkthrough:

1. Show the home page title and interactive map.
2. Click each of the four map landmarks and show its unique URL and events.
3. Open Events and show all eight events.
4. Filter by a venue, then return to All venues.
5. Show a running countdown and the different styling of a past event.

## Notes

The starter referenced missing API services, an Events page, and date utilities. These were completed using a shared fetch service, database-backed API routes, and a countdown helper. Event timestamps are stored as PostgreSQL `TIMESTAMPTZ` and displayed in the venue's Dallas time zone.

Event and venue cards currently reuse the starter plaza image. Browser visual review and GIF recording are still pending. The exact course README template should be checked before submission.

## Local Setup

Requires Node.js and a reachable Render PostgreSQL database.

```bash
npm install
cp server/.env.example server/.env
```

Fill in `server/.env` with your PostgreSQL credentials and full external hostname. Allow your current public IP in the database's inbound IP rules. The `.env` file is ignored by Git.

```bash
npm run db:check
npm run db:setup
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`). The API runs on port 3000, and Vite proxies `/api` requests to it.

`db:setup` creates `locations` and `events` and seeds four venues and eight fictional events. Re-running it does not remove or duplicate existing records.

To build and run the production app:

```bash
npm run build
NODE_ENV=production npm start
```

## API

| Endpoint | Response |
| --- | --- |
| `GET /api/locations` | All venues |
| `GET /api/locations/:slug` | One venue |
| `GET /api/locations/:slug/events` | Events at one venue |
| `GET /api/events` | All events |
| `GET /api/events/:id` | One event |

Venue slugs: `echolounge`, `houseofblues`, `pavilion`, `americanairlines`.

## Verification

- Production build passed.
- Real database API checks confirmed four venues, eight events, two events per venue, single-event lookup, and JSON 400/404 responses.
- Countdown checks covered duration formatting, subsecond rounding, event start, past events, and equivalent time zones.
- Production HTTP checks passed for all six page entry URLs, the public image, and the database API.
- Browser interaction and visual review remain to be completed.

## License

    Copyright 2026 Yingshu Wang

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
