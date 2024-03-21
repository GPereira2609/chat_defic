import React from 'react'

function BalaoMensagem(props) {
    const { mensagem, cor } = props;

    const renderizarMensagem = () => {
        const linhas = mensagem.split('\n');
        return linhas.map((linha, index) => (
          <React.Fragment key={index}>
            {linha}
            <br />
          </React.Fragment>
        ));
      };

  return (
    <div className='flex flex-col w-full'>
        {cor=="blue" && (
            <div className="w-80 h-full flex flex-col justify-center items-start m-6 border rounded rounded-lg bg-blue-700 border-blue-700">
                <h3 className='text-sm text-white text-bold text-justify m-6'>
                    {mensagem}
                </h3>
            </div>
        )}
        {cor=="white" && (
            <div className='w-80 h-full flex flex-col justify-center items-start m-6 border rounded rounded-lg bg-white '>
                <h3 className='text-sm text-black text-bold text-justify m-6 break-normal'>
                    {renderizarMensagem(mensagem)}
                </h3>
            </div>

        )}
        {cor=="hidden" && (
            <div className="hidden w-80 h-full flex flex-col justify-center items-start m-6 border rounded rounded-lg bg-blue-700 border-blue-700">
                <h2 className='hidden text-1xl text-white text-bold m-6'></h2>
            </div>
        )}
    </div>
  )
}

export default BalaoMensagem