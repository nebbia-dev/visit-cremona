import ContactForm from "@/app/_components/ContactForm";

export default async function Contacts() {
    let content;

    try {
        let data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/contact',
            { next: { revalidate: 1000 }});
        content = await data.json();
    } catch(error) {
        console.log(error)
    }

    return (
        <>
            <section className="w-[95vw] md:w-[80vw] mx-auto mt-[79px] px-4 md:px-0 pt-[69px] mb-[80px] flex flex-col md:flex-row gap-16 fadein-slower">
                <div className="w-full md:w-2/4">
                    <h2 className="font-bold text-4xl">Contatti</h2>
                    <p className="w-full mt-8 pl-1">Comune di Cremona</p>
                    <p className="w-full pl-1">{content.data.indirizzo}</p>
                    {/*<p className="w-full mt-8 pl-1">Email: <a className="underline" href={`mailto:${content.data.email}`}>{content.data.email}</a></p>*/}
                    <p className="w-full pl-1 mt-3">Telefono: <a className="underline"
                                                            href={`tel:${content.data.telefono.split(' ').join('')}`}>{content.data.telefono}</a>
                    </p>
                    <p className="w-full pl-1">PEC: {content.data.pec}</p>
                </div>
                <div className="w-full md:w-2/4">
                <h2 className="font-bold text-4xl">Hai bisogno di più info?</h2>
                    <ContactForm newsletter={false}/>
                </div>
            </section>
        </>
    );
}
