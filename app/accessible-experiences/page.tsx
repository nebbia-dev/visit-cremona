import {getExperiences} from "@/app/lib/domnia-experiences";
import Image from "next/image";
import {getExperienceDescription} from "@/app/lib/domnia-types";

export default async function AccessibleExperiences() {
    let contentExpImages;
    try {

        let dataExpImages = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/experiences-images?populate=*',
            { next: { revalidate: 1000 }});
        contentExpImages = await dataExpImages.json();

    } catch(error) {
        console.log(error);
    }

    const pages = await getExperiences('/');
    for(const page of pages) {
        for(const pic of contentExpImages.data) {
            if(pic.slug === page.slug) {
                page.imageUrl = pic.image.url;
                break;
            }
        }
    }

    function setTags(id:number) {
        switch(id) {
            case 4:
                return 'Classiche';
            case 5:
                return 'Contemporanee'
            case 6:
                return 'Uniche';
            case 2:
                return 'Musica e liuteria';
            case 3:
                return 'Cicloturismo';
            case 1:
                return 'Musei';
            default:
                return '';
        }
    }

    return(
        <div className="mt-[109px] mb-[79px] w-[80%] mx-auto">
            {pages && pages.map(el => {
                if(el.title?.includes('Card')) {
                    return;
                }
                const tagIds = el.tagIds ?? [];
                    return (
                    <div className="mt-12" key={el.documentId}>
                        <Image className="rounded-xl w-full h-[136px] object-cover" width={200} height={100}
                               src={el.imageUrl ? process.env.NEXT_PUBLIC_BASE_URL + el.imageUrl : `/images/experiences/violin1.webp`}
                               alt="Immagine dell'esperienza"/>
                        <div className="px-4 pt-4 pb-2">
                            <h4 className="font-bold h-[32px] mt-2">{el.title}</h4>
                            <div>
                                <p className="text-sm">
                                    {getExperienceDescription(el.description).replace(/<\/?[^>]+(>|$)/g, "").replaceAll('&nbsp;', ' ')}
                                </p>
                            </div>
                            <div
                                className="w-full flex justify-between items-center mt-4 text-sm">
                                {tagIds.length > 0 &&
                                    <div className="flex items-center gap-4">
                                        <p>Tag: </p>
                                        <ul className="flex items-center gap-1">
                                            {
                                                tagIds.map(id => {
                                                    return (
                                                        <li key={el.documentId + '_' + id}>
                                                            | {setTags(id)}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                }
                                <a target="_blank" rel="noopener noreferrer"
                                   href={`https://multishop-cremona.collaudo.domniapass.com/it/products/${el.slug}`}
                                   className="text-sm text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full py-2 px-3">
                                    Scopri</a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
