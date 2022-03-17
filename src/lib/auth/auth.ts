import { supabase } from "../db"

export const register = async (email: string, password: string) => {

    try {

        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error

    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
        
    }
}