import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Rocket, ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';
import { AuthLayout, AuthCard, AuthInput, AuthButton } from '../components/authComponents';
import Footer from '../components/footer'; // Importando o Footer

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/orbita');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('E-mail ou senha incorretos.');
          break;
        case 'auth/too-many-requests':
          setError('Muitas tentativas. Tente novamente mais tarde.');
          break;
        default:
          setError('Erro ao entrar. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col min-h-screen w-full items-center justify-center pt-20">
        <AuthCard animation="slide-in-from-left">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Rocket className="text-cyan-400 drop-shadow-lg" size={40} />
            </div>
            <h1 className="font-titulo text-3xl font-bold text-white tracking-widest drop-shadow-lg">LOGIN</h1>
            <p className="text-gray-400 text-sm font-light mt-1">Bem-vindo de volta, comandante.</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
              icon={Mail}
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <AuthInput
              icon={Lock}
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/recuperar-senha')}
                className="text-xs text-gray-400 hover:text-cyan-400 transition-colors font-light"
              >
                Esqueceu a senha?
              </button>
            </div>

            <AuthButton type="submit" variant="purple" disabled={loading}>
              {loading ? 'Decolando...' : <> Decolar <ArrowRight size={16} /> </>}
            </AuthButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Ainda não tem cadastro?{' '}
              <button
                onClick={() => navigate('/cadastro')}
                className="text-purple-400 hover:text-white font-bold ml-1 transition-colors"
              >
                Criar Conta
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

export default Login;