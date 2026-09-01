import {getExperiences} from "@/app/_lib/domnia-experiences";
import SearchAllExperiences from "@/app/_components/SearchAllExperiences";

export default async function Experiences() {

    let contentExpImages;
    try {
        let dataExpImages = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/experiences-images?populate=*&locale=en',
            { next: { revalidate: 1000 }});
        contentExpImages = await dataExpImages.json();

    } catch(error) {
        console.log(error);
    }
    const pages = await getExperiences('/en/experiences', { locale: 'en' });
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
                <SearchAllExperiences pages={pages}/>
            </section>
        </>
    )
}
