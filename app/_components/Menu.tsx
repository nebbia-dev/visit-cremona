'use client'
import Link from "next/link";
import {Hamburger} from "@/app/_components/_icons/Hamburger";
import {type FocusEvent, useEffect, useState} from "react";
import {Close} from "@/app/_components/_icons/Close";
import {useUsageStore} from "@/app/_stores/usage";
import {Usage} from "@/app/_types/types";
import {usePathname} from "next/navigation";

export default function Menu({links, lang} : {links:any, lang?:string}) {

    const pathname = usePathname();

    const showModal = useUsageStore((state:Usage) => state.showModal);
    const showModalBio = useUsageStore((state:Usage) => state.showModalBio);
    const showMenu = useUsageStore((state:Usage) => state.showMenu);
    const setShowMenu = useUsageStore((state:Usage) => state.setShowMenu);
    const [showExpMenu, setShowExpMenu] = useState<string>('close');
    const [showCardsMenu, setShowCardsMenu] = useState<string>('close');


    function toggleMenu(action:'open'|'close') {
        if(action === 'open' && (showMenu === 'close' || showMenu === 'initial')) {
            setShowMenu('open');
        } else if(action === 'close' && showMenu === 'open') {
            setShowMenu('close');
            setShowExpMenu('close');
            setShowCardsMenu('close');

        }
    }

    function toggleExpMenu() {
        if(showExpMenu === 'close') {
            setShowExpMenu('open');
        } else {
            setShowExpMenu('close');
        }
    }

    function toggleCardsMenu() {
        if(showCardsMenu === 'close') {
            setShowCardsMenu('open');
        } else {
            setShowCardsMenu('close');
        }
    }

    function openExpMenuOnKeyboardFocus(event: FocusEvent<HTMLButtonElement>) {
        if(showExpMenu === 'close' && event.currentTarget.matches(':focus-visible')) {
            setShowExpMenu('open');
        }
    }

    function openCardsMenuOnKeyboardFocus(event: FocusEvent<HTMLButtonElement>) {
        if(showCardsMenu === 'close' && event.currentTarget.matches(':focus-visible')) {
            setShowCardsMenu('open');
        }
    }

    useEffect(() => {
        const main = document.getElementById('main');
        const header = document.getElementById('header');
        const footer = document.getElementById('footer');
        const iubenda = document.getElementById('iubenda');
        if(main && header && footer && iubenda) {
            if(showMenu === 'open') {
                main.setAttribute('inert', 'inert');
                header.setAttribute('inert', 'inert');
                footer.setAttribute('inert', 'inert');
                iubenda.setAttribute('inert', 'inert');
                document.getElementById('homepageLink')!.focus();
            } else if(showMenu === 'close') {
                main.removeAttribute('inert');
                header.removeAttribute('inert');
                footer.removeAttribute('inert');
                iubenda.removeAttribute('inert');
                document.getElementById('hamburgerButton')!.focus();
            }
        }
    }, [showMenu])

    useEffect(() => {
        function handleEscapeKeyDown(e:any) {
            if(showModal.show) {
                const composer = 'composer_' + showModal.text.toString();
                const composersList = document.getElementById('composersList')!;
                composersList.removeAttribute('inert');
                document.getElementById(composer)!.focus();
                showModalBio(0);
                return;
            } else if (e.key === 'Escape' && (showMenu === 'open' || showMenu === 'initial')) {
                setShowMenu('close');
            }
        }

        window.addEventListener('keydown', handleEscapeKeyDown);

        return () => {
            window.removeEventListener('keydown', handleEscapeKeyDown);
        };
    }, [showModal.show]);

    return(
        <>
            <header id="header" className="w-full fixed bg-corpo-blue z-110 top-0 h-[79px] z-100">
                <div className="w-full px-2 md:px-0 md:w-[90%] md:mx-auto h-full p-0.5 text-white flex items-center justify-between">
                    <Link
                        href={`${lang === 'en' ? '/en' : '/it'}`}
                        aria-label="Torna alla home"
                        onClick={() => toggleMenu('close')}
                    >
                        <img
                            aria-hidden={true}
                            src='/logo.webp'
                            alt="Logo di Visit Cremona"
                            width={500}
                            height={500}
                            className="h-[56px] w-auto"
                        />
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link href={`/${lang === 'en' ? 'en' : 'it'}/experiences`} className="hidden md:block text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-4 py-3">{pathname.includes('/en') ? 'Experiences' : 'Esperienze'}</Link>
                        <Link href={`/${lang === 'en' ? 'en' : 'it'}/events`} className="hidden md:block text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-5 py-3">{pathname.includes('/en') ? 'Events' : 'Eventi'}</Link>
                        {/*<div className="flex relative items-center">*/}
                        {/*    <Search className="text-gray-600 absolute left-[16px] w-5 h-5"/>*/}
                        {/*    <input type="text" placeholder="Cerca eventi o esperienze" className="w-[272px] py-3 pr-8 pl-12 rounded-full bg-white text-black"/>*/}
                        {/*</div>*/}
                        {/*<Cart className="hidden md:block cursor-pointer w-8 h-8"/>*/}
                        <button type="button"
                                aria-controls="mainMenu" aria-expanded={showMenu === 'open'}
                                aria-label="Apri il menu"
                                id="hamburgerButton"
                                onClick={() => toggleMenu('open')}
                        >
                            <Hamburger
                                className="w-8 h-8 cursor-pointer"
                                aria-hidden={true}
                            />
                        </button>
                        <Link href={lang === 'en' ? '/it' : '/en'}>
                            <img src={lang === 'en' ? '/images/en.png' : '/images/it.png'} className="cursor-pointer rounded-full w-6 h-6" alt="Bandiera italiana" width={64} height={64}/>
                        </Link>
                    </div>
                </div>
            </header>

            <div
                className={`overlay ${showMenu === 'open' ? 'visible' : ''}`}
                aria-hidden={true}
            >
            </div>

            <nav
                id="mainMenu"
                className={`${showMenu === 'open' ? 'appear' : showMenu === 'close' ? 'disappear' : 'w-0'} max-w-[350px] h-screen fixed bg-white z-200 right-0 top-0`}>
                <div className="w-full px-8 pb-2 md:pb-8 pt-4 flex items-center justify-between">
                    <img
                        src='/logo-only-icon.png'
                        alt="Logo di Visit Cremona"
                        width={500}
                        height={500}
                        className="h-[100px] w-auto"
                    />
                    <button type="button"
                            id="closeMenuButton"
                            aria-controls="mainMenu" aria-expanded={showMenu === 'open'}
                            aria-label="Chiudi il menu"
                            onClick={() => toggleMenu('close')}
                    >
                        <Close
                            className="w-8 h-8 cursor-pointer"
                            aria-hidden={true}
                        />
                    </button>
                </div>

                <div className="md:hidden block flex w-full items-center justify-end px-8 pb-4 gap-4">
                    <Link href={lang === 'en' ? '/it' : '/en'}>
                        <img src={lang === 'en' ? '/images/en.png' : '/images/it.png'} className="cursor-pointer rounded-full w-6 h-6" alt="Bandiera italiana" width={64} height={64}/>
                    </Link>
                </div>

                <div className="border-t border-black/50 w-[90%] mx-auto text-black/50 pt-3 overflow-y-auto h-[calc(100vh-212px)] md:h-[calc(100vh-148px)]">
                    <ul className="pl-2">
                        <li id="homepageLink" className="py-3" tabIndex={-1}>
                            <Link
                                href={`${lang === 'en' ? '/en' : '/it'}`}
                                onClick={() => toggleMenu('close')}
                            >
                                Homepage
                            </Link>
                        </li>
                        <li className="py-3">
                            <Link
                                href={`/${lang === 'en' ? 'en' : 'it'}/discover`}
                                onClick={() => toggleMenu('close')}
                            >
                                {lang === 'en' ? 'Discover the territory' : 'Scopri il territorio'}
                            </Link>
                        </li>
                        <li className="py-3">
                            <Link
                                href={`/${lang === 'en' ? 'en' : 'it'}/discover/cycling`}
                                onClick={() => toggleMenu('close')}
                            >
                                {lang === 'en' ? 'Cycle-tourism' : 'Cicloturismo'}

                            </Link>
                        </li>
                        <li className="py-3">
                            <Link
                                href={`/${lang === 'en' ? 'en' : 'it'}/discover/luthiery`}
                                onClick={() => toggleMenu('close')}
                            >
                                {lang === 'en' ? 'Music and luthiery' : 'Musica e liuteria'}

                            </Link>
                        </li>

                        <li className="w-full flex flex-col">
                            <button type="button" onClick={toggleExpMenu}
                                    onFocus={openExpMenuOnKeyboardFocus}
                                    className="cursor-pointer pr-4 py-3 flex justify-between items-center"
                                    aria-controls="expMenu" aria-expanded={showExpMenu === 'open'}
                            >
                                <span>{lang === 'en' ? 'Experiences' : 'Esperienze'}</span>
                                <span
                                    className={`${showExpMenu === 'open' ? 'rotate-90' : 'rotate-0'} transition-all duration-500 origin-center`}>&gt;</span>
                            </button>
                            <ul id="expMenu"
                                className={`${showExpMenu === 'open' ? 'max-h-[1000px]' : 'max-h-0'} pl-4 transition-all duration-500 overflow-hidden`}>
                                <li className="py-3">
                                    <Link
                                        href={`/${lang === 'en' ? 'en' : 'it'}/experiences`}
                                        onClick={() => toggleMenu('close')}
                                    >
                                        {lang === 'en' ? 'All experiences' : 'Tutte le esperienze'}

                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href={`/${lang === 'en' ? 'en' : 'it'}/experiences/classic`}
                                        onClick={() => toggleMenu('close')}
                                    >
                                        {lang === 'en' ? 'Classic experiences' : 'Esperienze Classiche'}

                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href={`/${lang === 'en' ? 'en' : 'it'}/experiences/contemporary`}
                                        onClick={() => toggleMenu('close')}
                                    >
                                        {lang === 'en' ? 'Contemporary experiences' : 'Esperienze Contemporanee'}

                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href={`/${lang === 'en' ? 'en' : 'it'}/experiences/unique`}
                                        onClick={() => toggleMenu('close')}
                                    >
                                        {lang === 'en' ? 'Unique experiences' : 'Esperienze Uniche'}

                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="w-full flex flex-col">
                            <button type="button" onClick={toggleCardsMenu}
                                    onFocus={openCardsMenuOnKeyboardFocus}
                                    className="cursor-pointer pr-4 py-3 flex justify-between items-center"
                                    aria-controls="cardsMenu" aria-expanded={showCardsMenu === 'open'}
                            >
                                <span>Shop</span>
                                <span
                                    className={`${showCardsMenu === 'open' ? 'rotate-90' : 'rotate-0'} transition-all duration-500 origin-center`}>&gt;</span>
                            </button>
                            <ul id="cardsMenu"
                                className={`${showCardsMenu === 'open' ? 'max-h-[1000px]' : 'max-h-0'} pl-4 transition-all duration-500 overflow-hidden`}>
                                <li className="py-3">
                                    <a
                                        href={`https://multishop-cremona.collaudo.domniapass.com/${lang === 'en' ? 'en' : 'it'}/products/welcome-card`}
                                        target="_blank" rel="noopener noreferrer"
                                    onClick={() => toggleMenu('close')}
                                    >
                                        Card of Harmonies WELCOME
                                    </a>
                                </li>
                                <li className="py-3">
                                    <a
                                        href={`https://multishop-cremona.collaudo.domniapass.com/${lang === 'en' ? 'en' : 'it'}/products/visit-cremona-card`}
                                        target="_blank" rel="noopener noreferrer"
                                        onClick={() => toggleMenu('close')}
                                    >
                                        Visit Cremona Card UNICA
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="py-3">
                            <Link
                                href={`/${lang === 'en' ? 'en' : 'it'}/plan`}
                                onClick={() => toggleMenu('close')}
                            >
                                {lang === 'en' ? 'Plan your trip' : 'Pianifica il tuo viaggio'}

                            </Link>
                        </li>

                        <li className="py-3">
                            <Link
                                href={`/${lang === 'en' ? 'en' : 'it'}/events`}
                                onClick={() => toggleMenu('close')}
                            >
                                {lang === 'en' ? 'Events' : 'Eventi'}

                            </Link>
                        </li>

                        <li className="py-3">
                            <Link
                                href={`/${lang === 'en' ? 'en' : 'it'}/stories`}
                                onClick={() => toggleMenu('close')}
                            >
                                Stories
                            </Link>
                        </li>

                        <li className="py-3">
                            <Link
                                href={`/${lang === 'en' ? 'en' : 'it'}/partner`}
                                onClick={() => toggleMenu('close')}
                            >
                                Partner
                            </Link>
                        </li>
                        <li className="py-3">
                            <Link
                                href={`/${lang === 'en' ? 'en' : 'it'}/who`}
                                onClick={() => toggleMenu('close')}
                            >
                                {lang === 'en' ? 'Who we are' : 'Chi siamo'}

                            </Link>
                        </li>
                        <li className="py-3">
                            <Link
                                href={`/${lang === 'en' ? 'en' : 'it'}/accessibility`}
                                onClick={() => toggleMenu('close')}
                            >
                                {lang === 'en' ? 'Accessibility declaration' : 'Dichiarazione di accessibilità'}

                            </Link>
                        </li>
                        <li className="py-3">
                            <a target="_blank" rel="noopener noreferrer" href={links['amministrazione_trasparente']}>

                                {lang === 'en' ? 'Transparent administration' : 'Amministrazione trasparente'}

                            </a>
                        </li>

                        <li className="py-3">
                            <Link
                                href={`/${lang === 'en' ? 'en' : 'it'}/links`}
                                onClick={() => toggleMenu('close')}
                            >
                                {lang === 'en' ? 'Useful links' : 'Link utili'}

                            </Link>
                        </li>

                        <li className="py-3">
                            <Link
                                href={`/${lang === 'en' ? 'en' : 'it'}/contact`}
                                onClick={() => toggleMenu('close')}
                            >
                                {lang === 'en' ? 'Contacts' : 'Contacts'}
                            </Link>
                        </li>

                        <li className="py-3">
                            <Link
                                href={`/${lang === 'en' ? 'en' : 'it'}/press`}
                                onClick={() => toggleMenu('close')}
                            >
                                {lang === 'en' ? 'Press area' : 'Area Stampa'}

                            </Link>
                        </li>

                        <li className="py-3">
                            <Link
                                href={`/${lang === 'en' ? 'en' : 'it'}/operators`}
                                onClick={() => toggleMenu('close')}
                            >
                                {lang === 'en' ? 'Operators area' : 'Area Operatori'}

                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
