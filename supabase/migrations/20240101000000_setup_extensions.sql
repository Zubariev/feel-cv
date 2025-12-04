-- ===========================================
--  20240101000000_setup_extensions.sql
--  Core extensions required for CV Intelligence Engine
-- ===========================================

-- Enable UUID generator (used for all table PKs)
create extension if not exists "uuid-ossp";

-- Enable pgcrypto for hashing, signatures, safe cryptographic ops
create extension if not exists "pgcrypto";

-- Enable pg_trgm for similarity search on text (skills, titles, institutions)
create extension if not exists "pg_trgm";

-- Enable fuzzystrmatch for phonetic & fuzzy name matching
create extension if not exists "fuzzystrmatch";

-- Enable unaccent for normalizing noisy text extracted from PDFs
create extension if not exists "unaccent";

-- Enable vector type for embeddings (critical for LLM/RAG)
create extension if not exists "vector";

-- Enable full-text search improvements
create extension if not exists "tsm_system_rows";

-- Enable file system metadata utils (optional but recommended)
create extension if not exists "file_fdw";

-- Enable pgroonga for multilingual text search (especially useful for Ukrainian/German)
create extension if not exists "pgroonga";

-- Enable pg_stat_statements for performance insights
create extension if not exists "pg_stat_statements";

comment on extension "uuid-ossp" is 'UUID generator for document, layer, and analysis primary keys';
comment on extension "pgcrypto" is 'Cryptographic functions for signatures and secure hashing';
comment on extension "pg_trgm" is 'Trigram search for fuzzy resume matching and skill inference';
comment on extension "fuzzystrmatch" is 'Fuzzy string matching for names, degrees, institutions';
comment on extension "unaccent" is 'Normalize extracted text from CVs/PDFs';
comment on extension "vector" is 'Vector datatype for storing embeddings from Gemini / OpenAI / etc.';
comment on extension "tsm_system_rows" is 'Sampling method for efficient debugging queries';
comment on extension "file_fdw" is 'File Foreign Data Wrapper — for structured imports (optional)';
comment on extension "pgroonga" is 'Multilingual search engine; useful for Ukrainian/German/English text';
comment on extension "pg_stat_statements" is 'Query performance diagnostics';
