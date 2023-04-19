import { useEffect, useState } from "react";
import { UsuarioService } from "@/services/UsuarioService";
import Home from "@/components/Home";
import Login from "@/components/Login";

const usuarioService = new UsuarioService();
export default function Index() {
  const [estaAutenticado, setEstaAutenticado] = useState(null);

  useEffect(() => {
    setEstaAutenticado(
      usuarioService.estaAutenticado()
    )
  }, [])

  if (estaAutenticado === null) {
    return null
  }

  if (estaAutenticado) {
    return <Home />
  }
  return <Login aposAutenticacao = {() => setEstaAutenticado(true)} />
}
