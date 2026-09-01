import 'server-only';

import type {NextRequest} from 'next/server';

function getFirstForwardedValue(value: string | null) {
    return value?.split(',')[0]?.trim();
}

function getConfiguredOrigin() {
    const siteUrl = process.env.SITE_URL?.trim();
    const railwayDomain = process.env.RAILWAY_PUBLIC_DOMAIN?.trim();
    const configuredUrl = siteUrl ?? (
        railwayDomain ? `https://${railwayDomain}` : undefined
    );

    if (!configuredUrl) {
        return undefined;
    }

    try {
        return new URL(configuredUrl).origin;
    } catch {
        throw new Error('SITE_URL must be an absolute URL');
    }
}

export function getPublicOrigin(request: NextRequest) {
    const configuredOrigin = getConfiguredOrigin();

    if (configuredOrigin) {
        return configuredOrigin;
    }

    const forwardedHost = getFirstForwardedValue(
        request.headers.get('x-forwarded-host'),
    );
    const forwardedProtocol = getFirstForwardedValue(
        request.headers.get('x-forwarded-proto'),
    );

    if (forwardedHost) {
        const protocol = forwardedProtocol === 'http' ? 'http' : 'https';

        return `${protocol}://${forwardedHost}`;
    }

    return request.nextUrl.origin;
}

export function getPublicUrl(request: NextRequest, pathname: string) {
    return new URL(pathname, `${getPublicOrigin(request)}/`);
}
