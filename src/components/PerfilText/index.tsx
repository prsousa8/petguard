type PerfilTextProps = {
        descricao: string
    }

export function PerfilText({descricao}:PerfilTextProps){
    
    return(
          <div className="bg-gray-100 text-gray-800 text-base p-4 rounded-md shadow-sm">
            {descricao}
        </div>
    )
}