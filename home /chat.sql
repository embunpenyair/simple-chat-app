--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)

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
-- Name: chat_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_group (
    id integer NOT NULL,
    created_at timestamp without time zone
);


ALTER TABLE public.chat_group OWNER TO postgres;

--
-- Name: chat_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chat_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_group_id_seq OWNER TO postgres;

--
-- Name: chat_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chat_group_id_seq OWNED BY public.chat_group.id;


--
-- Name: chat_group_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_group_user (
    id integer NOT NULL,
    user_id integer,
    group_id integer,
    created_at timestamp without time zone
);


ALTER TABLE public.chat_group_user OWNER TO postgres;

--
-- Name: chat_group_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chat_group_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_group_user_id_seq OWNER TO postgres;

--
-- Name: chat_group_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chat_group_user_id_seq OWNED BY public.chat_group_user.id;


--
-- Name: chat_message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_message (
    id integer NOT NULL,
    group_id integer NOT NULL,
    user_id integer NOT NULL,
    message text,
    created_at timestamp without time zone
);


ALTER TABLE public.chat_message OWNER TO postgres;

--
-- Name: chat_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chat_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_message_id_seq OWNER TO postgres;

--
-- Name: chat_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chat_message_id_seq OWNED BY public.chat_message.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    user_id integer NOT NULL,
    title character varying(80) NOT NULL,
    body character varying(200) NOT NULL,
    content text,
    created_at timestamp without time zone,
    is_read boolean DEFAULT false
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_id_seq OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: subscribe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscribe (
    id integer NOT NULL,
    private_key text,
    public_key text,
    user_id integer NOT NULL
);


ALTER TABLE public.subscribe OWNER TO postgres;

--
-- Name: subscribe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subscribe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subscribe_id_seq OWNER TO postgres;

--
-- Name: subscribe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subscribe_id_seq OWNED BY public.subscribe.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    password text NOT NULL,
    name character varying(60) NOT NULL,
    email character varying(60) NOT NULL,
    subscription text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: chat_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_group ALTER COLUMN id SET DEFAULT nextval('public.chat_group_id_seq'::regclass);


--
-- Name: chat_group_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_group_user ALTER COLUMN id SET DEFAULT nextval('public.chat_group_user_id_seq'::regclass);


--
-- Name: chat_message id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_message ALTER COLUMN id SET DEFAULT nextval('public.chat_message_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: subscribe id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribe ALTER COLUMN id SET DEFAULT nextval('public.subscribe_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: chat_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_group (id, created_at) FROM stdin;
8	2021-01-31 18:31:48.644062
9	2021-01-31 18:32:05.048486
\.


--
-- Data for Name: chat_group_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_group_user (id, user_id, group_id, created_at) FROM stdin;
14	14	8	2021-01-31 18:31:48.647784
15	1	8	2021-01-31 18:31:48.650153
16	13	9	2021-01-31 18:32:05.05437
17	1	9	2021-01-31 18:32:05.056239
\.


--
-- Data for Name: chat_message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_message (id, group_id, user_id, message, created_at) FROM stdin;
3	9	1	Hello world	2021-02-01 11:35:48.759425
4	9	1	Hello world	2021-02-01 11:37:06.075053
5	9	1	Boss	2021-02-01 11:37:47.083949
6	9	1	Boss	2021-02-01 11:38:22.299272
7	9	1	Hello world	2021-02-01 11:39:07.805637
8	9	1	Hello world	2021-02-01 11:40:16.927719
9	9	1	Hello world	2021-02-01 11:41:15.041262
10	9	1	Hello world	2021-02-01 11:41:35.418498
11	9	1	izal ?	2021-02-01 11:43:46.643385
12	9	1	izal ?	2021-02-01 11:44:13.94448
13	9	13	Hello world	2021-02-01 11:58:46.858509
14	9	13	zal ?	2021-02-01 11:58:57.757483
15	9	13	zal	2021-02-01 11:59:24.552723
16	9	13	Hello bos	2021-02-01 12:02:15.05342
17	9	13	Boss?	2021-02-01 12:04:12.897837
18	9	13	boos	2021-02-01 12:06:45.990773
19	9	13	hello world	2021-02-01 12:09:10.619783
20	9	13	hello bos	2021-02-01 12:09:42.948388
21	9	13	Hello boss	2021-02-01 12:10:30.550799
22	9	13	Hello boss	2021-02-01 12:11:29.475938
23	9	13	Hello world	2021-02-01 12:13:50.543703
24	9	13	Boss ?	2021-02-01 12:14:16.146623
25	9	13	Hello zul	2021-02-01 12:15:19.652986
26	9	13	boss ?	2021-02-01 12:15:24.697171
27	9	13	Zul ?	2021-02-01 12:16:36.573405
28	9	13	Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.	2021-02-01 12:16:51.015993
29	9	13	Hello bro ?	2021-02-01 12:18:30.517068
30	9	13	ngapain bro ?	2021-02-01 12:46:40.232017
31	9	13	Hemmo ngola	2021-02-01 12:46:50.231994
32	8	1	Fazrin	2021-02-01 13:38:24.537353
33	9	13	bos ?	2021-02-01 17:30:19.76286
34	9	13	Hello bos	2021-02-01 17:31:03.109551
35	8	1	Fazrin	2021-02-01 17:36:44.138836
36	9	13	Zul ?	2021-02-01 21:31:30.755276
37	9	13	zul ?	2021-02-01 21:31:53.642103
38	9	13	zul ?	2021-02-01 21:32:19.923055
39	9	13	bang ?	2021-02-01 21:32:50.734155
40	9	13	zul ?	2021-02-01 21:40:29.824005
41	9	13	zul	2021-02-01 21:40:44.327338
42	9	13	zul	2021-02-01 21:41:09.913544
43	9	13	zul	2021-02-01 21:41:41.052653
44	9	13	bro ?	2021-02-01 21:47:20.12948
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, user_id, title, body, content, created_at, is_read) FROM stdin;
2	1	New message	Rizal send new message	{"group_id":9,"user_id":13}	2021-02-01 17:31:03.113864	f
3	14	New message	ZUlfikra L. Abdjul send new message	{"group_id":8,"user_id":1}	2021-02-01 17:36:44.151096	f
4	1	New message	Rizal send new message	{"group_id":9,"user_id":13}	2021-02-01 21:31:30.767068	f
5	1	New message	Rizal send new message	{"group_id":9,"user_id":13}	2021-02-01 21:31:53.650125	f
6	1	New message	Rizal send new message	{"group_id":9,"user_id":13}	2021-02-01 21:32:19.930878	f
7	1	New message	Rizal send new message	{"group_id":9,"user_id":13}	2021-02-01 21:32:50.750375	f
8	1	New message	Rizal send new message	{"group_id":9,"user_id":13}	2021-02-01 21:40:29.831415	f
9	1	New message	Rizal send new message	{"group_id":9,"user_id":13}	2021-02-01 21:40:44.33497	f
10	1	New message	Rizal send new message	{"group_id":9,"user_id":13}	2021-02-01 21:41:09.924082	f
11	1	New message	Rizal send new message	{"group_id":9,"user_id":13}	2021-02-01 21:41:41.060439	f
12	1	New message	Rizal send new message	{"group_id":9,"user_id":13}	2021-02-01 21:47:20.137647	f
\.


