import Link from "next/link";

export default function StoryCard({el}:{el:any}) {
    return(
        <div className="w-full md:w-[calc(23.6%-4px)]">
            <div
                className="h-[350px] rounded-t-xl bg-white border-t border-r border-l border-orange-500 flex flex-col gap-4">
                <div className="w-full h-[250px]">
                    <img
                        className="w-full h-full object-cover rounded-t-xl"
                        src={process.env.NEXT_PUBLIC_BASE_URL + el.immagine.url}
                        width={200}
                        height={400}
                        alt={el.immagine.alternativeText}/>
                </div>


                <h4 className="font-bold px-4">{el.titolo}</h4>
            </div>
            <div className="p-4 text-right w-full rounded-b-xl bg-white border-b border-r border-l border-orange-500">
                <Link
                    href={`/stories/${el.documentId}`}
                    className="w-fit text-sm cursor-pointer text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-3 py-2"
                >
                    Leggi &gt;
                </Link>
            </div>
        </div>
    )
}