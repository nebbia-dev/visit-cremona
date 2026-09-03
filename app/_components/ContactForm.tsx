'use client'
import send from "@/app/_lib/send";
import {useState} from "react";
import {usePathname} from "next/navigation";

export default function ContactForm({newsletter} : {newsletter:boolean}) {

    const pathname = usePathname();

    const [error, setError] = useState<boolean>(false);

    function resetError() {
        if(error) {
            setError(false);
        }
    }
    function checkAndSend(e:any) {
        e.preventDefault();
        const error = document.getElementById('errors')!;
        const form = e.target;
        const formData = new FormData(form);
        if(!formData.get('name')) {
            error.textContent = 'Inserisci il nome';
            setError(true);
            return;
        }
        if(!formData.get('lastname')) {
            error.textContent = 'Inserisci il cognome';
            setError(true);
            return;
        }
        if(!formData.get('email')) {
            error.textContent = 'Inserisci l\'indirizzo email';
            setError(true);
            return;
        }
        if(!newsletter) {
            if(!formData.get('subject')) {
                error.textContent = 'Inserisci l\'oggetto della tua richiesta';
                setError(true);
                return;
            }
            if(!formData.get('message')) {
                error.textContent = 'Inserisci il testo della tua richiesta';
                setError(true);
                return;
            }
        }
        if(!formData.get('privacy')) {
            error.textContent = 'Per proseguire, devi prendere visione della privacy policy';
            setError(true);
            return;
        }

        send(formData);
    }

    return(
       <form method="post" onSubmit={checkAndSend}
                            className={`mt-8 flex flex-col gap-4 ${!newsletter ? '' : 'w-full md:w-[55vw]'}`}>
                        <input name="newsletter" type="hidden" value={`${newsletter}`}/>
                        <fieldset className={`flex gap-4 ${!newsletter ? 'flex-col' : 'flex-row'}`}>
                            <label aria-label="Nome obbligatorio" htmlFor="name"
                                   className={`text-black ${!newsletter ? '' : 'w-full md:w-[50%]'}`}>
                                <span className="sr-only">{pathname.includes('/en') ? 'Name' : 'Nome'}</span>
                                <input id="name" name="name"
                                       onChange={resetError}
                                       className="bg-white shadow-sm w-full rounded-xl py-2 px-3" type="text"
                                       placeholder={`${pathname.includes('/en') ? 'Name (required)' : 'Nome (obbligatorio)'}`}/>
                            </label>
                            <label aria-label="Cognome obbligatorio" htmlFor="lastname"
                                   className={`text-black ${!newsletter ? '' : 'w-full md:w-[50%]'}`}>
                                <span className="sr-only">{pathname.includes('/en') ? 'Last name' : 'Cognome'}</span>
                                <input id="lastname" name="lastname"
                                       onChange={resetError}
                                       className="bg-white shadow-sm w-full rounded-xl py-2 px-3" type="text"
                                       placeholder={`${pathname.includes('/en') ? 'Last name (required)' : 'Cognome (obbligatorio)'}`}/>
                            </label>
                        </fieldset>
           <label aria-label="Indirizzo email obbligatorio" htmlFor="email" className="text-black">
               <span className="sr-only">Email</span>
               <input id="email" name="email"
                      onChange={resetError}
                      className="bg-white shadow-sm w-full rounded-xl py-2 px-3" type="email"
                      placeholder={`${pathname.includes('/en') ? 'Email address (required)' : 'Indirizzo email (obbligatorio)'}`}/>
           </label>
           {!newsletter &&
                            <>
                                <label aria-label="Oggetto obbligatorio" htmlFor="subject" className="text-black">
                                    <span className="sr-only">{pathname.includes('/en') ? 'Subject' : 'Oggetto'}</span>
                                    <input id="subject" name="subject"
                                           onChange={resetError}
                                           className="bg-white shadow-sm w-full rounded-xl py-2 px-3"
                                           type="text" placeholder={`${pathname.includes('/en') ? 'Subject (required)' : 'Oggetto (obbligatorio)'}`}/>
                                </label>
                                <label aria-label="Messaggio obbligatorio" htmlFor="message" className="text-black">
                                    <span className="sr-only">{pathname.includes('/en') ? 'Message' : 'Messaggio'}</span>
                                    <textarea id="message" name="message" rows={8}
                                              onChange={resetError}
                                              className="bg-white shadow-sm w-full rounded-xl py-2 px-3"
                                              placeholder={`${pathname.includes('/en') ? 'Message (required)' : 'Messaggio (obbligatorio)'}`}/>
                                </label>
                            </>
           }

                        <div>
                            <label htmlFor="privacy">
                                <input onChange={resetError} id="privacy" name="privacy" className="mr-2" type="checkbox"/>
                                {pathname.includes('/en') ? 'Sign me up for the newsletter (you will receive an email with a confirmation link)' : 'Iscrivimi alla newsletter (ti verrà inviata una mail con un link di conferma)'}
                            </label>
                            <span> - <a href="https://www.iubenda.com/privacy-policy/52538338"
                                                 target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a>.</span>
                        </div>

                        <p id="errors" role="alert" aria-atomic="true"
                            className={`${error ? 'block' : 'hidden'} p-4 border-red-500 bg-red-200 text-black rounded-xl`}
                        ></p>

                        <div className={`w-full ${!newsletter ? 'text-right' : ''}`}>
                            <button type="submit"
                                    className={`cursor-pointer w-[164px] ${!newsletter ? "p-4" : "text-sm px-4 py-2 w-fit mt-2"} text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full`}>{
                                !newsletter && pathname.includes('/en')
                                    ? 'Send'
                                    : newsletter && pathname.includes('/en')
                                        ? 'Sign me up'
                                            : !newsletter && pathname.includes('/it')
                                                ? 'Invia'
                                                : 'Iscrivimi'} &gt;</button>
                        </div>
                    </form>
    )
}