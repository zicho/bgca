
import type { RegisterUserModel } from "$lib/models/user/RegisterUserModel";
import { supabase } from "$lib/db";
import { getFailedResponse, getSuccessResponse } from "$lib/models/ServiceResponse";
import { setSessionHeaders } from "$lib/stores/UserStore";
import { PrismaClient } from "@prisma/client";
import { getUserMetadata } from "$lib/services/UserService";


const prisma = new PrismaClient();

export async function post(event) {

    const model: RegisterUserModel = await event.request.json();

    try {
        const { session, error } = await supabase.auth.signUp({
            email: model.email,
            password: model.password
        });

        if (error) {
            return {
                status: error.status,
                body: getFailedResponse(error.message),
            };
        }

        await prisma.user.create({
            data: {
                supabase_user_id: session.user.id,
                email: model.email,
                name: model.username
            }
        });

        await supabase.auth.update({
            data: await getUserMetadata(session.user.id)
        })

        return {
            body: getSuccessResponse(session),
            status: 201,
            headers: setSessionHeaders(session)
        };

    } catch (error: unknown) {

        // console.log(error)

        return {
            status: 500,
            body: getFailedResponse(),
        };
    }
}
