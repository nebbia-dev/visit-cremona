'use client'
import {useEffect, useState} from "react";
import Filter from "@/app/_components/Filter";
import SingleExperienceCard from "@/app/_components/SingleExperienceCard";
import {useFilterStore} from "@/app/_stores/filter";
import type {ExperienceCardData, ProductResponse} from "@/app/_lib/domnia-types";

type FilteredExperience = ExperienceCardData & {
    products?: ProductResponse[];
};

export default function SearchAllExperiences({pages}:{pages:ExperienceCardData[]}) {
    const filters = useFilterStore((state) => state.filters);
    const [filteredExperiences, setFilteredExperiences] = useState<FilteredExperience[]>();
    useEffect(() => {
        setFilteredExperiences(pages)
    }, [pages])

    async function applyFilters() {

        let filtered: FilteredExperience[] = pages.slice();
        const datesFilter: FilteredExperience[] = [];

        switch(filters.type) {
            case 'unique':
                filtered = filtered.filter((el) => el.tagIds?.includes(6));
                break;
            case 'classic':
                filtered = filtered.filter((el) => el.tagIds?.includes(4));
                break;
            case 'contemp':
                filtered = filtered.filter((el) => el.tagIds?.includes(5));
                break;
        }

        switch(filters.category) {
            case 'cycling':
                filtered = filtered.filter((el) => el.tagIds?.includes(3));
                break;
            case 'luthiery':
                filtered = filtered.filter((el) => el.tagIds?.includes(2));
                break;
            default:
        }

        if(filters.start || filters.end) {
            try {
                const response = await fetch('/api/bb/products/salable', {
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error(`Products request failed with status ${response.status}`);
                }

                const products = (await response.json()) as ProductResponse[];

                filtered = filtered
                    .map((experience) => {
                        const connectedProducts = new Set(
                            (Array.isArray(experience.connectedProducts)
                                ? experience.connectedProducts
                                : []
                            ).map((productId) => productId.toString()),
                        );

                        return {
                            ...experience,
                            products: (Array.isArray(products) ? products : []).filter((product) => {
                                const productId = product.base_price?.product_id;

                                return (
                                    productId !== undefined &&
                                    connectedProducts.has(productId.toString())
                                );
                            }),
                        };
                    });

                console.log(filtered)

                    for(const experience of filtered) {
                        if(experience.products && experience.products.length > 0) {
                            const basePrice = experience.products[0].base_price;
                            const startDate = basePrice?.start_date
                                ? new Date(basePrice.start_date).getTime()
                                : Number.NaN;
                            const endDate = basePrice?.end_date
                                ? new Date(basePrice.end_date).getTime()
                                : Number.NaN;
                            const startFilter = filters.start?.getTime();
                            const endFilter = filters.end?.getTime();

                            if(startFilter !== undefined && endFilter === undefined) {
                                if(startDate >= startFilter) {
                                    datesFilter.push(experience);
                                } else if(startDate !== endDate && startDate < startFilter && endDate >= startFilter) {
                                    datesFilter.push(experience);
                                }
                            } else if(startFilter !== undefined && endFilter !== undefined) {
                                if(endDate >= startFilter && startDate <= endFilter) {
                                    datesFilter.push(experience);
                                }
                            }
                        }
                    }

                console.log(datesFilter)
            } catch (error) {
                console.error('Failed to fetch products for experience filters', error);
            }
        }

        if(datesFilter.length > 0) {
            setFilteredExperiences(datesFilter);
        } else {
            setFilteredExperiences(filtered);
        }

    }

    return (
        <div
            className="flex flex-col md:flex-row gap-20 w-[95vw] md:w-[80vw] mx-auto justify-center px-4 md:px-8 pt-20 pb-24">
            <div className="flex flex-col gap-2 w-full md:w-[40%]">
                <p className="text-sm"><span className="font-semibold">Home /</span> Esperienze</p>
                <h2 className="font-bold text-4xl my-8">Esperienze</h2>

                <Filter exp={true} search={applyFilters}/>

            </div>
            <div className="flex flex-wrap gap-4 w-full md:w-[60%]">
                {filteredExperiences
                    ? filteredExperiences.map((el) => {
                        return (
                            <SingleExperienceCard key={el.documentId} el={el} grid={false} altGrid={true}/>
                        )
                    })
                    : <div className="h-[300px] w-full flex items-center justify-center">Loading...</div>
                }
            </div>
        </div>
    )
}
