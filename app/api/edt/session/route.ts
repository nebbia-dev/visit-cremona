import { NextRequest, NextResponse } from 'next/server';

import {
    ensureEdtSession,
    getEdtSessionCookies,
} from '@/app/_lib/edt-auth';
import {getPublicUrl} from '@/app/_lib/public-url';

export const dynamic = 'force-dynamic';

function normalizeReturnTo(returnTo?: string | null) {
    if (!returnTo || !returnTo.startsWith('/') || returnTo.startsWith('//')) {
        return '/';
    }

    return returnTo;
}

export async function GET(request: NextRequest) {
    try {
        const returnTo = normalizeReturnTo(
            request.nextUrl.searchParams.get('returnTo'),
        );
        const { session, shouldPersist } = await ensureEdtSession();
        const response = NextResponse.redirect(getPublicUrl(request, returnTo));

        if (shouldPersist) {
            const cookies = await getEdtSessionCookies(session);

            cookies.forEach((cookie) => {
                response.cookies.set(cookie.name, cookie.value, cookie.options);
            });
        }

        response.headers.set('Cache-Control', 'no-store');

        return response;
    } catch (error) {
        console.error('Failed to initialize EDT session', error);

        return NextResponse.json(
            { message: 'Unable to initialize EDT session' },
            { status: 500 },
        );
    }
}
