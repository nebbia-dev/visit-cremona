export default function LinkCard({title, url, description, download} : {title:string, url:string, description:string, download:boolean}) {
    return(
        <div className="w-full md:w-[calc(50%-8px)] bg-white rounded-xl p-8 text-sm">
            <h3 className="font-bold text-2xl">{title}</h3>
            <p className="py-4">{description}</p>
            <div className="w-ful text-right mt-4">
                {download
                    ?
                    <a href={url} download target="_blank" rel="noopener noreferrer" className="text-sm cursor-pointer mt-4 text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-3 py-2"
                    >Download &gt;</a>
                    :
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm cursor-pointer mt-4 text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-3 py-2"
                    >Vai al sito &gt;</a>
                }
            </div>
        </div>
    )
}
