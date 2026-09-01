import Link from "next/link";

export default function notFound() {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/it">Return Home</Link>
        </div>
    )
}
