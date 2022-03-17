import { supabase } from "$lib/db";
import { getFailedResponse, getSuccessResponse } from "$lib/models/ServiceResponse";
import type { LoginUserModel } from "$lib/models/user/LoginUserModel";
import { findAssociatedEmail, getUserMetadata } from "$lib/services/UserService";
import { setSessionHeaders } from "$lib/stores/UserStore";

export async function post(event) {

    const model: LoginUserModel = await event.request.json();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    let email: string;

    if (validateEmail(model.emailOrUsername)) {
        email = model.emailOrUsername;
    } else {

        email = await findAssociatedEmail(model.emailOrUsername)

        if (email == null) {
            return {
                status: 500,
                body: getFailedResponse("No account was found for this username"),
            };
        }
    }

    try {
        const { session, error } = await supabase.auth.signIn({
            email, password: model.password
        });

        if (error) {
            return {
                status: error.status,
                body: getFailedResponse(error.message),
            };
        }

        await supabase.auth.update({
            data: await getUserMetadata(session.user.id)
        })

        return {
            status: 200,
            body: getSuccessResponse(session),
            headers: setSessionHeaders(session),
        };

    } catch (error: unknown) {
        return {
            status: 500,
            body: getFailedResponse(),
        };
    }
}
