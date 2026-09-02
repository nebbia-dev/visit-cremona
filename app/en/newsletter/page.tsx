import ContactForm from "@/app/_components/ContactForm";

export default function Newsletter() {

    return (
        <section
            className="w-[95vw] md:w-[80vw] mx-auto mt-[79px] px-4 md:px-0 pt-[69px] mb-[80px] flex flex-col md:flex-row gap-16 fadein-slower">
            <div className="flex flex-col w-full">
                <h1 className="font-bold text-4xl my-8">Stay in touch</h1>
                    <h2 className="font-bold">Sign up for the newsletter<br/>
                        Receive suggestions, event updates and news by email</h2>

                    <ContactForm newsletter={true}/>
            </div>
        </section>
    )
}