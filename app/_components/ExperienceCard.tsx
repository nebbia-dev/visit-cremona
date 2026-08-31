
export default function ExperienceCard({title, subtitle, description, pic, background} :
{title:string|undefined, subtitle:string|undefined, description:string|undefined, pic:string[]|undefined, background:string}) {

    let bg;

    switch(background) {
        case 'yellow':
            bg = 'bg-pastel-yellow';
            break;
        case 'orange':
            bg = 'bg-pastel-orange';
            break;
        case 'pink':
            bg = 'bg-pastel-pink';
            break;
    }

    return(
        <div className={`${bg} rounded-xl w-full md:w-[25vw] flex flex-col gap-1 p-6 text-black`}>
            {
                title && description && pic &&
                <>
                    <div className="w-full h-[250px] relative">
                        <img
                            src={pic[0]}
                            alt={pic[1]}
                            className="absolute inset-0 h-full w-full object-cover rounded-xl"
                        />
                    </div>
                    <h4 className="w-full font-bold text-3xl mt-6 break-title">{title}</h4>
                    <h5 className="w-full font-bold mt-2" >{subtitle}</h5>
                    <p className="w-full">{description}</p>
                </>
            }
        </div>
    )
}
