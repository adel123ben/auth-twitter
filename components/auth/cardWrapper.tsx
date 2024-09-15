"use client";

import React from "react";

// impor the componets from the card (shadcn/ui)
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
  } from "@/components/ui/card"
import { HeaderCard } from "./header";
import { Socile } from "./social";
import { BackButtonLable } from "./backButton";


interface CardWrapperProps {
    headerLabel: string;
    subHeaderLabel: string;
    children: React.ReactElement;
    showsical?: boolean;
    backButtonLabel: string;
    backButtonHref: string;
}



export const CardWrapper = ({
    headerLabel,
    subHeaderLabel,
    children,
    showsical,
    backButtonLabel,
    backButtonHref
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md rounded-xl">
            <CardHeader>
                <HeaderCard label={headerLabel} subTtitle={subHeaderLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>

           <CardFooter>
           {showsical && (
                <Socile />
            )}
           </CardFooter>


           <CardFooter>
            <BackButtonLable backButtonLabel={backButtonLabel} backByttonHref={backButtonHref} />
           </CardFooter>
        </Card>
    )
}