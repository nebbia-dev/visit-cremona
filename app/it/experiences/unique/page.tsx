import {getExperiences} from "@/app/_lib/domnia-experiences";
import SearchTaggedExperiences from "@/app/_components/SearchTaggedExperiences";
import Link from "next/link";

export default async function UniqueExperiences() {

    let contentExpImages;
    try {
        let dataExpImages = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/experiences-images?populate=*',
            { next: { revalidate: 1000 }});
        contentExpImages = await dataExpImages.json();

    } catch(error) {
        console.log(error);
    }
    const pages = await getExperiences('/it/experiences/unique');
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
                        <p className="text-sm"><span className="font-semibold"><Link href="/it">Home</Link> / <Link href="/it/experiences">Esperienze</Link> /</span> Uniche</p>

                        <div className="flex flex-col md:flex-row gap-4 my-8">
                            <div className="w-full md:w-2/4">
                                <h2 className="font-bold text-4xl">Cosa significa <br/>
                                    <span className="pt-2 inline-block">Esperienze Uniche</span>
                                </h2>
                            </div>

                            <div className="w-full md:w-2/4 mt-12 md:mt-0">
                                <p><span className="font-semibold block pb-2">Proposte su misura</span>
                                    Se cerchi qualcosa di speciale, qui trovi il lato più autentico del territorio.
                                    Sono esperienze che uniscono storia e arte, musica e gastronomia, natura e paesaggio. Ogni proposta è pensata per farti entrare davvero nell’atmosfera cremonese, con dettagli curati e incontri autentici.
                                    Porti a casa un ricordo pieno, non solo una visita.

                                </p>
                            </div>
                        </div>

                    </div>

                    <SearchTaggedExperiences pages={pages} type='unique'/>
                </div>

            </section>
        </>
    )
}
