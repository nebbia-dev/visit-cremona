import LinkCard from "@/app/_components/LinkCard";

export default async function Press() {

    let content, contentRef, referral;

    try {
        let data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/area-presses?populate=*',
            { next: { revalidate: 1000 }});
        content = await data.json();

        let dataRef = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/referrals/',
            { next: { revalidate: 1000 }});
        contentRef = await dataRef.json();

        referral = contentRef.data.filter((el: {area?: string}) => el.area === 'press')[0];

    } catch(error) {
        console.log(error);
    }

    return (
        <section
            className="w-[95vw] md:w-[80vw] mx-auto mt-[79px] px-4 md:px-0 pt-[69px] mb-[80px] flex flex-col md:flex-row gap-16 fadein-slower">
            <div className="flex flex-col w-full">
                <div className="flex gap-8 mb-20">
                    <h2 className="font-semibold">Referente Area Stampa</h2>
                    <div>
                        <p className="font-semibold">{referral.nome}</p>
                        <p>{referral.titolo}</p>
                        <a href={`mailto:${referral.email}`} className="underline">{referral.email}</a>
                    </div>
                </div>
                <div className="flex gap-4 flex-wrap">
                    {content.data.map((el:any) => {
                        return(
                            <LinkCard
                                key={el.nome}
                                title={el.nome}
                                url={process.env.NEXT_PUBLIC_BASE_URL + el.download.url}
                                description={el.descrizione}
                                download={true}/>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
