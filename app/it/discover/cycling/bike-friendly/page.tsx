import InfoCard from "@/app/_components/InfoCard";

export default async function BikeFriendly() {

    let content;

    try {
        let data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/bike-friendlies',
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
                        Bike-friendly
                    </p>
                    <h2 className="font-bold text-4xl mt-10 mb-8">Strutture Bike-friendly</h2>


                    <div className="flex gap-4 flex-wrap">
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
                                />
                            )
                        })}
                    </div>
                </div>
            </section>

        </>
    )
}