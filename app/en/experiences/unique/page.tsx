import {getExperiences} from "@/app/_lib/domnia-experiences";
import SearchTaggedExperiences from "@/app/_components/SearchTaggedExperiences";

export default async function UniqueExperiences() {

    let contentExpImages;
    try {
        let dataExpImages = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/experiences-images?populate=*&locale=en',
            { next: { revalidate: 1000 }});
        contentExpImages = await dataExpImages.json();

    } catch(error) {
        console.log(error);
    }
    const pages = await getExperiences('/en/experiences/unique', { locale: 'en' });
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
                        <p className="text-sm"><span className="font-semibold">Home / Experiences /</span> Unique</p>

                        <div className="flex flex-col md:flex-row gap-4 my-8">
                            <div className="w-full md:w-2/4">
                                <h2 className="font-bold text-4xl">What Unique<br/>
                                    <span className="pt-2 inline-block">Experiences means</span>
                                </h2>
                            </div>

                            <div className="w-full md:w-2/4 mt-12 md:mt-0">
                                <p><span className="font-semibold block pb-2">Tailor-made proposals</span>
                                    If you’re looking for something special, here you’ll find the most authentic side of the region.
                                    These are experiences that combine history and art, music and gastronomy, nature and landscape.
                                    Each proposal is designed to truly immerse you in the Cremonese atmosphere, with attention to detail and authentic encounters.
                                    You’ll take home a lasting memory, not just a visit.

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
