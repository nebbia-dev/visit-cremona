import Link from "next/link";
import TalesLogo from "@/app/_components/TalesLogo";

export default async function Story({params}: { params: Promise<{ id: string }> }) {

    let content;

    try {
        const { id } = await params;
        let data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/cycling-tours/'+ id +'?populate=*&locale=en',
            { next: { revalidate: 1000 }});
        content = await data.json();
        console.log(content)
    } catch(error) {
        console.log(error);
    }

    return (
        <>
            <section className="mt-[79px] fadein-slower">
                <div className="w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pt-20 pb-24">
                    <p className="text-sm mb-20"><span className="font-semibold">Home / Discover the region / </span>Cycle-tourism
                    </p>

                        <div className="w-full h-auto md:w-2/4 mb-12">
                            <TalesLogo theme="cycling"/>
                        </div>

                    <iframe
                        title="Mappa del percorso"
                        src={content.data.link + '&profile=1'}
                        width="100%" height="800" frameBorder="0" scrolling="no">
                    </iframe>
                </div>
            </section>

            {(content.data.distanza && content.data.difficolta && content.data.durata && content.data.dislivello_positivo && content.data.dislivello_negativo)
                &&
                <section className="w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pt-4 md:pt-16 pb-24">
                    <h2 className="font-bold text-4xl mb-8">Caratteristiche del percorso</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="rounded-xl bg-[#918FC7] text-white p-4 w-full md:w-1/5 h-[150px] relative">
                            <h3 className="font-semibold text-lg">Durata</h3>
                            <p className="text-3xl w-full text-right absolute bottom-4 right-4">{content.data.durata}</p>
                        </div>

                        <div className="rounded-xl bg-[#918FC7] text-white p-4 w-full md:w-1/5 h-[150px] relative">
                            <h3 className="font-semibold text-lg">Distanza</h3>
                            <p className="text-3xl w-full text-right absolute bottom-4 right-4">{content.data.distanza} km</p>
                        </div>

                        <div className="rounded-xl bg-[#918FC7] text-white p-4 w-full md:w-1/5 h-[150px] relative">
                            <h3 className="font-semibold text-lg">Dislivello positivo</h3>
                            <p className="text-3xl w-full text-right absolute bottom-4 right-4">{content.data.dislivello_positivo} m</p>
                        </div>

                        <div className="rounded-xl bg-[#918FC7] text-white p-4 w-full md:w-1/5 h-[150px] relative">
                            <h3 className="font-semibold text-lg">Dislivello negativo</h3>
                            <p className="text-3xl w-full text-right absolute bottom-4 right-4">{content.data.dislivello_negativo} m</p>
                        </div>

                        <div className="rounded-xl bg-[#918FC7] text-white p-4 w-full md:w-1/5 h-[150px] relative">
                            <h3 className="font-semibold text-lg">Difficoltà</h3>
                            <p className="text-3xl w-full text-right absolute bottom-4 right-4">{content.data.difficolta}</p>
                        </div>
                    </div>
                </section>
            }

            {content.data.related.length > 0 &&
                <section className="w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pt-4 md:pt-16 pb-24">
                    <h2 className="font-bold text-4xl mb-8">Itinerari correlati</h2>
                    <div className="flex flex-col md:flex-row gap-4 w-full mt-4">

                        {content.data.related.map((el: any) => {
                                return (
                                    <div className="w-full md:w-1/3 bg-white" key={el.id}>
                                        <iframe
                                            title="Mappa del percorso"
                                            src={el.link}
                                            width="100%" height="200" frameBorder="0" scrolling="no"></iframe>
                                        <div className="w-full text-right py-3 px-4">
                                            <Link
                                                className="text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-3 py-2 text-sm"
                                                href={`/it/discover/cycling/${el.documentId}`}
                                            >
                                                Guarda l'itinerario
                                            </Link>
                                        </div>
                                    </div>
                                )
                        })}

                    </div>

                </section>
            }
        </>
    )
}
