import StoryCard from "@/app/_components/StoryCard";
export default async function Stories() {

    let content;

    try {
        let data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/stories?populate=*',
            { next: { revalidate: 1000 }});
        content = await data.json();
        console.log(content.data)
    } catch(error) {
        console.log(error);
    }

    return(
        <section className="mt-[79px] fadein-slower">
            <div className="w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pt-20 pb-24">
                <p className="text-sm"><span className="font-semibold">Home / </span> Stories</p>
                <h2 className="font-bold text-4xl mt-10 mb-8">Storie del Territorio</h2>


                <div className="flex flex-col md:flex-row gap-4 flex-wrap w-full">
                    {
                        content.data.map((el:any) => {
                            return <StoryCard el={el} key={el.id}/>
                        })
                    }
                </div>
            </div>
        </section>
    )
}