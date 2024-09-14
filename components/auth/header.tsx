"use client";

interface HeaderProps {
    label: string;
    subTtitle: string;
}


export const HeaderCard = ({
    label,
    subTtitle
}: HeaderProps) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-xl font-semibold items-center justify-center">{label}</h1>
            <p className="text-sm text-gray-500 flex items-center justify-center">{subTtitle}</p>
        </div>
    )
}