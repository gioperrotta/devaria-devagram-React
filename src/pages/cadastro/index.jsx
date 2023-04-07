import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { UploadImage } from "@/components/UploadImage";
import { InputPublico } from "@/components/InputPublico";
import { Button } from "@/components/Button";
import { validarNome, validarEmail, validarSenha, validarConfirmacaoSenha } from "@/utils/validadores";

import { UsuarioService } from "@/services/UsuarioService";


import imagemLogo from '../../../public/images/Logo.svg'
import imagemEnvelope from '../../../public/images/Envelope.svg'
import imagemUser from '../../../public/images/userAtivo.svg'
import imagemSenha from '../../../public/images/key.svg'
import imagemAvatar from '../../../public/images/Avatar.svg'

const usuarioService = new UsuarioService();

export default function Cadastro() {
  const [imagem, setImagem] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [estaSubmetendo, setEstaSubmetendo] = useState(false);


  const validarFormulario = () => {
    return (
      validarNome(nome) &&
      validarEmail(email) &&
      validarSenha(senha) &&
      validarConfirmacaoSenha(senha, confirmacaoSenha)
    )
  }

  const aoSubmeter = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }
    setEstaSubmetendo(true)
    try {
      const corpoReqCadastro = new FormData();
      corpoReqCadastro.append("nome", nome);
      corpoReqCadastro.append("email", email);
      corpoReqCadastro.append("senha", senha);
      if (imagem?.arquivo) {
        corpoReqCadastro.append("file", imagem.arquivo);
      }

      await usuarioService.cadastro(corpoReqCadastro);
      alert('Sucesso!')
      // TODO autenticar diretamente após o cadastro

    } catch (error) {
      alert(
        'Erro ao Cadastrar Usuário ' + error?.response?.data?.error
      )
    }
    setEstaSubmetendo(false)
  }

  return (
    <section className="paginaCadastro paginaPublica">
      <div className="logoContainer desktop">
        <Image
          className="logo"
          src={imagemLogo}
          alt={'Logotipo'}
          fill
        />
      </div>
      <div className="conteudoPaginaPublica">
        <form onSubmit={aoSubmeter}>
          <UploadImage
            imagePreviewClassName="avatar avatarPreview"
            imagePreview={imagem?.preview || imagemAvatar.src}
            setImage={setImagem}
          />
          <InputPublico
            iconeInput={imagemUser}
            texto='Nome Completo'
            tipo='text'
            aoAlterarValor={e => setNome(e.target.value)}
            valor={nome}
            exibirMensagemValidacao={nome && !validarNome(nome)}
            mensagemValidacao='O Nome informado é inválido'
          />
          <InputPublico
            iconeInput={imagemEnvelope}
            texto='E-mail'
            tipo='email'
            aoAlterarValor={e => setEmail(e.target.value)}
            valor={email}
            exibirMensagemValidacao={email && !validarEmail(email)}
            mensagemValidacao='O E-mail informado é inválido'
          />
          <InputPublico
            iconeInput={imagemSenha}
            texto='senha'
            tipo='password'
            aoAlterarValor={e => setSenha(e.target.value)}
            valor={senha}
            exibirMensagemValidacao={senha && !validarSenha(senha)}
            mensagemValidacao='Precisa pelo menos 3 caracteres'
          />
          <InputPublico
            iconeInput={imagemSenha}
            texto='Confirmar Senha'
            tipo='password'
            aoAlterarValor={e => setConfirmacaoSenha(e.target.value)}
            valor={confirmacaoSenha}
            exibirMensagemValidacao={confirmacaoSenha && senha && !validarConfirmacaoSenha(senha, confirmacaoSenha)}
            mensagemValidacao='Confirmação de senha não consistente'
          />
          <Button
            texto='Cadastrar'
            tipo='submit'
            desabilitado={!validarFormulario() || estaSubmetendo}
          />
        </form>
        <div className="rodapePaginaPublica">
          <p>Já possui uma conta</p>
          <Link href='/'>Faça seu Login agora</Link>
        </div>
      </div>
    </section>
  )
}