--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.3

-- Started on 2020-10-22 11:33:26

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
-- TOC entry 8 (class 2615 OID 451233)
-- Name: logs; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA logs;


ALTER SCHEMA logs OWNER TO postgres;

--
-- TOC entry 9 (class 2615 OID 451232)
-- Name: security; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA security;


ALTER SCHEMA security OWNER TO postgres;

--
-- TOC entry 11 (class 2615 OID 451485)
-- Name: user; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "user";


ALTER SCHEMA "user" OWNER TO postgres;

--
-- TOC entry 2 (class 3079 OID 451248)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 2918 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 451469)
-- Name: user_actions; Type: TABLE; Schema: logs; Owner: postgres
--

CREATE TABLE logs.user_actions (
    uid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_uid uuid,
    app_name text,
    action_type text,
    action_description text,
    action_date timestamp with time zone,
    created_timestamp timestamp without time zone DEFAULT now()
);


ALTER TABLE logs.user_actions OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 451357)
-- Name: groups; Type: TABLE; Schema: security; Owner: postgres
--

CREATE TABLE security.groups (
    uid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255),
    created_timestamp timestamp without time zone,
    createdby_user_uid uuid,
    modified_timestamp timestamp without time zone,
    modifiedby_user_uid uuid,
    active boolean,
    admin_permission_uid uuid
);


ALTER TABLE security.groups OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 451439)
-- Name: groups_permissions; Type: TABLE; Schema: security; Owner: postgres
--

CREATE TABLE security.groups_permissions (
    group_uid uuid NOT NULL,
    permission_uid uuid NOT NULL,
    created_timestamp timestamp without time zone,
    createdby_user_uid uuid,
    modified_timestamp timestamp without time zone,
    modifiedby_user_uid uuid,
    inherit_defaults boolean DEFAULT true NOT NULL,
    can_read boolean DEFAULT true NOT NULL,
    can_update boolean DEFAULT true NOT NULL,
    can_insert boolean DEFAULT true NOT NULL,
    can_delete boolean DEFAULT true NOT NULL
);


ALTER TABLE security.groups_permissions OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 451321)
-- Name: permissions; Type: TABLE; Schema: security; Owner: postgres
--

CREATE TABLE security.permissions (
    uid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255),
    created_timestamp timestamp without time zone,
    createdby_user_uid uuid,
    modified_timestamp timestamp without time zone,
    modifiedby_user_uid uuid,
    active boolean,
    friendly_name character varying(255),
    can_read_default boolean DEFAULT true NOT NULL,
    can_update_default boolean DEFAULT true NOT NULL,
    can_insert_default boolean DEFAULT true NOT NULL,
    can_delete_default boolean DEFAULT true NOT NULL,
    allow_anonymous boolean DEFAULT false NOT NULL
);


ALTER TABLE security.permissions OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 451259)
-- Name: users; Type: TABLE; Schema: security; Owner: postgres
--

CREATE TABLE security.users (
    uid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(255),
    last_seen timestamp without time zone,
    created_timestamp timestamp without time zone,
    createdby_user_uid uuid,
    modified_timestamp timestamp without time zone,
    modifiedby_user_uid uuid,
    active boolean DEFAULT true NOT NULL,
    super_user boolean DEFAULT false NOT NULL,
    email_notice boolean DEFAULT false NOT NULL,
    current_token text,
    token_expiration timestamp without time zone,
    archived boolean DEFAULT false NOT NULL
);


ALTER TABLE security.users OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 451384)
-- Name: users_groups; Type: TABLE; Schema: security; Owner: postgres
--

CREATE TABLE security.users_groups (
    user_uid uuid NOT NULL,
    group_uid uuid NOT NULL,
    created_timestamp timestamp without time zone,
    createdby_user_uid uuid,
    modified_timestamp timestamp without time zone,
    modifiedby_user_uid uuid
);


ALTER TABLE security.users_groups OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 451409)
-- Name: users_permissions; Type: TABLE; Schema: security; Owner: postgres
--

CREATE TABLE security.users_permissions (
    user_uid uuid NOT NULL,
    permission_uid uuid NOT NULL,
    created_timestamp timestamp without time zone,
    createdby_user_uid uuid,
    modified_timestamp timestamp without time zone,
    modifiedby_user_uid uuid,
    inherit_defaults boolean DEFAULT true NOT NULL,
    can_read boolean DEFAULT true NOT NULL,
    can_update boolean DEFAULT true NOT NULL,
    can_insert boolean DEFAULT true NOT NULL,
    can_delete boolean DEFAULT true NOT NULL
);


