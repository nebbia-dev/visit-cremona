import {getExperiences} from "@/app/_lib/domnia-experiences";
import SearchTaggedExperiences from "@/app/_components/SearchTaggedExperiences";
import Link from "next/link";

export default async function ClassicExperiences() {

    let contentExpImages;
    try {
        let dataExpImages = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/experiences-images?populate=*&locale=en',
            { next: { revalidate: 1000 }});
        contentExpImages = await dataExpImages.json();

    } catch(error) {
        console.log(error);
    }
    const pages = await getExperiences('/en/experiences/classic', { locale: 'en' });
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
                        <p className="text-sm"><span className="font-semibold"><Link href="/en">Home</Link> / <Link href="/en/experiences">Experiences</Link> /</span> Classic</p>

                        <div className="flex flex-col md:flex-row gap-12 md:gap-20 my-8">
                            <div className="w-full md:w-[40%]">
                                <h2 className="font-bold text-4xl break-title">Classic Experiences</h2>
                            </div>

                            <div className="w-full md:w-[60%] pl-2">
                                <p>
                                    <span className="font-semibold block pb-2">Guaranteed departure tours</span>
                                    Do you want to discover the soul of Cremona? Start with its most iconic sites.
                                    Visit the main monuments and museums, step inside the city’s palaces and historic residences. Discover the music and violin-making that have made Cremona famous throughout the world.
                                    Guided tours are available all year round and take you on an unmissable journey, at a pace suitable for everyone.
                                </p>
                            </div>
                        </div>

                    </div>

                    <SearchTaggedExperiences pages={pages} type='classic'/>
                </div>

            </section>
        </>
    )
}
