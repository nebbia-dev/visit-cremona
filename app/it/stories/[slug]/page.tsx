import Markdown from "react-markdown";
import SingleExperienceCard from "@/app/_components/SingleExperienceCard";
import {getExperiences} from "@/app/_lib/domnia-experiences";
import Link from "next/link";
export default async function Story({params}: { params: Promise<{ slug: string }> }) {

    let content, contentExpImages;
    const { slug } = await params;

    try {
        let data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/stories/'+ slug +'?populate=*',
            { next: { revalidate: 1000 }});
        content = await data.json();

        let dataExpImages = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/experiences-images?populate=*',
            { next: { revalidate: 1000 }});
        contentExpImages = await dataExpImages.json();
    } catch(error) {
        console.log(error);
    }

    const pages = await getExperiences(`/it/stories/${slug}`);
    for(const page of pages) {
        for(const pic of contentExpImages.data) {
            if(pic.slug === page.slug) {
                page.imageUrl = pic.image.url;
                break;
            }
        }
    }


    return(
        <>
        <section className="mt-[79px] fadein-slower">
            <div className="w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pt-20 pb-24">
                <p className="text-sm mb-10"><span
                    className="font-semibold"><Link href="/it">Home</Link> / <Link href="/it/stories">Stories</Link> /</span> {content.data.titolo}
                </p>

                <div className="flex flex-col md:flex-row gap-16">
                    <div className="w-full md:w-[40%] h-[600px]">
                        <img src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine.url} alt={content.data.immagine.alternativeText} width={200} height={600}
                        className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                    <div className="w-full md:w-[60%] markdown">
                        <h2 className="font-bold text-2xl mb-8">{content.data.titolo}</h2>
                        <Markdown>
                            {content.data.contenuto}
                        </Markdown>
                    </div>
                </div>
            </div>
        </section>
            <section className="w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pt-2 md:pt-8 pb-24">
                <h2 className="font-bold text-4xl mb-8">Esperienze correlate</h2>
                <div className="flex gap-4 flex-wrap">
                    {pages &&
                        pages.map(el => {
                            return(
                                <SingleExperienceCard el={el} grid={true} key={el.documentId}/>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}
