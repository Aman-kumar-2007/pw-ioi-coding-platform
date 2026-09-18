SET local check_function_bodies = off;

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" REVOKE ALL ON SEQUENCES FROM "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" REVOKE ALL ON SEQUENCES FROM "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" REVOKE ALL ON SEQUENCES FROM "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" REVOKE ALL ON FUNCTIONS FROM "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" REVOKE ALL ON FUNCTIONS FROM "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" REVOKE ALL ON FUNCTIONS FROM "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" REVOKE ALL ON TABLES FROM "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" REVOKE ALL ON TABLES FROM "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" REVOKE ALL ON TABLES FROM "service_role";

CREATE TABLE "public"."academic_history" (
  "id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"    uuid                     NOT NULL,
  "year"       integer                  NOT NULL,
  "batch"      text                     NOT NULL,
  "branch"     text                     NOT NULL,
  "city"       text                     NOT NULL,
  "start_date" timestamp with time zone NOT NULL,
  "end_date"   timestamp with time zone,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "academic_history_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."academic_history"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."admin_audit_logs" (
  "id"             uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "admin_id"       uuid                     NOT NULL,
  "target_user_id" uuid,
  "metadata"       jsonb,
  "created_at"     timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "admin_audit_logs_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."admin_audit_logs"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."contest_participation" (
  "id"              uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"         uuid                     NOT NULL,
  "contest_id"      uuid                     NOT NULL,
  "rank"            integer,
  "rating_change"   integer,
  "rating_after"    integer,
  "problems_solved" integer                  NOT NULL DEFAULT 0,
  "participated_at" timestamp with time zone NOT NULL,
  "created_at"      timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"      timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "contest_participation_pkey" PRIMARY KEY (id),
  CONSTRAINT "contest_participation_user_contest_unique" UNIQUE (user_id, contest_id)
);

