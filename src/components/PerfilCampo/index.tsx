type CampoProps = {
    campoTitulo: string,
    campoInfo: string,
};

export function PerfilCampo({campoTitulo, campoInfo}:CampoProps){
    return(
        <div>
          <p className="text-sm text-gray-500">{campoTitulo}</p>
          <p className="text-base text-gray-800 font-medium">{campoInfo}</p>
          <div className="border-b border-gray-300 mt-1" />
        </div>
    )
}