--
-- Data for Name: subscribe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscribe (id, private_key, public_key, user_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, password, name, email, subscription) FROM stdin;
14	c47d9611e3c5d0d8febf2561693725f973471ab45e632b951fd541495faea7b02b98e9be76c7ccbae9a47b1188a153dc2ac86b4063b86c7846f62f172cedd488df5bd8e89b059fdda571d45d98628e5e16399c7c82775a097869aa8d4b9d0b8cab310201a0fbd9	fazrin lahmudin	fazrin@gmail.com	\N
1	ba242d25e44aa12b592189646cc053e7378116219dfe4f155164fdedb5984dd7475817845efd365576b580cd6387664fd6d528d5e61fda2fc98efac40494a35a47440b09f7e4ef1c98963ba397b0a6a52c8c837d2c68774d4ae13821149ad8b2b634f46de32cbb887a5657fb	ZUlfikra L. Abdjul	zulfikralahmudin@gmail.com	{"endpoint":"https://fcm.googleapis.com/fcm/send/eAgkY9tum0U:APA91bGnL-CHF8AkOsTFoOoUbb_vHPOxjmfpK1sH9R4StBSO9CO5I7ekSqBnBanervQXzlY27Ta1EnI8LUK5OO88PtI4wnlc8mJcQfD1MjZZ3D7ZcSUxIsLtXYy1uPbvnTDt_4-BwUiz","expirationTime":null,"keys":{"p256dh":"BHI3oyHwQUwzRishBuX33PZmqgcRu-8dAbntNqJNZ7DxqhKvqJQ9YHH3NXN1HJfL1irMmwmpnQvVt4e9Guj6fNs","auth":"0ibLFKL71APkPo4R_NNpUQ"}}
13	ba242d25e44aa12b592189646cc053e7378116219dfe4f155164fdedb5984dd7475817845efd365576b580cd6387664fd6d528d5e61fda2fc98efac40494a35a47440b09f7e4ef1c98963ba397b0a6a52c8c837d2c68774d4ae13821149ad8b2b634f46de32cbb887a5657fb	Rizal	rifaizal@gmail.com	\N
\.


--
-- Name: chat_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chat_group_id_seq', 9, true);


--
-- Name: chat_group_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chat_group_user_id_seq', 17, true);


--
-- Name: chat_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chat_message_id_seq', 44, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 12, true);


--
-- Name: subscribe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscribe_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 14, true);


--
-- Name: chat_group chat_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_group
    ADD CONSTRAINT chat_group_pkey PRIMARY KEY (id);


--
-- Name: chat_group_user chat_group_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_group_user
    ADD CONSTRAINT chat_group_user_pkey PRIMARY KEY (id);


--
-- Name: chat_message chat_message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_message
    ADD CONSTRAINT chat_message_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: subscribe subscribe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribe
    ADD CONSTRAINT subscribe_pkey PRIMARY KEY (id);


--
-- Name: users unique_users; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_users UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

