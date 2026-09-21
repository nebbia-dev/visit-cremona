const typeTranslations: Record<string, string> = {
    foresteria: 'Guest house',
    agriturismo: 'Farm stay',
    vendita: 'Sales',
    noleggio: 'Rental',
    riparazioni: 'Service',
    assistenza: 'Technical Support',
};

function translateType(type: string | undefined, lang: string | undefined) {
    if(!type || lang !== 'en') return type;

    return type
        .split(/\s+e\s+/i)
        .map((value) => {
            const normalizedValue = value.trim().toLocaleLowerCase('it');
            return typeTranslations[normalizedValue] ?? value.trim();
        })
        .join(' and ');
}

export default function InfoCard({name, address, phone, email, children, url, hours, type, lang} : {name:string, address:string, phone:string, email:string, children?:undefined|React.ReactNode, url?:string|undefined, hours?:string|undefined, type?:string|undefined, lang?:string}) {
    const translatedType = translateType(type, lang);

    return(
        <div className="w-full md:w-[calc(33%-8px)]">
        <div className={`bg-white rounded-t-xl pt-8 px-8 ${children ? 'h-[65vh]' : hours ? 'h-[396px]' : 'h-[300px]' } relative overflow-y-auto`}>
            <h4 className={`font-bold text-2xl ${type ? '' : 'h-[64px]'} line-clamp-2`}>{name}</h4>
            <h5 className="font-medium line-clamp-1">{translatedType}</h5>
            <div className={`${children ? 'h-[70%] overflow-y-auto mt-4' : ''}`}>
                {children}
                <ul className="my-4">
                    <li className="w-full mt-2">
                        <span className="font-semibold">{lang === 'en' ? 'Address:' : 'Indirizzo:'}</span><br/>
                        {address}
                    </li>
                    <li className="mt-2">
                        <span className="font-semibold">{lang === 'en' ? 'Phone:' : 'Telefono:'}</span><br/>
                        <a href={`tel:+39${phone}`} className="underline">{phone}</a>
                    </li>
                    {email && <li className="w-full mt-2">
                        <span className="font-semibold">Email:</span><br/>
                        <a href={`mailto:${email}`} className="underline">{email}</a>
                    </li>}
                    {hours && <li className="w-full mt-2">
                        <span className="font-semibold">{lang === 'en' ? 'Opening hours' : 'Orari di apertura:'}</span><br/>
                        {name.includes("Soncino")
                            ? <a href="/orario-infopoint-1.pdf" download target="_blank" rel="noopener noreferrer" className="underline">{hours}</a>
                            : <span>{hours}</span>
                        }
                    </li>}
                </ul>
            </div>
        </div>
        {url ? <div className="w-full p-8 text-right bg-white rounded-b-xl">
            <a href={url} target="_blank" rel="noopener noreferrer"
               className="text-sm cursor-pointer w-full text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-4 py-3">
                {lang === 'en' ? 'Go to website' : 'Vai al sito'} &gt;
            </a>
        </div>
            : <div className="w-full p-8 text-right bg-white rounded-b-xl h-[87.99px]"></div>
        }

        </div>
    )
}
