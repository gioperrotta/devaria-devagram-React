import { useEffect, useState } from "react";
import { UsuarioService } from "@/services/UsuarioService";
import Home from "@/components/Home";
import Login from "@/components/Login";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const usuarioService = new UsuarioService();
export default function Index() {
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  useEffect(() => {
    setEstaAutenticado(
      usuarioService.estaAutenticado()
    )
  }, [])

  if (estaAutenticado) {
    return <Home />
  }
  return <Login aposAutenticacao = {() => setEstaAutenticado(true)} />

}
