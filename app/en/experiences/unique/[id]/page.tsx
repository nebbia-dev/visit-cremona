import {notFound} from "next/navigation";

import {getExperience} from "@/app/_lib/domnia-experiences";
import ContactForm from "@/app/_components/ContactForm";
import Link from "next/link";

type ExperiencesImagesResponse = {
    data?: Array<{
        image?: {
            url?: string;
        };
        slug?: string;
    }>;
};

function getDescriptionText(description: unknown) {
    if (typeof description === "string") {
        return description.replace(/<\/?[^>]+(>|$)/g, "").replaceAll("&nbsp;", " ");
    }

    if (Array.isArray(description)) {
        return description
            .flatMap((block) => {
                if (
                    block &&
                    typeof block === "object" &&
                    "children" in block &&
                    Array.isArray(block.children)
                ) {
                    return block.children;
                }

                return [];
            })
            .map((child) => {
                if (child && typeof child === "object" && "text" in child) {
                    return child.text;
                }

                return undefined;
            })
            .filter((text): text is string => typeof text === "string" && text.length > 0)
            .join(" ");
    }

    return "";
}

async function getExperienceImageUrl(slug?: string) {
    if (!slug) {
        return undefined;
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/experiences-images?populate=*&locale=en`,
            {next: {revalidate: 1000}},
        );
        const content = (await response.json()) as ExperiencesImagesResponse;
        const image = content.data?.find((pic) => pic.slug === slug);

        return image?.image?.url;
    } catch (error) {
        console.log(error);

        return undefined;
    }
}

export default async function UniqueExperience({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const experience = await getExperience(
        id,
        `/en/experiences/unique/${id}`,
        { locale: 'en' },
    );

    if (!experience) {
        notFound();
    }

    const imageUrl = await getExperienceImageUrl(experience.slug);
    const imageSource = imageUrl
        ? `${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl}`
        : "/images/experiences/violin1.webp";
    const description = getDescriptionText(experience.description);

    return (
        <section className="mt-[79px] fadein-slower">
            <div className="w-full h-[600px]">
                <img
                    src={imageSource}
                    alt={`Immagine dell'esperienza ${experience.title ?? ""}`}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pt-20 pb-24">
                <p className="text-sm mb-10">
                    <span className="font-semibold"><Link href="/en">Home</Link> / <Link href="/en/experiences">Experiences</Link> / <Link href="/en/experiences/unique">Unique Experiences</Link> /</span> {experience.title}
                </p>

                <div>
                    <h1 className="font-bold text-4xl mb-12">{experience.title}</h1>

                    {description && (
                        <p className="text-lg leading-relaxed whitespace-pre-line mb-16">
                            {description}
                        </p>
                    )}
                    <h2 className='font-bold text-3xl'>Contact us to organize your experience</h2>
                    <ContactForm newsletter={false}/>
                </div>
            </div>
        </section>
    );
}
