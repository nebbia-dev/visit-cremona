'use client'
import SingleExperienceCard from "@/app/_components/SingleExperienceCard";
import {usePathname} from "next/navigation";
export default function AllExperiences({type, pages}:{type:string, pages:any}) {

    const pathname = usePathname();

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
        <section id="allExperiences" className="w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pb-24">
            <h2 className="font-bold text-4xl mt-8 mb-16">{pathname.includes('/en') ? 'All experiences' : 'Tutte le esperienze'}</h2>
            <div className="flex gap-4 flex-wrap">
                {pages &&
                    pages.filter((el: any) => el.tagIds.includes(expToDisplay)).map((el: any, i: number) => {
                        if (i < 3) {
                            return (
                                <SingleExperienceCard key={el.documentId} el={el} grid={false} altGrid={true}/>
                            )
                        }
                    })
                }
            </div>
        </section>
    )
}