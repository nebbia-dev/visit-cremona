'use client'
import {useEffect, useState} from "react";
import Filter from "@/app/_components/Filter";
import SingleExperienceCard from "@/app/_components/SingleExperienceCard";
import {useFilterStore} from "@/app/_stores/filter";
import type {ExperienceCardData} from "@/app/_lib/domnia-types";

type ExperienceType = "classic" | "contemporary" | "unique";

export default function SearchTaggedExperiences({pages, type}:{pages:ExperienceCardData[], type:ExperienceType}) {

    const filters = useFilterStore((state) => state.filters);
    const [filteredExperiences, setFilteredExperiences] = useState<ExperienceCardData[]>();

    let expToDisplay: number;
    switch(type) {
        case 'classic':
            expToDisplay = 4;
            break;
        case 'contemporary':
            expToDisplay = 5;
            break;
        case 'unique':
            expToDisplay = 6;
            break;
        default:
            expToDisplay = 1;
    }

    useEffect(() => {
        setFilteredExperiences(pages.filter((el) => el.tagIds?.includes(expToDisplay)))
    }, [expToDisplay, pages])

    function applyFilters() {

        let filtered = pages.slice();

        switch(filters.category) {
            case 'cycling':
                filtered = filtered.filter((el) => el.tagIds?.includes(3) && el.tagIds.includes(expToDisplay));
                break;
            case 'luthiery':
                filtered = filtered.filter((el) => el.tagIds?.includes(2) && el.tagIds.includes(expToDisplay));
                break;
            default:
        }

        // if(filters.start) {
        //     filtered = filtered.filter(el => new Date(el.base_price.start_date).getTime() >= new Date(filters.start).getTime());
        // }
        //
        // if(filters.end) {
        //     filtered = filtered.filter(el => new Date(el.base_price.end_date).getTime() <= new Date(filters.end).getTime());
        // }

        setFilteredExperiences(filtered);

    }

    return (
        <div className="flex flex-col md:flex-row gap-20 w-full">
            {type !== 'unique' && <Filter exp={false} search={applyFilters}/>}
            <div className="flex flex-wrap gap-4 w-full md:w-[60%]">
                {filteredExperiences &&
                    filteredExperiences.map((el, i: number) => {
                        if (i < 3) {
                            return (
                                <SingleExperienceCard key={el.documentId} el={el} grid={false} altGrid={true}/>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
