import { 
  pgTable,
  text,
  timestamp,
  boolean,
  json,
  serial,
  integer,
  numeric,
} from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  gender: text('gender').notNull(), // 'MALE', 'FEMALE'
  birthDate: timestamp('birth_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  marketingAgree: boolean('marketing_agree').default(false),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  healthInfo: one(healthInfos, {
    fields: [users.id],
    references: [healthInfos.userId],
  }),
  diagnoses: many(diagnoses),
  hospitalRecommendations: many(hospitalRecommendations),
  supplementRecommendations: many(supplementRecommendations),
}));

export const healthInfos = pgTable('health_infos', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  gender: text('gender').notNull(),
  height: numeric('height').notNull(),
  weight: numeric('weight').notNull(),
  bmi: numeric('bmi').notNull(),
  chronicDiseases: text('chronic_diseases').default('없음'),
  medications: text('medications').default('없음'),
  smoking: text('smoking').default('NON').notNull(),
  drinking: text('drinking').default('NON').notNull(),
  exercise: text('exercise').default('NONE').notNull(),
  sleep: text('sleep').notNull(),
  occupation: text('occupation'),
  workStyle: text('work_style').notNull(),
  diet: text('diet').notNull(),
  mealRegularity: text('meal_regularity').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const healthInfosRelations = relations(healthInfos, ({ one }) => ({
  user: one(users, {
    fields: [healthInfos.userId],
    references: [users.id],
  }),
}));

export const diagnoses = pgTable('diagnoses', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  gender: text('gender').notNull(),
  height: numeric('height').notNull(),
  weight: numeric('weight').notNull(),
  bmi: numeric('bmi').notNull(),
  chronicDiseases: text('chronic_diseases').default('없음'),
  medications: text('medications').default('없음'),
  smoking: text('smoking').default('NON').notNull(),
  drinking: text('drinking').default('NON').notNull(),
  exercise: text('exercise').default('NONE').notNull(),
  sleep: text('sleep').notNull(),
  occupation: text('occupation'),
  workStyle: text('work_style').notNull(),
  diet: text('diet').notNull(),
  mealRegularity: text('meal_regularity').notNull(),
  symptoms: text('symptoms').notNull(),
  symptomStartDate: text('symptom_start_date').notNull(),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});

export const diagnosesRelations = relations(diagnoses, ({ one, many }) => ({
  user: one(users, {
    fields: [diagnoses.userId],
    references: [users.id],
  }),
  diagnosisResult: one(diagnosisResults, {
    fields: [diagnoses.id],
    references: [diagnosisResults.diagnosisId],
  }),
  hospitalRecommendations: many(hospitalRecommendations),
  supplementRecommendations: many(supplementRecommendations),
}));

export const diagnosisResults = pgTable('diagnosis_results', {
  id: serial('id').primaryKey(),
  diagnosisId: integer('diagnosis_id').notNull().references(() => diagnoses.id),
  recommendedDepartments: json('recommended_departments').notNull().$type<string[]>(),
  diseases: json('diseases').notNull().$type<{
    diseaseName: string;
    description: string;
    riskLevel: 'low' | 'medium' | 'high';
    mainSymptoms: string[];
    managementTips: string[];
  }[]>(),
  supplements: json('supplements').$type<{
    supplementName: string;
    description: string;
    benefits: string[];
    matchingSymptoms: string[];
  }[]>(),
  supplementsViewed: boolean('supplements_viewed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    diseasesCheck: sql`check(json_array_length(${table.diseases}) <= 3)`,
    supplementsCheck: sql`check(json_array_length(${table.supplements}) <= 3)`,
    departmentsCheck: sql`check(json_array_length(${table.recommendedDepartments}) <= 3)`
  }
});

export const diagnosisResultsRelations = relations(diagnosisResults, ({ one }) => ({
  diagnosis: one(diagnoses, {
    fields: [diagnosisResults.diagnosisId],
    references: [diagnoses.id],
  }),
}));

export const hospitalRecommendations = pgTable('hospital_recommendations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  diagnosisId: integer('diagnosis_id').notNull().references(() => diagnoses.id),
  hospitals: json('hospitals').notNull().$type<{
    hospitalName: string;
    placeId: string;
    placeUrl: string;
    address: string;
    phone: string;
    category: string;
    latitude: number;
    longitude: number;
    department: string;
  }[]>(),
  recommendedAt: timestamp('recommended_at').defaultNow(),
}, (table) => {
  return {
    hospitalsCheck: sql`check(json_array_length(${table.hospitals}) <= 3)`
  }
});

export const hospitalRecommendationsRelations = relations(hospitalRecommendations, ({ one }) => ({
  user: one(users, {
    fields: [hospitalRecommendations.userId],
    references: [users.id],
  }),
  diagnosis: one(diagnoses, {
    fields: [hospitalRecommendations.diagnosisId],
    references: [diagnoses.id],
  }),
}));

export const supplementRecommendations = pgTable('supplement_recommendations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  diagnosisId: integer('diagnosis_id').notNull().references(() => diagnoses.id),
  supplements: json('supplements').notNull().$type<{
    supplementName: string;
    description: string;
    benefits: string[];
    matchingSymptoms: string[];
  }[]>(),
  recommendedAt: timestamp('recommended_at').defaultNow(),
}, (table) => {
  return {
    supplementsCheck: sql`check(json_array_length(${table.supplements}) <= 3)`
  }
});

export const supplementRecommendationsRelations = relations(supplementRecommendations, ({ one }) => ({
  user: one(users, {
    fields: [supplementRecommendations.userId],
    references: [users.id],
  }),
  diagnosis: one(diagnoses, {
    fields: [supplementRecommendations.diagnosisId],
    references: [diagnoses.id],
  }),
})); 