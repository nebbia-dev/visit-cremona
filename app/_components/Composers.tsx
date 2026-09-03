'use client'

import {useEffect} from "react";
import Markdown from "react-markdown";
import {Close} from "@/app/_components/_icons/Close";
import LocalMap from "@/app/_components/LocalMap";
import {ComposerLocation} from "@/app/_types/types";
import {useUsageStore} from "@/app/_stores/usage";

type Composer = {
    [key:string]: ComposerLocation[],
    'Claudio Monteverdi' : ComposerLocation[],
    'Amilcare Ponchielli' : ComposerLocation[],
    'Antonio Stradivari' : ComposerLocation[],
}

export default function Composers({info}: {info:any}) {
   const showModal = useUsageStore(state => state.showModal);
   const showModalBio = useUsageStore(state => state.showModalBio);

    function closeModal() {
        const composer = 'composer_' + showModal.text.toString();
        const composersList = document.getElementById('composersList')!;
        composersList.removeAttribute('inert');
        document.getElementById(composer)!.focus();
        showModalBio(0);
    }

    const composers:Composer = {
        'Claudio Monteverdi': [
            {
                name: 'Teatro Amilcare Ponchielli',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis sodales lectus at ultricies. Ut quis tellus at nunc dapibus venenatis. Nam ut blandit ex. Nunc ultrices cursus neque, at pellentesque est imperdiet a. Sed at porttitor massa. Maecenas tristique vestibulum sapien, at feugiat arcu tincidunt eget.',
                lat: 45.13261494172049,
                long: 10.019000483555224
            }
        ],
        'Amilcare Ponchielli': [
            {
                name: 'Casa Museo Paderno Ponchielli',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis sodales lectus at ultricies. Ut quis tellus at nunc dapibus venenatis. Nam ut blandit ex. Nunc ultrices cursus neque, at pellentesque est imperdiet a. Sed at porttitor massa. Maecenas tristique vestibulum sapien, at feugiat arcu tincidunt eget.',
                lat: 45.23906740340918,
                long: 9.928271781708482
            },
            {
                name: 'Chiesa di San Dalmazio',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis sodales lectus at ultricies. Ut quis tellus at nunc dapibus venenatis. Nam ut blandit ex. Nunc ultrices cursus neque, at pellentesque est imperdiet a. Sed at porttitor massa. Maecenas tristique vestibulum sapien, at feugiat arcu tincidunt eget.',
                lat: 45.23951930172695,
                long: 9.926311212396033
            }
        ],
        'Antonio Stradivari': [
            {
                name: 'Museo del Violino e Auditorium Giovanni Arvedi',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis sodales lectus at ultricies. Ut quis tellus at nunc dapibus venenatis. Nam ut blandit ex. Nunc ultrices cursus neque, at pellentesque est imperdiet a. Sed at porttitor massa. Maecenas tristique vestibulum sapien, at feugiat arcu tincidunt eget.',
                lat: 45.13164839881695,
                long: 10.02311602403172
            },
            {
                name: 'Casa Stradivari',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis sodales lectus at ultricies. Ut quis tellus at nunc dapibus venenatis. Nam ut blandit ex. Nunc ultrices cursus neque, at pellentesque est imperdiet a. Sed at porttitor massa. Maecenas tristique vestibulum sapien, at feugiat arcu tincidunt eget.',
                lat: 45.137579671586984,
                long: 10.019065724031977
            }
        ]
    }

    useEffect(() => {
        const mainMenu = document.getElementById('mainMenu');
        const downloads = document.getElementById('downloadsList');
        const luthieryMap = document.getElementById('luthieryMap');
        const allEvents = document.getElementById('allEvents');
        const allExperiences = document.getElementById('allExperiences');
        const luthieryVideo = document.getElementById('luthieryVideo');
        const composersList = document.getElementById('composersList');
        const header = document.getElementById('header');
        const footer = document.getElementById('footer');
        const iubenda = document.getElementById('iubenda');
        if(mainMenu && downloads && luthieryMap && allExperiences && allEvents
            && luthieryVideo && composersList && header && footer && iubenda)
            if(showModal.show) {
                mainMenu.setAttribute('inert', 'inert');
                header.setAttribute('inert', 'inert');
                footer.setAttribute('inert', 'inert');
                downloads.setAttribute('inert', 'inert');
                luthieryMap.setAttribute('inert', 'inert');
                allEvents.setAttribute('inert', 'inert');
                luthieryVideo.setAttribute('inert', 'inert');
                composersList.setAttribute('inert', 'inert');
                allExperiences.setAttribute('inert', 'inert');
                iubenda.setAttribute('inert', 'inert');
                document.getElementById('closeButton')!.focus();
            } else if(!showModal.show) {
                mainMenu.removeAttribute('inert');
                header.removeAttribute('inert');
                footer.removeAttribute('inert');
                downloads.removeAttribute('inert');
                luthieryMap.removeAttribute('inert');
                luthieryVideo.removeAttribute('inert');
                allEvents.removeAttribute('inert');
                allExperiences.removeAttribute('inert');
                iubenda.removeAttribute('inert');
            }
    }, [showModal.show])

    return (
        <>
            <div
                id="composersList" className="mb-4">
                <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-[2%]">

                    <li className="h-[500px] w-full md:w-[32%] relative">
                        <img width={300} height={300}
                             src={process.env.NEXT_PUBLIC_BASE_URL + info['compositore_3'][0].immagine.url}
                             alt={info['compositore_3'][0].immagine.alternativeText}
                             className="w-full h-full object-cover rounded-xl"
                        />
                        <div
                            className="rounded-xl absolute bg-corpo-blue text-white bottom-0 font-bold text-2xl py-4 px-4 h-[150px] w-full">
                            <h5>{info['compositore_3'][0]['nome']}</h5>
                            <div className="w-full text-right">
                                <button
                                    id="composer_3"
                                    className="absolute bottom-4 right-4 cursor-pointer font-medium text-sm text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-4 py-2"
                                    onClick={() => showModalBio(3)}
                                >Leggi
                                </button>
                            </div>
                        </div>
                    </li>

                    <li className="h-[500px] w-full md:w-[32%] relative">
                        <img width={300} height={300}
                             src={process.env.NEXT_PUBLIC_BASE_URL + info['compositore_1'][0].immagine.url}
                             alt={info['compositore_1'][0].immagine.alternativeText}
                             className="w-full h-full object-cover rounded-xl"
                        />
                        <div
                            className="rounded-xl absolute bg-corpo-blue text-white bottom-0 font-bold text-2xl py-4 px-4 h-[150px] w-full">
                            <h5>{info['compositore_1'][0]['nome']}</h5>
                            <div className="w-full text-right">
                                <button
                                    id="composer_1"
                                    className="absolute bottom-4 right-4 cursor-pointer font-medium text-sm text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-4 py-2"
                                    onClick={() => showModalBio(1)}
                                >Leggi
                                </button>
                            </div>
                        </div>
                    </li>

                    <li className="h-[500px] w-full md:w-[32%] relative">
                        <img width={300} height={300}
                             src={process.env.NEXT_PUBLIC_BASE_URL + info['compositore_2'][0].immagine.url}
                             alt={info['compositore_2'][0].immagine.alternativeText}
                             className="w-full h-full object-cover rounded-xl"
                        />
                        <div
                            className="rounded-xl absolute bg-corpo-blue text-white bottom-0 font-bold text-2xl py-4 px-4 h-[150px] w-full">
                            <h5>{info['compositore_2'][0]['nome']}</h5>
                            <div className="w-full text-right">
                                <button
                                    id="composer_2"
                                    className="absolute bottom-4 right-4 cursor-pointer font-medium text-sm text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-4 py-2"
                                    onClick={() => showModalBio(2)}
                                >Leggi
                                </button>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>

            {
                showModal.show &&
                <div
                    aria-label={`Modale con la biografia e i luoghi di ${info[`compositore_${showModal.text.toString()}`][0]['nome']}`}
                    role="dialog" aria-modal={true}
                    className="top-0 left-0 fixed z-20 w-screen h-screen bg-gray-500/25">
                    <div
                        className="pt-8 pb-12 pl-8 pr-2 shadow-md relative top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] bg-corpo-blue text-white rounded-xl w-[95%] md:w-2/4">
                        <div className="max-h-[516px] overflow-y-auto pr-6 relative">
                            <button onClick={closeModal} aria-label="Chiudi modale" id="closeButton" tabIndex={0}
                                    className="flex justify-end fixed right-8 bg-corpo-blue pb-2">
                                <Close aria-hidden={true} className="cursor-pointer"/>
                            </button>
                            <div className="markdown">
                                <Markdown>
                                    {info['compositore_' + showModal.text][0]['bio']}
                                </Markdown>
                            </div>
                            <LocalMap homepage={false} fullPage={true} composers={composers[info['compositore_' + showModal.text][0]['nome']]} />
                            </div>
                        </div>
                </div>
            }
        </>
    )
}