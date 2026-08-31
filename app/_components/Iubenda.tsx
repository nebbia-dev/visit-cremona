import Script from "next/script";

export default function Iubenda() {
    return(
        <div id="iubenda" className="bg-corpo-blue w-full">
            <div className="w-[90%] flex items-center justify-center gap-2 mx-auto pb-4">
                <a href="https://www.iubenda.com/privacy-policy/52538338"
                   target="_blank" rel="noopener noreferrer"
                   className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe " title="Privacy Policy ">Privacy
                    Policy</a>
                <a href="https://www.iubenda.com/privacy-policy/52538338/cookie-policy"
                   target="_blank" rel="noopener noreferrer"
                   className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe " title="Cookie Policy ">Cookie
                    Policy</a>
                <Script
                    id="iubenda-core"
                    src="https://cdn.iubenda.com/iubenda.js"
                    strategy="lazyOnload"
                />
                <Script
                    id="iubenda-widget"
                    src="https://embeds.iubenda.com/widgets/d1d71270-b927-4ea1-8435-fd94280129b2.js"
                    strategy="lazyOnload"
                />
            </div>
        </div>
    )
}
