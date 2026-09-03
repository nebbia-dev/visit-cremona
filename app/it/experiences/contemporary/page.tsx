import {getExperiences} from "@/app/_lib/domnia-experiences";
import SearchTaggedExperiences from "@/app/_components/SearchTaggedExperiences";

export default async function ContemporaryExperiences() {

    let contentExpImages;
    try {
        let dataExpImages = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/experiences-images?populate=*',
            { next: { revalidate: 1000 }});
        contentExpImages = await dataExpImages.json();

    } catch(error) {
        console.log(error);
    }
    const pages = await getExperiences('/it/experiences/contemporary');
    for(const page of pages) {
        for(const pic of contentExpImages.data) {
            if(pic.slug === page.slug) {
                page.imageUrl = pic.image.url;
                break;
            }
        }
    }

    return (
        <>
            <section className="mt-[79px] fadein-slower">
                <div
                    className="flex flex-col gap-12 md:gap-20 w-[95vw] md:w-[80vw] mx-auto justify-center px-4 md:px-8 pt-20 pb-24">
                    <div className="flex flex-col gap-4 w-full">
                        <p className="text-sm"><span className="font-semibold">Home / Esperienze /</span> Contemporanee</p>

                        <div className="flex flex-col md:flex-row gap-12 md:gap-20 my-8">
                            <div className="w-full md:w-[40%]">
                                <h2 className="font-bold text-4xl break-title">Esperienze Contemporanee</h2>
                            </div>

                            <div className="w-full md:w-[60%] pl-2">
                                <p><span className="font-semibold block pb-2">Proposte tematiche a prenotazione</span>
                                    Scopri Cremona e il suo territorio attraverso esperienze curiose e particolari.
                                    Scegli tra degustazioni, visite tematiche, itinerari in bici o in barca, incontri con artigiani e luoghi meno noti.
                                    Le attività sono organizzate in date precise, consultabili in calendario.
                                    Scegli quella che fa per te, prenoti e vivi l’esperienza.
                                </p>
                            </div>
                        </div>

                    </div>

                    <SearchTaggedExperiences pages={pages} type='contemporary'/>
                </div>

            </section>
        </>
    )
}
