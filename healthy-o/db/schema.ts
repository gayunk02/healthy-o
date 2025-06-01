import { 
  pgTable,
  text,
  timestamp,
  boolean,
  decimal,
  json,
  serial,
  integer
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
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
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
  height: decimal('height').notNull(),
  weight: decimal('weight').notNull(),
  bmi: decimal('bmi').notNull(),
  chronicDiseases: text('chronic_diseases').default('없음'),
  medications: text('medications').default('없음'),
  smoking: text('smoking').notNull().default('NON'),           // 'NON', 'ACTIVE', 'QUIT'
  drinking: text('drinking').notNull().default('NON'),         // 'NON', 'LIGHT', 'MODERATE', 'HEAVY'
  exercise: text('exercise').notNull().default('NONE'),        // 'NONE', 'LIGHT', 'MODERATE', 'HEAVY'
  sleep: text('sleep').notNull(),                             // 'LESS_5', '5_TO_6', '6_TO_7', '7_TO_8', 'MORE_8'
  occupation: text('occupation').notNull(),
  workStyle: text('work_style').notNull(),                    // 'SITTING', 'STANDING', 'ACTIVE', 'MIXED'
  diet: text('diet').notNull(),                               // 'BALANCED', 'MEAT', 'FISH', 'VEGGIE', 'INSTANT'
  mealRegularity: text('meal_regularity').notNull(),          // 'REGULAR', 'MOSTLY', 'IRREGULAR', 'VERY_IRREGULAR'
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const healthInfosRelations = relations(healthInfos, ({ one }) => ({
  user: one(users, {
    fields: [healthInfos.userId],
    references: [users.id],
  }),
}));

export const diagnoses = pgTable('diagnoses', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  mainSymptoms: text('main_symptoms').notNull(),
  symptomDuration: text('symptom_duration').notNull(),
  additionalInfo: text('additional_info').default('없음'),
  height: decimal('height').notNull(),
  weight: decimal('weight').notNull(),
  bmi: decimal('bmi').notNull(),
  chronicDiseases: text('chronic_diseases').default('없음'),
  medications: text('medications').default('없음'),
  smoking: text('smoking').notNull().default('NON'),           // 'NON', 'ACTIVE', 'QUIT'
  drinking: text('drinking').notNull().default('NON'),         // 'NON', 'LIGHT', 'MODERATE', 'HEAVY'
  exercise: text('exercise').notNull().default('NONE'),        // 'NONE', 'LIGHT', 'MODERATE', 'HEAVY'
  sleep: text('sleep').notNull(),                             // 'LESS_5', '5_TO_6', '6_TO_7', '7_TO_8', 'MORE_8'
  occupation: text('occupation').notNull(),
  workStyle: text('work_style').notNull(),                    // 'SITTING', 'STANDING', 'ACTIVE', 'MIXED'
  diet: text('diet').notNull(),                               // 'BALANCED', 'MEAT', 'FISH', 'VEGGIE', 'INSTANT'
  mealRegularity: text('meal_regularity').notNull(),          // 'REGULAR', 'MOSTLY', 'IRREGULAR', 'VERY_IRREGULAR'
  createdAt: timestamp('created_at').defaultNow(),
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
  recommendedDepartment: text('recommended_department').notNull(),
  diseases: json('diseases').notNull().$type<{
    diseaseName: string;
    description: string;
    riskLevel: 'low' | 'medium' | 'high';
    mainSymptoms: string[];
    managementTips: string[];
  }[]>(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    diseasesCheck: sql`check(json_array_length(${table.diseases}) <= 3)`
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