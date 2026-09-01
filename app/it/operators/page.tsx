'use client'
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Operators() {
    const router = useRouter();
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    function changePassword(e:any) {
        setPassword(e.currentTarget.value);
        if(error) {
            setError(false);
        }
    }
    function verify() {
        if(password === '12345') {
            router.push('/operators/granted')
        } else {
            setError(true);
            document.getElementById('errors')!.textContent = "Invalid password";
        }
    }

    return (
           <div className="w-[95vw] md:w-[80vw] h-[65vh] mx-auto mt-[79px] px-4 md:px-0 pt-[69px] mb-[80px] flex flex-col md:flex-row gap-16 fadein-slower">
               <div className="w-full h-full flex items-center justify-center">
                   <div className="w-full md:w-auto p-8 flex flex-col items-center bg-white rounded-xl">
                       <h2 className="font-bold text-2xl mb-4">Area operatori</h2>
                       <label aria-label="Inserisci la password" htmlFor="password">
                           <input
                               id="password"
                               placeholder="Password"
                               className="border py-2 px-4 rounded-full"
                               value={password}
                               type="password"
                               onChange={(e) => changePassword(e)}/>
                       </label>
                       <button type="button" onClick={verify}
                               className="cursor-pointer mt-4 w-full text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full px-4 py-3">Accedi
                       </button>
                       <p id="errors" role="alert" aria-atomic="true"
                          className={`${error ? 'block' : 'hidden'} mt-4 p-4 border-red-500 bg-red-200 text-black rounded-xl`}
                       ></p>
                   </div>
               </div>
           </div>

    )
}