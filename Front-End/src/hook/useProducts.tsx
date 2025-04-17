import { useEffect, useState } from "react";
import { Product } from "../Types/Product";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateAmount,
  updateProduct,
} from "../service/api";
import { newProduct } from "../Types/newProduct";
import { toast } from "react-toastify";

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const updateProductAmount = async (
    id: number,
    operation: "incrementar" | "decrementar"
  ) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const newAmount =
      operation === "incrementar"
        ? product.amount + 1
        : Math.max(product.amount - 1, 0);

    const updatedProduct = { ...product, amount: newAmount };

    setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)));

    try {
      await updateAmount(updatedProduct);
      toast.success("Estoque atualizado com sucesso!");
    } catch (err) {
      setProducts((prev) => prev.map((p) => (p.id === id ? product : p)));
    }
  };

  const handleUpdateProduct = async (UpdatedProduct: Product) => {
    if (!updateProduct) return;
    const productUpdated = await updateProduct(UpdatedProduct);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productUpdated.id ? productUpdated : product
      )
    );
  };

  const handleCreateProduct = async (newProduct: newProduct) => {
    if (!newProduct) return;
    const productCreated = await createProduct(newProduct);
    setProducts((prevProducts) => [...prevProducts, productCreated]);
  };

  const handleDeleteProduct = async (id: number) => {
    if (!id) return;
    await deleteProduct(id);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return {
    products,
    updateProductAmount,
    handleCreateProduct,
    handleDeleteProduct,
    handleUpdateProduct,
  };
}