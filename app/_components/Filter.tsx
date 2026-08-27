'use client'
import {Dialog} from "@/app/_components/Dialog";
import {useFilterStore} from "@/app/_stores/filter";
import type {ExperienceFilters} from "@/app/_stores/filter";

export default function Filter({exp, search} : {exp:boolean, search:() => void}) {
    const setFilter = useFilterStore((state) => state.setFilter);
    const filters = useFilterStore((state) => state.filters);

    return (
        <div className={`${exp ? 'w-full' : 'md:w-[40%]'}`}>
            {exp &&
                <fieldset aria-label="Scegli il tipo di esperienza" className="w-full flex justify-between gap-4 mb-4">
                    <button type="button" value="classic" onClick={() => setFilter('type', 'classic')}
                            aria-pressed={filters.type === 'classic'} className={`${filters.type === 'classic' ? 'border-orange-300 bg-orange-100' : 'border-transparent bg-white'} border-2 overflow-x-hidden text-ellipsis text-sm w-[calc(30%-16px)] text-center px-4 py-3 rounded-full cursor-pointer`}>Classiche</button>
                    <button type="button" value="contemp" onClick={() => setFilter('type', 'contemp')}
                            aria-pressed={filters.type === 'contemp'} className={`${filters.type === 'contemp' ? 'border-orange-300 bg-orange-100' : 'border-transparent bg-white'} border-2 overflow-x-hidden text-ellipsis text-sm w-[calc(45%-16px)] text-center px-4 py-3 rounded-full cursor-pointer`}>Contemporanee</button>
                    <button type="button" value="unique" onClick={() => setFilter('type', 'unique')}
                            aria-pressed={filters.type === 'unique'} className={`${filters.type === 'unique' ? 'border-orange-300 bg-orange-100' : 'border-transparent bg-white'} border-2 overflow-x-hidden text-ellipsis text-sm w-[calc(25%-16px)] text-center px-4 py-3 rounded-full cursor-pointer`}>Uniche</button>
                </fieldset>
            }

            <fieldset aria-label="Scegli le date dell'esperienza" className="w-full flex justify-between gap-4 mb-4">
                <Dialog placeholder="Dal"/>
                <Dialog placeholder="Al"/>
            </fieldset>

            <fieldset>
                <select aria-label="Seleziona la categoria dell'esperienza" value={filters.category} onChange={(e) => setFilter('category', e.target.value as ExperienceFilters['category'])}
                        className="sf-select w-full rounded-full border border-gray-500 px-4 py-3">
                    <option value="" disabled>Categoria</option>
                    <option value="all">Tutte</option>
                    <option value="cycling">Cicloturismo</option>
                    <option value="luthiery">Musica e liuteria</option>
                </select>
            </fieldset>

            <button type="button" onClick={search}
                    className="cursor-pointer mt-4 w-full text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-4 py-3">Cerca</button>

        </div>
    )
}
