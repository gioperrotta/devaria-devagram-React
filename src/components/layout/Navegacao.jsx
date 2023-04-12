import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import imgHomeAtivo from '../../../public/images/homeAtivo.svg';
import imgHomeCinza from '../../../public/images/homeCinza.svg';
import imgComentarioAtivo from '../../../public/images/comentarioAtivo.svg';
import imgComentarioCinza from '../../../public/images/comentarioCinza.svg';
import imgPublicacaoAtivo from '../../../public/images/publicacaoAtivo.svg';
import imgPublicacaoCinza from '../../../public/images/publicacaoCinza.svg';
import imgUserAtivo from '../../../public/images/userAtivo.svg';
import imgUserCinza from '../../../public/images/userCinza.svg';

const mapaDeRotas = {
  home: {
    imagemAtivo: imgHomeAtivo,
    rotasAtivacao: ['/'],
    imagemPadrao: imgHomeCinza
  },
  publicacao: {
    imagemAtivo: imgPublicacaoAtivo,
    rotasAtivacao: ['/publicacao'],
    imagemPadrao: imgPublicacaoCinza
  },
  perfil: {
    imagemAtivo: imgUserAtivo,
    rotasAtivacao: ['/perfil/eu', '/perfil/eu/editar'],
    imagemPadrao: imgUserCinza
  }
}

export function Navegacao({ className }) {
  const [rotaAtiva, setRotaAtiva] = useState('home');
  const router = useRouter();

  useEffect(() => {
    definirRotaAtiva()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  const definirRotaAtiva = () => {
    const chavesDoMapaDeRotas = Object.keys(mapaDeRotas);
    const indiceAtivo = chavesDoMapaDeRotas.findIndex(chave => {
      return mapaDeRotas[chave].rotasAtivacao.includes(router.asPath)
    })
    if (indiceAtivo === -1) {
      setRotaAtiva('home')
    } else {
      setRotaAtiva(chavesDoMapaDeRotas[indiceAtivo])
    }
  }

  const obterImagem = (nomeRota) => {
    const rotaAtivada = mapaDeRotas[nomeRota]
    if (rotaAtiva === nomeRota) {
      return rotaAtivada.imagemAtivo;
    }
    return rotaAtivada.imagemPadrao;
  }

  const aoClicarNoIcone = (nomeRota) => {
    setRotaAtiva(nomeRota);
    router.push(mapaDeRotas[nomeRota].rotasAtivacao[0])
  }

  return (
    <nav className= {`barraNavegacao ${className}`}>
      <ul>
        <li onClick={() => aoClicarNoIcone('home')}>
          <Image
            src={obterImagem('home')}
            alt='Icone Home'
            width={20}
            height={20}
          />
        </li>
        <li onClick={() => aoClicarNoIcone('publicacao')}>
          <Image
            src={obterImagem('publicacao')}
            alt='Icone Publicacao'
            width={20}
            height={20}
          />
        </li>
        <li onClick={() => aoClicarNoIcone('perfil')}>
          <Image
            src={obterImagem('perfil')}
            alt='Icone Usuario'
            width={20}
            height={20}
          />
        </li>
      </ul>
    </nav>

  )
}