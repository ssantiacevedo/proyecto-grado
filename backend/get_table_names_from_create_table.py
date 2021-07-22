import sqlparse
import re
from sql_metadata import Parser
line = '''
--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 13.3

-- Started on 2021-07-22 19:30:10 -03

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
-- TOC entry 202 (class 1259 OID 141696)
-- Name: universidad_asignatura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_asignatura (
    id integer NOT NULL,
    nombre character varying(210) NOT NULL,
    instituto_id integer NOT NULL
);


ALTER TABLE public.universidad_asignatura OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 141699)
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
-- TOC entry 3264 (class 0 OID 0)
-- Dependencies: 203
-- Name: universidad_asignatura_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_asignatura_id_seq OWNED BY public.universidad_asignatura.id;


--
-- TOC entry 204 (class 1259 OID 141701)
-- Name: universidad_beca; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_beca (
    id integer NOT NULL,
    nombre character varying(210) NOT NULL
);


ALTER TABLE public.universidad_beca OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 141704)
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
-- TOC entry 3265 (class 0 OID 0)
-- Dependencies: 205
-- Name: universidad_beca_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_beca_id_seq OWNED BY public.universidad_beca.id;


--
-- TOC entry 206 (class 1259 OID 141706)
-- Name: universidad_carrera; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_carrera (
    id integer NOT NULL,
    nombre character varying(210) NOT NULL
);


ALTER TABLE public.universidad_carrera OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 141709)
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
-- TOC entry 3266 (class 0 OID 0)
-- Dependencies: 207
-- Name: universidad_carrera_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_carrera_id_seq OWNED BY public.universidad_carrera.id;


--
-- TOC entry 208 (class 1259 OID 141711)
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
-- TOC entry 209 (class 1259 OID 141714)
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
-- TOC entry 3267 (class 0 OID 0)
-- Dependencies: 209
-- Name: universidad_curso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_curso_id_seq OWNED BY public.universidad_curso.id;


--
-- TOC entry 210 (class 1259 OID 141716)
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
-- TOC entry 211 (class 1259 OID 141722)
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
-- TOC entry 3268 (class 0 OID 0)
-- Dependencies: 211
-- Name: universidad_direccion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_direccion_id_seq OWNED BY public.universidad_direccion.id;


--
-- TOC entry 212 (class 1259 OID 141724)
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
-- TOC entry 213 (class 1259 OID 141730)
-- Name: universidad_estudiante_cursos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_estudiante_cursos (
    id integer NOT NULL,
    estudiante_id integer NOT NULL,
    curso_id integer NOT NULL
);


ALTER TABLE public.universidad_estudiante_cursos OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 141733)
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
-- TOC entry 3269 (class 0 OID 0)
-- Dependencies: 214
-- Name: universidad_estudiante_cursos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_estudiante_cursos_id_seq OWNED BY public.universidad_estudiante_cursos.id;


--
-- TOC entry 215 (class 1259 OID 141738)
-- Name: universidad_instituto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_instituto (
    id integer NOT NULL,
    nombre character varying(210) NOT NULL
);


ALTER TABLE public.universidad_instituto OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 141741)
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
-- TOC entry 3270 (class 0 OID 0)
-- Dependencies: 216
-- Name: universidad_instituto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_instituto_id_seq OWNED BY public.universidad_instituto.id;


--
-- TOC entry 217 (class 1259 OID 141743)
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
-- TOC entry 218 (class 1259 OID 141749)
-- Name: universidad_profesor_curso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidad_profesor_curso (
    id integer NOT NULL,
    profesor_id integer NOT NULL,
    instituto_id integer NOT NULL
);


ALTER TABLE public.universidad_profesor_curso OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 141752)
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
-- TOC entry 3271 (class 0 OID 0)
-- Dependencies: 219
-- Name: universidad_profesor_curso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_profesor_curso_id_seq OWNED BY public.universidad_profesor_curso.id;


--
-- TOC entry 220 (class 1259 OID 141754)
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
-- TOC entry 3272 (class 0 OID 0)
-- Dependencies: 220
-- Name: universidad_profesor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidad_profesor_id_seq OWNED BY public.universidad_profesor.id;


--
-- TOC entry 3059 (class 2604 OID 141756)
-- Name: universidad_asignatura id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_asignatura ALTER COLUMN id SET DEFAULT nextval('public.universidad_asignatura_id_seq'::regclass);


--
-- TOC entry 3060 (class 2604 OID 141757)
-- Name: universidad_beca id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_beca ALTER COLUMN id SET DEFAULT nextval('public.universidad_beca_id_seq'::regclass);


--
-- TOC entry 3061 (class 2604 OID 141758)
-- Name: universidad_carrera id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_carrera ALTER COLUMN id SET DEFAULT nextval('public.universidad_carrera_id_seq'::regclass);


--
-- TOC entry 3062 (class 2604 OID 141759)
-- Name: universidad_curso id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_curso ALTER COLUMN id SET DEFAULT nextval('public.universidad_curso_id_seq'::regclass);


--
-- TOC entry 3063 (class 2604 OID 141760)
-- Name: universidad_direccion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_direccion ALTER COLUMN id SET DEFAULT nextval('public.universidad_direccion_id_seq'::regclass);


--
-- TOC entry 3064 (class 2604 OID 141761)
-- Name: universidad_estudiante_cursos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante_cursos ALTER COLUMN id SET DEFAULT nextval('public.universidad_estudiante_cursos_id_seq'::regclass);


--
-- TOC entry 3065 (class 2604 OID 141762)
-- Name: universidad_instituto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_instituto ALTER COLUMN id SET DEFAULT nextval('public.universidad_instituto_id_seq'::regclass);


--
-- TOC entry 3066 (class 2604 OID 141763)
-- Name: universidad_profesor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor ALTER COLUMN id SET DEFAULT nextval('public.universidad_profesor_id_seq'::regclass);


--
-- TOC entry 3067 (class 2604 OID 141764)
-- Name: universidad_profesor_curso id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor_curso ALTER COLUMN id SET DEFAULT nextval('public.universidad_profesor_curso_id_seq'::regclass);


--
-- TOC entry 3240 (class 0 OID 141696)
-- Dependencies: 202
-- Data for Name: universidad_asignatura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_asignatura (id, nombre, instituto_id) FROM stdin;
\.


--
-- TOC entry 3242 (class 0 OID 141701)
-- Dependencies: 204
-- Data for Name: universidad_beca; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_beca (id, nombre) FROM stdin;
\.


--
-- TOC entry 3244 (class 0 OID 141706)
-- Dependencies: 206
-- Data for Name: universidad_carrera; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_carrera (id, nombre) FROM stdin;
\.


--
-- TOC entry 3246 (class 0 OID 141711)
-- Dependencies: 208
-- Data for Name: universidad_curso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_curso (id, nombre, cupo, anio_dictado, asignatura_id) FROM stdin;
\.


--
-- TOC entry 3248 (class 0 OID 141716)
-- Dependencies: 210
-- Data for Name: universidad_direccion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_direccion (id, calle, ciudad, departamento, codigo_postal, pais) FROM stdin;
\.


--
-- TOC entry 3250 (class 0 OID 141724)
-- Dependencies: 212
-- Data for Name: universidad_estudiante; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_estudiante (nombre, ci, email, address, numero_de_estudiante, promedio, beca_id, carrera_id, direccion_id) FROM stdin;
\.


--
-- TOC entry 3251 (class 0 OID 141730)
-- Dependencies: 213
-- Data for Name: universidad_estudiante_cursos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_estudiante_cursos (id, estudiante_id, curso_id) FROM stdin;
\.


--
-- TOC entry 3253 (class 0 OID 141738)
-- Dependencies: 215
-- Data for Name: universidad_instituto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_instituto (id, nombre) FROM stdin;
\.


--
-- TOC entry 3255 (class 0 OID 141743)
-- Dependencies: 217
-- Data for Name: universidad_profesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_profesor (id, nombre, ci, email, address, salario, direccion_id, instituto_id) FROM stdin;
\.


--
-- TOC entry 3256 (class 0 OID 141749)
-- Dependencies: 218
-- Data for Name: universidad_profesor_curso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidad_profesor_curso (id, profesor_id, instituto_id) FROM stdin;
\.


--
-- TOC entry 3273 (class 0 OID 0)
-- Dependencies: 203
-- Name: universidad_asignatura_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_asignatura_id_seq', 1, false);


--
-- TOC entry 3274 (class 0 OID 0)
-- Dependencies: 205
-- Name: universidad_beca_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_beca_id_seq', 1, false);


--
-- TOC entry 3275 (class 0 OID 0)
-- Dependencies: 207
-- Name: universidad_carrera_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_carrera_id_seq', 1, false);


--
-- TOC entry 3276 (class 0 OID 0)
-- Dependencies: 209
-- Name: universidad_curso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_curso_id_seq', 1, false);


--
-- TOC entry 3277 (class 0 OID 0)
-- Dependencies: 211
-- Name: universidad_direccion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_direccion_id_seq', 1, false);


--
-- TOC entry 3278 (class 0 OID 0)
-- Dependencies: 214
-- Name: universidad_estudiante_cursos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_estudiante_cursos_id_seq', 1, false);


--
-- TOC entry 3279 (class 0 OID 0)
-- Dependencies: 216
-- Name: universidad_instituto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_instituto_id_seq', 1, false);


--
-- TOC entry 3280 (class 0 OID 0)
-- Dependencies: 219
-- Name: universidad_profesor_curso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_profesor_curso_id_seq', 1, false);


--
-- TOC entry 3281 (class 0 OID 0)
-- Dependencies: 220
-- Name: universidad_profesor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidad_profesor_id_seq', 1, false);


--
-- TOC entry 3070 (class 2606 OID 141766)
-- Name: universidad_asignatura universidad_asignatura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_asignatura
    ADD CONSTRAINT universidad_asignatura_pkey PRIMARY KEY (id);


--
-- TOC entry 3072 (class 2606 OID 141768)
-- Name: universidad_beca universidad_beca_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_beca
    ADD CONSTRAINT universidad_beca_pkey PRIMARY KEY (id);


--
-- TOC entry 3074 (class 2606 OID 141770)
-- Name: universidad_carrera universidad_carrera_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_carrera
    ADD CONSTRAINT universidad_carrera_pkey PRIMARY KEY (id);


--
-- TOC entry 3077 (class 2606 OID 141772)
-- Name: universidad_curso universidad_curso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_curso
    ADD CONSTRAINT universidad_curso_pkey PRIMARY KEY (id);


--
-- TOC entry 3079 (class 2606 OID 141774)
-- Name: universidad_direccion universidad_direccion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_direccion
    ADD CONSTRAINT universidad_direccion_pkey PRIMARY KEY (id);


--
-- TOC entry 3086 (class 2606 OID 141776)
-- Name: universidad_estudiante_cursos universidad_estudiante_c_estudiante_id_curso_id_4f45d697_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante_cursos
    ADD CONSTRAINT universidad_estudiante_c_estudiante_id_curso_id_4f45d697_uniq UNIQUE (estudiante_id, curso_id);


--
-- TOC entry 3090 (class 2606 OID 141778)
-- Name: universidad_estudiante_cursos universidad_estudiante_cursos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante_cursos
    ADD CONSTRAINT universidad_estudiante_cursos_pkey PRIMARY KEY (id);


--
-- TOC entry 3084 (class 2606 OID 141780)
-- Name: universidad_estudiante universidad_estudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante
    ADD CONSTRAINT universidad_estudiante_pkey PRIMARY KEY (numero_de_estudiante);


--
-- TOC entry 3092 (class 2606 OID 141784)
-- Name: universidad_instituto universidad_instituto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_instituto
    ADD CONSTRAINT universidad_instituto_pkey PRIMARY KEY (id);


--
-- TOC entry 3098 (class 2606 OID 141786)
-- Name: universidad_profesor_curso universidad_profesor_cur_profesor_id_instituto_id_6196822b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor_curso
    ADD CONSTRAINT universidad_profesor_cur_profesor_id_instituto_id_6196822b_uniq UNIQUE (profesor_id, instituto_id);


--
-- TOC entry 3101 (class 2606 OID 141788)
-- Name: universidad_profesor_curso universidad_profesor_curso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor_curso
    ADD CONSTRAINT universidad_profesor_curso_pkey PRIMARY KEY (id);


--
-- TOC entry 3096 (class 2606 OID 141790)
-- Name: universidad_profesor universidad_profesor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor
    ADD CONSTRAINT universidad_profesor_pkey PRIMARY KEY (id);


--
-- TOC entry 3068 (class 1259 OID 141791)
-- Name: universidad_asignatura_instituto_id_431e8442; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_asignatura_instituto_id_431e8442 ON public.universidad_asignatura USING btree (instituto_id);


--
-- TOC entry 3075 (class 1259 OID 141792)
-- Name: universidad_curso_asignatura_id_9c3bb6ee; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_curso_asignatura_id_9c3bb6ee ON public.universidad_curso USING btree (asignatura_id);


--
-- TOC entry 3080 (class 1259 OID 141793)
-- Name: universidad_estudiante_beca_id_448ef8ba; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_estudiante_beca_id_448ef8ba ON public.universidad_estudiante USING btree (beca_id);


--
-- TOC entry 3081 (class 1259 OID 141794)
-- Name: universidad_estudiante_carrera_id_be27d3e2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_estudiante_carrera_id_be27d3e2 ON public.universidad_estudiante USING btree (carrera_id);


--
-- TOC entry 3087 (class 1259 OID 141795)
-- Name: universidad_estudiante_cursos_curso_id_d070daa3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_estudiante_cursos_curso_id_d070daa3 ON public.universidad_estudiante_cursos USING btree (curso_id);


--
-- TOC entry 3088 (class 1259 OID 141796)
-- Name: universidad_estudiante_cursos_estudiante_id_a6a2bc4e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_estudiante_cursos_estudiante_id_a6a2bc4e ON public.universidad_estudiante_cursos USING btree (estudiante_id);


--
-- TOC entry 3082 (class 1259 OID 141797)
-- Name: universidad_estudiante_direccion_id_90e7d8b8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_estudiante_direccion_id_90e7d8b8 ON public.universidad_estudiante USING btree (direccion_id);


--
-- TOC entry 3099 (class 1259 OID 141798)
-- Name: universidad_profesor_curso_instituto_id_8689289f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_profesor_curso_instituto_id_8689289f ON public.universidad_profesor_curso USING btree (instituto_id);


--
-- TOC entry 3102 (class 1259 OID 141799)
-- Name: universidad_profesor_curso_profesor_id_8aaf3385; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_profesor_curso_profesor_id_8aaf3385 ON public.universidad_profesor_curso USING btree (profesor_id);


--
-- TOC entry 3093 (class 1259 OID 141800)
-- Name: universidad_profesor_direccion_id_7523625f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_profesor_direccion_id_7523625f ON public.universidad_profesor USING btree (direccion_id);


--
-- TOC entry 3094 (class 1259 OID 141801)
-- Name: universidad_profesor_instituto_id_32e195d5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX universidad_profesor_instituto_id_32e195d5 ON public.universidad_profesor USING btree (instituto_id);


--
-- TOC entry 3103 (class 2606 OID 141802)
-- Name: universidad_asignatura universidad_asignatu_instituto_id_431e8442_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_asignatura
    ADD CONSTRAINT universidad_asignatu_instituto_id_431e8442_fk_universid FOREIGN KEY (instituto_id) REFERENCES public.universidad_instituto(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3104 (class 2606 OID 141807)
-- Name: universidad_curso universidad_curso_asignatura_id_9c3bb6ee_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_curso
    ADD CONSTRAINT universidad_curso_asignatura_id_9c3bb6ee_fk_universid FOREIGN KEY (asignatura_id) REFERENCES public.universidad_asignatura(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3105 (class 2606 OID 141812)
-- Name: universidad_estudiante universidad_estudian_carrera_id_be27d3e2_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante
    ADD CONSTRAINT universidad_estudian_carrera_id_be27d3e2_fk_universid FOREIGN KEY (carrera_id) REFERENCES public.universidad_carrera(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3108 (class 2606 OID 141817)
-- Name: universidad_estudiante_cursos universidad_estudian_curso_id_d070daa3_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante_cursos
    ADD CONSTRAINT universidad_estudian_curso_id_d070daa3_fk_universid FOREIGN KEY (curso_id) REFERENCES public.universidad_curso(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3106 (class 2606 OID 141822)
-- Name: universidad_estudiante universidad_estudian_direccion_id_90e7d8b8_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante
    ADD CONSTRAINT universidad_estudian_direccion_id_90e7d8b8_fk_universid FOREIGN KEY (direccion_id) REFERENCES public.universidad_direccion(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3109 (class 2606 OID 141827)
-- Name: universidad_estudiante_cursos universidad_estudian_estudiante_id_a6a2bc4e_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante_cursos
    ADD CONSTRAINT universidad_estudian_estudiante_id_a6a2bc4e_fk_universid FOREIGN KEY (estudiante_id) REFERENCES public.universidad_estudiante(numero_de_estudiante) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3107 (class 2606 OID 141832)
-- Name: universidad_estudiante universidad_estudiante_beca_id_448ef8ba_fk_universidad_beca_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_estudiante
    ADD CONSTRAINT universidad_estudiante_beca_id_448ef8ba_fk_universidad_beca_id FOREIGN KEY (beca_id) REFERENCES public.universidad_beca(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3110 (class 2606 OID 141837)
-- Name: universidad_profesor universidad_profesor_direccion_id_7523625f_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor
    ADD CONSTRAINT universidad_profesor_direccion_id_7523625f_fk_universid FOREIGN KEY (direccion_id) REFERENCES public.universidad_direccion(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3111 (class 2606 OID 141842)
-- Name: universidad_profesor universidad_profesor_instituto_id_32e195d5_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor
    ADD CONSTRAINT universidad_profesor_instituto_id_32e195d5_fk_universid FOREIGN KEY (instituto_id) REFERENCES public.universidad_instituto(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3112 (class 2606 OID 141847)
-- Name: universidad_profesor_curso universidad_profesor_instituto_id_8689289f_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor_curso
    ADD CONSTRAINT universidad_profesor_instituto_id_8689289f_fk_universid FOREIGN KEY (instituto_id) REFERENCES public.universidad_instituto(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3113 (class 2606 OID 141852)
-- Name: universidad_profesor_curso universidad_profesor_profesor_id_8aaf3385_fk_universid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidad_profesor_curso
    ADD CONSTRAINT universidad_profesor_profesor_id_8aaf3385_fk_universid FOREIGN KEY (profesor_id) REFERENCES public.universidad_profesor(id) DEFERRABLE INITIALLY DEFERRED;


-- Completed on 2021-07-22 19:30:11 -03

--
-- PostgreSQL database dump complete
--


'''

def remove_sql_comments(query):
  return re.sub(r"(.*\s+\-\-.*)", "", query)

def get_create_table_sentences(query):
  return [x for x in query if 'CREATE TABLE' in x]

def parse_table_name(tokens):
    for token in reversed(tokens):
        if token.ttype is None:
            return token.value
    return " "

def get_tables_names(line):
  parse = sqlparse.parse(line)
  result = []
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
              result += [parse_table_name(tokens[:i])]
  return result

def get_columns_names(line):
  result = []
  step1 = remove_sql_comments(line)
  step2 = step1.split(';')
  step3 = get_create_table_sentences(step2)
  for query in step3:
    result += [Parser(query).columns]
  return result

def get_tables_and_columns(line):
  column_names = get_columns_names(line)
  table_names = get_tables_names(line)

  result = []
  # To avoid overflow if arrays doesn't match
  which_iterate = column_names
  if(len(table_names) < len(column_names)):
    which_iterate = table_names
  for index, query in enumerate(which_iterate):
    obj = { 'table': table_names[index], 'columns': query }
    result += [obj]
  return result

print(get_tables_and_columns(line))