"use client";

import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonProps {
    backButtonLabel: string;
    backByttonHref: string;
}

export const BackButtonLable = ({
    backButtonLabel,
    backByttonHref
}: BackButtonProps) => {
    return (
        <Button variant="link" size="lg" className="w-full text-[14px] mt-1" asChild>
            <Link href={backByttonHref}>
            {backButtonLabel}
            </Link>
        </Button>
    )
}