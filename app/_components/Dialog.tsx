'use client'
import { useEffect, useId, useRef, useState } from "react";

import { format, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
import { it } from "react-day-picker/locale";
import "react-day-picker/style.css";
import {Calendar} from "@/app/_components/_icons/Calendar";
import {useFilterStore} from "@/app/_stores/filter";
import {Close} from "@/app/_components/_icons/Close";

type DialogProps = {
    filterKey: 'start' | 'end';
    placeholder: string;
};

export function Dialog({filterKey, placeholder}: DialogProps) {

    const setFilter = useFilterStore((state) => state.setFilter);

    const dialogRef = useRef<HTMLDialogElement>(null);
    const dialogId = useId();

    const [month, setMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [inputValue, setInputValue] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const calendarLabel = `Calendario, ${format(month, "MMMM yyyy")}`;
    function toggleDialog() {
        setIsDialogOpen(!isDialogOpen)
    }

    useEffect(() => {
        function handleBodyScroll (isOpen: boolean) {
            document.body.style.overflow = isOpen ? "hidden" : "";
        }
        if (!dialogRef.current) return;
        if (isDialogOpen) {
            handleBodyScroll(true);
            dialogRef.current.showModal();
        } else {
            handleBodyScroll(false);
            dialogRef.current.close();
        }
        return () => {
            handleBodyScroll(false);
        };
    }, [isDialogOpen]);

    function handleDayPickerSelect (date: Date | undefined) {
        if (!date) {
            setInputValue("");
            setSelectedDate(undefined);
        } else {
            setSelectedDate(date);
            setInputValue(format(date, "dd/MM/yyyy"));
        }
        setFilter(filterKey, date);
        dialogRef.current?.close();
    }

    function handleInputChange (e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value); // Keep the input value in sync

        const parsedDate = parse(e.target.value, "dd/MM/yyyy", new Date());

        if (isValid(parsedDate)) {
            setSelectedDate(parsedDate);
            setMonth(parsedDate);
            setFilter(filterKey, parsedDate);
        } else {
            setSelectedDate(undefined);
            setFilter(filterKey, undefined);
        }
    }

    return (
        <div className="w-[calc(50%-8px)] flex gap-2 rounded-full border border-gray-500 px-4 py-3">
            <label htmlFor={`date-input-${placeholder.toLowerCase()}`}>
                {placeholder}:
            </label>
            <input
                className="w-full"
                style={{ fontSize: "inherit" }}
                id={`date-input-${placeholder.toLowerCase()}`}
                type="text"
                value={inputValue}
                placeholder="dd/MM/yyyy"
                onChange={handleInputChange}
            />{" "}
            <button
                style={{ fontSize: "inherit" }}
                onClick={toggleDialog}
                aria-controls={dialogId}
                aria-haspopup="dialog"
                aria-expanded={isDialogOpen}
                aria-label="Apri il calendario per cambiare la data"
            >
                <Calendar className="cursor-pointer"/>
            </button>
            <dialog
                className="rounded-xl relative top-50 left-100"
                role="dialog"
                ref={dialogRef}
                id={dialogId}
                aria-label={calendarLabel}
                aria-modal
                onClose={() => setIsDialogOpen(false)}
            >
                <button onClick={() => setIsDialogOpen(false)} id={`closeButton${placeholder}`} role="button" aria-label="Chiudi il calendario" tabIndex={0} className="absolute top-2 right-2 flex justify-end">
                    <Close aria-hidden={true} className="cursor-pointer"/>
                </button>
                <DayPicker
                    classNames={{
                        root: `rounded-xl shadow-lg px-8 pb-8 pt-10 w-[332px] h-[368px]`,
                        nav:'absolute top-10 right-8',
                        months: 'w-full h-[90%]',
                        month: 'w-full h-[90%]',
                        month_grid: 'w-full h-[90%] mt-6 gap-2',
                        weekday: 'pb-3 font-medium',
                        day: 'p-2'
                    }}
                    month={month}
                    onMonthChange={setMonth}
                    autoFocus
                    role="application"
                    aria-label={calendarLabel}
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDayPickerSelect}
                    locale={it}
                />
            </dialog>
        </div>
    );
}
