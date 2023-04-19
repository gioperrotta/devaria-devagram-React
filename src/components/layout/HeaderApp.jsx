import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logoHeader from '../../../public/images/LogoHeader.svg';
import imagemLupa from '../../../public/images/search.svg';
import { Navegacao } from './Navegacao';
import { ResultadoPesquisa } from './ResultadoPesquisa';
import { UsuarioService } from '@/services/UsuarioService';

const usuarioService  = new UsuarioService();

export default function HeaderApp() {
  const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
  const [termoPesquisado, setTermoPesquisado] = useState('');
  const router = useRouter();

  let cabecalhoClassName = '';
  if (window && window.location.pathname !== '/') {
    cabecalhoClassName = 'desktop'
  }

  const aoPesquisar = async (e) => {
    setTermoPesquisado(e.target.value);
    setResultadoPesquisa([]);
    
    if (termoPesquisado.length < 2 ) {
      return
    }

    try {
      const {data} = await usuarioService.pesquisar(termoPesquisado)
      setResultadoPesquisa(data)
    } catch (error) {
      alert('Erro ao pesquisar usuarios. ' + error?.response?.data?.erro)
    }
  }

  const aoClicarResultadoPesquisa = (id) => {
    setResultadoPesquisa([]);
    setTermoPesquisado('');
    router.push(`/perfil/${id}`)
  }

  const redirecionarParaHome = () => {
    router.push('/')
  }

  return (
    <header className={`cabecalhoPrincipal ${cabecalhoClassName}`}>
      <div className="conteudoCabecalhoPrincipal">
        <div className="logoCabecalhoPrincipal">
          <Image
            onClick={redirecionarParaHome}
            src={logoHeader}
            alt='logo Devagram'
            fill
          />
        </div>
        <div className="barraPesquisa">
          <div className="containerImagemLupa">
            <Image
              src={imagemLupa}
              alt='Icone da lupa'
              fill
            />
          </div>
          <input
            type="text"
            placeholder='Pesquisar'
            value={termoPesquisado}
            onChange={aoPesquisar}
          />
        </div>
        <Navegacao className='desktop' />
      </div>
      {resultadoPesquisa.length > 0 && (
        <div className='reultadoPesquisaContainer'>
          {resultadoPesquisa.map(r => (
            <ResultadoPesquisa
              key={r._id}
              id={r._id}
              avatar={r.avatar}
              email={r.email}
              nome={r.nome}
              onClick={aoClicarResultadoPesquisa}
            />
          ))}

        </div>
      )}
    </header>
  )
}