import Image from "next/image";

type TaleTheme = "cycling" | "luthiery";

export default function TalesLogo({theme} : {theme:TaleTheme}) {

    const themes = {
     cycling:
        {
            title: "cycling",
            logo: "cycling-logo.svg",
            color: "text-[#918FC7]"
        },
     luthiery:
        {
            title: "music & luthiery",
            logo: "luthiery-logo.svg",
            color: "text-sky-300"
        }
    }

    return (
        <div className="flex items-center gap-4">
            <Image src={`/images/logos/${themes[theme].logo}`} width={300} height={100} alt="logo tema" className="w-auto h-[124px]"/>
            <div className="flex flex-col gap-2">
                <h3 className="text-3xl">TALES OF <br/>
                    <span className={`font-bold ${themes[theme].color}`}>{themes[theme].title.toUpperCase()}</span>
                </h3>
                <h4>VISIT <span className="font-semibold">CREMONA</span></h4>
            </div>
        </div>
)
}
