'use client'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import {useState} from "react";
import {ComposerLocation} from "@/app/_types/types";
import L from 'leaflet';
import type {LatLngTuple} from "leaflet";
import cyclingMarker from '../../public/icons/cycling-marker.svg';
import luthieryMarker from '../../public/icons/luthiery-marker.svg';
import Link from "next/link";
import {
    getExperienceDescription,
    type ExperienceCardData,
    type ExperienceLocation,
} from "@/app/_lib/domnia-types";
import {usePathname} from "next/navigation";

type MappableExperience = ExperienceCardData & {
    locations: [
        ExperienceLocation & {lat: number; lng: number},
        ...ExperienceLocation[],
    ];
};

type MapProps = {
    homepage: boolean;
    autoFilter?: number;
    fullPage?: boolean;
    composers?: ComposerLocation[];
    pages?: ExperienceCardData[];
};

function hasMapLocation(experience: ExperienceCardData): experience is MappableExperience {
    const location = experience.locations?.[0];

    return typeof location?.lat === "number" && typeof location.lng === "number";
}

export default function Map({homepage, autoFilter = 0, fullPage, composers, pages = []} : MapProps) {

    const pathname = usePathname();

    const [filter, setFilter] = useState<string>('all');
    const cyclingIcon = new L.Icon({
        iconUrl: cyclingMarker.src,
    });
    const luthieryIcon = new L.Icon({
        iconUrl: luthieryMarker.src,
    });
    const cyclingExperiences = pages.filter(
        (experience): experience is MappableExperience =>
            experience.tagIds?.includes(3) === true && hasMapLocation(experience),
    );
    const luthieryExperiences = pages.filter(
        (experience): experience is MappableExperience =>
            experience.tagIds?.includes(2) === true && hasMapLocation(experience),
    );

    function setCoordinates(): LatLngTuple {
        if(composers?.[0]?.name.includes('Paderno')) {
            return [45.23906740340918, 9.928271781708482];
        } else if(filter === 'cycling' || autoFilter === 1) {
            const location = cyclingExperiences[0]?.locations[0];
            if (location) {
                return [location.lat, location.lng];
            }
        } else if(filter === 'luthiery' || autoFilter === 2) {
            const location = luthieryExperiences[0]?.locations[0];
            if (location) {
                return [location.lat, location.lng];
            }
        }
        // Cremona default
        return [45.136887, 10.028458];
    }


    return (
        <section id="map">
            {homepage && <div className="flex items-center gap-4 px-1 md:px-4 mb-4">
                <ul className="text-sm flex gap-4 flex-wrap md:justify-start justify-center">
                    <li className="flex items-center border bg-gray-500 border-gray-500 text-white rounded-full px-4 py-2">
                            <img aria-hidden={true} src="/icons/filter.svg" alt="" width={12} height={12} className="mr-1.5"/>
                        {pathname.includes('/en') ? 'Filters' : 'Filtri'}
                    </li>
                    <li>
                        <button value="cycling" type="button" aria-pressed={filter === 'all'}
                                className={`${filter === 'all' ? 'bg-soft-orange' : 'border border-gray-300'} cursor-pointer rounded-full px-4 py-2`}
                                onClick={() => setFilter('all')}>
                            {pathname.includes('/en') ? 'All' : 'Tutti'}
                        </button>
                    </li>
                    <li>
                        <button value="cycling" type="button" aria-pressed={filter === 'cycling'}
                                className={`${filter === 'cycling' ? 'bg-soft-orange' : 'border border-gray-300'} cursor-pointer rounded-full px-4 py-2`}
                                onClick={() => setFilter('cycling')}>
                            {pathname.includes('/en') ? 'Cycle-tourism' : 'Cicloturismo'}
                        </button>
                    </li>
                    <li>
                        <button value="luthiery" type="button" aria-pressed={filter === 'luthiery'}
                                className={`${filter === 'luthiery' ? 'bg-soft-orange' : 'border border-gray-300'} cursor-pointer rounded-full px-4 py-2`}
                                onClick={() => setFilter('luthiery')}>
                            {pathname.includes('/en') ? 'Music and luthiery' : 'Musica e liuteria'}
                        </button>
                    </li>
                </ul>
            </div>}
            <MapContainer className={`${homepage || fullPage ? 'md:h-[600px]' : 'md:h-[532px] md:w-[60dvw]'} h-[50dvh] w-full rounded-xl z-100`}
                          center={setCoordinates()}
                          zoom={composers ? 14 : 12}
                          scrollWheelZoom={false}>
                <TileLayer
                    attribution="Google Maps"
                    url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                />
                {((filter === 'all' && autoFilter === 0) || filter === 'cycling' || autoFilter === 1) && cyclingExperiences.map(el => {
                    return(
                        <Marker key={el.documentId} position={[el.locations[0].lat, el.locations[0].lng]} icon={cyclingIcon}>
                            <Popup className="border border-orange-500 rounded-xl">
                                <img className="rounded-t-xl w-full h-[136px] object-cover" width={200} height={100} src={el.imageUrl ? process.env.NEXT_PUBLIC_BASE_URL + el.imageUrl :`/images/experiences/violin1.webp`} alt="Immagine esemplificativa del luogo"/>
                                <div className="px-4 pt-4 pb-2">
                                    <h4 className="font-bold">{el.title}</h4>
                                    <p className="line-clamp-6">{getExperienceDescription(el.description).replace(/<\/?[^>]+(>|$)/g, "")}</p>
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold">{
                                            new Intl.NumberFormat("de-DE", {
                                                style: "currency",
                                                currency: "EUR"
                                            }).format(el.cheapest ?? 0)
                                        }</p>
                                        <a aria-label="Vai alla pagina di acquisto del biglietto per questa esperienza"
                                           href={`https://multishop-cremona.collaudo.domniapass.com/products/${el.slug}`}
                                           target="_blank" rel="noopener noreferrer"
                                           className="text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full py-2 px-3">
                                            {pathname.includes('/en') ? 'Discover' : 'Scopri'}
                                        </a>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    )
                })}

                {((filter === 'all' && autoFilter === 0) || filter === 'luthiery' || autoFilter === 2) && luthieryExperiences.map(el => {
                    return(
                        <Marker key={el.documentId} position={[el.locations[0].lat, el.locations[0].lng]} icon={luthieryIcon}>
                            <Popup className="border border-orange-500 rounded-xl">
                                <img className="rounded-t-xl w-full h-[136px] object-cover" width={200} height={100} src={el.imageUrl ? process.env.NEXT_PUBLIC_BASE_URL + el.imageUrl :`/images/experiences/violin1.webp`} alt="Immagine esemplificativa del luogo"/>
                                <div className="px-4 pt-4 pb-2">
                                    <h4 className="font-bold">{el.title}</h4>
                                    <p className="line-clamp-6">{getExperienceDescription(el.description).replace(/<\/?[^>]+(>|$)/g, "")}</p>
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold">{
                                            new Intl.NumberFormat("de-DE", {
                                                style: "currency",
                                                currency: "EUR"
                                            }).format(el.cheapest ?? 0)
                                        }</p>
                                        <a aria-label="Vai alla pagina di acquisto del biglietto per questa esperienza" href={`https://multishop-cremona.collaudo.domniapass.com/products/${el.slug}`}
                                              target="_blank" rel="noopener noreferrer"
                                              className="text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full py-2 px-3">{pathname.includes('/en') ? 'Discover' : 'Scopri'}</a>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    )
                })}

                {composers && composers.map(el => {
                    return (
                        <Marker key={el.lat + ', ' + el.long} position={[el.lat, el.long]} icon={luthieryIcon}>
                            <Popup className="border border-orange-500 rounded-xl">
                                <div className="p-4 text-center">
                                    <h4 className="font-bold">{el.name}</h4>
                                    {/*<p>{el.description}</p>*/}
                                </div>
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>
            <div className={`w-full ${autoFilter ? 'hidden' : 'text-right'} p-4`}>
                <Link href={`/${pathname.includes('/en') ? 'en' : 'it'}/accessible-experiences`} className="underline">
                    {pathname.includes('/en') ? 'Discover all experiences' : 'Consulta tutte le esperienze'}
                </Link>
            </div>
        </section>
    )
}
