-----------------------------------------------------------------------

CREATE FUNCTION to_ascii(bytea, name) RETURNS text
    LANGUAGE internal STRICT
    AS $$to_ascii_encname$$;

CREATE FUNCTION simples(texto character varying) RETURNS character varying
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$select lower(to_ascii(convert_to($1, 'latin1'), 'latin1'))$_$;

-----------------------------------------------------------------------

CREATE FUNCTION search_article_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare 
  tag taggit_tag%ROWTYPE;
begin
  new.search_index := ''::tsvector;

  for tag in (SELECT t.id, t.name, t.slug FROM taggit_tag t 
		inner join taggit_taggeditem ti on t.id = ti.tag_id and ti.content_type_id = 10
		inner join search_article a on ti.object_id = a.id where a.id = new.id) LOOP
    new.search_index := new.search_index || setweight(to_tsvector(simples(tag.name)),'A');
  END LOOP;

  new.search_index := new.search_index || setweight(to_tsvector((SELECT name FROM search_author WHERE id = new.author_id)),'B');
  new.search_index := new.search_index || setweight(to_tsvector(simples(new.title)),'C');
  new.search_index := new.search_index || setweight(to_tsvector(simples(new.abstract)),'D');
  return new;
end
$$;

-----------------------------------------------------------------------

ALTER TABLE search_article ADD COLUMN search_index tsvector;
CREATE INDEX article_search_index ON search_article USING gin(search_index);
CREATE TRIGGER search_article_update BEFORE INSERT OR UPDATE ON search_article FOR EACH ROW EXECUTE PROCEDURE search_article_trigger();

-----------------------------------------------------------------------
