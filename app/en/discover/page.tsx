import LocalMap from "@/app/_components/LocalMap";
import TalesLogo from "@/app/_components/TalesLogo";
import Link from "next/link";
import AnimatedHoverButton from "@/app/_components/AnimatedHoverButton";
import FilteredExperiences from "@/app/_components/FilteredExperiences";
import {getExperiences} from "@/app/_lib/domnia-experiences";

export default async function Discover() {
    let content;

    try {
        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/discover?populate=*&locale=en',
            { next: { revalidate: 1000 }});
        content = await data.json();
    } catch(error) {
        console.log(error);
    }

    const pages = await getExperiences('/en/discover', { locale: 'en' });

    return(
        <>
            <section className="mt-[79px] bg-alt-blue fadein-slower">
                <div className="flex flex-col md:flex-row gap-20 w-[95vw] md:w-[80vw] mx-auto justify-center px-4 md:px-8 pt-20 pb-24 text-white">
                    <div className="flex flex-col gap-2 w-full md:w-2/4">
                        <p className="text-sm"><span className="font-semibold">Home /</span> Discover the region</p>
                        <h2 className="font-bold text-4xl mt-8">{content.data['titolo_1']}</h2>
                        <p className="w-full mt-2 pl-1 whitespace-pre-line">{content.data['testo_1']}</p>
                    </div>
                    <div className="w-full h-[500px] md:w-2/4 md:h-auto relative">
                        <img
                            className="absolute inset-0 h-full w-full object-cover object-center rounded-xl"
                            src={process.env.NEXT_PUBLIC_BASE_URL + content.data['immagine_1'].url}
                            alt={content.data['immagine_1'].alternativeText}
                        />
                    </div>
                </div>
            </section>

            <section className="flex flex-col md:flex-row gap-20 w-[95vw] md:w-[80vw] mx-auto justify-center px-4 md:px-8 pt-20 pb-24">
                <div className="w-full h-[500px] md:w-2/4 md:h-auto relative">
                    <img
                        className="absolute inset-0 h-full w-full object-cover object-center rounded-xl"
                        src={process.env.NEXT_PUBLIC_BASE_URL + content.data['immagine_2'].url}
                        alt={content.data['immagine_2'].alternativeText}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full md:w-2/4">
                    <h2 className="font-bold text-4xl mt-8">{content.data['titolo_2']}</h2>
                    <p className="w-full mt-2 pl-1 whitespace-pre-line">{content.data['testo_2']}</p>

                </div>
            </section>

            <section className="bg-alt-blue text-white">
                <div className="flex flex-col md:flex-row gap-12 w-[95vw] md:w-[80vw] mx-auto justify-center px-4 md:px-8 pt-20 pb-24">
                    <div className="flex flex-col gap-2 w-full md:w-2/4">
                        <h2 className="font-bold text-4xl mt-8">{content.data['titolo_3']}</h2>
                        <p className="w-full mt-2 pl-1 whitespace-pre-line">{content.data['testo_3']}</p>

                    </div>
                    <div className="w-full h-[500px] md:w-2/4 md:h-auto relative">
                        <img
                            className="absolute inset-0 h-full w-full object-cover object-center rounded-xl"
                            src={process.env.NEXT_PUBLIC_BASE_URL + content.data['immagine_3'].url}
                            alt={content.data['immagine_3'].alternativeText}
                        />
                    </div>
                </div>
            </section>

            <section>
                <div className="w-[95vw] md:w-[80vw] mx-auto px-4 md:px-8 pt-20 pb-24">
                    <h2 className="font-bold text-4xl mt-8">The Spirit of the Land</h2>
                    <p className="w-full mt-8 pl-1">
                        {content.data['anime_testo']}
                    </p>

                    <div className="mt-12 flex gap-4">
                        <Link href='#cycling' className="bg-[#918FC7] rounded-full px-4 py-3 text-sm">Cycle-tourism</Link>
                        <Link href='#luthiery' className="bg-sky-300 rounded-full px-4 py-3 text-sm">Music and luthiery</Link>
                    </div>

                    {/*Tales of Cycling*/}
                    <div id="cycling" aria-hidden={true} className="h-[80px]"></div>
                    <div className="mt-2 mb-8">
                        <TalesLogo theme="cycling"/>
                    </div>
                    <div className="flex gap-4">

                        <FilteredExperiences type='cycling' pages={pages} lang="en"/>

                        <div className="flex flex-col gap-2 ">
                            <div className="flex md:flex-row flex-col gap-2">
                                <div
                                    className="text-sm rounded-xl w-full md:w-[50%] h-fit md:h-[164px] bg-[#918FC7] py-8 md:py-4 px-8 flex items-center justify-center">
                                    {content.data['cycling_testo']}
                                </div>
                                <img className="object-cover rounded-xl w-full md:w-[50%] h-[164px]"
                                       src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine_mappa_cycling.url} alt={content.data.immagine_mappa_cycling.alternativeText} width={200} height={100}/>
                            </div>

                            <LocalMap homepage={false} autoFilter={1} pages={pages}/>

                            <div className="w-full text-right mt-4">
                                <Link href="/it/discover/cycling" className="font-bold underline relative">
                                    <AnimatedHoverButton content="Discover Tales of Cycling"/>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/*Tales of Luthiery*/}
                    <div id="luthiery" aria-hidden={true} className="h-[80px]"></div>
                    <div id="luthiery" className="mt-2 mb-8">
                        <TalesLogo theme="luthiery"/>
                    </div>
                    <div className="flex gap-4">

                        <FilteredExperiences type="luthiery" pages={pages}/>

                        <div className="flex flex-col gap-2 ">
                            <div className="flex md:flex-row flex-col gap-2">
                                <div
                                    className="text-sm rounded-xl w-full md:w-[50%] h-fit md:h-[164px] bg-sky-300 py-4 px-8 flex items-center justify-center">
                                    {content.data['luthiery_testo']}
                                </div>
                                <img className="object-cover rounded-xl w-full md:w-[50%] h-[164px]"
                                       src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine_mappa_luthiery.url} alt={content.data.immagine_mappa_luthiery.alternativeText} width={200} height={100}/>
                            </div>
                            <LocalMap homepage={false} autoFilter={2} pages={pages}/>
                            <div className="w-full text-right mt-4">
                                <Link href="/it/discover/luthiery" className="font-bold underline relative">
                                    <AnimatedHoverButton content="Discover Tales of Music and Luthiery"/>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
