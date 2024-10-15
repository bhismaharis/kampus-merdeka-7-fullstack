CREATE TABLE
    "classes" (
        "id" BIGSERIAL PRIMARY KEY,
        "class" varchar(255),
        "description" text
    );

CREATE TABLE
    "universities" (
        "id" BIGSERIAL PRIMARY KEY,
        "name" varchar(255),
        "description" text,
        "city" varchar(255),
        "country" varchar(255)
    );

CREATE TABLE
    "students" (
        "id" BIGSERIAL PRIMARY KEY,
        "name" varchar(255),
        "nickName" varchar(255),
        "profilePicture" text,
        "class_id" bigint,
        "university_id" bigint
    );

ALTER TABLE "students" ADD FOREIGN KEY ("class_id") REFERENCES "classes" ("id");

ALTER TABLE "students" ADD FOREIGN KEY ("university_id") REFERENCES "universities" ("id");