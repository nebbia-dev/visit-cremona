import Markdown from "react-markdown";

export default async function Who() {
    let content;

    try {
        let data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/accessibility-declaration',
            { next: { revalidate: 1000 }});
        content = await data.json();
    } catch(error) {
        console.log(error);
    }

    return (
        <>
            <section className="w-[95vw] md:w-[80vw] mx-auto mt-[79px] px-4 md:px-8 pt-[69px] mb-[80px] fadein-slower">
                <h2 className="font-bold text-4xl">{content.data.titolo}</h2>
                <div className="w-full mt-8 pl-1 markdown">
                    <Markdown>
                        {content.data.contenuto}
                    </Markdown>
                </div>
                <br/>
                <p>Per segnalare un problema riguardante l'accessibilità, scrivi a <a
                    href="mailto:info.turismo@comune.cremona.it" className="underline">info.turismo@comune.cremona.it</a></p>
            </section>
        </>
    );
}
