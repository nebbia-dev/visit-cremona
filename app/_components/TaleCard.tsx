
export default function TaleCard({logo, pic} : {logo:string[]|undefined, pic:string[]|undefined}) {
    return (
        <div className="rounded-xl w-full md:w-[25vw] p-6 shadow-lg">
            { logo && pic &&
                <>
                <div className="w-full h-[72px] relative">
                    <img
                        className="absolute inset-0 h-full w-full object-contain max-h-[72px]"
                        src={logo[0]}
                        alt={logo[1]}
                    />
                </div>
                <div className="h-[248px] w-full relative mt-8">
                    <img
                        className="absolute inset-0 h-full w-full rounded-xl object-cover"
                        src={pic[0]}
                        alt={pic[1]}
                    />
                </div>
                </>
            }
        </div>
    )
}
