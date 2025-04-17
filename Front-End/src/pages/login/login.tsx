import { Loader2, Mail, Lock, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { loginService } from "../../service/api";

export default function Login() {
  const { darkMode, setDarkMode } = useTheme();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    const response = await loginService(credentials).catch(
      (error) => error.response
    );

    if (!response || response.status >= 400) {
      setError(response?.data?.message || "Erro ao fazer login.");
      setLoading(false);
      setCredentials({ email: "", password: "" });
      return;
    }

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1500);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-100 dark:bg-stone-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-white dark:bg-stone-800 shadow-lg rounded-lg p-6 border border-amber-300 dark:border-amber-600"
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-amber-700 dark:text-amber-400">
            🌿 Acesso ao Sistema
          </h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-stone-200 dark:bg-stone-700 rounded-full transition-all duration-300 hover:cursor-pointer 
          hover:bg-stone-300 dark:hover:bg-stone-600 hover:scale-110"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-300 hover:rotate-180" />
            ) : (
              <Moon size={20} className="text-stone-800 hover:rotate-360" />
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
              E-mail
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-2.5 text-amber-500"
                size={20}
              />
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full px-10 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring focus:ring-amber-200 focus:outline-none dark:bg-stone-700 dark:text-white"
                placeholder="Digite seu e-mail"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
              Senha
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-2.5 text-amber-500"
                size={20}
              />
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-10 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring focus:ring-amber-200 focus:outline-none dark:bg-stone-700 dark:text-white"
                placeholder="Digite sua senha"
                required
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-sm text-center bg-red-100 p-2 rounded-md border border-red-400 dark:bg-red-800 dark:text-red-200"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-semibold shadow-md transition flex items-center justify-center gap-2 ${
              loading
                ? "bg-stone-400 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
            disabled={loading}
          >
            {loading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              "Entrar"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
