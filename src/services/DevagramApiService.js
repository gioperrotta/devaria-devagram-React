import axios from 'axios';
import { LoaderHelper } from '@/helpers/LoaderHelper';

export class DevagramApiService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL + '/api'
    });

    this.quantidadeRequisicoes = 0

    this.axios.interceptors.request.use((config) => {
      this.quantidadeRequisicoes++
      if (this.quantidadeRequisicoes === 1) {
        LoaderHelper.exibir();
      }

      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Beaver ${token}`
      }
      return config
    })

    this.axios.interceptors.response.use((response) => {
      this.quantidadeRequisicoes--
      if (this.quantidadeRequisicoes === 0) {
        LoaderHelper.ocultar();
      }
      return response
    })

  }

  post(url, data) {
    return this.axios.post(url, data)
  }

  get(url) {
    return this.axios.get(url);
  }

  put(url, data) {
    return this.axios.put(url, data)
  }
}