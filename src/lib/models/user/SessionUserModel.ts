import type { User } from "@prisma/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export class UserInfoModel {
    name: string;
}