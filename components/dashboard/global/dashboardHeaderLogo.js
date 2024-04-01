import React from "react";
import Image from "next/image";

export default function DashboardHeaderLogoComponent() {
    return (
        <>
            <a href={'/ielts-admin'} className="flex items-center">
                <Image height="32" width="202" src={"/images/logo.png"} className="h-8 mr-3" alt="AnswerPedia Logo" />
                {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span> */}
            </a>
        </>
    );
}