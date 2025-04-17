import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { Loader, Moon, Sun } from "lucide-react";
import useProducts from "../../hook/useProducts";

export default function UpdateProduct() {
  const location = useLocation();
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();
  const { handleUpdateProduct } = useProducts();

  const product = location.state.product;

  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name || "",
    category: product.category || "",
    amount: product.amount || 0,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await handleUpdateProduct(formData);
    navigate("/");
    setLoading(false);
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-stone-900 text-white transition-all duration-500 ease-in-out"
          : "bg-stone-100 text-black transition-all duration-500 ease-in-out"
      } min-h-screen p-6`}
    >
      <div
        className={`max-w-lg mx-auto p-6 rounded-lg shadow-lg ${
          darkMode ? "bg-stone-800" : "bg-white"
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`text-xl font-bold ${
                darkMode ? "text-amber-400" : "text-amber-700"
              }`}
            >
              Atualizar Produto
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
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg focus:outline-none ${
                darkMode
                  ? "bg-stone-700 text-white border-stone-600 focus:ring-amber-200"
                  : "bg-white text-black border-stone-300 focus:ring-amber-200"
              }`}
              required
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
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg focus:outline-none ${
                darkMode
                  ? "bg-stone-700 text-white border-stone-600 focus:ring-amber-200"
                  : "bg-white text-black border-stone-300 focus:ring-amber-200"
              }`}
              required
            />
          </div>

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
              value={formData.amount}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg focus:outline-none ${
                darkMode
                  ? "bg-stone-700 text-white border-stone-600 focus:ring-amber-200"
                  : "bg-white text-black border-stone-300 focus:ring-amber-200"
              }`}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 flex justify-center items-center gap-2 rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white transition`}
          >
            {loading ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              "Atualizar Produto"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
