import "server-only";

type NewsletterFormProps = {
    lang: "it" | "en";
};

type MailchimpConfig = {
    action: string;
    honeypotName: string;
};

const copy = {
    it: {
        firstName: "Nome",
        lastName: "Cognome",
        email: "Indirizzo email",
        required: "obbligatorio",
        consent: "Acconsento all’iscrizione alla newsletter e dichiaro di aver preso visione della",
        submit: "Iscrivimi",
        unavailable: "Il servizio di iscrizione alla newsletter non è temporaneamente disponibile.",
        honeypot: "Lascia vuoto questo campo",
    },
    en: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email address",
        required: "required",
        consent: "I agree to subscribe to the newsletter and confirm that I have read the",
        submit: "Sign me up",
        unavailable: "The newsletter subscription service is temporarily unavailable.",
        honeypot: "Leave this field empty",
    },
} as const;

function getMailchimpConfig(): MailchimpConfig | null {
    const rawAction = process.env.MAILCHIMP_FORM_ACTION?.trim();

    if (!rawAction) {
        return null;
    }

    try {
        const action = new URL(rawAction.replaceAll("&amp;", "&"));
        const isMailchimpHost = action.hostname === "list-manage.com"
            || action.hostname.endsWith(".list-manage.com");
        const userId = action.searchParams.get("u");
        const audienceId = action.searchParams.get("id");

        if (action.protocol !== "https:"
            || !isMailchimpHost
            || action.pathname !== "/subscribe/post"
            || !userId
            || !audienceId) {
            return null;
        }

        return {
            action: action.toString(),
            honeypotName: `b_${userId}_${audienceId}`,
        };
    } catch {
        return null;
    }
}

export default function NewsletterForm({lang}: NewsletterFormProps) {
    const labels = copy[lang];
    const config = getMailchimpConfig();

    if (!config) {
        return (
            <p role="status" className="mt-8 rounded-xl bg-white/15 p-4">
                {labels.unavailable}
            </p>
        );
    }

    const emailField = process.env.MAILCHIMP_EMAIL_FIELD?.trim() || "EMAIL";
    const firstNameField = process.env.MAILCHIMP_FIRST_NAME_FIELD?.trim() || "FNAME";
    const lastNameField = process.env.MAILCHIMP_LAST_NAME_FIELD?.trim() || "LNAME";
    const gdprField = process.env.MAILCHIMP_GDPR_FIELD?.trim() || undefined;
    const gdprValue = process.env.MAILCHIMP_GDPR_VALUE?.trim() || "Y";

    return (
        <form
            action={config.action}
            method="post"
            acceptCharset="UTF-8"
            className="mt-8 flex w-full flex-col gap-4 md:w-[55vw]"
        >
            <fieldset className="flex flex-col gap-4 md:flex-row">
                <label className="w-full text-black md:w-1/2">
                    <span className="sr-only">{labels.firstName} ({labels.required})</span>
                    <input
                        name={firstNameField}
                        type="text"
                        autoComplete="given-name"
                        required
                        className="w-full rounded-xl bg-white px-3 py-2 shadow-sm"
                        placeholder={`${labels.firstName} (${labels.required})`}
                    />
                </label>
                <label className="w-full text-black md:w-1/2">
                    <span className="sr-only">{labels.lastName} ({labels.required})</span>
                    <input
                        name={lastNameField}
                        type="text"
                        autoComplete="family-name"
                        required
                        className="w-full rounded-xl bg-white px-3 py-2 shadow-sm"
                        placeholder={`${labels.lastName} (${labels.required})`}
                    />
                </label>
            </fieldset>

            <label className="text-black">
                <span className="sr-only">{labels.email} ({labels.required})</span>
                <input
                    name={emailField}
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl bg-white px-3 py-2 shadow-sm"
                    placeholder={`${labels.email} (${labels.required})`}
                />
            </label>

            <label className="flex items-start gap-2">
                <input
                    type="checkbox"
                    name={gdprField}
                    value={gdprValue}
                    required
                    className="mt-1 shrink-0"
                />
                <span>
                    {labels.consent}{" "}
                    <a
                        href="https://www.iubenda.com/privacy-policy/52538338"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Privacy Policy
                    </a>.
                </span>
            </label>

            <div aria-hidden="true" className="absolute -left-[5000px]">
                <label>
                    {labels.honeypot}
                    <input
                        type="text"
                        name={config.honeypotName}
                        tabIndex={-1}
                        defaultValue=""
                    />
                </label>
            </div>

            <div>
                <button
                    type="submit"
                    className="mt-2 w-fit cursor-pointer rounded-full bg-soft-orange px-4 py-2 text-sm text-black transition duration-500 hover:bg-corpo-orange"
                >
                    {labels.submit} &gt;
                </button>
            </div>
        </form>
    );
}
