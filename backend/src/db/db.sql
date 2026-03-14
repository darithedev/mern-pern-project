--
-- PostgreSQL database dump
--

\restrict rZPc0AXNHSsmiW6LLcvDYhNn5NjippNfqSQbGRgSixNfs2QYlS8DserACxWFD7N

-- Dumped from database version 15.15 (Homebrew)
-- Dumped by pg_dump version 15.15 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: individuals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.individuals (
    id bigint NOT NULL,
    nick_name character varying(50) NOT NULL,
    scientist_tracking character varying(250) NOT NULL,
    species_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: individuals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.individuals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: individuals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.individuals_id_seq OWNED BY public.individuals.id;


--
-- Name: sightings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sightings (
    id bigint NOT NULL,
    sighting timestamp with time zone NOT NULL,
    individual_id integer NOT NULL,
    location character varying(250) NOT NULL,
    healthy boolean NOT NULL,
    sighted_by_email character varying(250) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: sightings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sightings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sightings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sightings_id_seq OWNED BY public.sightings.id;


--
-- Name: species; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.species (
    id bigint NOT NULL,
    common_name character varying(50) NOT NULL,
    scientific_name character varying(50) NOT NULL,
    estimated_in_the_wild integer NOT NULL,
    conservation_code character varying(5) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: species_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.species_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: species_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.species_id_seq OWNED BY public.species.id;


--
-- Name: individuals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.individuals ALTER COLUMN id SET DEFAULT nextval('public.individuals_id_seq'::regclass);


--
-- Name: sightings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sightings ALTER COLUMN id SET DEFAULT nextval('public.sightings_id_seq'::regclass);


--
-- Name: species id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.species ALTER COLUMN id SET DEFAULT nextval('public.species_id_seq'::regclass);


--
-- Data for Name: individuals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.individuals (id, nick_name, scientist_tracking, species_id, created_at, updated_at) FROM stdin;
1	Bluey	Dari Cares	1	2026-03-12 17:25:24.499306-04	2026-03-12 17:25:24.499306-04
2	Blue Ladt	Dari Cares	1	2026-03-12 17:25:24.499306-04	2026-03-12 17:25:24.499306-04
3	Red Red	Dari Cares	2	2026-03-12 17:25:24.499306-04	2026-03-12 17:25:24.499306-04
4	Big Red	Dari Cares	2	2026-03-12 17:25:24.499306-04	2026-03-12 17:25:24.499306-04
5	Andy the Kitty	Dari Cares	3	2026-03-12 17:25:24.499306-04	2026-03-12 17:25:24.499306-04
6	Sharon	Dari Cares	3	2026-03-12 17:25:24.499306-04	2026-03-12 17:25:24.499306-04
7	Waii the turtle	Dari Cares	4	2026-03-12 17:25:24.499306-04	2026-03-12 17:25:24.499306-04
8	Topsy Turn	Dari Cares	4	2026-03-12 17:25:24.499306-04	2026-03-12 17:25:24.499306-04
9	Cranzy	Dari Cares	5	2026-03-12 17:25:24.499306-04	2026-03-12 17:25:24.499306-04
10	Hoodie	Dari Cares	5	2026-03-12 17:25:24.499306-04	2026-03-12 17:25:24.499306-04
\.


--
-- Data for Name: sightings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sightings (id, sighting, individual_id, location, healthy, sighted_by_email, created_at, updated_at) FROM stdin;
1	2026-03-09 21:00:48.389-04	1	Savanna	t	dari@example.com	2026-03-12 17:25:24.501142-04	2026-03-12 17:25:24.501142-04
2	2026-02-09 20:00:48.389-05	2	Forest	t	dari@example.com	2026-03-12 17:25:24.501142-04	2026-03-12 17:25:24.501142-04
3	2026-02-10 20:00:48.389-05	3	Shrubland	t	dari@example.com	2026-03-12 17:25:24.501142-04	2026-03-12 17:25:24.501142-04
4	2026-02-14 20:00:48.389-05	4	Wetlands	t	dari@example.com	2026-03-12 17:25:24.501142-04	2026-03-12 17:25:24.501142-04
5	2026-02-16 20:00:48.389-05	5	Inland Cliffs	f	dari@example.com	2026-03-12 17:25:24.501142-04	2026-03-12 17:25:24.501142-04
6	2026-01-09 20:00:48.389-05	6	Inland Cliffs	t	dari@example.com	2026-03-12 17:25:24.501142-04	2026-03-12 17:25:24.501142-04
7	2026-02-09 20:00:48.389-05	7	Forest	t	dari@example.com	2026-03-12 17:25:24.501142-04	2026-03-12 17:25:24.501142-04
8	2026-02-10 20:00:48.389-05	8	Forest	t	dari@example.com	2026-03-12 17:25:24.501142-04	2026-03-12 17:25:24.501142-04
9	2026-02-18 20:00:48.389-05	9	Marine Neritic	f	dari@example.com	2026-03-12 17:25:24.501142-04	2026-03-12 17:25:24.501142-04
10	2026-02-10 20:00:48.389-05	10	Marine Neritic	f	dari@example.com	2026-03-12 17:25:24.501142-04	2026-03-12 17:25:24.501142-04
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.species (id, common_name, scientific_name, estimated_in_the_wild, conservation_code, created_at, updated_at) FROM stdin;
1	Blue-Throated Macaw	Ara glaucogularis	303	CE	2026-03-12 17:25:24.497928-04	2026-03-12 17:25:24.497928-04
2	Red Wolf	Canis rufus	30	CE	2026-03-12 17:25:24.497928-04	2026-03-12 17:25:24.497928-04
3	Andean Cat	Leopardus jacobita	2177	EN	2026-03-12 17:25:24.497928-04	2026-03-12 17:25:24.497928-04
4	Hawaiian Green Turtle	Chelonia mydas	6550	LC	2026-03-12 17:25:24.497928-04	2026-03-12 17:25:24.497928-04
5	Hooded Grebe	Podiceps gallardoi	800	CR	2026-03-12 17:25:24.497928-04	2026-03-12 17:25:24.497928-04
\.


--
-- Name: individuals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.individuals_id_seq', 10, true);


--
-- Name: sightings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sightings_id_seq', 10, true);


--
-- Name: species_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.species_id_seq', 5, true);


--
-- Name: individuals individuals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_pkey PRIMARY KEY (id);


--
-- Name: sightings sightings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_pkey PRIMARY KEY (id);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id);


--
-- Name: individuals individuals_species_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_species_id_fkey FOREIGN KEY (species_id) REFERENCES public.species(id);


--
-- Name: sightings sightings_individual_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.individuals(id);


--
-- PostgreSQL database dump complete
--

\unrestrict rZPc0AXNHSsmiW6LLcvDYhNn5NjippNfqSQbGRgSixNfs2QYlS8DserACxWFD7N

