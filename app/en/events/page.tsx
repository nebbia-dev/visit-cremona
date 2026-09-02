import getEvents, {sortEventsByStartDate} from "@/app/_lib/edt-events";
import SearchAllEvents from "@/app/_components/SearchAllEvents";

export default async function Events() {

    const data = await getEvents('/en/events', {lang: 'en'});
    const sortedEvents = sortEventsByStartDate(data.events ?? []);

    return (
        <>
            <section className="mt-[79px] fadein-slower">
                <SearchAllEvents events={sortedEvents}/>
            </section>
        </>
    )
}
