import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { decrypt, encrypt } from '@/app/_lib/session';

const ACCESS_TOKEN_COOKIE = 'edt_access_token';

export const EDT_AUTH_BASE_URL =
    process.env.EDT_AUTH_BASE_URL ?? 'https://api.servizirl.it';
export const EDT_API_BASE_URL =
    process.env.EDT_API_BASE_URL ??
    'https://api.lispa.it/c/servizi.rl/edt-eventi/v1.0.0';
const EDT_BASIC_AUTH =
    process.env.EDT_BASIC_AUTH ??
    'NnBKUnozWEZybGIyTUxOdGsxNDlSZXJBOTg4YToycGNqT2dZaVpKcERLM2tLS0ZUbVZmdEhJWFlh';
const EDT_SCOPE = process.env.EDT_SCOPE ?? 'edt_eventi';

type TokenCookiePayload = {
    accessToken?: string;
    expiresAt?: number;
    token?: string;
};

type StoredEdtSession = {
    accessExpiresAt?: number;
    accessToken?: string;
};

type EdtTokenResponse = {
    access_token: string;
    expires_in: number;
    scope?: string;
    token_type?: string;
};

export type EdtSession = {
    accessExpiresAt: number;
    accessToken: string;
};

function isValidToken(token?: string, expiresAt?: number) {
    return Boolean(token && expiresAt && expiresAt > Date.now());
}

function normalizeReturnTo(returnTo?: string | null) {
    if (!returnTo || !returnTo.startsWith('/') || returnTo.startsWith('//')) {
        return '/';
    }

    return returnTo;
}

function buildCookieOptions(expiresAt: number) {
    return {
        expires: new Date(expiresAt),
        httpOnly: true,
        path: '/',
        sameSite: 'lax' as const,
        secure: process.env.NODE_ENV === 'production',
    };
}

async function readStoredSession(): Promise<StoredEdtSession> {
    const cookieStore = await cookies();
    const accessPayload = await decrypt<TokenCookiePayload>(
        cookieStore.get(ACCESS_TOKEN_COOKIE)?.value,
    );

    return {
        accessExpiresAt: accessPayload?.expiresAt,
        accessToken: accessPayload?.token ?? accessPayload?.accessToken,
    };
}

async function createSession(): Promise<EdtSession> {
    const response = await fetch(
        `${EDT_AUTH_BASE_URL}/oauth2/token/?grant_type=client_credentials&scope=${EDT_SCOPE}`,
        {
            cache: 'no-store',
            headers: {
                Authorization: `Basic ${EDT_BASIC_AUTH}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
        },
    );

    if (!response.ok) {
        throw new Error(`EDT auth request failed with status ${response.status}`);
    }

    const content = (await response.json()) as EdtTokenResponse;
    const safeExpiresIn = Math.max((content.expires_in ?? 0) - 10, 0);

    return {
        accessExpiresAt: Date.now() + safeExpiresIn * 1000,
        accessToken: content.access_token,
    };
}

export function getEdtApiHeaders(accessToken: string) {
    return {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    };
}

export async function ensureEdtSession(): Promise<{
    session: EdtSession;
    shouldPersist: boolean;
}> {
    const storedSession = await readStoredSession();

    if (
        isValidToken(storedSession.accessToken, storedSession.accessExpiresAt)
    ) {
        return {
            session: {
                accessExpiresAt: storedSession.accessExpiresAt!,
                accessToken: storedSession.accessToken!,
            },
            shouldPersist: false,
        };
    }

    return {
        session: await createSession(),
        shouldPersist: true,
    };
}

export async function getEdtSessionCookies(session: EdtSession) {
    const accessTokenValue = await encrypt({
        expiresAt: session.accessExpiresAt,
        token: session.accessToken,
    });

    return [
        {
            name: ACCESS_TOKEN_COOKIE,
            options: buildCookieOptions(session.accessExpiresAt),
            value: accessTokenValue,
        },
    ];
}

export async function requireEdtAccessToken(returnTo: string) {
    const storedSession = await readStoredSession();

    if (
        isValidToken(storedSession.accessToken, storedSession.accessExpiresAt)
    ) {
        return storedSession.accessToken!;
    }

    redirect(
        `/api/edt/session?returnTo=${encodeURIComponent(
            normalizeReturnTo(returnTo),
        )}`,
    );
}
