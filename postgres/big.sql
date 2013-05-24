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

SET default_with_oids = false;

--
-- Name: Article; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Article" (
    "PK_Article" bigint NOT NULL,
    "FK_CapesRating" bigint NOT NULL,
    "FK_Institution" bigint NOT NULL,
    "FK_Author" bigint NOT NULL,
    "FK_Keyword" bigint NOT NULL,
    "Title" character varying(200) NOT NULL,
    "Abstract" text NOT NULL,
    "Year" smallint NOT NULL,
    "Views" integer DEFAULT 0 NOT NULL,
    "IndexDate" date
);


--
-- Name: Author; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Author" (
    "PK_Author" integer NOT NULL,
    "Name" character varying(50) NOT NULL
);


--
-- Name: CapesRating; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "CapesRating" (
    "PK_Rate" integer NOT NULL,
    "Name" character varying(50) NOT NULL
);


--
-- Name: Institution; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Institution" (
    "PK_Institution" integer NOT NULL,
    "Name" character varying(50) NOT NULL
);


--
-- Name: Keyword; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Keyword" (
    "PK_Keyword" integer NOT NULL,
    "Name" character varying(50) NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "User" (
    "PK_User" bigint NOT NULL,
    "Login" character varying(30) NOT NULL,
    "PasswordSHA1" character varying(40) NOT NULL
);


--
-- Name: PK_Article; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Article"
    ADD CONSTRAINT "PK_Article" PRIMARY KEY ("PK_Article");


--
-- Name: PK_Author; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Author"
    ADD CONSTRAINT "PK_Author" PRIMARY KEY ("PK_Author");


--
-- Name: PK_CapesRating; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "CapesRating"
    ADD CONSTRAINT "PK_CapesRating" PRIMARY KEY ("PK_Rate");


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
-- Name: Unique_Article_TitleAuthor; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Article"
    ADD CONSTRAINT "Unique_Article_TitleAuthor" UNIQUE ("Title", "FK_Author");


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
-- Name: FK_Article_Author; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Article"
    ADD CONSTRAINT "FK_Article_Author" FOREIGN KEY ("FK_Author") REFERENCES "Author"("PK_Author") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FK_Article_CapesRating; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Article"
    ADD CONSTRAINT "FK_Article_CapesRating" FOREIGN KEY ("FK_CapesRating") REFERENCES "CapesRating"("PK_Rate") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FK_Article_Institution; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Article"
    ADD CONSTRAINT "FK_Article_Institution" FOREIGN KEY ("FK_Institution") REFERENCES "Institution"("PK_Institution") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FK_Article_Keyword; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Article"
    ADD CONSTRAINT "FK_Article_Keyword" FOREIGN KEY ("FK_Keyword") REFERENCES "Keyword"("PK_Keyword") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

