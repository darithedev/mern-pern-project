# Full-Stack PERN Project: Endangered Animal Sighting Tracker

This project is an Animal Sighting Tracker connecting a React + Vite frontend, Express + Node.js backend, and a PostgreSQL database. It tracks endangered species, individual named animals within each species, and sighting events logged by scientists.

<img width="515" height="414" alt="Screenshot of project" src="./frontend/public/demo.gif" />

## Project Data Model

| Table | What it represents | Key focus |
|---|---|---|
| **Species** | Groups of endangered animals | Common name, scientific name, conservation status |
| **Individuals** | Specific named animals within a species | Nickname, tracking scientist, when added |
| **Sightings** | Observation events when an individual is spotted | Date/time, location, health status |

<img width="515" height="414" alt="Screenshot of project" src="./frontend/public/endangeredanimaldb-datamodel.png" />

## How to Run Locally

1. Clone the repository:
   ```
   git clone https://github.com/darithedev/mern-pern-project.git
   cd mern-pern-project
   ```

### Database

2. Create the database:
   ```
   createdb endangeredspeciesdb
   ```
3. Load the schema and seed data:
   ```
   psql -d endangeredspeciesdb < db.sql
   ```

### Backend

4. Navigate to the backend directory:
   ```
   cd backend
   ```
5. Install dependencies:
   ```
   npm install
   ```
6. Create your `.env` file (use `.env.example` as a reference):
   ```
   cp .env.example .env
   ```
   Update the values in `.env`:
   ```
   PORT=3000
   DATABASE_URL=postgresql://[user]:[password]@localhost:5432/endangeredspeciesdb
   ```
7. Start the backend server:
   ```
   npm run dev
   ```
8. Verify the server is running — open your browser to `http://localhost:3000/health`

### Frontend

9. Open a new terminal and navigate to the frontend directory:
   ```
   cd frontend
   ```
10. Install dependencies:
    ```
    npm install
    ```
11. Start the frontend development server:
    ```
    npm run dev
    ```
12. Open your browser to `http://localhost:5173/`

Congratulations — both servers are now running!

---

## API Endpoints

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Returns server and database health status |

### Species

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/species` | Get all species | — |
| POST | `/api/species` | Add a new species | `{ "common_name": "...", "scientific_name": "...", "estimated_in_the_wild": 3000, "conservation_code": "EN" }` |

### Individuals

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/individuals` | Get all individuals with sighting count, first & last sighting (JOIN) | — |
| POST | `/api/individuals` | Add a new individual | `{ "nick_name": "...", "scientist_tracking": "...", "species_id": 1 }` |

### Sightings

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/sightings` | Get all sightings with individual nick_name (JOIN) | — |
| GET | `/api/sightings?start=&end=` | Get sightings within a date range | — |
| POST | `/api/sightings` | Add a new sighting | `{ "sighting": "2026-03-01T10:00:00.000Z", "individual_id": 1, "location": "Yellowstone", "healthy": true, "sighted_by_email": "sci@example.com" }` |
| PUT | `/api/sightings/:id` | Update an existing sighting | `{ "sighting": "...", "individual_id": 1, "location": "...", "healthy": true, "sighted_by_email": "..." }` |
| DELETE | `/api/sightings/:id` | Delete a sighting | — |

---

## Testing

### Using [Postman](https://learning.postman.com/docs/getting-started/overview/)

1. **Server and database health**
   - Method: `GET`
   - URL: `http://localhost:3000/health`

2. **Get all species**
   - Method: `GET`
   - URL: `http://localhost:3000/api/species`

3. **Add a new species**
   - Method: `POST`
   - URL: `http://localhost:3000/api/species`
   - Body/JSON:
   ```json
   {
     "common_name": "Amur Leopard",
     "scientific_name": "Panthera pardus orientalis",
     "estimated_in_the_wild": 100,
     "conservation_code": "CR"
   }
   ```

