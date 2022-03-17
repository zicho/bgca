/// <reference types="@sveltejs/kit" />


import type { User } from "@supabase/supabase-js";


declare global {
  declare namespace App {
    interface Locals { }

    interface Platform { }

    interface Session {
        user: User;
    }

    interface Stuff { }
  }
}