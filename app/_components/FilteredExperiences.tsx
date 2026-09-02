import SingleExperienceCard from "@/app/_components/SingleExperienceCard";
import Link from "next/link";

export default function FilteredExperiences({type, pages, lang}:{type:string, pages:any, lang?:string}) {
    let expToDisplay;
    switch(type) {
        case 'luthiery':
            expToDisplay = 2;
            break;
        case 'cycling':
            expToDisplay = 3;
            break;
        default:
            expToDisplay = 1;
    }

    return (

        <div className="hidden md:flex flex-col gap-2">
            {pages &&
                pages.filter((el: any) => el.tagIds.includes(expToDisplay)).map((el: any, i: number) => {
                    if (i < 2) {
                        return (
                            <SingleExperienceCard key={el.documentId} el={el} grid={false}/>
                        )
                    }
                })
            }
            <div className="w-full text-sm p-4 text-center rounded-xl border border-orange-500">
                <Link href={`/${lang === 'en' ? 'en' : 'it'}/accessible-experiences`} className="underline">{lang === 'en' ? 'Discover all experiences' : 'Consulta tutte le esperienze'}</Link>
            </div>
        </div>
    )
}
