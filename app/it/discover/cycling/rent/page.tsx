import InfoCard from "@/app/_components/InfoCard";

export default async function Rent() {

    let content;

    try {
        let data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/rents',
            { next: { revalidate: 1000 }});
        content = await data.json();
        console.log(content.data)
    } catch(error) {
        console.log(error);
    }

    return (
        <>
            <section className="mt-[79px] fadein-slower">
                <div className="w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pt-20 pb-24">
                    <p className="text-sm"><span className="font-semibold">Home / Scopri il territorio / Cicloturismo /</span> Strutture
                        per il noleggio
                    </p>
                    <h2 className="font-bold text-4xl mt-10 mb-8">Vendita, noleggio e riparazione di biciclette</h2>

                <div className="flex flex-col md:flex-row gap-4 flex-wrap">
                    {content.data.map((el:any) => {
                        return(
                            <InfoCard
                                key={el.nome}
                                name={el.nome}
                                type={el.tipo}
                                address={el.indirizzo}
                                phone={el.telefono}
                                email={el.email}
                                url={el.link}
                            >
                                {el.lun &&
                                    <div className="flex gap-4 w-full">
                                        <ul>
                                            <li>Lunedi</li>
                                            <li>Martedi</li>
                                            <li>Mercoledi</li>
                                            <li>Giovedi</li>
                                            <li>Venerdi</li>
                                            <li>Sabato</li>
                                            <li>Domenica</li>
                                        </ul>
                                        <ul className="w-full">
                                            <li className="text-ellipsis whitespace-nowrap overflow-x-auto">{el.lun}</li>
                                            <li className="text-ellipsis whitespace-nowrap overflow-x-auto">{el.mar}</li>
                                            <li className="text-ellipsis whitespace-nowrap overflow-x-auto">{el.mer} </li>
                                            <li className="text-ellipsis whitespace-nowrap overflow-x-auto">{el.gio}</li>
                                            <li className="text-ellipsis whitespace-nowrap overflow-x-auto">{el.ven}</li>
                                            <li className="text-ellipsis whitespace-nowrap overflow-x-auto">{el.sab}</li>
                                            <li className="text-ellipsis whitespace-nowrap overflow-x-auto">{el.dom}</li>
                                        </ul>
                                    </div>
                                }
                            </InfoCard>
                        )
                    })
                    }
                </div>
                </div>
            </section>
        </>
    )
}