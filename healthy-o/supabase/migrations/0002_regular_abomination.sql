CREATE TYPE "public"."gender" AS ENUM('M', 'F');--> statement-breakpoint
CREATE TABLE "diagnosis_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"symptoms" text NOT NULL,
	"diagnosis_result" text NOT NULL,
	"departments" text,
	"height_at_diagnosis" double precision,
	"weight_at_diagnosis" double precision,
	"smoking_at_diagnosis" boolean DEFAULT false NOT NULL,
	"drinking_frequency_at_diagnosis" text,
	"chronic_disease_at_diagnosis" text,
	"medications_at_diagnosis" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hospital_recommendations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"based_on_diagnosis_id" serial NOT NULL,
	"location" text,
	"recommended_hospitals" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "supplement_recommendations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"based_on_diagnosis_id" serial NOT NULL,
	"recommendations" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"was_viewed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"name" text NOT NULL,
	"gender" "gender" NOT NULL,
	"birth_date" timestamp NOT NULL,
	"height" double precision,
	"weight" double precision,
	"smoking" boolean DEFAULT false NOT NULL,
	"drinking_frequency" text,
	"chronic_disease" text,
	"medications" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "diagnosis_records" ADD CONSTRAINT "diagnosis_records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hospital_recommendations" ADD CONSTRAINT "hospital_recommendations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hospital_recommendations" ADD CONSTRAINT "hospital_recommendations_based_on_diagnosis_id_diagnosis_records_id_fk" FOREIGN KEY ("based_on_diagnosis_id") REFERENCES "public"."diagnosis_records"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplement_recommendations" ADD CONSTRAINT "supplement_recommendations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplement_recommendations" ADD CONSTRAINT "supplement_recommendations_based_on_diagnosis_id_diagnosis_records_id_fk" FOREIGN KEY ("based_on_diagnosis_id") REFERENCES "public"."diagnosis_records"("id") ON DELETE no action ON UPDATE no action;