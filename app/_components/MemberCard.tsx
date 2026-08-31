
export default function MemberCard({avatar, name, job, link} :
{avatar:string[]|undefined, name:string|undefined, job:string|undefined, link:string|undefined}) {
    return (
        <div className="rounded-xl w-full md:w-[25vw] flex flex-col items-center">
            {avatar && name && job && link &&
                <>
                    <div className="w-full h-[50vh] max-h-[500px] relative">
                        <img
                            className="absolute inset-0 h-full w-full rounded-xl object-cover"
                            src={avatar[0]}
                            alt={avatar[1]}
                        />
                    </div>
                    <p className="mt-4 font-semibold">{name}</p>
                    <p>{job}</p>

                    { link !== '-' &&
                        <a href={link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 mt-2">
                            <img width={48} height={48} src="/linkedin.webp" alt="linkedin-logo"/>
                        </a>
                    }
                </>
            }
        </div>
    )
}
