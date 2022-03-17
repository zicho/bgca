
import type { Session } from '@supabase/supabase-js'
import cookie from 'cookie'

export function setSessionHeaders(session: Session) {

    return {
        'Set-Cookie':
            cookie.serialize(
                'access_token', session.access_token, {
                httpOnly: true,
                sameSite: 'lax',
                secure: true,
                maxAge: session.expires_in * 1000,
                path: "/"
            })
    }
}

export function clearSessionHeaders() {
    return {
        'set-cookie': 'access_token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
}
