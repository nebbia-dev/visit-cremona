'use client'
import Link from "next/link";
import {
    getExperienceDescription,
    type ExperienceCardData,
} from "@/app/_lib/domnia-types";
import {usePathname} from "next/navigation";

export default function SingleExperienceCard({el, grid, altGrid} : {el:ExperienceCardData, grid:boolean, altGrid?:boolean}) {

    const pathname = usePathname();

    const description = getExperienceDescription(el.description)
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replaceAll("&nbsp;", " ");
    const tagIds = el.tagIds ?? [];

    return(
        <div className={`h-[348px] ${grid ? 'md:w-[calc(25%-12px)]' : altGrid ? 'md:w-[calc(33%-14px)]' : ''} border border-orange-500 rounded-xl text-black bg-[#F0F8FF]`}>
            <img className="rounded-t-xl w-full h-[136px] object-cover" width={200} height={100} src={el.imageUrl ? process.env.NEXT_PUBLIC_BASE_URL + el.imageUrl :`/images/experiences/violin1.webp`} alt="Immagine dell'esperienza"/>
            <div className="px-4 pt-4 pb-2">
                <h4 className="font-bold h-[32px]">
                    <span className="line-clamp-1">
                        {el.title}
                    </span>
                </h4>
                <div className="h-[104px]">
                    <p className="line-clamp-4 text-sm"
                    >
                        {description}
                    </p>
                </div>
                <div className={`w-full flex ${tagIds.includes(6) ? 'justify-end' : 'justify-between'} items-center`}>
                    {!tagIds.includes(6) && <p className="font-bold">da {
                        new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR"
                        }).format(el.cheapest ?? 0)
                    }</p>}
                    {tagIds.includes(6)
                        ? <Link
                             href={`/${pathname.includes('/en') ? 'en' : 'it'}/experiences/unique/${el.documentId}`}
                             className="text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full py-2 px-3">
                            {pathname.includes('/en') ? 'Discover' : 'Scopri'}
                            </Link>
                        : <a target="_blank" rel="noopener noreferrer"
                             href={`https://multishop-cremona.collaudo.domniapass.com/${pathname.includes('/en') ? 'en' : 'it'}/products/${el.slug}`}
                             className="text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full py-2 px-3">
                            {pathname.includes('/en') ? 'Discover' : 'Scopri'}
                        </a>
                    }
                </div>
            </div>
        </div>
    )
}
