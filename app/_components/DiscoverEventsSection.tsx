'use client'

import {useState} from "react";
import Event from "@/app/_components/Event";
import {usePathname} from "next/navigation";

type DiscoverEvent = {
    dates?: {
        endDate?: string;
    };
    identifier?: string;
    [key: string]: unknown;
};

const INITIAL_VISIBLE_EVENTS = 3;

export default function DiscoverEventsSection({events}:{events: DiscoverEvent[]}) {

    const pathname = usePathname();
    const locale = pathname.startsWith('/en') ? 'en' : 'it';

    const [showAllEvents, setShowAllEvents] = useState(false);

    const upcomingEvents = events.filter((event) => {
        const endDate = event.dates?.endDate;

        if (!endDate) {
            return true;
        }

        return (new Date()).getTime() <= (new Date(endDate)).getTime();
    });

    if (upcomingEvents.length === 0) {
        return null;
    }

    const visibleEvents = showAllEvents
        ? upcomingEvents
        : upcomingEvents.slice(0, INITIAL_VISIBLE_EVENTS);

    return (
        <section id="allEvents" className="w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pt-16 pb-24">
            <h2 className="font-bold text-4xl mt-8 mb-16">{pathname.includes('/en') ? 'All events' : 'Tutti gli eventi'}</h2>
            <div className="flex gap-4 flex-wrap">
                {visibleEvents.map((event, index) => (
                    <Event key={event.identifier ?? index} event={event} locale={locale}/>
                ))}

                {!showAllEvents && upcomingEvents.length > INITIAL_VISIBLE_EVENTS &&
                    <div className="w-full flex justify-center">
                        <button
                            type="button"
                            onClick={() => setShowAllEvents(true)}
                            className="cursor-pointer mt-4 text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-4 py-3"
                        >
                            {pathname.includes('/en') ? 'Discover all events' : 'Visualizza tutti gli eventi'}

                        </button>
                    </div>
                }

                {showAllEvents && upcomingEvents.length > INITIAL_VISIBLE_EVENTS &&
                    <div className="w-full flex justify-center">
                        <button
                            type="button"
                            onClick={() => setShowAllEvents(false)}
                            className="cursor-pointer mt-4 text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-4 py-3"
                        >
                            {pathname.includes('/en') ? 'Show less' : 'Mostra meno'}

                        </button>
                    </div>
                }
            </div>
        </section>
    )
}
