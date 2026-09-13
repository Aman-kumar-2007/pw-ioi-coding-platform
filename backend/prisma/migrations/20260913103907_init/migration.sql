-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "DataSource" AS ENUM ('PW_IMPORT', 'PW_API');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE', 'PASSWORD');

-- CreateEnum
CREATE TYPE "CodingPlatform" AS ENUM ('LEETCODE', 'CODEFORCES', 'GFG', 'GITHUB');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'FAILED');

-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('LINKEDIN', 'TWITTER', 'INSTAGRAM', 'YOUTUBE');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BASIC', 'EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "ContestPlatform" AS ENUM ('LEETCODE', 'CODEFORCES');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('CONTEST', 'LEADERBOARD', 'STREAK', 'SYSTEM');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('DARK', 'LIGHT');

-- CreateEnum
CREATE TYPE "AdminAction" AS ENUM ('IMPORT_STUDENTS', 'UPDATE_STUDENT', 'DEACTIVATE_STUDENT', 'ACTIVATE_STUDENT', 'OTHER');

-- CreateEnum
CREATE TYPE "ImportStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "ImportItemStatus" AS ENUM ('SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "role" "UserRole" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "profileSetupCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "profileImage" TEXT,
    "externalStudentId" TEXT,
    "rollNumber" TEXT,
    "year" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "dataSource" "DataSource" NOT NULL,
    "lastImportedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "batch" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AcademicHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "AuthProvider" NOT NULL,
    "providerAccountId" TEXT,
    "passwordHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platform" "CodingPlatform" NOT NULL,
    "username" TEXT NOT NULL,
    "profileUrl" TEXT,
    "verificationStatus" "VerificationStatus" NOT NULL,
    "verificationCodeHash" TEXT,
    "verificationExpiresAt" TIMESTAMP(3),
    "verifiedAt" TIMESTAMP(3),
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformStats" (
    "id" TEXT NOT NULL,
    "platformAccountId" TEXT NOT NULL,
    "problemsSolved" INTEGER NOT NULL,
    "basicSolved" INTEGER NOT NULL,
    "easySolved" INTEGER NOT NULL,
    "mediumSolved" INTEGER NOT NULL,
    "hardSolved" INTEGER NOT NULL,
    "currentRating" INTEGER,
    "maxRating" INTEGER,
    "contestCount" INTEGER NOT NULL,
    "contributions" INTEGER NOT NULL,
    "repositoryCount" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitHubRepository" (
    "id" TEXT NOT NULL,
    "platformAccountId" TEXT NOT NULL,
    "externalRepoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "language" TEXT,
    "stars" INTEGER NOT NULL,
    "forks" INTEGER NOT NULL,
    "isPrivate" BOOLEAN NOT NULL,
    "isFork" BOOLEAN NOT NULL,
    "pushedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GitHubRepository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platform" "SocialPlatform" NOT NULL,
    "username" TEXT NOT NULL,
    "profileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyActivity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platform" "CodingPlatform" NOT NULL,
    "activityDate" TIMESTAMP(3) NOT NULL,
    "problemCount" INTEGER NOT NULL,
    "submissionCount" INTEGER NOT NULL,
    "contestCount" INTEGER NOT NULL,
    "contributionCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "platform" "CodingPlatform" NOT NULL,
    "externalProblemId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemActivity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "solvedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProblemActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemTopic" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,

    CONSTRAINT "ProblemTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contest" (
    "id" TEXT NOT NULL,
    "platform" "ContestPlatform" NOT NULL,
    "externalContestId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "contestType" TEXT NOT NULL,
    "isRated" BOOLEAN NOT NULL,
    "participantCount" INTEGER,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestParticipation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "rank" INTEGER,
    "ratingChange" INTEGER,
    "ratingAfter" INTEGER,
    "problemsSolved" INTEGER NOT NULL,
    "participatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContestParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatingHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platform" "ContestPlatform" NOT NULL,
    "contestId" TEXT,
    "ratingBefore" INTEGER NOT NULL,
    "ratingAfter" INTEGER NOT NULL,
    "ratingChange" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RatingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentAnalytics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentStreak" INTEGER NOT NULL,
    "maxStreak" INTEGER NOT NULL,
    "activeDays" INTEGER NOT NULL,
    "problemsSolved" INTEGER NOT NULL,
    "contestsParticipated" INTEGER NOT NULL,
    "lastActiveAt" TIMESTAMP(3),
    "calculatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationRecipient" (
    "id" TEXT NOT NULL,
    "notificationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationRecipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "theme" "Theme" NOT NULL,
    "emailNotifications" BOOLEAN NOT NULL,
    "contestNotifications" BOOLEAN NOT NULL,
    "streakNotifications" BOOLEAN NOT NULL,
    "leaderboardNotifications" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminAuditLog" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "action" "AdminAction" NOT NULL,
    "targetUserId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportBatch" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "source" "DataSource" NOT NULL,
    "totalRecords" INTEGER NOT NULL,
    "successfulRecords" INTEGER NOT NULL,
    "failedRecords" INTEGER NOT NULL,
    "status" "ImportStatus" NOT NULL,
    "importedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImportBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportBatchItem" (
    "id" TEXT NOT NULL,
    "importBatchId" TEXT NOT NULL,
    "rowNumber" INTEGER NOT NULL,
    "externalStudentId" TEXT,
    "email" TEXT NOT NULL,
    "userId" TEXT,
    "status" "ImportItemStatus" NOT NULL,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImportBatchItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "StudentProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_externalStudentId_key" ON "StudentProfile"("externalStudentId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthAccount_provider_providerAccountId_key" ON "AuthAccount"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "PlatformAccount_userId_platform_key" ON "PlatformAccount"("userId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "PlatformStats_platformAccountId_key" ON "PlatformStats"("platformAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "GitHubRepository_platformAccountId_externalRepoId_key" ON "GitHubRepository"("platformAccountId", "externalRepoId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialAccount_userId_platform_key" ON "SocialAccount"("userId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "DailyActivity_userId_platform_activityDate_key" ON "DailyActivity"("userId", "platform", "activityDate");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_platform_externalProblemId_key" ON "Problem"("platform", "externalProblemId");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemActivity_userId_problemId_key" ON "ProblemActivity"("userId", "problemId");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemTopic_problemId_topicId_key" ON "ProblemTopic"("problemId", "topicId");

-- CreateIndex
CREATE UNIQUE INDEX "Contest_platform_externalContestId_key" ON "Contest"("platform", "externalContestId");

-- CreateIndex
CREATE UNIQUE INDEX "ContestParticipation_userId_contestId_key" ON "ContestParticipation"("userId", "contestId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentAnalytics_userId_key" ON "StudentAnalytics"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationRecipient_notificationId_userId_key" ON "NotificationRecipient"("notificationId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicHistory" ADD CONSTRAINT "AcademicHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthAccount" ADD CONSTRAINT "AuthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformAccount" ADD CONSTRAINT "PlatformAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformStats" ADD CONSTRAINT "PlatformStats_platformAccountId_fkey" FOREIGN KEY ("platformAccountId") REFERENCES "PlatformAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GitHubRepository" ADD CONSTRAINT "GitHubRepository_platformAccountId_fkey" FOREIGN KEY ("platformAccountId") REFERENCES "PlatformAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialAccount" ADD CONSTRAINT "SocialAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyActivity" ADD CONSTRAINT "DailyActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemActivity" ADD CONSTRAINT "ProblemActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemActivity" ADD CONSTRAINT "ProblemActivity_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemTopic" ADD CONSTRAINT "ProblemTopic_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemTopic" ADD CONSTRAINT "ProblemTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestParticipation" ADD CONSTRAINT "ContestParticipation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestParticipation" ADD CONSTRAINT "ContestParticipation_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingHistory" ADD CONSTRAINT "RatingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingHistory" ADD CONSTRAINT "RatingHistory_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnalytics" ADD CONSTRAINT "StudentAnalytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationRecipient" ADD CONSTRAINT "NotificationRecipient_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationRecipient" ADD CONSTRAINT "NotificationRecipient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminAuditLog" ADD CONSTRAINT "AdminAuditLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminAuditLog" ADD CONSTRAINT "AdminAuditLog_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportBatchItem" ADD CONSTRAINT "ImportBatchItem_importBatchId_fkey" FOREIGN KEY ("importBatchId") REFERENCES "ImportBatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportBatchItem" ADD CONSTRAINT "ImportBatchItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
