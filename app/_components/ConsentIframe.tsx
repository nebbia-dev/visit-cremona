'use client'

import {useEffect, useRef, useState} from "react";
import type {ReactNode} from "react";

type ConsentIframeProps = {
    src: string;
    title: string;
    message: string;
    height?: number;
    iframeClassName?: string;
    allow?: string;
    allowFullScreen?: boolean;
    children?: ReactNode;
    className?: string;
    hideWhenBlocked?: boolean;
};

export default function ConsentIframe({
    src,
    title,
    message,
    height = 400,
    iframeClassName = '',
    allow,
    allowFullScreen = false,
    children,
    className = '',
    hideWhenBlocked = false,
}: ConsentIframeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [canShowContent, setCanShowContent] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if(!container) return;

        const updateContentState = () => {
            const iframe = container.querySelector('iframe');
            const expectedSrc = new URL(src, document.baseURI).href;

            // A missing src, about:blank or a data URL all mean that Iubenda
            // is still blocking the external content.
            setCanShowContent(iframe?.src === expectedSrc);
        };

        updateContentState();

        // Iubenda can change or rebuild the iframe when the visitor updates
        // their consent preferences.
        const observer = new MutationObserver(updateContentState);
        observer.observe(container, {
            attributes: true,
            attributeFilter: ['src'],
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, [src]);

    return (
        <div
            ref={containerRef}
            className={`w-full ${className} ${hideWhenBlocked && !canShowContent ? 'hidden' : ''}`}
        >
            <div className="relative w-full" style={{height}}>
                <iframe
                    title={title}
                    className={`_iub_cs_activate h-full w-full ${iframeClassName}`}
                    src="about:blank"
                    data-suppressedsrc={src}
                    data-iub-purposes="3"
                    width="100%"
                    height={height}
                    frameBorder="0"
                    scrolling="no"
                    allow={allow}
                    allowFullScreen={allowFullScreen}
                    suppressHydrationWarning
                />

                {!canShowContent &&
                    <div
                        className={`absolute inset-0 z-10 flex items-center justify-center bg-gray-100 p-8 text-center ${iframeClassName}`}
                        role="status"
                    >
                        <p>{message}</p>
                    </div>
                }
            </div>

            {canShowContent && children}
        </div>
    );
}
