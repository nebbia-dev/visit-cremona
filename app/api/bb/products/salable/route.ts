import { NextResponse } from 'next/server';

import {
    DOMNIA_API_BASE_URL,
    ensureDomniaSession,
    getDomniaApiHeaders,
    getDomniaSessionCookies,
} from '@/app/_lib/domnia-auth';
import type { ProductResponse } from '@/app/_lib/domnia-types';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { session, shouldPersist } = await ensureDomniaSession();
        const productsResponse = await fetch(
            `${DOMNIA_API_BASE_URL}/api/bb/products/salable`,
            {
                cache: 'no-store',
                headers: getDomniaApiHeaders(session.accessToken),
                method: 'GET',
            },
        );

        if (!productsResponse.ok) {
            return NextResponse.json(
                { message: 'Unable to load salable products' },
                { status: productsResponse.status },
            );
        }

        const products = (await productsResponse.json()) as ProductResponse[];
        const response = NextResponse.json(
            Array.isArray(products) ? products : [],
        );

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
        console.error('Failed to proxy Domnia salable products', error);

        return NextResponse.json(
            { message: 'Unable to load salable products' },
            { status: 500 },
        );
    }
}
