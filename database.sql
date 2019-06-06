
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user_info"(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "first_name" VARCHAR(100),
	"last_name" VARCHAR(100),
	"email" VARCHAR(150),
	"birthday" DATE
);

CREATE TABLE "brand" (
    "id" serial primary key,
    "brand" varchar(50) not null
);

CREATE TABLE "style" (
    "id" serial primary key,
    "style" varchar(50) not null,
	"brand_id" INT REFERENCES "brand"
);

CREATE TABLE "color" (
    "id" serial primary key,
    "color" varchar(50) not null
);

CREATE TABLE "image" (
    "id" serial primary key,
    "media_key" varchar(1000) not null
);

CREATE TABLE "shoe" (
    "id" serial primary key,
    "user_id" INT REFERENCES "user",
	"shoe_name" VARCHAR(100),
	"brand_id" INT REFERENCES "brand",
	"style" VARCHAR(100),
	"color1_id" INT REFERENCES "color"("id"),
	"color2_id" INT REFERENCES "color"("id"),
	"story" VARCHAR(1000),
	"image_id" INT REFERENCES "image"("id"),
	"date_added" DATE,
	"last_worn" DATE,
	"deadstock" BOOLEAN
);
