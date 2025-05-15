-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "smoking" BOOLEAN NOT NULL DEFAULT false,
    "drinkingFrequency" TEXT,
    "chronicDisease" TEXT,
    "medications" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagnosisRecord" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "symptoms" TEXT NOT NULL,
    "diagnosisResult" TEXT NOT NULL,
    "departments" TEXT,
    "heightAtDiagnosis" DOUBLE PRECISION,
    "weightAtDiagnosis" DOUBLE PRECISION,
    "smokingAtDiagnosis" BOOLEAN NOT NULL DEFAULT false,
    "drinkingFrequencyAtDiagnosis" TEXT,
    "chronicDiseaseAtDiagnosis" TEXT,
    "medicationsAtDiagnosis" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiagnosisRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplementRecommendation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "basedOnDiagnosisId" INTEGER,
    "recommendations" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupplementRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalRecommendation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "basedOnDiagnosisId" INTEGER,
    "location" TEXT,
    "recommendedHospitals" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HospitalRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "DiagnosisRecord" ADD CONSTRAINT "DiagnosisRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplementRecommendation" ADD CONSTRAINT "SupplementRecommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplementRecommendation" ADD CONSTRAINT "SupplementRecommendation_basedOnDiagnosisId_fkey" FOREIGN KEY ("basedOnDiagnosisId") REFERENCES "DiagnosisRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalRecommendation" ADD CONSTRAINT "HospitalRecommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalRecommendation" ADD CONSTRAINT "HospitalRecommendation_basedOnDiagnosisId_fkey" FOREIGN KEY ("basedOnDiagnosisId") REFERENCES "DiagnosisRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
