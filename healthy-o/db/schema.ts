import { boolean, doublePrecision, pgEnum, pgTable, serial, text, timestamp, json } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { int, varchar } from "drizzle-orm/mysql-core";

export const genderEnum = pgEnum('gender', ['M', 'F']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  gender: genderEnum('gender').notNull(),
  birthDate: timestamp('birth_date').notNull(),
  height: doublePrecision('height'),
  weight: doublePrecision('weight'),
  smoking: boolean('smoking').default(false).notNull(),
  drinkingFrequency: text('drinking_frequency'),
  chronicDisease: text('chronic_disease'),
  medications: text('medications'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const diagnosisRecords = pgTable('diagnosis_records', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull().references(() => users.id),
  symptoms: text('symptoms').notNull(),
  diagnosisResult: text('diagnosis_result').notNull(),
  departments: text('departments'),
  heightAtDiagnosis: doublePrecision('height_at_diagnosis'),
  weightAtDiagnosis: doublePrecision('weight_at_diagnosis'),
  smokingAtDiagnosis: boolean('smoking_at_diagnosis').default(false).notNull(),
  drinkingFrequencyAtDiagnosis: text('drinking_frequency_at_diagnosis'),
  chronicDiseaseAtDiagnosis: text('chronic_disease_at_diagnosis'),
  medicationsAtDiagnosis: text('medications_at_diagnosis'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const supplementRecommendations = pgTable('supplement_recommendations', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull().references(() => users.id),
  basedOnDiagnosisId: serial('based_on_diagnosis_id').references(() => diagnosisRecords.id),
  recommendations: text('recommendations').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  wasViewed: boolean('was_viewed').default(false).notNull(),
});

export const hospitalRecommendations = pgTable('hospital_recommendations', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull().references(() => users.id),
  basedOnDiagnosisId: serial('based_on_diagnosis_id').references(() => diagnosisRecords.id),
  location: text('location'),
  recommendedHospitals: text('recommended_hospitals').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const healthInfo = pgTable('health_info', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull().references(() => users.id),
  data: json('data').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  diagnosisRecords: many(diagnosisRecords),
  hospitalRecommendations: many(hospitalRecommendations),
  supplementRecommendations: many(supplementRecommendations),
}));

export const diagnosisRecordsRelations = relations(diagnosisRecords, ({ one, many }) => ({
  user: one(users, {
    fields: [diagnosisRecords.userId],
    references: [users.id],
  }),
  hospitalRecommendations: many(hospitalRecommendations),
  supplementRecommendations: many(supplementRecommendations),
}));

export const supplementRecommendationsRelations = relations(supplementRecommendations, ({ one }) => ({
  user: one(users, {
    fields: [supplementRecommendations.userId],
    references: [users.id],
  }),
  diagnosisRecord: one(diagnosisRecords, {
    fields: [supplementRecommendations.basedOnDiagnosisId],
    references: [diagnosisRecords.id],
  }),
}));

export const hospitalRecommendationsRelations = relations(hospitalRecommendations, ({ one }) => ({
  user: one(users, {
    fields: [hospitalRecommendations.userId],
    references: [users.id],
  }),
  diagnosisRecord: one(diagnosisRecords, {
    fields: [hospitalRecommendations.basedOnDiagnosisId],
    references: [diagnosisRecords.id],
  }),
})); 