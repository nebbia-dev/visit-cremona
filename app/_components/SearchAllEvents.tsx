'use client'
import {useEffect, useState} from "react";
import {useFilterStore} from "@/app/_stores/filter";
import FilterEvents from "@/app/_components/FilterEvents";
import Event from "@/app/_components/Event";
import type {EdtEvent} from "@/app/lib/edt-events";

function getTimestamp(value?: string) {
    return value ? new Date(value).getTime() : Number.NaN;
}

export default function SearchAllEvents({events}:{events:EdtEvent[]}) {
    const filters = useFilterStore((state) => state.filters);
    const [filteredEvents, setFilteredEvents] = useState<EdtEvent[]>();
    useEffect(() => {
        const filtered = events.filter(
            (event) => Date.now() < getTimestamp(event.dates?.endDate),
        );
        setFilteredEvents(filtered)
    }, [events])

    function applyFilters() {

        let filtered = events.slice();
        const startFilter = filters.start?.getTime();
        const endFilter = filters.end?.getTime();

        if(startFilter !== undefined) {
                filtered = events.filter(event => {
                    const startDate = getTimestamp(event.dates?.startDate);
                    const endDate = getTimestamp(event.dates?.endDate);

                    if(startDate === endDate) {
                        return startDate >= startFilter
                    } else {
                        return endDate >= startFilter;
                    }
                });
        }

        if(startFilter !== undefined && endFilter !== undefined) {
            filtered = filtered.filter(event => {
                return getTimestamp(event.dates?.startDate) <= endFilter;
            });
        } else if (endFilter !== undefined) {
                filtered = events.filter(event => {
                    const startDate = getTimestamp(event.dates?.startDate);
                    const endDate = getTimestamp(event.dates?.endDate);

                    if(startDate === endDate) {
                        return endDate <= endFilter
                    } else {
                        return startDate <= endFilter;
                    }
                });
        }

        setFilteredEvents(filtered);
    }

    return (
        <div
            className="flex flex-col gap-20 w-[95vw] md:w-[80vw] mx-auto justify-center px-4 md:px-8 pt-20 pb-24">
            <div className="flex flex-col gap-2 w-full">
                <p className="text-sm"><span className="font-semibold">Home /</span> Eventi</p>
                <h2 className="font-bold text-4xl my-8">Eventi</h2>

                <FilterEvents search={applyFilters}/>

            </div>
            <div className="flex flex-wrap gap-4 w-full">
                {filteredEvents
                    ? filteredEvents.map((el) => {
                        return (
                            <Event key={el.identifier} event={el}/>
                        )
                    })
                    : <div className="h-[300px] w-full flex items-center justify-center">Loading...</div>
                }
            </div>
        </div>
    )
}
