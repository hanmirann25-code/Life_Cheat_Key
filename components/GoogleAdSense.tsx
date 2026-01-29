"use client";

import Script from "next/script";

type Props = {
    publisherId: string;
};

const GoogleAdSense = ({ publisherId }: Props) => {
    if (process.env.NODE_ENV !== "production") {
        return null;
    }

    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${publisherId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
};

export default GoogleAdSense;
