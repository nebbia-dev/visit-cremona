import {create} from "zustand";

export type ExperienceFilters = {
    type?: "classic" | "contemp" | "unique";
    start?: Date;
    end?: Date;
    category: "" | "all" | "cycling" | "luthiery";
};

type FilterStore = {
    filters: ExperienceFilters;
    setFilter: <Key extends keyof ExperienceFilters>(
        prop: Key,
        value: ExperienceFilters[Key],
    ) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
    filters: {
        type: undefined,
        start: undefined,
        end: undefined,
        category: "",
    },
    setFilter: (prop, value) => {
        set((state) => ({
            filters: {
                ...state.filters,
                [prop]: value,
            },
        }));
    },
}));
