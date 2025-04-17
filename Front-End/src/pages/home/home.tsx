import { useState, useEffect } from "react";
import useProducts from "../../hook/useProducts";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { Sun, Moon, Plus, Minus, Trash, Pencil } from "lucide-react";
import { motion } from "framer-motion";

export default function Estoque() {
  const { products, updateProductAmount, handleDeleteProduct } = useProducts();
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();

  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const produtosFiltrados = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(filtroNome.toLowerCase()) &&
      (filtroCategoria ? product.category === filtroCategoria : true)
    );
  });

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-stone-900 text-stone-200" : "bg-stone-100 text-stone-800"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex-1 text-center text-amber-700 dark:text-amber-400">
          Controle de Estoque
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-stone-200 dark:bg-stone-700 rounded-full transition-all duration-300 hover:cursor-pointer hover:bg-stone-300 dark:hover:bg-stone-600 hover:scale-110"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-300" />
            ) : (
              <Moon size={20} className="text-stone-800" />
            )}
          </button>

          <button
            onClick={() => navigate("/create")}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-700 cursor-pointer transition shadow-md"
          >
            <Plus size={16} /> Criar Produto
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Filtrar por nome..."
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          className="p-2 border rounded-lg text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-600"
        />
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="p-2 border rounded-lg text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-600"
        >
          <option value="">Todas as Categorias</option>
          {[...new Set(products.map((p) => p.category))].map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtosFiltrados.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative p-5 shadow-lg rounded-xl transition-transform transform hover:-translate-y-2 hover:shadow-xl flex flex-col items-center border border-amber-300 dark:border-amber-600 bg-white dark:bg-stone-800"
          >
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => navigate(`/update/ `, { state: { product } })}
                className="group relative p-2 bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 dark:text-stone-200 rounded-full dark:hover:bg-stone-600 cursor-pointer transition shadow-md"
              >
                <Pencil size={16} />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-blue-600 text-white text-xs rounded px-2 py-1 transition-opacity">
                  Editar Produto
                </span>
              </button>

              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="group relative p-2 bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 dark:text-stone-200 rounded-full dark:hover:bg-stone-600 cursor-pointer transition shadow-md"
              >
                <Trash size={16} />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-red-600 text-white text-xs rounded px-2 py-1 transition-opacity">
                  Deletar Produto
                </span>
              </button>
            </div>

            <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-300">
              {product.name}
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              🏷️ Categoria: {product.category}
            </p>
            <p className="text-stone-700 dark:text-stone-300 font-medium">
              📦 Quantidade: {product.amount}
            </p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => updateProductAmount(product.id, "incrementar")}
                className="p-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 cursor-pointer transition shadow-md"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={() => updateProductAmount(product.id, "decrementar")}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer transition shadow-md"
              >
                <Minus size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {produtosFiltrados.length === 0 && (
        <p className="text-center text-stone-500 dark:text-stone-400 mt-4">
          Nenhum produto encontrado.
        </p>
      )}
    </div>
  );
}