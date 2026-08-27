'use client'
import dynamic from "next/dynamic";
import {ComposerLocation} from "@/app/_types/types";
import type {ExperienceCardData} from "@/app/lib/domnia-types";

const ImportedMap = dynamic(
    () => import('@/app/_components/Map'),
    {
        loading: () => <p>A map is loading</p>,
        ssr: false
    }
);

type LocalMapProps = {
    homepage: boolean;
    autoFilter?: number;
    fullPage?: boolean;
    composers?: ComposerLocation[];
    pages?: ExperienceCardData[];
};

export default function LocalMap({homepage, autoFilter, fullPage, composers, pages} : LocalMapProps) {
    return <ImportedMap homepage={homepage} autoFilter={autoFilter} fullPage={fullPage} composers={composers} pages={pages}/>
}
