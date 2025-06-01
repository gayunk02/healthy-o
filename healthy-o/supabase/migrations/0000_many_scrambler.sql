CREATE TABLE "diagnoses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"main_symptoms" text NOT NULL,
	"symptom_duration" text NOT NULL,
	"additional_info" text DEFAULT '없음',
	"height" numeric NOT NULL,
	"weight" numeric NOT NULL,
	"bmi" numeric NOT NULL,
	"chronic_diseases" text DEFAULT '없음',
	"medications" text DEFAULT '없음',
	"smoking" text DEFAULT 'NON' NOT NULL,
	"drinking" text DEFAULT 'NON' NOT NULL,
	"exercise" text DEFAULT 'NONE' NOT NULL,
	"sleep" text NOT NULL,
	"occupation" text NOT NULL,
	"work_style" text NOT NULL,
	"diet" text NOT NULL,
	"meal_regularity" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "diagnosis_results" (
	"id" serial PRIMARY KEY NOT NULL,
	"diagnosis_id" integer NOT NULL,
	"recommended_department" text NOT NULL,
	"diseases" json NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "health_infos" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"height" numeric NOT NULL,
	"weight" numeric NOT NULL,
	"bmi" numeric NOT NULL,
	"chronic_diseases" text DEFAULT '없음',
	"medications" text DEFAULT '없음',
	"smoking" text DEFAULT 'NON' NOT NULL,
	"drinking" text DEFAULT 'NON' NOT NULL,
	"exercise" text DEFAULT 'NONE' NOT NULL,
	"sleep" text NOT NULL,
	"occupation" text NOT NULL,
	"work_style" text NOT NULL,
	"diet" text NOT NULL,
	"meal_regularity" text NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "hospital_recommendations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"diagnosis_id" integer NOT NULL,
	"hospitals" json NOT NULL,
	"recommended_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "supplement_recommendations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"diagnosis_id" integer NOT NULL,
	"supplements" json NOT NULL,
	"recommended_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"gender" text NOT NULL,
	"birth_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"marketing_agree" boolean DEFAULT false,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "diagnoses" ADD CONSTRAINT "diagnoses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diagnosis_results" ADD CONSTRAINT "diagnosis_results_diagnosis_id_diagnoses_id_fk" FOREIGN KEY ("diagnosis_id") REFERENCES "public"."diagnoses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "health_infos" ADD CONSTRAINT "health_infos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hospital_recommendations" ADD CONSTRAINT "hospital_recommendations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hospital_recommendations" ADD CONSTRAINT "hospital_recommendations_diagnosis_id_diagnoses_id_fk" FOREIGN KEY ("diagnosis_id") REFERENCES "public"."diagnoses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplement_recommendations" ADD CONSTRAINT "supplement_recommendations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplement_recommendations" ADD CONSTRAINT "supplement_recommendations_diagnosis_id_diagnoses_id_fk" FOREIGN KEY ("diagnosis_id") REFERENCES "public"."diagnoses"("id") ON DELETE no action ON UPDATE no action;