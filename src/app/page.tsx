'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineMail } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'

export default function Home() {

  const [email, setEmail] = useState('')
  const [nome, setNome] = useState('')
  const [totalLeads, setTotalLeads] = useState(0)
  const [mostrarMensagemExito, setMostrarMensagemExito] = useState(false)

  useEffect(() => {
    const fetchTotalLeads = async () => {
      try {
        const resposta = await axios.get('/api/registro')
        setTotalLeads(resposta.data.totalLeads)
      } catch(erro){
        console.log(erro)
      }
    }
    fetchTotalLeads()
  }, [])
  

  const aoSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    
    axios.post('/api/registro', ({ nome, email }))
    .then(() => {
        alert('Cadastrado com sucesso!')
        setMostrarMensagemExito(true)
      })
      .catch((err) => {
        console.log(err)
        alert('Opa, alguma coisa deu errado...')
      })

    setEmail('')
    setNome('')

  }

  return (
    <main className={styles.main}>
      <link rel='icon' href='/icon.png' type='image/<generated>' sizes='<generated>'/>
      <div className={styles.container}>
        <Image src='/hugo.jpg' alt='Hugo' width={100} height={100} className={styles.imagem} />
        <h2>Newsletter do Advogado Socialista</h2>
        <p>Junte-se a outros {totalLeads} camaradas:</p>
        <form onSubmit={aoSubmit}>
          <div className={styles.inputz}>
            <div className={styles.inputzin}>
              <BsFillPersonFill />
              <input
                onChange={(e) => setNome(e.target.value)}
                value={nome}
                type='nome'
                required={true}
                placeholder='Nome...' />
            </div>
            <div className={styles.inputzin}>
              <AiOutlineMail />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email'
                required={true}
                placeholder='Email...' />
            </div>
          </div>
          <button>Inscrever-se ☭</button>
        </form>
        {mostrarMensagemExito && (<p className={styles.mensagemexito}>Agora você faz parte da Newsletter Socialista! Por favor, cheque seu e-mail, inclusive o lixo eletrônico.</p>)}
      </div>
    </main>
  )
}
