import TalesLogo from "@/app/_components/TalesLogo";
import Link from "next/link";
import Markdown from "react-markdown";
import AllExperiences from "@/app/_components/AllExperiences";
import DiscoverEventsSection from "@/app/_components/DiscoverEventsSection";
import {getExperiences} from "@/app/_lib/domnia-experiences";
import getEvents, {sortEventsByStartDate} from "@/app/_lib/edt-events";
import Downloads from "@/app/_components/Downloads";
import ConsentIframe from "@/app/_components/ConsentIframe";
import VideoPlayer from "@/app/_components/VideoPlayer";

type CyclingToursResponse = {
    data: Array<{
        documentId: string;
        id: number;
        link: string;
        ordine: number;
    }>;
};

export default async function Cycling() {
    let content, contentExpImages;
    let contentTours: CyclingToursResponse = { data: [] };

    try {
        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/cicloturismo'+
                '?populate[0]=elements'+
                '&populate[1]=elements.immagine' +
                '&populate[2]=download_1' +
                '&populate[3]=download_1.download' +
                '&populate[4]=download_2' +
                '&populate[5]=download_2.download' +
                '&populate[6]=download_3' +
                '&populate[7]=download_3.download' +
                '&locale=en',
            { next: { revalidate: 1000 }});
        content = await data.json();

        const dataTours = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/cycling-tours?locale=en',
            { next: { revalidate: 1000 }});
        contentTours = await dataTours.json();

        let dataExpImages = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/experiences-images?populate=*&locale=en',
            { next: { revalidate: 1000 }});
        contentExpImages = await dataExpImages.json();
    } catch(error) {
        console.log(error);
    }

    const pages = await getExperiences('/en/discover/cycling', { locale: 'en' });
    for(const page of pages) {
        for(const pic of contentExpImages.data) {
            if(pic.slug === page.slug) {
                page.imageUrl = pic.image.url;
                break;
            }
        }
    }

    const dataEvents = await getEvents('/en/discover/cycling', {
        lang: 'en',
        tag: '4',
    });
    const sortedEvents = sortEventsByStartDate(dataEvents.events ?? []);

    return (
        <>
            <section className="mt-[79px] fadein-slower">
                <div className="w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pt-20 pb-12 md:pb-24">
                    <p className="text-sm mb-20"><span className="font-semibold">Home / Discover the territory / </span>Cycle-tourism
                    </p>
                    <div
                        className="flex flex-col md:flex-row gap-20">

                        <div className="w-full h-auto md:w-2/4 ">
                            <TalesLogo theme="cycling"/>
                        </div>

                        <div className="flex flex-col gap-2 w-full md:w-2/4">
                            <p className="w-full mt-2 pl-1 markdown">
                            {content.data.elements.intro}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="flex flex-col md:flex-row gap-20 w-[95vw] md:w-[80vw] mx-auto justify-center px-4 md:px-8 pb-4">
                    <div className="flex flex-col gap-2 w-full md:w-2/4">
                        <h2 className="font-bold text-4xl">
                            {content.data.elements.titolo}
                        </h2>
                        <div className="w-full mt-4 pl-1 markdown">
                            <Markdown>
                                {content.data.elements.descrizione}
                            </Markdown>
                        </div>
                    </div>

                    <div className="flex w-full items-end md:w-2/4">
                        <VideoPlayer
                            title="Tales of Cycling presentation video"
                            src="https://www.youtube.com/embed/5PFbSF4gw4U?si=uky2Nd3dY5FiZFNj"
                            height={315}
                        />
                    </div>
                </div>
            </section>

            <section className="w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pt-8 pb-24">
                <ConsentIframe
                    title="Infinito Viaggiare route map"
                    src="https://www.komoot.com/it-it/collection/3284381/embed"
                    height={700}
                    message="To view this map, please accept cookies for content from external platforms."
                />

                <div className="flex md:flex-row flex-col gap-4 w-full mt-4">
                    {contentTours.data.map((el) => {
                        if(el.ordine > 3) return;
                        else {
                            return (
                                <ConsentIframe
                                    key={el.id}
                                    title="Route map"
                                    src={el.link}
                                    height={400}
                                    message="To view this map, please accept cookies for content from external platforms."
                                    className="w-full bg-white md:w-1/3"
                                    hideWhenBlocked
                                >
                                    <div className="w-full text-right py-3 px-4">
                                        <Link
                                            className="text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-3 py-2 text-sm"
                                            href={`/en/discover/cycling/${el.documentId}`}
                                        >
                                            Guarda l&apos;itinerario
                                        </Link>
                                    </div>
                                </ConsentIframe>
                            )
                        }
                    })}
                </div>

                <Downloads info={content.data}/>

            </section>

            <AllExperiences type='cycling' pages={pages}/>

            <section className="w-full bg-corpo-blue text-white">
                <div className="flex flex-col w-[95vw] md:w-[80vw] mx-auto px-4 md:px-8 pt-20 pb-20 md:pb-24">
                    <h2 className="font-bold text-3xl mb-8">Servizi utili al tuo itinerario in bici</h2>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="w-full md:w-2/4">
                            <img
                                className="rounded-xl w-full h-full object-cover"
                                src={process.env.NEXT_PUBLIC_BASE_URL + content.data.elements.immagine.url}
                                alt={content.data.elements.immagine.alternativeText} width={200} height={600}/>
                        </div>
                        <div className="w-full md:w-2/4">
                            <div className="rounded-xl border border-white p-4 w-fit mb-6">
                                <p><span
                                    className="font-semibold block pb-2">Vendita, noleggio e riparazione di biciclette</span>

                                    Se non hai la bici con te, la trovi qui. Puoi scegliere un modello tradizionale o a pedalata assistita e partire subito.
                                    Qui trovi anche l’elenco delle ciclofficine dove poter riparare il tuo mezzo a due ruote.
                                    Vedi l’elenco completo dei servizi per ciclismo e cicloturismo in provincia di Cremona:

                                    <Link href="/en/discover/cycling/rent"
                                          className="block font-bold text-corpo-orange underline pt-4">Click here &gt;</Link>
                                </p>
                            </div>

                            <div className="rounded-xl border border-white p-4 w-fit">
                                <p><span className="font-semibold block pb-2">Ricettività per il cicloturismo</span>
                                    Queste strutture offrono ai clienti uno spazio sicuro per le biciclette, attrezzi per la manutenzione di base e un’attenzione particolare per chi va sulle due ruote.
                                    Scopri la lista delle strutture bike-friendly presenti sul territorio:
                                    <Link href="/en/discover/cycling/bike-friendly"
                                          className="block font-bold text-corpo-orange underline pt-4">Click here &gt;</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <DiscoverEventsSection events={sortedEvents}/>

        </>
    )
}
