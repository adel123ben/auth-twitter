import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { GenericAvatarIcon } from "@chakra-ui/react"



interface AvatarProps {
    image?: string | null,
}
  
  export function AvatarUserImage({
    image
  }: AvatarProps) {
    return (
      <Avatar>
        <AvatarImage src={image || ""} alt="userImage" />
        <AvatarFallback>
            <GenericAvatarIcon />
        </AvatarFallback>
      </Avatar>
    )
  }
  