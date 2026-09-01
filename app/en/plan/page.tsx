import InfoCard from "@/app/_components/InfoCard";
import Markdown from "react-markdown";
import Routes from "@/app/_components/Routes";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {Plus} from "@/app/_components/_icons/Plus";

export default async function Plan() {

    let content, contentInfo;

    try {
        let data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/plan/?locale=en',
            { next: { revalidate: 1000 }});
        let dataInfo = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/infopoints/?locale=en',
            { next: { revalidate: 1000 }});
        content = await data.json();
        contentInfo = await dataInfo.json();

    } catch(error) {
        console.log(error);
    }

    return(
        <>
            <div className="w-[95vw] md:w-[80vw] mx-auto mt-[79px] px-4 md:px-0 pt-[69px] mb-12 fadein-slower">
                <h1 className="font-bold text-4xl mt-8">Pianifica il tuo viaggio</h1>
            </div>

            {/*auto*/}
            <section
                className="w-[95vw] md:w-[80vw] mx-auto px-4 md:px-0 flex flex-col fadein-slower mb-20">
                <Accordion sx={{backgroundColor: 'transparent', boxShadow: 'none', borderBottom: '1px solid #000'}}>
                    <AccordionSummary
                        expandIcon={<Plus/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <div className="flex gap-4 items-center my-4">
                            <div className="w-12">
                                <img
                                    src='/icons/by-car.svg' alt="icona automobile" width={64} height={64}
                                    className="w-full"
                                />
                            </div>
                            <h2 className="font-bold text-2xl">In auto</h2>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Routes/>
                        <div className="w-full text-right mt-8 mb-4">
                            <a href="https://www.google.com/maps/dir//Cremona,+26100+CR/@45.6574975,9.9627623,7z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x4780fe6d3c71fe83:0x307737e7e74bdaf5!2m2!1d10.0227044!2d45.1333135?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoASAFQAw%3D%3D"
                               className="cursor-pointer mt-4 w-full text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-4 py-3"
                               target="_blank" rel="noopener noreferrer"
                            >Ottieni indicazioni &gt;</a>
                        </div>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={{backgroundColor: 'transparent', boxShadow: 'none', borderBottom: '1px solid #000'}}>
                    <AccordionSummary
                        expandIcon={<Plus/>}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <div className="flex gap-4 items-center my-4">
                            <div className="w-12">
                                <img
                                    src='/icons/by-plane.svg' alt="icona aereo" width={64} height={64}
                                    className="w-full"
                                />
                            </div>
                            <h2 className="font-bold text-2xl">In aereo</h2>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="markdown">
                            <Markdown>
                                {content.data.aereo}
                            </Markdown>
                        </div>
                    </AccordionDetails>
                </Accordion>

                {content.data.shuttle && <Accordion sx={{backgroundColor: 'transparent', boxShadow: 'none', borderBottom: '1px solid #000'}}>
                    <AccordionSummary
                        expandIcon={<Plus/>}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <div className="flex gap-4 items-center my-2">
                            <div className="w-12">
                                <img
                                    src='/icons/highway.svg' alt="icona autodtrada" width={64} height={64}
                                    className="w-full"
                                />
                            </div>
                            <h2 className="font-bold text-2xl">Transfer autostradale</h2>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="markdown">
                            <Markdown>
                                {content.data.shuttle}
                            </Markdown>
                        </div>
                        <div className="w-full text-end mb-4">
                            <a href="https://autostradale.it/i-nostri-servizi/transfer-aeroportuali/cremona-bergamo-orio-al-serio/"
                               target="_blank" rel="noopener noreferrer"
                               className="w-[164px] cursor-pointer font-medium text-base px-3 py-3 text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full text-center"
                            >
                                Vai al sito &gt;
                            </a>
                        </div>
                    </AccordionDetails>
                </Accordion>}

                <Accordion sx={{backgroundColor: 'transparent', boxShadow: 'none', borderBottom: '1px solid #000'}}>
                    <AccordionSummary
                        expandIcon={<Plus/>}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <div className="flex gap-4 items-center my-4">
                            <div className="w-12">
                                <img
                                    src='/icons/by-bus.svg' alt="icona bus" width={64} height={64}
                                    className="w-full"
                                />
                            </div>
                            <h2 className="font-bold text-2xl">In autobus</h2>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="markdown">
                            <Markdown>
                                {content.data.bus}
                            </Markdown>
                        </div>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={{backgroundColor: 'transparent', boxShadow: 'none', borderBottom: '1px solid #000'}}>
                    <AccordionSummary
                        expandIcon={<Plus/>}
                        aria-controls="panel4-content"
                        id="panel4-header"
                    >
                        <div className="flex gap-4 items-center my-2">
                            <div className="w-12">
                                <img
                                    src='/icons/info.svg' alt="icona info" width={64} height={64}
                                    className="w-full"
                                />
                            </div>
                            <h2 className="font-bold text-2xl">Infopoint</h2>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="flex gap-4 flex-wrap w-full">
                            {contentInfo.data.map((el: any) => {
                                return (
                                    <InfoCard
                                        key={el.nome}
                                        name={el.nome}
                                        address={el.indirizzo}
                                        phone={el.telefono}
                                        email={el.email}
                                        hours={el.orari}
                                        url={el.link}
                                    >
                                    </InfoCard>
                                )
                            })}
                        </div>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                    <AccordionSummary
                        expandIcon={<Plus/>}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <div className="flex gap-4 items-center my-4">
                            <div className="w-12">
                                <img
                                    src='/icons/where-sleep.svg' alt="icona bus" width={64} height={64}
                                    className="w-full"
                                />
                            </div>
                            <h2 className="font-bold text-2xl">Dove dormire</h2>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="p-4 w-fit">
                            <p>Per consultare tutte le strutture dove dormire clicca al seguente <a target="_blank" rel="noopener noreferrer" href="https://www.turismocremona.it/it/dove-dormire"
                                   className="underline">link</a>
                            </p>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </section>
        </>
    )
}
