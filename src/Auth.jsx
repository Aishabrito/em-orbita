import { useState } from 'react'
import { supabase } from './lib/supabase'

export function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) alert(error.message)
    else alert('Usuário criado com sucesso!')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) alert(error.message)
  }

  return (
    <div className="flex flex-col gap-4 p-6 border border-slate-700 rounded-xl max-w-sm bg-slate-900 shadow-2xl">
      <h2 className="text-2xl font-bold text-white">Entrar no Em Órbita</h2>
      
      <input 
        type="email" 
        placeholder="Seu e-mail" 
        className="p-2 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none focus:border-blue-500"
        onChange={(e) => setEmail(e.target.value)} 
      />
      
      <input 
        type="password" 
        placeholder="Sua senha" 
        className="p-2 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none focus:border-blue-500"
        onChange={(e) => setPassword(e.target.value)} 
      />

      <div className="flex flex-col gap-2 mt-2">
        <button 
          onClick={handleLogin} 
          className="bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-500 transition-colors"
        >
          Entrar
        </button>
        
        <button 
          onClick={handleSignUp} 
          className="text-slate-400 text-sm underline hover:text-white transition-colors"
        >
          Criar conta nova
        </button>
      </div>
    </div>
  )
}