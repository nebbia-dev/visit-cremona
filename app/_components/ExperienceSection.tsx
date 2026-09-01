'use client'
import SingleExperienceCard from "@/app/_components/SingleExperienceCard";
import Link from "next/link";
import AnimatedHoverButton from "@/app/_components/AnimatedHoverButton";
import {usePathname} from "next/navigation";

export default function ExperienceSection({type, name, description, pages}:{type:string, name:string, description:string, pages:any}) {

    let expToDisplay;
    switch(type) {
        case 'classic':
            expToDisplay = 4;
            break;
        case 'contemporary':
            expToDisplay = 5;
            break;
        default:
            expToDisplay = 1;
    }

    const pathname = usePathname();

    return (
        <section className={`w-full ${type === 'classic' ? 'bg-pastel-yellow' : 'bg-pastel-orange'}`}>
            <div
                className="flex flex-col gap-16 w-[95vw] md:w-[80vw] mx-auto justify-center px-4 md:px-8 pb-24 pt-20">
                <div className="flex flex-col md:flex-row justify-between">
                    <h2 className="font-bold text-4xl w-full text-left break-title mb-8 md:mb-0">{name}</h2>
                    <p className="w-full md:max-w-[40vw]">{description}</p>
                </div>

                <div className="flex gap-4 md:justify-end flex-wrap">
                    { pages && expToDisplay &&
                        pages.filter((el:any) => el.tagIds.includes(expToDisplay)).map((el:any, i:number) => {
                            if (i < 3) {
                                return (
                                    <SingleExperienceCard key={el.documentId} el={el} grid={true}/>
                                )
                            }
                        })
                    }
                </div>

                <div className="w-full text-right mt-4">
                    <Link href={`/it/experiences/${type}`} className="font-bold underline relative">
                        <AnimatedHoverButton content={`${pathname.includes('/en') ? 'Go to' : 'Vai alle'} ${name}`}/>
                    </Link>
                </div>
            </div>
        </section>
    )
}
