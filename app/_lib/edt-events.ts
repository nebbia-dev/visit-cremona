import 'server-only';

import {
    EDT_API_BASE_URL,
    getEdtApiHeaders,
    requireEdtAccessToken,
} from '@/app/_lib/edt-auth';

const DEFAULT_LOCATION = process.env.EDT_DEFAULT_LOCATION ?? '27177';
const DEFAULT_TAG = process.env.EDT_DEFAULT_TAG ?? '';

type EdtTranslation = {
    description?: string;
    images?: Array<{
        imageUrl?: string;
    }>;
    title?: string;
    url?: string;
};

export type EdtEvent = {
    address?: {
        addressLocality?: string;
        addressPlace?: string;
        streetAddress?: string;
    };
    contacts?: {
        telephone?: string;
    };
    dates?: {
        endDate?: string;
        startDate?: string;
    };
    identifier?: string;
    translations?: Record<string, EdtTranslation | undefined>;
};

export type EdtEventsResponse = {
    events: EdtEvent[];
};

type GetEventsOptions = {
    lang?: string;
    location?: string;
    tag?: string;
};

async function fetchEdtJson<T>(path: string, accessToken: string): Promise<T> {
    const response = await fetch(`${EDT_API_BASE_URL}${path}`, {
        cache: 'no-store',
        headers: getEdtApiHeaders(accessToken),
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(`EDT API request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
}

function getEventStartTimestamp(event: EdtEvent) {
    const timestamp = Date.parse(event.dates?.startDate ?? '');

    return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
}

export function sortEventsByStartDate(events: EdtEvent[]) {
    return [...events].sort(
        (firstEvent, secondEvent) =>
            getEventStartTimestamp(firstEvent) -
            getEventStartTimestamp(secondEvent),
    );
}

export async function getEvents(
    returnTo: string,
    options: GetEventsOptions = {},
) {
    const accessToken = await requireEdtAccessToken(returnTo);
    const params = new URLSearchParams({
        locations: options.location ?? DEFAULT_LOCATION,
        tags: options.tag ?? DEFAULT_TAG,
    });

    if (options.lang) {
        params.set('lang', options.lang);
    }

    return fetchEdtJson<EdtEventsResponse>(
        `/event?${params.toString()}`,
        accessToken,
    );
}

export default getEvents;
