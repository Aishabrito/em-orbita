import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { User, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { AuthLayout, AuthCard, AuthInput, AuthButton } from '../components/authComponents';
import Footer from '../components/footer'; // Importando o Footer

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(user, { displayName: formData.name });
      navigate('/orbita');
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Este e-mail já está em uso.');
          break;
        case 'auth/invalid-email':
          setError('E-mail inválido.');
          break;
        case 'auth/weak-password':
          setError('Senha muito fraca. Use pelo menos 6 caracteres.');
          break;
        default:
          setError('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col min-h-screen w-full items-center justify-center pt-20">
        <AuthCard animation="slide-in-from-right">
          <div className="text-center mb-6">
            <h1 className="font-titulo text-3xl font-bold text-white tracking-widest drop-shadow-lg mb-1">CRIAR CONTA</h1>
            <p className="text-gray-400 text-sm font-light">Prepare-se para o lançamento.</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput icon={User} type="text" name="name" placeholder="Nome do Astronauta" required onChange={handleChange} />
            <AuthInput icon={Mail} type="email" name="email" placeholder="seu@email.com" required onChange={handleChange} />
            <AuthInput icon={Lock} type="password" name="password" placeholder="Crie uma senha forte (mín. 6)" required onChange={handleChange} />

            <AuthButton type="submit" disabled={loading}>
              {loading ? 'Criando conta...' : <> Registrar <ArrowRight size={16} /> </>}
            </AuthButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Já tem uma conta?{' '}
              <button onClick={() => navigate('/login')} className="text-cyan-400 hover:text-white font-bold ml-1 transition-colors">
                Entrar
              </button>
            </p>
          </div>
        </AuthCard>
        
        {/* Footer adaptado para Auth */}
        <div className="w-full max-w-4xl px-6 mt-auto">
          <Footer />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Cadastro;