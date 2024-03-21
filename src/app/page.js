"use client";
import BalaoMensagem from "./components/BotaoMensagem";
import { useState, useEffect, useRef } from "react";
import salvar from "./functions/salvar";
import axios from "axios";

export default function Home() {
  const [mensagemAtual, setMensagemAtual] = useState("");
  const [mensagensUsuario, setMensagensUsuario] = useState([]);
  // let mensagensUsuario = [];
  const [mensagensBot, setMensagensBot] = useState([]);
  // const mensagens: Mensagens[] = [{"usuario": "bot", "mensagem": "Olá! Eu sou um assistente virtual do Conselho Municipal da Pessoa com Deficiência. 😊 Como posso ajudar você hoje? Se preferir, posso chamá-lo pelo seu nome. Como devo me referir a você? "}];
  const [mensagens, setMensagens] = useState([])
  const [botFalando, setBotFalando] = useState(false);

  const [context, setContext] = useState("nome");

  const mensagensRef = useRef(null)

  const enviarMensagemInicial = () => {
    setMensagensBot([...mensagensBot, "Olá! Eu sou um assistente virtual do Conselho Municipal da Pessoa com Deficiência. 😊 Como posso ajudar você hoje? Se preferir, posso chamá-lo pelo seu nome. Como devo me referir a você?"])
    setMensagens([...mensagens,  {"usuario": "bot", "mensagem": "Olá! Eu sou um assistente virtual do Conselho Municipal da Pessoa com Deficiência. 😊 Como posso ajudar você hoje? Se preferir, posso chamá-lo pelo seu nome. Como devo me referir a você?"}])
  }

  useEffect(() => {
    setTimeout(enviarMensagemInicial, 1500)
  }, [])

  useEffect(() => {
    console.log(mensagensUsuario)
    setTimeout(responderMensagem, 1500)
  }, [mensagensUsuario])

  useEffect(() => {
    if(mensagensRef.current) {
      mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight;
    }
  }, [mensagens])

  const enviarMensagem = () => {
    if (mensagemAtual.trim() !== "") {
      if (botFalando) {
        setMensagensBot([...mensagensBot, mensagemAtual]);
        setMensagens([...mensagens, {"usuario": "bot", "mensagem": mensagemAtual}])
      } else if(!botFalando) {
        setMensagensUsuario([...mensagensUsuario, mensagemAtual]);
        // mensagensUsuario.push(mensagemAtual)
        setMensagens([...mensagens, {"usuario": "user", "mensagem": mensagemAtual}])
      }
      // console.log(mensagens)
      setBotFalando(!botFalando);
      setMensagemAtual("");
    }
  };

  const salvarMensagem = () => {
    const [ nome, eDeficiente, opcao1 ] = mensagensUsuario;
    axios.post(`/api/form`, {name: nome, isDeficiente: eDeficiente, primaryOption: opcao1})
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  };

  const responderMensagem = () => {
    // responder o nome
    if(context === "nome") {
      if(botFalando) {
        setMensagens([...mensagens, {"usuario": "bot", "mensagem": 

        `Ótimo, ${mensagensUsuario.slice(-1)[0]}! É um prazer ajudar. Agora, por favor, digite o número correspondente à sua situação:
        
        1. Se você é uma pessoa com deficiência.
        
        2. Se você é o acompanhante de uma pessoa com deficiência.
        
        Digite o número que melhor se aplica à sua situação, e estarei aqui para fornecer a assistência necessária. `}])
        
        // setMensagemAtual("");
        setContext("deficiencia");
        setBotFalando(!botFalando);
      }
    } 
    // responder sobre deficiencia
    else if(context === "deficiencia") {
      if(botFalando) {
        setMensagens([...mensagens, {"usuario": "bot", "mensagem": `Aqui estão algumas opções de serviços que posso fornecer:

        1. Informações Gerais: Se precisar de informações sobre os serviços oferecidos pelo Conselho ou eventos futuros, estou aqui para ajudar.
        
        2. Acessibilidade: Caso tenha dúvidas sobre acessibilidade em locais públicos, transporte ou necessite de orientações sobre adaptações, pergunte-me!
        
        3. Legislação: Se precisar de informações sobre legislação relacionada à pessoa com deficiência, estou à disposição para fornecer orientações.
        
        4. Denúncias e Sugestões: Caso tenha alguma denúncia ou sugestão para melhorias em nossa cidade no que diz respeito à acessibilidade, sinta-se à vontade para compartilhar.
        
        Digite o número correspondente à sua solicitação ou escreva sua pergunta. Estou aqui para ajudar! 🤖`}])
        // setMensagemAtual("");
        setContext("inicial");
        setBotFalando(!botFalando)
      }
    }
    else if(context === "inicial") {
      const ultimaMsg = mensagensUsuario.slice(-1)[0];
      if(botFalando && ultimaMsg==="1") {
        setMensagens([...mensagens, {"usuario": "bot", "mensagem": `1. Missão e Objetivos do Conselho.  (Forneça uma breve descrição sobre a missão e os objetivos do Conselho, destacando seu compromisso em promover a inclusão e os direitos das pessoas com deficiência.)

        2. Serviços Oferecidos. (Liste os principais serviços que o Conselho Municipal da Pessoa com Deficiência oferece à comunidade, como a promoção da acessibilidade, orientações legais, eventos educativos, entre outros.)
        
        3. Eventos e Atividades Futuras. (Informe sobre eventos, workshops, seminários ou outras atividades futuras relacionadas à inclusão e conscientização sobre deficiência que podem ser de interesse para a comunidade.)
        
        4. Contato e Horário de Atendimento. (Forneça informações sobre como entrar em contato com o Conselho, incluindo endereço de e-mail, telefone e horários de atendimento presencial, se aplicável.)
        
        5. Recursos Online. (Se houver um site ou recursos online relevantes, forneça links para acesso fácil a documentos, guias ou outras informações úteis.)
        
        6. Parcerias e Colaborações. (Destaque parcerias ou colaborações significativas que o Conselho mantém com outras organizações locais, estaduais ou nacionais.)`}])
        // setMensagemAtual("")
        setContext("secundario");
        setBotFalando(!botFalando)
        // console.log(context)
      }
      else if(botFalando && ultimaMsg==="2") {
        setMensagens([...mensagens, {"usuario": "bot", "mensagem": `1. Locais Públicos. (Forneça orientações sobre como acessar e identificar locais públicos adaptados para pessoas com deficiência, como parques, bibliotecas e prédios governamentais.)

        2. Transporte Acessível. (Informe sobre opções de transporte público acessíveis e forneça orientações sobre como solicitar serviços de transporte adaptado, se disponíveis.)
        
        3. Adaptações Residenciais. (Ofereça dicas e recursos sobre como tornar residências mais acessíveis, incluindo informações sobre tecnologias assistivas e modificações estruturais.)`}])
        // setMensagemAtual("")
        setContext("secundario");
        setBotFalando(!botFalando);
      }
      else if(botFalando && ultimaMsg==="3") {
        setMensagens([...mensagens, {"usuario": "bot", "mensagem": `1. Leis de Acessibilidade. (Forneça resumos das principais leis locais, estaduais e federais relacionadas à acessibilidade e aos direitos das pessoas com deficiência.)

        2. Direitos Individuais. (Explicite os direitos individuais garantidos por lei, como acessibilidade ao trabalho, à educação, ao transporte e à participação em eventos públicos.)
        
        3. Processos de Denúncia. (Esclareça o processo para registrar denúncias de discriminação ou falta de acessibilidade, incluindo informações sobre como o Conselho pode apoiar nesses casos.)`}])
        setContext("secundario");
        setBotFalando(!botFalando);
      }
      else if(botFalando && ultimaMsg==="4") {
        setMensagens([...mensagens, {"usuario": "bot", "mensagem": `1. Canal de Denúncias. (Forneça detalhes sobre como os usuários podem apresentar denúncias relacionadas à falta de acessibilidade ou discriminação.)
        
        2. Acompanhamento de Denúncias. (Explique o processo de acompanhamento das denúncias, incluindo prazos e como as partes interessadas podem ser informadas sobre os resultados.)
        
        3. Sugestões para Melhorias. (Encoraje os usuários a compartilhar sugestões para melhorar a acessibilidade na comunidade, explicando como suas contribuições podem fazer a diferença.)`}])
        setContext("secundario");
        setBotFalando(!botFalando)
      }
      salvarMensagem();
    }
    else if(context === "secundario") {
      salvarMensagem();
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-222831">
      <div className="h-1/6 w-full flex flex-col justify-center items-center">
        <h1 className="text-4xl text-white font-bold">Conselho Municipal da Pessoa com Deficiência</h1>
      </div>
      <div className="h-full w-2/3 flex flex-row justify-center items-center border rounded-lg border-31363F p-4 bg-31363F overflow-y-scroll" style={{ maxHeight: 'calc(100vh - 200px)' }} ref={mensagensRef}>
        <div className="w-full h-100 flex flex-col justify-end items-start">
          {mensagens.map((msg, index) => (
            msg["usuario"]==="bot" ? <BalaoMensagem key={`bot-${index}`} cor="white" mensagem={`${msg["mensagem"]}`} /> : <BalaoMensagem key={`user-${index}`} cor="blue" mensagem={`${msg["mensagem"]}`} />
          ))}
        </div>
      </div>
      <div className="h-1/6 w-2/3 flex flex-row justify-center items-center prose">
        <input
          value={mensagemAtual}
          onChange={(e) => setMensagemAtual(e.target.value)}
          className="w-full p-2 rounded-md border border-222831 focus:border-222831 bg-31363F outline-none text-white"
          placeholder="Digite algo:"
        />
        <button onClick={enviarMensagem} className="w-80 p-2 rounded-md border border-222831 focus:border-222831 bg-31363F outline-none m-6">
          <h2 className="text-white font-bold text-2xl">Enviar</h2>
        </button>
      </div>
    </div>
  );
}