ALTER TABLE "public"."contest_participation"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."contests" (
  "id"                  uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "external_contest_id" text                     NOT NULL,
  "name"                text                     NOT NULL,
  "start_time"          timestamp with time zone NOT NULL,
  "duration"            integer                  NOT NULL,
  "contest_type"        text                     NOT NULL,
  "is_rated"            boolean                  NOT NULL DEFAULT true,
  "participant_count"   integer,
  "url"                 text                     NOT NULL,
  "created_at"          timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"          timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "contests_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."contests"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."daily_activity" (
  "id"                 uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"            uuid                     NOT NULL,
  "activity_date"      date                     NOT NULL,
  "problem_count"      integer                  NOT NULL DEFAULT 0,
  "submission_count"   integer                  NOT NULL DEFAULT 0,
  "contest_count"      integer                  NOT NULL DEFAULT 0,
  "contribution_count" integer                  NOT NULL DEFAULT 0,
  "created_at"         timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"         timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "daily_activity_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."daily_activity"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."github_repositories" (
  "id"                  uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "platform_account_id" uuid                     NOT NULL,
  "external_repo_id"    text                     NOT NULL,
  "name"                text                     NOT NULL,
  "full_name"           text                     NOT NULL,
  "description"         text,
  "url"                 text                     NOT NULL,
  "language"            text,
  "stars"               integer                  NOT NULL DEFAULT 0,
  "forks"               integer                  NOT NULL DEFAULT 0,
  "is_private"          boolean                  NOT NULL DEFAULT false,
  "is_fork"             boolean                  NOT NULL DEFAULT false,
  "pushed_at"           timestamp with time zone,
  "created_at"          timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"          timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "github_repo_account_external_unique" UNIQUE (platform_account_id, external_repo_id),
  CONSTRAINT "github_repositories_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."github_repositories"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."import_batch_items" (
  "id"                  uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "import_batch_id"     uuid                     NOT NULL,
  "row_number"          integer                  NOT NULL,
  "external_student_id" text,
  "email"               text                     NOT NULL,
  "user_id"             uuid,
  "error_message"       text,
  "created_at"          timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "import_batch_items_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."import_batch_items"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."import_batches" (
  "id"                 uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "admin_id"           uuid                     NOT NULL,
  "file_name"          text                     NOT NULL,
  "total_records"      integer                  NOT NULL DEFAULT 0,
  "successful_records" integer                  NOT NULL DEFAULT 0,
  "failed_records"     integer                  NOT NULL DEFAULT 0,
  "imported_at"        timestamp with time zone,
  "created_at"         timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "import_batches_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."import_batches"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."notification_recipients" (
  "id"              uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "notification_id" uuid                     NOT NULL,
  "user_id"         uuid                     NOT NULL,
  "is_read"         boolean                  NOT NULL DEFAULT false,
  "read_at"         timestamp with time zone,
  "created_at"      timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "notification_recipient_unique" UNIQUE (notification_id, user_id),
  CONSTRAINT "notification_recipients_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."notification_recipients"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."notifications" (
  "id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "title"      text                     NOT NULL,
  "message"    text                     NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "notifications_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."notifications"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."platform_accounts" (
  "id"                      uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"                 uuid                     NOT NULL,
  "username"                text                     NOT NULL,
  "profile_url"             text,
  "verification_code_hash"  text,
  "verification_expires_at" timestamp with time zone,
  "verified_at"             timestamp with time zone,
  "last_synced_at"          timestamp with time zone,
  "created_at"              timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"              timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "platform_accounts_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."platform_accounts"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."platform_stats" (
  "id"                  uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "platform_account_id" uuid                     NOT NULL,
  "problems_solved"     integer                  NOT NULL DEFAULT 0,
  "basic_solved"        integer                  NOT NULL DEFAULT 0,
  "easy_solved"         integer                  NOT NULL DEFAULT 0,
  "medium_solved"       integer                  NOT NULL DEFAULT 0,
  "hard_solved"         integer                  NOT NULL DEFAULT 0,
  "current_rating"      integer,
  "max_rating"          integer,
  "contest_count"       integer                  NOT NULL DEFAULT 0,
  "contributions"       integer                  NOT NULL DEFAULT 0,
  "repository_count"    integer                  NOT NULL DEFAULT 0,
  "recorded_at"         timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"          timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "platform_stats_pkey" PRIMARY KEY (id),
  CONSTRAINT "platform_stats_platform_account_id_key" UNIQUE (platform_account_id)
);

ALTER TABLE "public"."platform_stats"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."problem_activity" (
  "id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"    uuid                     NOT NULL,
  "problem_id" uuid                     NOT NULL,
  "solved_at"  timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "problem_activity_pkey" PRIMARY KEY (id),
  CONSTRAINT "problem_activity_user_problem_unique" UNIQUE (user_id, problem_id)
);

ALTER TABLE "public"."problem_activity"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."problem_topics" (
  "problem_id" uuid NOT NULL,
  "topic_id"   uuid NOT NULL,
  CONSTRAINT "problem_topics_pkey" PRIMARY KEY (problem_id, topic_id)
);

ALTER TABLE "public"."problem_topics"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."problems" (
  "id"                  uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "external_problem_id" text                     NOT NULL,
  "title"               text                     NOT NULL,
  "url"                 text                     NOT NULL,
  "created_at"          timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"          timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "problems_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."problems"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."rating_history" (
  "id"            uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"       uuid                     NOT NULL,
  "contest_id"    uuid,
  "rating_before" integer                  NOT NULL,
  "rating_after"  integer                  NOT NULL,
  "rating_change" integer                  NOT NULL,
  "recorded_at"   timestamp with time zone NOT NULL,
  "created_at"    timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"    timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "rating_history_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."rating_history"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."social_accounts" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"     uuid                     NOT NULL,
  "username"    text                     NOT NULL,
  "profile_url" text                     NOT NULL,
  "created_at"  timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"  timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "social_accounts_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."social_accounts"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."student_analytics" (
  "id"                    uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"               uuid                     NOT NULL,
  "current_streak"        integer                  NOT NULL DEFAULT 0,
  "max_streak"            integer                  NOT NULL DEFAULT 0,
  "active_days"           integer                  NOT NULL DEFAULT 0,
  "problems_solved"       integer                  NOT NULL DEFAULT 0,
  "contests_participated" integer                  NOT NULL DEFAULT 0,
  "last_active_at"        timestamp with time zone,
  "calculated_at"         timestamp with time zone NOT NULL DEFAULT now(),
  "created_at"            timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"            timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "student_analytics_pkey" PRIMARY KEY (id),
  CONSTRAINT "student_analytics_user_id_key" UNIQUE (user_id)
);

ALTER TABLE "public"."student_analytics"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."student_profiles" (
  "id"                  uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"             uuid                     NOT NULL,
  "full_name"           text                     NOT NULL,
  "profile_image"       text,
  "external_student_id" text,
  "roll_number"         text,
  "year"                integer                  NOT NULL,
  "city"                text                     NOT NULL,
  "branch"              text                     NOT NULL,
  "batch"               text                     NOT NULL,
  "last_imported_at"    timestamp with time zone,
  "created_at"          timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"          timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "student_profiles_external_student_id_key" UNIQUE (external_student_id),
  CONSTRAINT "student_profiles_pkey" PRIMARY KEY (id),
  CONSTRAINT "student_profiles_user_id_key" UNIQUE (user_id)
);

ALTER TABLE "public"."student_profiles"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."topics" (
  "id"   uuid NOT NULL DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  CONSTRAINT "topics_name_key" UNIQUE (name),
  CONSTRAINT "topics_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."topics"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."user_preferences" (
  "id"                        uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"                   uuid                     NOT NULL,
  "email_notifications"       boolean                  NOT NULL DEFAULT true,
  "contest_notifications"     boolean                  NOT NULL DEFAULT true,
  "streak_notifications"      boolean                  NOT NULL DEFAULT true,
  "leaderboard_notifications" boolean                  NOT NULL DEFAULT true,
  "created_at"                timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"                timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "user_preferences_pkey" PRIMARY KEY (id),
  CONSTRAINT "user_preferences_user_id_key" UNIQUE (user_id)
);

ALTER TABLE "public"."user_preferences"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."users" (
  "id"                      uuid                     NOT NULL,
  "email"                   text                     NOT NULL,
  "username"                text,
  "is_active"               boolean                  NOT NULL DEFAULT true,
  "profile_setup_completed" boolean                  NOT NULL DEFAULT false,
  "created_at"              timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"              timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "users_email_key" UNIQUE (email),
  CONSTRAINT "users_pkey" PRIMARY KEY (id),
  CONSTRAINT "users_username_key" UNIQUE (username)
);

ALTER TABLE "public"."users"
  ENABLE ROW LEVEL SECURITY;

CREATE TYPE "public"."admin_action" AS ENUM (
  'CREATE_USER',
  'UPDATE_USER',
  'DEACTIVATE_USER',
  'IMPORT_STUDENTS',
  'UPDATE_STUDENT_DATA'
);

ALTER TABLE "public"."admin_audit_logs"
  ADD COLUMN "action" public.admin_action NOT NULL;

CREATE TYPE "public"."auth_provider" AS ENUM (
  'GOOGLE',
  'PASSWORD'
);

CREATE TYPE "public"."coding_platform" AS ENUM (
  'LEETCODE',
  'CODEFORCES',
  'GFG',
  'GITHUB'
);

ALTER TABLE "public"."daily_activity"
  ADD COLUMN "platform" public.coding_platform NOT NULL;

ALTER TABLE "public"."platform_accounts"
  ADD COLUMN "platform" public.coding_platform NOT NULL;

ALTER TABLE "public"."problems"
  ADD COLUMN "platform" public.coding_platform NOT NULL;

CREATE TYPE "public"."contest_platform" AS ENUM (
  'LEETCODE',
  'CODEFORCES'
);

ALTER TABLE "public"."contests"
  ADD COLUMN "platform" public.contest_platform NOT NULL;

ALTER TABLE "public"."rating_history"
  ADD COLUMN "platform" public.contest_platform NOT NULL;

CREATE TYPE "public"."data_source" AS ENUM (
  'PW_IMPORT',
  'PW_API'
);

ALTER TABLE "public"."import_batches"
  ADD COLUMN "source" public.data_source NOT NULL;

ALTER TABLE "public"."student_profiles"
  ADD COLUMN "data_source" public.data_source NOT NULL DEFAULT 'PW_IMPORT'::public.data_source;

CREATE TYPE "public"."difficulty" AS ENUM (
  'BASIC',
  'EASY',
  'MEDIUM',
  'HARD'
);

ALTER TABLE "public"."problems"
  ADD COLUMN "difficulty" public.difficulty NOT NULL;

CREATE TYPE "public"."import_item_status" AS ENUM (
  'SUCCESS',
  'FAILED'
);

ALTER TABLE "public"."import_batch_items"
  ADD COLUMN "status" public.import_item_status NOT NULL;

CREATE TYPE "public"."import_status" AS ENUM (
  'PENDING',
  'PROCESSING',
  'COMPLETED',
  'FAILED'
);

ALTER TABLE "public"."import_batches"
  ADD COLUMN "status" public.import_status NOT NULL DEFAULT 'PENDING'::public.import_status;

CREATE TYPE "public"."notification_type" AS ENUM (
  'CONTEST',
  'LEADERBOARD',
  'STREAK',
  'PROGRESS',
  'SYSTEM'
);

ALTER TABLE "public"."notifications"
  ADD COLUMN "type" public.notification_type NOT NULL;

CREATE TYPE "public"."social_platform" AS ENUM (
  'LINKEDIN',
  'TWITTER',
  'INSTAGRAM',
  'YOUTUBE'
);

ALTER TABLE "public"."social_accounts"
  ADD COLUMN "platform" public.social_platform NOT NULL;

CREATE TYPE "public"."theme" AS ENUM (
  'DARK',
  'LIGHT'
);

ALTER TABLE "public"."user_preferences"
  ADD COLUMN "theme" public.theme NOT NULL DEFAULT 'DARK'::public.theme;

CREATE TYPE "public"."user_role" AS ENUM (
  'STUDENT',
  'ADMIN'
);

ALTER TABLE "public"."users"
  ADD COLUMN "role" public.user_role NOT NULL DEFAULT 'STUDENT'::public.user_role;

CREATE TYPE "public"."verification_status" AS ENUM (
  'PENDING',
  'VERIFIED',
  'FAILED'
);

ALTER TABLE "public"."platform_accounts"
  ADD COLUMN "verification_status" public.verification_status NOT NULL DEFAULT 'PENDING'::public.verification_status;

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO ''
  AS $function$
begin
    insert into public.users (
        id,
        email,
        role,
        profile_setup_completed
    )
    values (
        new.id,
        new.email,
        'STUDENT',
        false
    );

    return new;
end;
$function$;

ALTER TABLE "public"."contest_participation"
  ADD CONSTRAINT "contest_participation_contest_id_fkey" FOREIGN KEY (contest_id) REFERENCES public.contests(id) ON DELETE CASCADE;

ALTER TABLE "public"."contests"
  ADD CONSTRAINT "contests_platform_external_unique" UNIQUE (platform, external_contest_id);

ALTER TABLE "public"."daily_activity"
  ADD CONSTRAINT "daily_activity_user_platform_date_unique" UNIQUE (user_id, platform, activity_date);

ALTER TABLE "public"."import_batch_items"
  ADD CONSTRAINT "import_batch_items_import_batch_id_fkey" FOREIGN KEY (import_batch_id) REFERENCES public.import_batches(id) ON DELETE CASCADE;

ALTER TABLE "public"."notification_recipients"
  ADD CONSTRAINT "notification_recipients_notification_id_fkey" FOREIGN KEY (notification_id) REFERENCES public.notifications(id) ON DELETE CASCADE;

ALTER TABLE "public"."github_repositories"
  ADD CONSTRAINT "github_repositories_platform_account_id_fkey" FOREIGN KEY (platform_account_id) REFERENCES public.platform_accounts(id) ON DELETE CASCADE;

ALTER TABLE "public"."platform_accounts"
  ADD CONSTRAINT "platform_accounts_user_platform_unique" UNIQUE (user_id, platform);

ALTER TABLE "public"."platform_stats"
  ADD CONSTRAINT "platform_stats_platform_account_id_fkey" FOREIGN KEY (platform_account_id) REFERENCES public.platform_accounts(id) ON DELETE CASCADE;

ALTER TABLE "public"."problem_activity"
  ADD CONSTRAINT "problem_activity_problem_id_fkey" FOREIGN KEY (problem_id) REFERENCES public.problems(id) ON DELETE CASCADE;

ALTER TABLE "public"."problem_topics"
  ADD CONSTRAINT "problem_topics_problem_id_fkey" FOREIGN KEY (problem_id) REFERENCES public.problems(id) ON DELETE CASCADE;

ALTER TABLE "public"."problems"
  ADD CONSTRAINT "problems_platform_external_unique" UNIQUE (platform, external_problem_id);

ALTER TABLE "public"."rating_history"
  ADD CONSTRAINT "rating_history_contest_id_fkey" FOREIGN KEY (contest_id) REFERENCES public.contests(id) ON DELETE SET NULL;

ALTER TABLE "public"."social_accounts"
  ADD CONSTRAINT "social_accounts_user_platform_unique" UNIQUE (user_id, platform);

ALTER TABLE "public"."problem_topics"
  ADD CONSTRAINT "problem_topics_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;

ALTER TABLE "public"."users"
  ADD CONSTRAINT "users_auth_user_fk" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."academic_history"
  ADD CONSTRAINT "academic_history_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."admin_audit_logs"
  ADD CONSTRAINT "admin_audit_logs_admin_id_fkey" FOREIGN KEY (admin_id) REFERENCES public.users(id) ON DELETE RESTRICT;

ALTER TABLE "public"."admin_audit_logs"
  ADD CONSTRAINT "admin_audit_logs_target_user_id_fkey" FOREIGN KEY (target_user_id) REFERENCES public.users(id) ON DELETE SET NULL;

ALTER TABLE "public"."contest_participation"
  ADD CONSTRAINT "contest_participation_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."daily_activity"
  ADD CONSTRAINT "daily_activity_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."import_batch_items"
  ADD CONSTRAINT "import_batch_items_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;

ALTER TABLE "public"."import_batches"
  ADD CONSTRAINT "import_batches_admin_id_fkey" FOREIGN KEY (admin_id) REFERENCES public.users(id) ON DELETE RESTRICT;

ALTER TABLE "public"."notification_recipients"
  ADD CONSTRAINT "notification_recipients_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."platform_accounts"
  ADD CONSTRAINT "platform_accounts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."problem_activity"
  ADD CONSTRAINT "problem_activity_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."rating_history"
  ADD CONSTRAINT "rating_history_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."social_accounts"
  ADD CONSTRAINT "social_accounts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."student_analytics"
  ADD CONSTRAINT "student_analytics_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."student_profiles"
  ADD CONSTRAINT "student_profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."user_preferences"
  ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

CREATE INDEX idx_contest_participation_user ON public.contest_participation USING btree (user_id);

CREATE INDEX idx_daily_activity_user_date ON public.daily_activity USING btree (user_id, activity_date);

CREATE INDEX idx_import_batch_items_batch ON public.import_batch_items USING btree (import_batch_id);

CREATE INDEX idx_notifications_user ON public.notification_recipients USING btree (user_id);

CREATE INDEX idx_platform_accounts_user ON public.platform_accounts USING btree (user_id);

CREATE INDEX idx_problem_activity_user ON public.problem_activity USING btree (user_id);

CREATE INDEX idx_rating_history_user_platform ON public.rating_history USING btree (user_id, platform);

CREATE INDEX idx_student_profiles_city ON public.student_profiles USING btree (city);

CREATE INDEX idx_student_profiles_year ON public.student_profiles USING btree (year);

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_auth_user();

CREATE POLICY "Students can view own academic history" ON "public"."academic_history"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Admins can view audit logs" ON "public"."admin_audit_logs"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.users u
  WHERE ((u.id = auth.uid()) AND (u.role = 'ADMIN'::public.user_role)))));

CREATE POLICY "Users can view own contest participation" ON "public"."contest_participation"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Authenticated users can view contests" ON "public"."contests"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Users can view own daily activity" ON "public"."daily_activity"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Users can view own github repositories" ON "public"."github_repositories"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.platform_accounts pa
  WHERE ((pa.id = github_repositories.platform_account_id) AND (pa.user_id = auth.uid())))));

