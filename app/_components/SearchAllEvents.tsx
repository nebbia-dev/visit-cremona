'use client'
import {useEffect, useState} from "react";
import {useFilterStore} from "@/app/_stores/filter";
import FilterEvents from "@/app/_components/FilterEvents";
import Event from "@/app/_components/Event";
import type {EdtEvent} from "@/app/_lib/edt-events";
import {usePathname} from "next/navigation";
import Link from "next/link";

function getTimestamp(value?: string) {
    return value ? new Date(value).getTime() : Number.NaN;
}

function getStartOfDayTimestamp(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    return startOfDay.getTime();
}

function getEndOfDayTimestamp(date: Date) {
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return endOfDay.getTime();
}

export default function SearchAllEvents({events}:{events:EdtEvent[]}) {

    const pathname = usePathname();
    const locale = pathname.startsWith('/en') ? 'en' : 'it';

    const filters = useFilterStore((state) => state.filters);
    const [filteredEvents, setFilteredEvents] = useState<EdtEvent[]>();
    useEffect(() => {
        const filtered = events.filter((event) => {
            const eventEnd = getTimestamp(
                event.dates?.endDate ?? event.dates?.startDate,
            );

            return !Number.isNaN(eventEnd) && Date.now() <= eventEnd;
        });
        setFilteredEvents(filtered)
    }, [events])

    function applyFilters() {

        const startFilter = filters.start
            ? getStartOfDayTimestamp(filters.start)
            : undefined;
        const endFilter = filters.end
            ? getEndOfDayTimestamp(filters.end)
            : undefined;

        const filtered = events.filter((event) => {
            const eventStart = getTimestamp(event.dates?.startDate);
            const parsedEventEnd = getTimestamp(event.dates?.endDate);
            const eventEnd = Number.isNaN(parsedEventEnd)
                ? eventStart
                : parsedEventEnd;

            if (Number.isNaN(eventStart)) {
                return false;
            }

            if (startFilter !== undefined && eventEnd < startFilter) {
                return false;
            }

            if (endFilter !== undefined && eventStart > endFilter) {
                return false;
            }

            return true;
        });

        setFilteredEvents(filtered);
    }

    return (
        <div
            className="flex flex-col gap-20 w-[95vw] md:w-[80vw] mx-auto justify-center px-4 md:px-8 pt-20 pb-24">
            <div className="flex flex-col gap-2 w-full">
                <p className="text-sm"><span className="font-semibold"><Link href={pathname.includes('/en') ? '/en' : '/it'}>Home</Link> /</span> {pathname.includes('/en') ? 'Events' : 'Eventi'}</p>
                <h2 className="font-bold text-4xl my-8">{pathname.includes('/en') ? 'Events' : 'Eventi'}</h2>

                <FilterEvents search={applyFilters}/>

            </div>
            <div className="flex flex-wrap gap-4 w-full">
                {filteredEvents
                    ? filteredEvents.map((el) => {
                        return (
                            <Event key={el.identifier} event={el} locale={locale}/>
                        )
                    })
                    : <div className="h-[300px] w-full flex items-center justify-center">Loading...</div>
                }
            </div>
        </div>
    )
}
