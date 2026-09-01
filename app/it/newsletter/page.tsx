import ContactForm from "@/app/_components/ContactForm";

export default function Newsletter() {

    return (
        <section
            className="w-[95vw] md:w-[80vw] mx-auto mt-[79px] px-4 md:px-0 pt-[69px] mb-[80px] flex flex-col md:flex-row gap-16 fadein-slower">
            <div className="flex flex-col w-full">
                <h1 className="font-bold text-4xl my-8">Resta in contatto con noi</h1>
                    <h4 className="font-bold">Iscriviti alla newsletter<br/>
                        Ricevi consigli, eventi e novità via email</h4>

                    <ContactForm newsletter={true}/>
            </div>
        </section>
    )
}