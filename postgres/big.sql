--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: article_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE article_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


SET default_with_oids = false;

--
-- Name: Article; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Article" (
    "PK_Article" bigint DEFAULT nextval('article_seq'::regclass) NOT NULL,
    "FK_CapesRating" bigint NOT NULL,
    "FK_Institution" bigint NOT NULL,
    "Title" character varying(200) NOT NULL,
    "Abstract" text NOT NULL,
    "Year" smallint NOT NULL,
    "Views" integer DEFAULT 0 NOT NULL,
    "IndexDate" date
);


--
-- Name: ArticleAuthor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "ArticleAuthor" (
    "FK_Article" bigint NOT NULL,
    "FK_Author" bigint NOT NULL
);


--
-- Name: ArticleKeyword; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "ArticleKeyword" (
    "FK_Article" bigint NOT NULL,
    "FK_Keyword" bigint NOT NULL
);


--
-- Name: author_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE author_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Author; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Author" (
    "PK_Author" integer DEFAULT nextval('author_seq'::regclass) NOT NULL,
    "Name" character varying(50) NOT NULL
);


--
-- Name: capesrating_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE capesrating_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: CapesRating; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "CapesRating" (
    "PK_CapesRating" integer DEFAULT nextval('capesrating_seq'::regclass) NOT NULL,
    "Name" character varying(50) NOT NULL
);


--
-- Name: institution_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE institution_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Institution; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Institution" (
    "PK_Institution" integer DEFAULT nextval('institution_seq'::regclass) NOT NULL,
    "Name" character varying(50) NOT NULL
);


--
-- Name: keyword_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE keyword_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Keyword; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Keyword" (
    "PK_Keyword" integer DEFAULT nextval('keyword_seq'::regclass) NOT NULL,
    "Name" character varying(50) NOT NULL
);


--
-- Name: user_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "User" (
    "PK_User" bigint DEFAULT nextval('user_seq'::regclass) NOT NULL,
    "Login" character varying(30) NOT NULL,
    "PasswordSHA1" character varying(40) NOT NULL
);


--
-- Name: PK_Article; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Article"
    ADD CONSTRAINT "PK_Article" PRIMARY KEY ("PK_Article");


--
-- Name: PK_ArticleAuthor; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "ArticleAuthor"
    ADD CONSTRAINT "PK_ArticleAuthor" PRIMARY KEY ("FK_Article", "FK_Author");


--
-- Name: PK_ArticleKeyword; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "ArticleKeyword"
    ADD CONSTRAINT "PK_ArticleKeyword" PRIMARY KEY ("FK_Article", "FK_Keyword");


--
-- Name: PK_Author; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Author"
    ADD CONSTRAINT "PK_Author" PRIMARY KEY ("PK_Author");


--
-- Name: PK_CapesRating; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "CapesRating"
    ADD CONSTRAINT "PK_CapesRating" PRIMARY KEY ("PK_CapesRating");


--
-- Name: PK_Institution; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Institution"
    ADD CONSTRAINT "PK_Institution" PRIMARY KEY ("PK_Institution");


--
-- Name: PK_Keyword; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Keyword"
    ADD CONSTRAINT "PK_Keyword" PRIMARY KEY ("PK_Keyword");


--
-- Name: PK_User; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "User"
    ADD CONSTRAINT "PK_User" PRIMARY KEY ("PK_User");


--
-- Name: Unique_Author_Name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Author"
    ADD CONSTRAINT "Unique_Author_Name" UNIQUE ("Name");


--
-- Name: Unique_CapesRating_Name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "CapesRating"
    ADD CONSTRAINT "Unique_CapesRating_Name" UNIQUE ("Name");


--
-- Name: Unique_Institution_Name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Institution"
    ADD CONSTRAINT "Unique_Institution_Name" UNIQUE ("Name");


--
-- Name: Unique_Keyword_Name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Keyword"
    ADD CONSTRAINT "Unique_Keyword_Name" UNIQUE ("Name");


--
-- Name: Unique_User_Login; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "User"
    ADD CONSTRAINT "Unique_User_Login" UNIQUE ("Login");


--
-- Name: FK_ArticleAuthor_Article; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "ArticleAuthor"
    ADD CONSTRAINT "FK_ArticleAuthor_Article" FOREIGN KEY ("FK_Article") REFERENCES "Article"("PK_Article") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FK_ArticleAuthor_Author; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "ArticleAuthor"
    ADD CONSTRAINT "FK_ArticleAuthor_Author" FOREIGN KEY ("FK_Author") REFERENCES "Author"("PK_Author") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FK_ArticleKeyword_Article; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "ArticleKeyword"
    ADD CONSTRAINT "FK_ArticleKeyword_Article" FOREIGN KEY ("FK_Article") REFERENCES "Article"("PK_Article") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FK_ArticleKeyword_Keyword; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "ArticleKeyword"
    ADD CONSTRAINT "FK_ArticleKeyword_Keyword" FOREIGN KEY ("FK_Keyword") REFERENCES "Keyword"("PK_Keyword") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FK_Article_CapesRating; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Article"
    ADD CONSTRAINT "FK_Article_CapesRating" FOREIGN KEY ("FK_CapesRating") REFERENCES "CapesRating"("PK_CapesRating") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FK_Article_Institution; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Article"
    ADD CONSTRAINT "FK_Article_Institution" FOREIGN KEY ("FK_Institution") REFERENCES "Institution"("PK_Institution") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

