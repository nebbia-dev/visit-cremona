import TalesLogo from "@/app/_components/TalesLogo";
import Markdown from "react-markdown";
import Composers from "@/app/_components/Composers";
import AllExperiences from "@/app/_components/AllExperiences";
import DiscoverEventsSection from "@/app/_components/DiscoverEventsSection";
import {getExperiences} from "@/app/_lib/domnia-experiences";
import getEvents, {sortEventsByStartDate} from "@/app/_lib/edt-events";
import Downloads from "@/app/_components/Downloads";
import VideoPlayer from "@/app/_components/VideoPlayer";

export default async function Luthiery() {

    let content, contentExpImages;

    try {
        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/liuteria'+
            '?populate[0]=elements' +
            '&populate[1]=compositore_1' +
            '&populate[2]=compositore_1.immagine' +
            '&populate[3]=compositore_2' +
            '&populate[4]=compositore_2.immagine' +
            '&populate[5]=compositore_3' +
            '&populate[6]=compositore_3.immagine' +
            '&populate[7]=download_1' +
            '&populate[8]=download_1.download' +
            '&populate[9]=download_2' +
            '&populate[10]=download_2.download' +
            '&populate[11]=download_3' +
            '&populate[12]=download_3.download',
            { next: { revalidate: 1000 }});
        content = await data.json();

        let dataExpImages = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/experiences-images?populate=*',
            { next: { revalidate: 1000 }});
        contentExpImages = await dataExpImages.json();
    } catch(error) {
        console.log(error);
    }

    const pages = await getExperiences('/it/discover/luthiery');
    for(const page of pages) {
        for(const pic of contentExpImages.data) {
            if(pic.slug === page.slug) {
                page.imageUrl = pic.image.url;
                break;
            }
        }
    }

    const dataEvents = await getEvents('/it/discover/luthiery', {tag: '12'});
    const sortedEvents = sortEventsByStartDate(dataEvents.events ?? []);

    return (
        <>
            <section className="mt-[79px] fadein-slower">
                <div className="w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pt-20 pb-12 md:pb-24">
                    <p className="text-sm mb-20"><span className="font-semibold">Home / Scopri il territorio / </span>Musica e liuteria
                    </p>
                    <div
                        className="flex flex-col md:flex-row gap-20">

                        <div className="w-full md:w-2/4 h-auto">
                            <TalesLogo theme="luthiery"/>
                        </div>

                        <div className="flex flex-col gap-2 w-full md:w-2/4">
                            <p className="w-full mt-2 pl-1 whitespace-pre-line">
                                {content.data.elements.intro}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="flex flex-col md:flex-row gap-20 w-[90vw] md:w-[80vw] mx-auto justify-center px-4 md:px-8 pb-4">
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

                    <div id="luthieryVideo" className="flex w-full items-end md:w-2/4">
                        <VideoPlayer
                            title="Video di presentazione del progetto Tales of Luthiery"
                            src="https://www.youtube.com/embed/qZa1JT7oI2c?si=Xs8Yhbtzh8izTk8v"
                            height={315}
                            message="Per visualizzare questo video, accetta i cookie per i contenuti provenienti da piattaforme esterne."
                        />
                    </div>
                </div>
            </section>

            <section className="w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pt-8 pb-24">
                <h3 className="font-bold text-3xl my-8">Scopri il territorio  attraverso i principali personaggi della storia della musica</h3>

                <Composers info={content.data}/>
                <Downloads info={content.data}/>

            </section>

            <AllExperiences type='luthiery' pages={pages}/>

            <DiscoverEventsSection events={sortedEvents}/>

        </>
    )
}
