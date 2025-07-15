import Image from "next/image";

type PerfilImageProps = {
    ImageName: string,
    ImageAlt: string
}

export function PerfilImage({ImageName,ImageAlt}:PerfilImageProps){
    return(
        <div className="w-32 h-32 relative rounded-full overflow-hidden shadow-md">
            <Image src={`/assets/img/${ImageName}`} alt={ImageAlt} fill className="object-cover" />
        </div>
    )
}