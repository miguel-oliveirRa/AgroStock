import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useProducts from "../../hook/useProducts";
import { newProduct } from "../../Types/newProduct";
import { useTheme } from "../../Context/ThemeContext";
import { Loader2, Moon, Sun } from "lucide-react";

export default function CreateProduct() {
  const { handleCreateProduct } = useProducts();
  const [product, setProduct] = useState<newProduct>({
    name: "",
    amount: 0,
    category: "",
  });
  const [customCategory, setCustomCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    setDarkMode(savedTheme === "true");
  }, []);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const finalCategory =
      product.category === "Outro" ? customCategory : product.category;

    if (!product.name || !finalCategory || product.amount < 1) {
      setErrorMessage("Preencha todos os campos corretamente!");
      return;
    }

    if (product.name.trim() === "") {
      setErrorMessage(
        "O Nome do Produto é obrigatório e não pode conter apenas espaços em branco!"
      );
      return;
    }

    setLoading(true);
    setErrorMessage("");
    await handleCreateProduct({ ...product, category: finalCategory });
    setLoading(false);
    setProduct({ name: "", amount: 0, category: "" });
    setCustomCategory("");
    navigate("/");
  }

  return (
    <div
      className={`${
        darkMode
          ? "bg-stone-900 transition-all duration-500 ease-in-out"
          : "bg-stone-100 transition-all duration-500 ease-in-out"
      } min-h-screen flex flex-col items-center p-6`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`max-w-md w-full p-6 shadow-lg rounded-lg border ${
          darkMode
            ? "bg-stone-800 border-stone-600"
            : "bg-white border-stone-300"
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between mb-5">
            <h2
              className={`text-3xl font-bold ${
                darkMode ? "text-amber-400" : "text-amber-700"
              }`}
            >
              🌿 Criar Novo Produto
            </h2>
            <button
              onClick={() => setDarkMode(!darkMode)}
              type="button"
              className={`p-2 rounded-full transition-all duration-300 hover:cursor-pointer hover:scale-110 ${
                darkMode
                  ? "bg-stone-700 hover:bg-stone-600"
                  : "bg-stone-200 hover:bg-stone-300"
              }`}
            >
              {darkMode ? (
                <Sun size={20} className="text-amber-500" />
              ) : (
                <Moon size={20} className="text-amber-500" />
              )}
            </button>
          </div>

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-red-600 mb-4 p-2 border border-red-600 bg-red-100 dark:bg-red-800 dark:text-red-200 rounded"
            >
              {errorMessage}
            </motion.div>
          )}

          <div>
            <label
              className={`block text-base font-medium ${
                darkMode ? "text-amber-300" : "text-amber-700"
              }`}
            >
              Nome do Produto
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 rounded-lg focus:ring focus:outline-none ${
                darkMode
                  ? "bg-stone-800 text-white border border-stone-600 focus:ring-amber-200"
                  : "bg-white border border-stone-300 focus:ring-amber-200"
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-base font-medium ${
                darkMode ? "text-amber-300" : "text-amber-700"
              }`}
            >
              Categoria
            </label>
            <select
              name="category"
              value={product.category}
              onChange={(e) => {
                handleChange(e);
                setCustomCategory(
                  e.target.value === "Outro" ? "" : e.target.value
                );
              }}
              className={`w-full px-3 py-2 rounded-lg focus:ring focus:outline-none ${
                darkMode
                  ? "bg-stone-800 text-white border border-stone-600 focus:ring-amber-200"
                  : "bg-white border border-stone-300 focus:ring-amber-200"
              }`}
            >
              <option value="" disabled>
                Selecione...
              </option>
              <option value="Grãos">Grãos</option>
              <option value="Frutas">Frutas</option>
              <option value="Vegetais">Vegetais</option>
              <option value="Carnes">Carnes</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          {product.category === "Outro" && (
            <div>
              <label
                className={`block text-base font-medium ${
                  darkMode ? "text-amber-300" : "text-amber-700"
                }`}
              >
                Digite a Categoria
              </label>
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                pattern="^[a-zA-Z]+$"
                title="Por favor, insira apenas letras."
                required
                className={`w-full px-3 py-2 rounded-lg focus:ring focus:outline-none ${
                  darkMode
                    ? "bg-stone-800 text-white border border-stone-600 focus:ring-amber-200"
                    : "bg-white border border-stone-300 focus:ring-amber-200"
                }`}
              />
            </div>
          )}

          <div>
            <label
              className={`block text-base font-medium ${
                darkMode ? "text-amber-300" : "text-amber-700"
              }`}
            >
              Quantidade
            </label>
            <input
              type="number"
              name="amount"
              value={product.amount}
              onChange={handleChange}
              min="1"
              required
              className={`w-full px-3 py-2 rounded-lg focus:ring focus:outline-none ${
                darkMode
                  ? "bg-stone-800 text-white border border-stone-600 focus:ring-amber-200"
                  : "bg-white border border-stone-300 focus:ring-amber-200"
              }`}
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-2 rounded-lg text-white font-semibold shadow-md transition flex items-center justify-center hover:cursor-pointer ${
              loading
                ? "bg-stone-400 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {loading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              "Criar Produto"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