4. **Get all individuals**
   - Method: `GET`
   - URL: `http://localhost:3000/api/individuals`

5. **Add a new individual**
   - Method: `POST`
   - URL: `http://localhost:3000/api/individuals`
   - Body/JSON:
   ```json
   {
     "nick_name": "Prickly Petunia",
     "scientist_tracking": "Jane Goodall",
     "species_id": 1
   }
   ```

6. **Get all sightings**
   - Method: `GET`
   - URL: `http://localhost:3000/api/sightings`

7. **Get sightings by date range**
   - Method: `GET`
   - URL: `http://localhost:3000/api/sightings?start=2026-01-01&end=2026-03-01`

8. **Add a new sighting**
   - Method: `POST`
   - URL: `http://localhost:3000/api/sightings`
   - Body/JSON:
   ```json
   {
     "sighting": "2026-03-01T10:00:00.000Z",
     "individual_id": 1,
     "location": "Yellowstone North Gate",
     "healthy": true,
     "sighted_by_email": "researcher@example.com"
   }
   ```

9. **Update a sighting**
   - Method: `PUT`
   - URL: `http://localhost:3000/api/sightings/1`
   - Body/JSON:
   ```json
   {
     "sighting": "2026-03-05T14:00:00.000Z",
     "individual_id": 1,
     "location": "Yellowstone South Gate",
     "healthy": false,
     "sighted_by_email": "researcher@example.com"
   }
   ```

10. **Delete a sighting**
    - Method: `DELETE`
    - URL: `http://localhost:3000/api/sightings/1`

---

### Using cURL (add `| jq` at the end to format JSON)

1. **Health check**
   ```
   curl http://localhost:3000/health
   ```

2. **All species**
   ```
   curl http://localhost:3000/api/species
   ```

3. **Add species**
   ```
   curl -X POST http://localhost:3000/api/species \
   -H "Content-Type: application/json" \
   -d '{
     "common_name": "Amur Leopard",
     "scientific_name": "Panthera pardus orientalis",
     "estimated_in_the_wild": 100,
     "conservation_code": "CR"
   }'
   ```

4. **All individuals**
   ```
   curl http://localhost:3000/api/individuals
   ```

5. **Add individual**
   ```
   curl -X POST http://localhost:3000/api/individuals \
   -H "Content-Type: application/json" \
   -d '{
     "nick_name": "Prickly Petunia",
     "scientist_tracking": "Jane Goodall",
     "species_id": 1
   }'
   ```

6. **All sightings**
   ```
   curl http://localhost:3000/api/sightings
   ```

7. **Sightings by date range**
   ```
   curl "http://localhost:3000/api/sightings?start=2026-01-01&end=2026-03-01"
   ```

8. **Add sighting**
   ```
   curl -X POST http://localhost:3000/api/sightings \
   -H "Content-Type: application/json" \
   -d '{
     "sighting": "2026-03-01T10:00:00.000Z",
     "individual_id": 1,
     "location": "Yellowstone North Gate",
     "healthy": true,
     "sighted_by_email": "researcher@example.com"
   }'
   ```

9. **Update sighting**
   ```
   curl -X PUT http://localhost:3000/api/sightings/1 \
   -H "Content-Type: application/json" \
   -d '{
     "sighting": "2026-03-05T14:00:00.000Z",
     "individual_id": 1,
     "location": "Yellowstone South Gate",
     "healthy": false,
     "sighted_by_email": "researcher@example.com"
   }'
   ```

10. **Delete sighting**
    ```
    curl -X DELETE http://localhost:3000/api/sightings/1
    ```

---

## Bonus / Stretch Goals

- [ ] Individual detail page with Wikipedia link and photo URL
- [ ] Group sightings — associate a sighting with multiple individuals
- [ ] Healthy filter checkbox on the sightings list (React only, no API change)
- [ ] Auth routes for login and account creation
- [ ] Admin-protected route for adding species
