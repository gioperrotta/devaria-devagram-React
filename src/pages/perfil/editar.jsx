import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

import comAutorizacao from "@/hoc/comAutorizacao"
import HeaderComAcoes from "@/components/HeaderComAcoes"
import UploadImage from "@/components/UploadImage"
import imgAvatarDefault from '../../../public/images/Avatar.svg'
import imgLimpar from '../../../public/images/Limpar.svg'
import { UsuarioService } from "@/services/UsuarioService"
import { validarNome } from "@/utils/validadores"

const userService = new UsuarioService();

function EditarPerfil({ usuarioLogado }) {
  const [avatar, setAvatar] = useState(null)
  const [nome, setNome] = useState('')
  const [inputAvatar, setInputAvatar] = useState()
  const router = useRouter()

  useEffect(() => {
    if (!usuarioLogado) {
      return;
    }
    setNome(usuarioLogado.nome)
    setAvatar({
      preview: usuarioLogado.avatar
    })
  },[])

  const atualizarPerfil = async () => {
    try {
      if (!validarNome(nome)) {
        alert('Nome precisa de pelo menos dois caractres')
        return
      }
      const corpoRequisicao = new FormData();
      corpoRequisicao.append('nome', nome);

      console.log('ESTOU AQUI', avatar.arquivo)

      if(avatar?.arquivo) {
        corpoRequisicao.append('file', avatar.arquivo)
      }
      
      await userService.atualizarPerfil(corpoRequisicao)
      localStorage.setItem('nome', nome)
      if(avatar.arquivo) {
        localStorage.setItem('avatar', avatar.preview)
      }

      router.push('/perfil/eu')
    } catch (error) {
      alert('Erro ao editar perfil')
    }
  }

  const abrirSeletorDeArquivos = () => {
    inputAvatar?.click();
  }
  const aoCancelarEdicao = () => {
    router.push('/perfil/eu');
  }
  return (
    <div className="paginaEditarPerfil largura30pctDesktop">
      <div className="conteudoPaginaEditarPerfil">
        <HeaderComAcoes
          titulo={'Editar perfil'}
          textoEsquerda={'Cancelar'}
          aoClicarElementoEsquerda={aoCancelarEdicao}
          elementoDireita={'Concluir'}
          aoClicarElementoDireita={atualizarPerfil}
        />

        <hr className="linhaDivisoria" />

        <div className="edicaoAvatar">
          <UploadImage
            setImage={setAvatar}
            imagePreview={avatar?.preview || imgAvatarDefault.src}
            imagePreviewClassName='avatar'
            aoSetarAReferencia={setInputAvatar}
          />
          <span onClick={abrirSeletorDeArquivos}>Alterar foto do perfil</span>
        </div>

        <hr className="linhaDivisoria" />

        <div className="edicaoNome">
          <label htmlFor="">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Image
            src={imgLimpar}
            alt='icone limpar'
            width={16}
            height={16}
            onClick={() => setNome('')}
          />
        </div>
        <hr className="linhaDivisoria" />
      </div>
    </div>
  )
}

export default comAutorizacao(EditarPerfil)