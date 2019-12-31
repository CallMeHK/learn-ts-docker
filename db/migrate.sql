CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" text UNIQUE NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "point_per_beer" int NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "activities" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "name" text NOT NULL,
  "description" text,
  "points" int,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "user_activities" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "activity_id" int,
  "info" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "user_cache" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "point_total" int,
  "last_updated" timestamp DEFAULT (now())
);

ALTER TABLE "activities" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_activities" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_activities" ADD FOREIGN KEY ("activity_id") REFERENCES "activities" ("id");

ALTER TABLE "user_cache" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
