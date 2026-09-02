import { NextRequest, NextResponse } from 'next/server';

import {
    ensureDomniaSession,
    getDomniaSessionCookies,
} from '@/app/_lib/domnia-auth';
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
        const { session, shouldPersist } = await ensureDomniaSession();
        const response = NextResponse.redirect(getPublicUrl(request, returnTo));

        if (shouldPersist && session.refreshToken && session.refreshExpiresAt) {
            const cookies = await getDomniaSessionCookies({
                accessExpiresAt: session.accessExpiresAt,
                accessToken: session.accessToken,
                refreshExpiresAt: session.refreshExpiresAt,
                refreshToken: session.refreshToken,
            });

            cookies.forEach((cookie) => {
                response.cookies.set(cookie.name, cookie.value, cookie.options);
            });
        }

        response.headers.set('Cache-Control', 'no-store');

        return response;
    } catch (error) {
        console.error('Failed to initialize Domnia session', error);

        return NextResponse.json(
            { message: 'Unable to initialize session' },
            { status: 500 },
        );
    }
}
