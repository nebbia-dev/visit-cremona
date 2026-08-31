'use client'
import {useState} from "react";
import Link from "next/link";
import AnimatedHoverButton from "@/app/_components/AnimatedHoverButton";

type GalleryImage = {
    url: string,
    alt: string
}

export default function Stories({gallery, description} : {description: string, gallery:any[]}) {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [images, setImages] = useState<GalleryImage[]>([
        {url: gallery[0].immagine.url,
        alt: gallery[0].immagine.alternativeText},
        {url: gallery[1].immagine.url,
            alt: gallery[1].immagine.alternativeText},
        {url: gallery[2].immagine.url,
            alt: gallery[2].immagine.alternativeText},
        {url: gallery[3].immagine.url,
            alt: gallery[3].immagine.alternativeText},
    ]);
    function slide(step:'prev'|'next') {
        setDisabled(true);
        const arrCopy = [...images];
        switch(step) {
            case 'prev':
                arrCopy.unshift(arrCopy.pop() as GalleryImage);
                break;
            case 'next':
                arrCopy.push(arrCopy.shift() as GalleryImage);
                break;
            default:
        }
        setImages(arrCopy);
        setDisabled(false);
    }

    return (
        <div className="w-full md:pl-[12.5%] mt-4 flex gap-4">
            <div className="hidden md:block w-[25%] h-auto">
                <img id="col-img-now" className="rounded-xl w-full h-full object-cover"
                     src={process.env.NEXT_PUBLIC_BASE_URL + images[0].url} alt={images[0].alt}/>
            </div>
            <div className="w-full md:w-[calc(75%-32px)] flex flex-col items-end bg-[#f0f8ff] relative z-10">
                <div className="hidden md:flex gap-2">
                    <img id="first-img" className="rounded-xl w-[45%] h-[400px] object-cover"
                         src={process.env.NEXT_PUBLIC_BASE_URL + images[1].url} alt={images[1].alt}/>
                    <img id="second-img" className="rounded-xl w-[45%] h-[400px] object-cover"
                         src={process.env.NEXT_PUBLIC_BASE_URL + images[2].url} alt={images[2].alt}/>
                    <img id="third-img" className="rounded-l-xl w-[10%] h-[400px] object-cover"
                         src={process.env.NEXT_PUBLIC_BASE_URL + images[3].url} alt={images[3].alt}/>
                </div>
                <div
                    className="mx-auto md:mx-0 w-[95%] pt-4 md:pt-12 pb-8 pl-4 pr-4 md:pr-[calc(20%+(0.25rem*8))] flex items-center gap-12 bg-[#f0f8ff] relative z-10">

                    <button type="button" aria-label="Scorri immagini a sinistra"
                            disabled={disabled} onClick={() => slide('prev')}
                            className="cursor-pointer hidden md:flex items-center justify-center min-w-[36px] w-[128px]">
                        <img aria-hidden={true} src="/icons/prev.svg" alt="Freccia a sinistra" width={48} height={48}/>
                    </button>
                    <div>
                        <h2 className="font-bold text-3xl">Le storie del territorio</h2>
                        <p className="mt-4">
                            {description}
                        </p>
                        <div className="w-full text-right mt-8">
                            <Link href="/stories" className="font-bold underline relative">
                                <AnimatedHoverButton content="Vai alle Storie del Territorio"/>
                            </Link>
                        </div>
                    </div>
                    <button type="button" aria-label="Scorri immagini a destra" disabled={disabled} onClick={() => slide('next')}
                            className="cursor-pointer hidden md:flex items-center justify-center min-w-[36px] w-[128px]">
                        <img aria-hidden={true} src="/icons/next.svg" alt="Freccia a destra" width={48} height={48}/>
                    </button>
                </div>
                <div className="md:hidden block w-[90%] mx-auto h-[400px]">
                    <img id="col-img-now" className="rounded-xl w-full h-full object-cover"
                         src={process.env.NEXT_PUBLIC_BASE_URL + images[1].url} alt={images[1].alt}/>
                </div>
            </div>
        </div>
    )
}