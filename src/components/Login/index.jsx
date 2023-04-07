import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { UsuarioService } from "@/services/UsuarioService";

import { InputPublico } from "../InputPublico";
import { Button } from "../Button";
import { validarEmail, validarSenha } from "@/utils/validadores";

import imagemEnvelope from '../../../public/images/Envelope.svg'
import imagemSenha from '../../../public/images/key.svg'
import imagemLogo from '../../../public/images/Logo.svg'

const usuarioService = new UsuarioService();

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [estaSubmetendo, setEstaSubmetendo] = useState(false);

  const validarFormulario = () => {
    return validarEmail(email) && validarSenha(senha)
  }

  const aoSubmeter = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return
    }
    setEstaSubmetendo(true);
    try {
      usuarioService.login({
        email,
        senha
      })
      // TODO redirecioonar o usuario para home
    } catch (error) {
      alert(
        'Erro ao realizar Login. ' + error?.response?.data?.error
      )
      
    }
    setEstaSubmetendo(false);
  }

  return (
    <section className="paginaLogin paginaPublica">
      <div className="logoContainer">
        <Image
          className="logo"
          src={imagemLogo}
          alt={'Logotipo'}
          fill          
        />
      </div>
      <div className="conteudoPaginaPublica">
        <form onSubmit={aoSubmeter}>
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
          <Button
            texto='Login'
            tipo='submit'
            desabilitado={!validarFormulario() || estaSubmetendo}
          />
        </form>
        <div className="rodapePaginaPublica">
          <p>Não possui uma conta</p>
          <Link href='/cadastro'>Faça seu cadastro agora</Link>
        </div>
      </div>
    </section>
  )
}