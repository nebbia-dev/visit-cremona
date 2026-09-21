import ConsentIframe from "@/app/_components/ConsentIframe";

type VideoPlayerProps = {
    src: string;
    message?: string;
    title?: string;
    height?: number;
};

export default function VideoPlayer({
    src,
    message = 'To view this video, please accept cookies for content from external platforms.',
    title = 'Presentation video',
    height = 400,
}: VideoPlayerProps) {
    return (
        <ConsentIframe
            src={src}
            title={title}
            message={message}
            height={height}
            iframeClassName="rounded-xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        />
    );
}
