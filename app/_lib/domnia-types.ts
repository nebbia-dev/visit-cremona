export type RichTextBlock = {
    children?: Array<{
        text?: string;
    }>;
};

export type ExperienceCardData = {
    cheapest?: number;
    connectedProducts?: Array<number | string>;
    description?: string | RichTextBlock[];
    documentId?: string;
    imageUrl?: string;
    locations?: ExperienceLocation[];
    slug?: string;
    tagIds?: number[];
    title?: string;
    tipo?: string;
    [key: string]: unknown;
};

export type ExperienceLocation = {
    address?: string;
    addressLocality?: string;
    indirizzo?: string;
    lat?: number;
    latitude?: number;
    lng?: number;
    longitude?: number;
    name?: string;
    nome?: string;
    streetAddress?: string;
    title?: string;
    [key: string]: unknown;
};

export type ProductResponse = {
    base_price?: {
        end_date?: string;
        product_id?: number | string;
        start_date?: string;
        value?: number;
    };
};

export function getExperienceDescription(
    description: ExperienceCardData["description"],
) {
    if (typeof description === "string") {
        return description;
    }

    if (!Array.isArray(description)) {
        return "";
    }

    return description
        .flatMap((block) => block.children ?? [])
        .map((child) => child.text ?? "")
        .join(" ");
}
