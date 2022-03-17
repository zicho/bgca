import type { User } from '@supabase/supabase-js';
import cookie from 'cookie'
import jwt_decode from "jwt-decode";

// export function getSession(event: { locals: { user: User; }; }, resolve) {
//     // console.dir(event.locals.user)
//     return event.locals
// }

// export async function handle({ event, resolve, }) {

//     let c = event.request.headers.get('cookie')

//     if (c) {
//         let token = cookie.parse(c).access_token
//         var user: User = jwt_decode(token);
//         event.locals.user = user;
//         event.locals.authenticated = true;
//     }

//     const response = await resolve(event);
//     return response;
// }

export async function handle({ event, resolve }) {
	const c = event.request.headers.get('cookie') || '';
    let token = cookie.parse(c).access_token
    event.locals.user = token ? jwt_decode(token) : null;
    // console.dir(event.locals.user)
    
	return await resolve(event);
}

export function getSession({ locals }) {

    console.dir("******************************************")
    console.dir(locals)
    console.dir("******************************************")

	return {
		user: locals.user && {
			username: locals.user.username,
			email: locals.user.email,
			image: locals.user.image,
			bio: locals.user.bio
		}
	};
}