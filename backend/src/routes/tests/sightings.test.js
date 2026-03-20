import { describe, it, expect, beforeAll } from 'vitest'

const url = 'http://localhost:8080/api/sightings'

const newSighting = {
    sighting: '2024-06-15',
    individual_id: 1,
    location: 'National Forest',
    healthy: true,
    sighted_by_email: 'test@vitest.com'
}

// Returns all sightings
describe('GET /api/sightings endpoint', () => {
    let response, data;

    beforeAll(async () => {
        response = await fetch(url);
        data = await response.json();
    });

    it('Returns a response code of 200', () => {
        expect(response.status).toBe(200);
    });

    it('Returns an array', () => {
        expect(Array.isArray(data)).toBe(true);
    });

    it('Each sighting includes nick_name from individuals join', () => {
        if (data.length > 0) {
            expect(data[0]).toHaveProperty('nick_name');
        }
    });
});

// Creates a new sighting
describe('POST /api/sightings endpoint', () => {
    let response, data;

    beforeAll(async () => {
        response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSighting)
        });
        data = await response.json();
    });

    it('Returns a response code of 201', () => {
        expect(response.status).toBe(201);
    });

    it('Returns an object', () => {
        expect(data).toBeTypeOf('object');
    });

    it('Created sighting has an id', () => {
        expect(data).toHaveProperty('id');
    });
});

// Updates an existing sighting
describe('PUT /api/sightings/:id endpoint' , () => {
    let createdId, response, data;

    beforeAll(async () => {
        const createResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSighting)
        });
        const created = await createResponse.json();
        createdId = created.id;

        response = await fetch(`${url}/${createdId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newSighting, location: 'Updated location' })
        });
        data = await response.json();
    });

    it('Returns a response code of 200', () => {
        expect(response.status).toBe(200);
    });

    it('Returns an object', () => {
        expect(data).toBeTypeOf('object');
    });
});

// Deletes a sighting
describe('DELETE /api/sightings/:id endpoint', () => {
    let createdId, response, data;

    beforeAll(async () => {
        const createResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSighting)
        });
        const created = await createResponse.json();
        createdId = created.id;

        response = await fetch(`${url}/${createdId}`, {
            method: 'DELETE'
        });
        data = await response.json();
    });

    it('Returns a response code of 200', () => {
        expect(response.status).toBe(200);
    });

    it('Returns an object', () => {
        expect(data).toBeTypeOf('object');
    });

    it('Returns a message confirming deletion', () => {
        expect(data).toHaveProperty('message');
    });
});