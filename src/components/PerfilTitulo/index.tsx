type TituloProps = {
    TituloInfo: string
}

export function PerfilTitulo ({TituloInfo}:TituloProps){
    return(<h1 className="text-2xl font-bold text-indigo-700 text-left mb-6">{TituloInfo}</h1>)
}