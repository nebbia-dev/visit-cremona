'use client'
import {Dialog} from "@/app/_components/Dialog";
// import {useFilterStore} from "@/app/_stores/filter";
import {usePathname} from "next/navigation";

export default function FilterEvents({search} : {search:() => void}) {

    const pathname = usePathname();

    return (
        <div className="w-full flex items-center gap-8">
            <fieldset aria-label="Scegli le date dell'evento" className="w-full flex justify-between gap-4">
                <Dialog filterKey="start" placeholder={pathname.includes('/en') ? 'From' : 'Da'}/>
                <Dialog filterKey="end" placeholder={pathname.includes('/en') ? 'To' : 'Al'}/>
            </fieldset>

            <button type="button" onClick={search}
                    className="cursor-pointer w-full text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-4 py-3">
                {pathname.includes('/en') ? 'Search' : 'Cerca'}
            </button>

        </div>
    )
}