CREATE POLICY "Admins can view import batch items" ON "public"."import_batch_items"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM (public.import_batches ib
     JOIN public.users u ON ((u.id = auth.uid())))
  WHERE ((ib.id = import_batch_items.import_batch_id) AND (u.role = 'ADMIN'::public.user_role)))));

CREATE POLICY "Admins can view import batches" ON "public"."import_batches"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.users u
  WHERE ((u.id = auth.uid()) AND (u.role = 'ADMIN'::public.user_role)))));

CREATE POLICY "Users can update their notification status" ON "public"."notification_recipients"
  FOR UPDATE
  TO "authenticated"
  USING ((auth.uid() = user_id))
  WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can view their notifications" ON "public"."notification_recipients"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Users can update own platform accounts" ON "public"."platform_accounts"
  FOR UPDATE
  TO "authenticated"
  USING ((auth.uid() = user_id))
  WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can view own platform accounts" ON "public"."platform_accounts"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Users can view own platform stats" ON "public"."platform_stats"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.platform_accounts pa
  WHERE ((pa.id = platform_stats.platform_account_id) AND (pa.user_id = auth.uid())))));

CREATE POLICY "Users can view own problem activity" ON "public"."problem_activity"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Authenticated users can view problem topics" ON "public"."problem_topics"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Authenticated users can view problems" ON "public"."problems"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Users can view own rating history" ON "public"."rating_history"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Users can update own social accounts" ON "public"."social_accounts"
  FOR UPDATE
  TO "authenticated"
  USING ((auth.uid() = user_id))
  WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can view own social accounts" ON "public"."social_accounts"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Users can view own analytics" ON "public"."student_analytics"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Students can update own profile" ON "public"."student_profiles"
  FOR UPDATE
  TO "authenticated"
  USING ((auth.uid() = user_id))
  WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Students can view own profile" ON "public"."student_profiles"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Authenticated users can view topics" ON "public"."topics"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Users can update own preferences" ON "public"."user_preferences"
  FOR UPDATE
  TO "authenticated"
  USING ((auth.uid() = user_id))
  WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can view own preferences" ON "public"."user_preferences"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Users can update own profile" ON "public"."users"
  FOR UPDATE
  TO "authenticated"
  USING ((auth.uid() = id))
  WITH CHECK ((auth.uid() = id));

