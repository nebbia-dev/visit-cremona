import Link from "next/link";
import Markdown from "react-markdown";

export default function NewsCard({el}:{el:any}) {
    return (
        <div className="w-full md:w-[calc(50%-8px)] h-[376px] rounded-xl bg-white relative border border-orange-500">
            <div className="w-full h-[200px]">
                <img
                    className="w-full h-[200px] object-cover rounded-t-xl"
                    src={process.env.NEXT_PUBLIC_BASE_URL + el.immagine.url}
                    width={200}
                    height={400}
                    alt={el.immagine.alternativeText}/>
            </div>
            <div className="px-8 py-6">
                <h4 className="font-bold line-clamp-1">{el.titolo}</h4>
                <div className="line-clamp-2 text-sm markdown">
                    <Markdown>
                        {el.contenuto}
                    </Markdown>
                </div>
            </div>
            <Link
                href={`/it/news/${el.documentId}`}
                className="absolute bottom-4 text-sm right-4 cursor-pointer mt-4 text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-3 py-2"
            >
                Scopri &gt;
            </Link>
        </div>
    )
}
