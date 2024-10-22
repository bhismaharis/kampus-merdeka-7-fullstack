-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "profile_picture" VARCHAR,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);
