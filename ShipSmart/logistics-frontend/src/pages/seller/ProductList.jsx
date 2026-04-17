import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/Table";
import { Card } from "../../components/ui/Card";
import { toast } from "react-hot-toast";
import { Edit2, Trash2, PackageSearch, Package } from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/seller/products");
      // Standardized array response
      setProducts(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const promise = api.delete(`/seller/products/${id}`).then(() => {
      setProducts(products.filter(p => p._id !== id));
    });

    toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Product deleted',
      error: 'Failed to delete product',
    });
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
            <Package className="text-blue-500" size={32} />
            My Products
          </h1>
          <p className="text-slate-500 mt-1">Manage all your currently listed products.</p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 font-medium animate-pulse">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <PackageSearch className="text-slate-300" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">No products found</h3>
            <p className="text-slate-500 mt-1">You haven't listed any products yet.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>
                    <div className="font-medium text-slate-800">{p.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-emerald-600">₹{parseFloat(p.price).toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-slate-500 text-sm">
                      {new Date(p.createdAt || Date.now()).toLocaleDateString("en-GB", {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => toast("Edit functionality coming soon!", { icon: "🚧" })}
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        onClick={() => deleteProduct(p._id)}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </Layout>
  );
};

export default ProductList;