ALTER TABLE security.users_permissions OWNER TO postgres;

--
-- TOC entry 2766 (class 2606 OID 451478)
-- Name: user_actions user_action; Type: CONSTRAINT; Schema: logs; Owner: postgres
--

ALTER TABLE ONLY logs.user_actions
    ADD CONSTRAINT user_action PRIMARY KEY (uid);


--
-- TOC entry 2764 (class 2606 OID 451448)
-- Name: groups_permissions group_permission_pkey; Type: CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.groups_permissions
    ADD CONSTRAINT group_permission_pkey PRIMARY KEY (group_uid, permission_uid);


--
-- TOC entry 2757 (class 2606 OID 451362)
-- Name: groups group_pkey; Type: CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.groups
    ADD CONSTRAINT group_pkey PRIMARY KEY (uid);


--
-- TOC entry 2755 (class 2606 OID 451334)
-- Name: permissions permission_pkey; Type: CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.permissions
    ADD CONSTRAINT permission_pkey PRIMARY KEY (uid);


--
-- TOC entry 2760 (class 2606 OID 451388)
-- Name: users_groups user_group_pkey; Type: CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users_groups
    ADD CONSTRAINT user_group_pkey PRIMARY KEY (user_uid, group_uid);


--
-- TOC entry 2762 (class 2606 OID 451418)
-- Name: users_permissions user_permission_pkey; Type: CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users_permissions
    ADD CONSTRAINT user_permission_pkey PRIMARY KEY (user_uid, permission_uid);


--
-- TOC entry 2752 (class 2606 OID 451270)
-- Name: users user_pkey; Type: CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (uid);


--
-- TOC entry 2758 (class 1259 OID 451378)
-- Name: ix_ap_user_group_name; Type: INDEX; Schema: security; Owner: postgres
--

CREATE INDEX ix_ap_user_group_name ON security.groups USING btree (name);


--
-- TOC entry 2753 (class 1259 OID 451345)
-- Name: ix_ap_user_permission_name; Type: INDEX; Schema: security; Owner: postgres
--

CREATE INDEX ix_ap_user_permission_name ON security.permissions USING btree (name);


--
-- TOC entry 2750 (class 1259 OID 451320)
-- Name: ix_ap_user_user_email; Type: INDEX; Schema: security; Owner: postgres
--

CREATE UNIQUE INDEX ix_ap_user_user_email ON security.users USING btree (email);


--
-- TOC entry 2786 (class 2606 OID 451479)
-- Name: user_actions user_action_user_uid_fkey; Type: FK CONSTRAINT; Schema: logs; Owner: postgres
--

ALTER TABLE ONLY logs.user_actions
    ADD CONSTRAINT user_action_user_uid_fkey FOREIGN KEY (user_uid) REFERENCES security.users(uid);


--
-- TOC entry 2771 (class 2606 OID 451363)
-- Name: groups group_admin_permission_uid_permission_uid_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.groups
    ADD CONSTRAINT group_admin_permission_uid_permission_uid_fkey FOREIGN KEY (admin_permission_uid) REFERENCES security.permissions(uid);


--
-- TOC entry 2772 (class 2606 OID 451368)
-- Name: groups group_createdby_user_id_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.groups
    ADD CONSTRAINT group_createdby_user_id_fkey FOREIGN KEY (createdby_user_uid) REFERENCES security.users(uid);


--
-- TOC entry 2773 (class 2606 OID 451373)
-- Name: groups group_modifiedby_user_uid_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.groups
    ADD CONSTRAINT group_modifiedby_user_uid_fkey FOREIGN KEY (modifiedby_user_uid) REFERENCES security.users(uid);


--
-- TOC entry 2782 (class 2606 OID 451449)
-- Name: groups_permissions group_permission_createdby_user_uid_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.groups_permissions
    ADD CONSTRAINT group_permission_createdby_user_uid_fkey FOREIGN KEY (createdby_user_uid) REFERENCES security.users(uid);


