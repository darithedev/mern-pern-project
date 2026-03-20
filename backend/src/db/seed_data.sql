-- Run this command to create db if it doesnt exist:
-- createdb endangeredspeciesdb

-- NOTE: an error will show if db is already created

-- Then run the below command to seed the db with this sample data:
-- psql endangeredspeciesdb < seed_data.sql

-- this will reset the table if you want to re-seed the database
-- DROP TABLE IF EXISTS individuals CASCADE;
-- DROP TABLE IF EXISTS sightings CASCADE;
-- DROP TABLE IF EXISTS species CASCADE;

-- create species table
CREATE TABLE IF NOT EXISTS species (
    id bigserial primary key,
    common_name varchar(50) not null,
    scientific_name varchar(50) not null,
    estimated_in_the_wild integer not null,
    conservation_code varchar(5) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- create individuals table
CREATE TABLE IF NOT EXISTS individuals (
    id bigserial primary key,
    nick_name varchar(50) not null,
    scientist_tracking varchar(250) not null,
    species_id integer not null references species(id),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- create sightings table
CREATE TABLE IF NOT EXISTS sightings (
    id bigserial primary key,
    sighting timestamptz not null,
    individual_id integer not null references individuals(id),
    location varchar(250) not null,
    healthy boolean not null,
    sighted_by_email varchar(250) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- load data to species table
INSERT INTO species (common_name, scientific_name, estimated_in_the_wild, conservation_code) VALUES
    ('Blue-Throated Macaw', 'Ara glaucogularis', 303, 'CR'),
    ('Red Wolf', 'Canis rufus', 30, 'CR'),
    ('Andean Cat', 'Leopardus jacobita', 2177, 'EN'),
    ('Hawaiian Green Turtle', 'Chelonia mydas', 6550, 'LC'),
    ('Hooded Grebe', 'Podiceps gallardoi', 800, 'CR')
;

-- load data to individuals table
INSERT INTO individuals (nick_name, scientist_tracking, species_id) VALUES
    ('Bluey', 'Dari Cares', 1),
    ('Blue Ladt', 'Dari Cares', 1),
    ('Red Red', 'Dari Cares', 2),
    ('Big Red', 'Dari Cares', 2),
    ('Andy the Kitty', 'Dari Cares', 3),
    ('Sharon', 'Dari Cares', 3),
    ('Waii the turtle', 'Dari Cares', 4),
    ('Topsy Turn', 'Dari Cares', 4),
    ('Cranzy', 'Dari Cares', 5),
    ('Hoodie', 'Dari Cares', 5)
;

-- load data to sightings table
INSERT INTO sightings (sighting, individual_id, location, healthy, sighted_by_email) VALUES
    ('2026-03-10T01:00:48.389Z', 1,  'Savanna', true, 'dari@example.com'),
    ('2026-02-10T01:00:48.389Z', 2, 'Forest', true, 'dari@example.com'),
    ('2026-02-11T01:00:48.389Z', 3, 'Shrubland', true, 'dari@example.com'),
    ('2026-02-15T01:00:48.389Z', 4, 'Wetlands', true, 'dari@example.com'),
    ('2026-02-17T01:00:48.389Z', 5, 'Inland Cliffs', false, 'dari@example.com'),
    ('2026-01-10T01:00:48.389Z', 6, 'Inland Cliffs', true, 'dari@example.com'),
    ('2026-02-10T01:00:48.389Z', 7, 'Forest', true, 'dari@example.com'),
    ('2026-02-11T01:00:48.389Z', 8, 'Forest', true, 'dari@example.com'),
    ('2026-02-19T01:00:48.389Z', 9, 'Marine Neritic', false, 'dari@example.com'),
    ('2026-02-11T01:00:48.389Z', 10, 'Marine Neritic', false, 'dari@example.com')
;