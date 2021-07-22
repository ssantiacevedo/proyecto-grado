import sqlparse

line = '''
--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 13.3

-- Started on 2021-05-29 17:40:33 -03

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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;



CREATE TABLE public.universidad_asignatura (id integer NOT NULL, nombre character varying(210) NOT NULL, instituto_id integer NOT NULL);


ALTER TABLE public.universidad_asignatura OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 133499)
-- Name: universidad_asignatura_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.universidad_asignatura_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.universidad_asignatura_id_seq OWNER TO postgres;

--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 221
-- Name: universidad_asignatura_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_asignatura_id_seq OWNED BY public.universidad_asignatura.id;


--
-- TOC entry 224 (class 1259 OID 133509)
-- Name: universidad_beca; Type: TABLE; Schema: public; Owner: postgres
--

ALTER TABLE public.universidad_beca OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 133507)
-- Name: universidad_beca_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.universidad_beca_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.universidad_beca_id_seq OWNER TO postgres;

--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 223
-- Name: universidad_beca_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_beca_id_seq OWNED BY public.universidad_beca.id;


--
-- TOC entry 226 (class 1259 OID 133517)
-- Name: universidad_carrera; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_carrera (
    id integer NOT NULL,
    nombre character varying(210) NOT NULL
);


ALTER TABLE public.universidad_carrera OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 133515)
-- Name: universidad_carrera_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.universidad_carrera_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.universidad_carrera_id_seq OWNER TO postgres;

--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 225
-- Name: universidad_carrera_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_carrera_id_seq OWNED BY public.universidad_carrera.id;


--
-- TOC entry 228 (class 1259 OID 133525)
-- Name: universidad_curso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_curso (
    id integer NOT NULL,
    nombre character varying(210) NOT NULL,
    cupo integer NOT NULL,
    anio_dictado date NOT NULL,
    asignatura_id integer NOT NULL
);


ALTER TABLE public.universidad_curso OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 133523)
-- Name: universidad_curso_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.universidad_curso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.universidad_curso_id_seq OWNER TO postgres;

--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 227
-- Name: universidad_curso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_curso_id_seq OWNED BY public.universidad_curso.id;


--
-- TOC entry 230 (class 1259 OID 133533)
-- Name: universidad_direccion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_direccion (
    id integer NOT NULL,
    calle character varying(210) NOT NULL,
    ciudad character varying(210) NOT NULL,
    departamento character varying(210) NOT NULL,
    codigo_postal character varying(210) NOT NULL,
    pais character varying(210) NOT NULL
);


ALTER TABLE public.universidad_direccion OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 133531)
-- Name: universidad_direccion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.universidad_direccion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.universidad_direccion_id_seq OWNER TO postgres;

--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 229
-- Name: universidad_direccion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_direccion_id_seq OWNED BY public.universidad_direccion.id;


--
-- TOC entry 238 (class 1259 OID 133574)
-- Name: universidad_estudiante; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_estudiante (
    nombre character varying(210) NOT NULL,
    ci integer NOT NULL,
    email character varying(254) NOT NULL,
    address text NOT NULL,
    numero_de_estudiante integer NOT NULL,
    promedio integer NOT NULL,
    beca_id integer,
    carrera_id integer NOT NULL,
    direccion_id integer
);


ALTER TABLE public.universidad_estudiante OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 133584)
-- Name: universidad_estudiante_cursos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_estudiante_cursos (
    id integer NOT NULL,
    estudiante_id integer NOT NULL,
    curso_id integer NOT NULL
);


ALTER TABLE public.universidad_estudiante_cursos OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 133582)
-- Name: universidad_estudiante_cursos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.universidad_estudiante_cursos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.universidad_estudiante_cursos_id_seq OWNER TO postgres;

--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 239
-- Name: universidad_estudiante_cursos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_estudiante_cursos_id_seq OWNED BY public.universidad_estudiante_cursos.id;


--
-- TOC entry 231 (class 1259 OID 133542)
-- Name: universidad_inscripcion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_inscripcion (
    fecha date NOT NULL,
    codigo integer NOT NULL
);


ALTER TABLE public.universidad_inscripcion OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 133549)
-- Name: universidad_instituto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_instituto (
    id integer NOT NULL,
    nombre character varying(210) NOT NULL
);


ALTER TABLE public.universidad_instituto OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 133547)
-- Name: universidad_instituto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.universidad_instituto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.universidad_instituto_id_seq OWNER TO postgres;

--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 232
-- Name: universidad_instituto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_instituto_id_seq OWNED BY public.universidad_instituto.id;


--
-- TOC entry 235 (class 1259 OID 133557)
-- Name: universidad_profesor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_profesor (
    id integer NOT NULL,
    nombre character varying(210) NOT NULL,
    ci integer NOT NULL,
    email character varying(254) NOT NULL,
    address text NOT NULL,
    salario integer NOT NULL,
    direccion_id integer,
    instituto_id integer NOT NULL
);


ALTER TABLE public.universidad_profesor OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 133568)
-- Name: universidad_profesor_curso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_profesor_curso (
    id integer NOT NULL,
    profesor_id integer NOT NULL,
    instituto_id integer NOT NULL
);


ALTER TABLE public.universidad_profesor_curso OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 133566)
-- Name: universidad_profesor_curso_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.universidad_profesor_curso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.universidad_profesor_curso_id_seq OWNER TO postgres;

--
-- TOC entry 3435 (class 0 OID 0)
-- Dependencies: 236
-- Name: universidad_profesor_curso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_profesor_curso_id_seq OWNED BY public.universidad_profesor_curso.id;


--
-- TOC entry 234 (class 1259 OID 133555)
-- Name: universidad_profesor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.universidad_profesor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.universidad_profesor_id_seq OWNER TO postgres;

--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 234
-- Name: universidad_profesor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_profesor_id_seq OWNED BY public.universidad_profesor.id;


--
-- TOC entry 3135 (class 2604 OID 133504)
-- Name: universidad_asignatura id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_asignatura ALTER COLUMN id SET DEFAULT nextval('public.universidad_asignatura_id_seq'::regclass);


--
-- TOC entry 3136 (class 2604 OID 133512)
-- Name: universidad_beca id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_beca ALTER COLUMN id SET DEFAULT nextval('public.universidad_beca_id_seq'::regclass);


--
-- TOC entry 3137 (class 2604 OID 133520)
-- Name: universidad_carrera id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_carrera ALTER COLUMN id SET DEFAULT nextval('public.universidad_carrera_id_seq'::regclass);


--
-- TOC entry 3138 (class 2604 OID 133528)
-- Name: universidad_curso id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_curso ALTER COLUMN id SET DEFAULT nextval('public.universidad_curso_id_seq'::regclass);


--
-- TOC entry 3139 (class 2604 OID 133536)
-- Name: universidad_direccion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_direccion ALTER COLUMN id SET DEFAULT nextval('public.universidad_direccion_id_seq'::regclass);


--
-- TOC entry 3143 (class 2604 OID 133587)
-- Name: universidad_estudiante_cursos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante_cursos ALTER COLUMN id SET DEFAULT nextval('public.universidad_estudiante_cursos_id_seq'::regclass);


--
-- TOC entry 3140 (class 2604 OID 133552)
-- Name: universidad_instituto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_instituto ALTER COLUMN id SET DEFAULT nextval('public.universidad_instituto_id_seq'::regclass);


--
-- TOC entry 3141 (class 2604 OID 133560)
-- Name: universidad_profesor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor ALTER COLUMN id SET DEFAULT nextval('public.universidad_profesor_id_seq'::regclass);


--
-- TOC entry 3142 (class 2604 OID 133571)
-- Name: universidad_profesor_curso id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor_curso ALTER COLUMN id SET DEFAULT nextval('public.universidad_profesor_curso_id_seq'::regclass);


--
-- TOC entry 3394 (class 0 OID 133501)
-- Dependencies: 222
-- Data for Name: universidad_asignatura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_asignatura (id, nombre, instituto_id) FROM stdin;
\.


--
-- TOC entry 3396 (class 0 OID 133509)
-- Dependencies: 224
-- Data for Name: universidad_beca; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_beca (id, nombre) FROM stdin;
\.


--
-- TOC entry 3398 (class 0 OID 133517)
-- Dependencies: 226
-- Data for Name: universidad_carrera; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_carrera (id, nombre) FROM stdin;
\.


--
-- TOC entry 3400 (class 0 OID 133525)
-- Dependencies: 228
-- Data for Name: universidad_curso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_curso (id, nombre, cupo, anio_dictado, asignatura_id) FROM stdin;
\.


--
-- TOC entry 3402 (class 0 OID 133533)
-- Dependencies: 230
-- Data for Name: universidad_direccion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_direccion (id, calle, ciudad, departamento, codigo_postal, pais) FROM stdin;
\.


--
-- TOC entry 3410 (class 0 OID 133574)
-- Dependencies: 238
-- Data for Name: universidad_estudiante; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_estudiante (nombre, ci, email, address, numero_de_estudiante, promedio, beca_id, carrera_id, direccion_id) FROM stdin;
\.


--
-- TOC entry 3412 (class 0 OID 133584)
-- Dependencies: 240
-- Data for Name: universidad_estudiante_cursos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_estudiante_cursos (id, estudiante_id, curso_id) FROM stdin;
\.


--
-- TOC entry 3403 (class 0 OID 133542)
-- Dependencies: 231
-- Data for Name: universidad_inscripcion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_inscripcion (fecha, codigo) FROM stdin;
\.


--
-- TOC entry 3405 (class 0 OID 133549)
-- Dependencies: 233
-- Data for Name: universidad_instituto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_instituto (id, nombre) FROM stdin;
\.


--
-- TOC entry 3407 (class 0 OID 133557)
-- Dependencies: 235
-- Data for Name: universidad_profesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_profesor (id, nombre, ci, email, address, salario, direccion_id, instituto_id) FROM stdin;
\.


--
-- TOC entry 3409 (class 0 OID 133568)
-- Dependencies: 237
-- Data for Name: universidad_profesor_curso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_profesor_curso (id, profesor_id, instituto_id) FROM stdin;
\.


--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 221
-- Name: universidad_asignatura_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_asignatura_id_seq', 1, false);


--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 223
-- Name: universidad_beca_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_beca_id_seq', 1, false);


--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 225
-- Name: universidad_carrera_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_carrera_id_seq', 1, false);


--
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 227
-- Name: universidad_curso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_curso_id_seq', 1, false);


--
-- TOC entry 3450 (class 0 OID 0)
-- Dependencies: 229
-- Name: universidad_direccion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_direccion_id_seq', 1, false);


--
-- TOC entry 3451 (class 0 OID 0)
-- Dependencies: 239
-- Name: universidad_estudiante_cursos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_estudiante_cursos_id_seq', 1, false);


--
-- TOC entry 3452 (class 0 OID 0)
-- Dependencies: 232
-- Name: universidad_instituto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_instituto_id_seq', 1, false);


--
-- TOC entry 3453 (class 0 OID 0)
-- Dependencies: 236
-- Name: universidad_profesor_curso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_profesor_curso_id_seq', 1, false);


--
-- TOC entry 3454 (class 0 OID 0)
-- Dependencies: 234
-- Name: universidad_profesor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_profesor_id_seq', 1, false);


--
-- TOC entry 3193 (class 2606 OID 133506)
-- Name: universidad_asignatura universidad_asignatura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_asignatura
    ADD CONSTRAINT universidad_asignatura_pkey PRIMARY KEY (id);


--
-- TOC entry 3195 (class 2606 OID 133514)
-- Name: universidad_beca universidad_beca_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_beca
    ADD CONSTRAINT universidad_beca_pkey PRIMARY KEY (id);


--
-- TOC entry 3197 (class 2606 OID 133522)
-- Name: universidad_carrera universidad_carrera_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_carrera
    ADD CONSTRAINT universidad_carrera_pkey PRIMARY KEY (id);


--
-- TOC entry 3200 (class 2606 OID 133530)
-- Name: universidad_curso universidad_curso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_curso
    ADD CONSTRAINT universidad_curso_pkey PRIMARY KEY (id);


--
-- TOC entry 3202 (class 2606 OID 133541)
-- Name: universidad_direccion universidad_direccion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_direccion
    ADD CONSTRAINT universidad_direccion_pkey PRIMARY KEY (id);


--
-- TOC entry 3223 (class 2606 OID 133646)
-- Name: universidad_estudiante_cursos universidad_estudiante_c_estudiante_id_curso_id_4f45d697_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante_cursos
    ADD CONSTRAINT universidad_estudiante_c_estudiante_id_curso_id_4f45d697_uniq UNIQUE (estudiante_id, curso_id);


--
-- TOC entry 3227 (class 2606 OID 133589)
-- Name: universidad_estudiante_cursos universidad_estudiante_cursos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante_cursos
    ADD CONSTRAINT universidad_estudiante_cursos_pkey PRIMARY KEY (id);


--
-- TOC entry 3221 (class 2606 OID 133581)
-- Name: universidad_estudiante universidad_estudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante
    ADD CONSTRAINT universidad_estudiante_pkey PRIMARY KEY (numero_de_estudiante);


--
-- TOC entry 3204 (class 2606 OID 133546)
-- Name: universidad_inscripcion universidad_inscripcion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_inscripcion
    ADD CONSTRAINT universidad_inscripcion_pkey PRIMARY KEY (codigo);


--
-- TOC entry 3206 (class 2606 OID 133554)
-- Name: universidad_instituto universidad_instituto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_instituto
    ADD CONSTRAINT universidad_instituto_pkey PRIMARY KEY (id);


--
-- TOC entry 3212 (class 2606 OID 133614)
-- Name: universidad_profesor_curso universidad_profesor_cur_profesor_id_instituto_id_6196822b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor_curso
    ADD CONSTRAINT universidad_profesor_cur_profesor_id_instituto_id_6196822b_uniq UNIQUE (profesor_id, instituto_id);


--
-- TOC entry 3215 (class 2606 OID 133573)
-- Name: universidad_profesor_curso universidad_profesor_curso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor_curso
    ADD CONSTRAINT universidad_profesor_curso_pkey PRIMARY KEY (id);


--
-- TOC entry 3210 (class 2606 OID 133565)
-- Name: universidad_profesor universidad_profesor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor
    ADD CONSTRAINT universidad_profesor_pkey PRIMARY KEY (id);


--
-- TOC entry 3155 (class 1259 OID 133488)
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- TOC entry 3160 (class 1259 OID 133425)
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- TOC entry 3163 (class 1259 OID 133426)
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- TOC entry 3150 (class 1259 OID 133411)
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- TOC entry 3171 (class 1259 OID 133441)
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- TOC entry 3174 (class 1259 OID 133440)
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- TOC entry 3177 (class 1259 OID 133455)
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- TOC entry 3180 (class 1259 OID 133454)
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- TOC entry 3168 (class 1259 OID 133482)
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- TOC entry 3191 (class 1259 OID 133659)
-- Name: universidad_asignatura_instituto_id_431e8442; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_asignatura_instituto_id_431e8442 ON public.universidad_asignatura USING btree (instituto_id);


--
-- TOC entry 3198 (class 1259 OID 133600)
-- Name: universidad_curso_asignatura_id_9c3bb6ee; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_curso_asignatura_id_9c3bb6ee ON public.universidad_curso USING btree (asignatura_id);


--
-- TOC entry 3217 (class 1259 OID 133642)
-- Name: universidad_estudiante_beca_id_448ef8ba; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_estudiante_beca_id_448ef8ba ON public.universidad_estudiante USING btree (beca_id);


--
-- TOC entry 3218 (class 1259 OID 133643)
-- Name: universidad_estudiante_carrera_id_be27d3e2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_estudiante_carrera_id_be27d3e2 ON public.universidad_estudiante USING btree (carrera_id);


--
-- TOC entry 3224 (class 1259 OID 133658)
-- Name: universidad_estudiante_cursos_curso_id_d070daa3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_estudiante_cursos_curso_id_d070daa3 ON public.universidad_estudiante_cursos USING btree (curso_id);


--
-- TOC entry 3225 (class 1259 OID 133657)
-- Name: universidad_estudiante_cursos_estudiante_id_a6a2bc4e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_estudiante_cursos_estudiante_id_a6a2bc4e ON public.universidad_estudiante_cursos USING btree (estudiante_id);


--
-- TOC entry 3219 (class 1259 OID 133644)
-- Name: universidad_estudiante_direccion_id_90e7d8b8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_estudiante_direccion_id_90e7d8b8 ON public.universidad_estudiante USING btree (direccion_id);


--
-- TOC entry 3213 (class 1259 OID 133626)
-- Name: universidad_profesor_curso_instituto_id_8689289f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_profesor_curso_instituto_id_8689289f ON public.universidad_profesor_curso USING btree (instituto_id);


--
-- TOC entry 3216 (class 1259 OID 133625)
-- Name: universidad_profesor_curso_profesor_id_8aaf3385; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_profesor_curso_profesor_id_8aaf3385 ON public.universidad_profesor_curso USING btree (profesor_id);


--
-- TOC entry 3207 (class 1259 OID 133611)
-- Name: universidad_profesor_direccion_id_7523625f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_profesor_direccion_id_7523625f ON public.universidad_profesor USING btree (direccion_id);


--
-- TOC entry 3208 (class 1259 OID 133612)
-- Name: universidad_profesor_instituto_id_32e195d5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_profesor_instituto_id_32e195d5 ON public.universidad_profesor USING btree (instituto_id);


--
-- TOC entry 3230 (class 2606 OID 133420)
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3229 (class 2606 OID 133415)
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;

--
-- TOC entry 3232 (class 2606 OID 133435)
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3231 (class 2606 OID 133430)
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3234 (class 2606 OID 133449)
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3233 (class 2606 OID 133444)
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3237 (class 2606 OID 133590)
-- Name: universidad_asignatura universidad_asignatu_instituto_id_431e8442_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_asignatura
    ADD CONSTRAINT universidad_asignatu_instituto_id_431e8442_fk_universid FOREIGN KEY (instituto_id) REFERENCES public.universidad_instituto(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3238 (class 2606 OID 133595)
-- Name: universidad_curso universidad_curso_asignatura_id_9c3bb6ee_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_curso
    ADD CONSTRAINT universidad_curso_asignatura_id_9c3bb6ee_fk_universid FOREIGN KEY (asignatura_id) REFERENCES public.universidad_asignatura(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3244 (class 2606 OID 133632)
-- Name: universidad_estudiante universidad_estudian_carrera_id_be27d3e2_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante
    ADD CONSTRAINT universidad_estudian_carrera_id_be27d3e2_fk_universid FOREIGN KEY (carrera_id) REFERENCES public.universidad_carrera(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3247 (class 2606 OID 133652)
-- Name: universidad_estudiante_cursos universidad_estudian_curso_id_d070daa3_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante_cursos
    ADD CONSTRAINT universidad_estudian_curso_id_d070daa3_fk_universid FOREIGN KEY (curso_id) REFERENCES public.universidad_curso(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3245 (class 2606 OID 133637)
-- Name: universidad_estudiante universidad_estudian_direccion_id_90e7d8b8_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante
    ADD CONSTRAINT universidad_estudian_direccion_id_90e7d8b8_fk_universid FOREIGN KEY (direccion_id) REFERENCES public.universidad_direccion(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3246 (class 2606 OID 133647)
-- Name: universidad_estudiante_cursos universidad_estudian_estudiante_id_a6a2bc4e_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante_cursos
    ADD CONSTRAINT universidad_estudian_estudiante_id_a6a2bc4e_fk_universid FOREIGN KEY (estudiante_id) REFERENCES public.universidad_estudiante(numero_de_estudiante) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3243 (class 2606 OID 133627)
-- Name: universidad_estudiante universidad_estudiante_beca_id_448ef8ba_fk_universidad_beca_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante
    ADD CONSTRAINT universidad_estudiante_beca_id_448ef8ba_fk_universidad_beca_id FOREIGN KEY (beca_id) REFERENCES public.universidad_beca(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3239 (class 2606 OID 133601)
-- Name: universidad_profesor universidad_profesor_direccion_id_7523625f_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor
    ADD CONSTRAINT universidad_profesor_direccion_id_7523625f_fk_universid FOREIGN KEY (direccion_id) REFERENCES public.universidad_direccion(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3240 (class 2606 OID 133606)
-- Name: universidad_profesor universidad_profesor_instituto_id_32e195d5_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor
    ADD CONSTRAINT universidad_profesor_instituto_id_32e195d5_fk_universid FOREIGN KEY (instituto_id) REFERENCES public.universidad_instituto(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3242 (class 2606 OID 133620)
-- Name: universidad_profesor_curso universidad_profesor_instituto_id_8689289f_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor_curso
    ADD CONSTRAINT universidad_profesor_instituto_id_8689289f_fk_universid FOREIGN KEY (instituto_id) REFERENCES public.universidad_instituto(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3241 (class 2606 OID 133615)
-- Name: universidad_profesor_curso universidad_profesor_profesor_id_8aaf3385_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor_curso
    ADD CONSTRAINT universidad_profesor_profesor_id_8aaf3385_fk_universid FOREIGN KEY (profesor_id) REFERENCES public.universidad_profesor(id) DEFERRABLE INITIALLY DEFERRED;


-- Completed on 2021-05-29 17:40:33 -03

--
-- PostgreSQL database dump complete
--


'''

def get_table_name(tokens):
    for token in reversed(tokens):
        if token.ttype is None:
            return token.value
    return " "

parse = sqlparse.parse(line)
for stmt in parse:
    # Get all the tokens except whitespaces
    tokens = [t for t in sqlparse.sql.TokenList(stmt.tokens) if t.ttype != sqlparse.tokens.Whitespace]
    is_create_stmt = False
    for i, token in enumerate(tokens):
        # Is it a create statements ?
        if token.match(sqlparse.tokens.DDL, 'CREATE'):
            is_create_stmt = True
            continue
        
        # If it was a create statement and the current token starts with "("
        if is_create_stmt and token.value.startswith("("):
            # Get the table name by looking at the tokens in reverse order till you find
            # a token with None type
            print (f"table: {get_table_name(tokens[:i])}")