--
-- TOC entry 2783 (class 2606 OID 451454)
-- Name: groups_permissions group_permission_group_id_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.groups_permissions
    ADD CONSTRAINT group_permission_group_id_fkey FOREIGN KEY (group_uid) REFERENCES security.groups(uid);


--
-- TOC entry 2784 (class 2606 OID 451459)
-- Name: groups_permissions group_permission_modifiedby_user_uid_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.groups_permissions
    ADD CONSTRAINT group_permission_modifiedby_user_uid_fkey FOREIGN KEY (modifiedby_user_uid) REFERENCES security.users(uid);


--
-- TOC entry 2785 (class 2606 OID 451464)
-- Name: groups_permissions group_permission_permission_uid_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.groups_permissions
    ADD CONSTRAINT group_permission_permission_uid_fkey FOREIGN KEY (permission_uid) REFERENCES security.permissions(uid);


--
-- TOC entry 2769 (class 2606 OID 451335)
-- Name: permissions permission_createdby_user_uid_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.permissions
    ADD CONSTRAINT permission_createdby_user_uid_fkey FOREIGN KEY (createdby_user_uid) REFERENCES security.users(uid);


--
-- TOC entry 2770 (class 2606 OID 451340)
-- Name: permissions permission_modifiedby_user_uid_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.permissions
    ADD CONSTRAINT permission_modifiedby_user_uid_fkey FOREIGN KEY (modifiedby_user_uid) REFERENCES security.users(uid);


--
-- TOC entry 2767 (class 2606 OID 451271)
-- Name: users user_createdby_user_uid_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users
    ADD CONSTRAINT user_createdby_user_uid_fkey FOREIGN KEY (createdby_user_uid) REFERENCES security.users(uid);


--
-- TOC entry 2774 (class 2606 OID 451389)
-- Name: users_groups user_group_createdby_user_uid_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users_groups
    ADD CONSTRAINT user_group_createdby_user_uid_fkey FOREIGN KEY (createdby_user_uid) REFERENCES security.users(uid);


--
-- TOC entry 2775 (class 2606 OID 451394)
-- Name: users_groups user_group_group_id_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users_groups
    ADD CONSTRAINT user_group_group_id_fkey FOREIGN KEY (group_uid) REFERENCES security.groups(uid);


--
-- TOC entry 2776 (class 2606 OID 451399)
-- Name: users_groups user_group_modifiedby_user_id_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users_groups
    ADD CONSTRAINT user_group_modifiedby_user_id_fkey FOREIGN KEY (modifiedby_user_uid) REFERENCES security.users(uid);


--
-- TOC entry 2777 (class 2606 OID 451404)
-- Name: users_groups user_group_user_uid_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users_groups
    ADD CONSTRAINT user_group_user_uid_fkey FOREIGN KEY (user_uid) REFERENCES security.users(uid);


--
-- TOC entry 2768 (class 2606 OID 451276)
-- Name: users user_modifiedby_user_uid_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users
    ADD CONSTRAINT user_modifiedby_user_uid_fkey FOREIGN KEY (modifiedby_user_uid) REFERENCES security.users(uid);


--
-- TOC entry 2778 (class 2606 OID 451419)
-- Name: users_permissions user_permission_createdby_user_uid_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users_permissions
    ADD CONSTRAINT user_permission_createdby_user_uid_fkey FOREIGN KEY (createdby_user_uid) REFERENCES security.users(uid);


--
-- TOC entry 2779 (class 2606 OID 451424)
-- Name: users_permissions user_permission_modifiedby_user_uid_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users_permissions
    ADD CONSTRAINT user_permission_modifiedby_user_uid_fkey FOREIGN KEY (modifiedby_user_uid) REFERENCES security.users(uid);


--
-- TOC entry 2780 (class 2606 OID 451429)
-- Name: users_permissions user_permission_permission_id_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users_permissions
    ADD CONSTRAINT user_permission_permission_id_fkey FOREIGN KEY (permission_uid) REFERENCES security.permissions(uid);


--
-- TOC entry 2781 (class 2606 OID 451434)
-- Name: users_permissions user_permission_user_uid_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users_permissions
    ADD CONSTRAINT user_permission_user_uid_fkey FOREIGN KEY (user_uid) REFERENCES security.users(uid);


-- Completed on 2020-10-22 11:33:36

--
-- PostgreSQL database dump complete
--