CREATE POLICY "Users can view own profile" ON "public"."users"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = id));

GRANT EXECUTE ON FUNCTION "public"."handle_new_auth_user"() TO PUBLIC, "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."academic_history" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."academic_history" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."academic_history" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."admin_audit_logs" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."admin_audit_logs" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."admin_audit_logs" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."contest_participation" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."contest_participation" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."contest_participation" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."contests" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."contests" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."contests" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."daily_activity" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."daily_activity" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."daily_activity" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."github_repositories" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."github_repositories" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."github_repositories" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."import_batch_items" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."import_batch_items" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."import_batch_items" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."import_batches" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."import_batches" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."import_batches" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."notification_recipients" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."notification_recipients" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."notification_recipients" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."notifications" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."notifications" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."notifications" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."platform_accounts" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."platform_accounts" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."platform_accounts" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."platform_stats" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."platform_stats" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."platform_stats" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."problem_activity" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."problem_activity" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."problem_activity" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."problem_topics" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."problem_topics" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."problem_topics" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."problems" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."problems" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."problems" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."rating_history" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."rating_history" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."rating_history" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."social_accounts" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."social_accounts" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."social_accounts" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."student_analytics" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."student_analytics" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."student_analytics" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."student_profiles" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."student_profiles" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."student_profiles" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."topics" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."topics" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."topics" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."user_preferences" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."user_preferences" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."user_preferences" TO "service_role";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."users" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."users" TO "postgres";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."users" TO "service_role";

GRANT USAGE ON TYPE "public"."admin_action" TO "postgres";

GRANT USAGE ON TYPE "public"."auth_provider" TO "postgres";

GRANT USAGE ON TYPE "public"."coding_platform" TO "postgres";

GRANT USAGE ON TYPE "public"."contest_platform" TO "postgres";

GRANT USAGE ON TYPE "public"."data_source" TO "postgres";

GRANT USAGE ON TYPE "public"."difficulty" TO "postgres";

GRANT USAGE ON TYPE "public"."import_item_status" TO "postgres";

GRANT USAGE ON TYPE "public"."import_status" TO "postgres";

GRANT USAGE ON TYPE "public"."notification_type" TO "postgres";

GRANT USAGE ON TYPE "public"."social_platform" TO "postgres";

GRANT USAGE ON TYPE "public"."theme" TO "postgres";

GRANT USAGE ON TYPE "public"."user_role" TO "postgres";

GRANT USAGE ON TYPE "public"."verification_status" TO "postgres";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLES TO "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLES TO "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLES TO "service_role";

