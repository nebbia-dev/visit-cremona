import Link from "next/link";

export default function Footer({links, contacts, lang} : {links:any, contacts:any, lang?:string}) {
    return (
        <footer id="footer" className="min-h-[40vh] bg-corpo-blue w-full flex gap-4 py-16 text-white">
            <div className="w-[80vw] flex flex-col lg:flex-row gap-20 items-center lg:items-start mx-auto">
                <div className="w-[50vw] lg:w-[20vw] flex flex-col items-center justify-center gap-8">
                    <Link href={`${lang === 'en' ? '/en' : '/it'}`} className="w-[90%]">
                        <img
                            src='/logo.webp'
                            alt="Logo di Visit Cremona"
                            width={500}
                            height={500}
                        />
                    </Link>
                    <div className="flex gap-8 w-full items-center justify-center">
                        <img
                            src='/icons/InLombardia_white.png'
                            alt="Logo di InLombardia"
                            className="w-[80px]"
                            width={500}
                            height={500}
                        />

                        <img
                            src='/icons/E015-Logo_white.png'
                            alt="Logo di E015"
                            className="w-[80px]"
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
                <div className="w-full lg:w-[35vw] text-center lg:text-left">
                    <p className="font-semibold mb-4">{lang === 'en' ? 'Contacts' : 'Contatti'}</p>
                    <p>{lang === 'en' ? 'Offices' : 'Sede'}: {contacts.indirizzo}</p>
                    <p><a className="hover:text-corpo-orange"
                          href={`tel:${contacts.telefono.split(' ').join('')}`}>Tel.: {contacts.telefono}</a></p>
                    <p>REA: {contacts.rea} | P.IVA {contacts.pIva}</p>
                    <p>Cap. Soc. {contacts.capitale_sociale}</p>
                    <p>PEC: {contacts.pec}</p>
                    <div className="mt-3 mb-2 flex gap-4 justify-center lg:justify-start">
                        {lang === 'en' ? 'Follow us:' : 'Seguici sui social:'}
                        <ul className="flex gap-4 items-center">
                            <li>
                                <a aria-label="Vai al profilo Facebook di Visit Cremona" target="_blank" rel="noopener noreferrer" href={links.facebook}>
                                    <img aria-hidden={true} src="/icons/hugeicons_facebook-02.webp" alt="facebook logo" width={24}
                                           height={24}/>
                                </a>
                            </li>
                            <li>
                                <a aria-label="Vai al profilo Instagram di Visit Cremona" target="_blank" rel="noopener noreferrer" href={links.instagram}>
                                    <img aria-hidden={true} src="/icons/logo-instagram.webp" alt="instagram logo" width={24}
                                           height={24}/>
                                </a>
                            </li>
                            {links.whatsapp &&
                                <li>
                                    <a aria-label="Vai al profilo Whatsapp di Visit Cremona" target="_blank" rel="noopener noreferrer" href={links.whatsapp}>
                                        <img aria-hidden={true} src="/icons/hugeicons_facebook-02.webp" alt="facebook logo" width={24}
                                               height={24}/>
                                    </a>
                                </li>
                            }
                            {links.youtube &&
                                <li>
                                    <a aria-label="Vai al profilo Youtube di Visit Cremona" target="_blank" rel="noopener noreferrer" href={links.youtube}>
                                        <img aria-hidden={true} src="/icons/logo-youtube.svg" alt="instagram logo" width={24}
                                               height={24}/>
                                    </a>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
                <div
                    className="w-full lg:w-[45vw] flex justify-center lg:justify-start gap-6 underline text-corpo-orange">
                    <ul className="flex flex-col gap-6 text-center lg:text-left">
                        <li><a href="/Visit Cremona_Brand Guide_V6.pdf" download target="_blank" rel="noopener noreferrer">{lang === 'en' ? 'Brand guide' : 'Guida del brand'}</a></li>
                        <li><Link href="https://form.agid.gov.it/c_d150/visitcremona.com/dichiarazione">{lang === 'en' ? 'Accessibility declaration' : 'Dichiarazione di accessibilità'}</Link></li>
                        <li><a target="_blank" rel="noopener noreferrer" href={links['amministrazione_trasparente']}>
                            {lang === 'en' ? 'Transparent administration' : 'Amministrazione trasparente'}</a></li>
                        <li><Link href="/it/partner">Partner</Link></li>
                        <li><a target="_blank" rel="noopener noreferrer" href={links['osservatorio_cremona']}>Osservatorio Turistico Cremonese</a></li>
                    </ul>
                    <ul className="flex flex-col gap-6 text-center lg:text-left">
                        <li><Link href={`/${lang === 'en' ? 'en' : 'it'}/who`}>{lang === 'en' ? 'Who we are' : 'Chi siamo'}</Link></li>
                        <li><Link href={`/${lang === 'en' ? 'en' : 'it'}/plan`}>{lang === 'en' ? 'Plan your trip' : 'Pianifica il tuo viaggio'}</Link></li>
                        <li><Link href={`/${lang === 'en' ? 'en' : 'it'}/contact`}>{lang === 'en' ? 'Information request' : 'Richiesta di informazioni'}</Link></li>
                        <li><Link href={`/${lang === 'en' ? 'en' : 'it'}/newsletter`}>{lang === 'en' ? 'Newsletter subscription' : 'Iscrizione alla newsletter'}</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
