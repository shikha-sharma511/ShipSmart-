import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { Card, CardContent } from "../../components/ui/Card";
import { toast } from "react-hot-toast";
import { ShoppingCart, CheckCircle2, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingProducts, setFetchingProducts] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    api.get("/seller/products")
      .then((res) => setProducts(res.data.data || []))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load products");
      })
      .finally(() => setFetchingProducts(false));
  }, []);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!selectedProductId) return toast.error("Please select a product");

    const product = products.find(p => p._id === selectedProductId);
    if (!product) return;

    setLoading(true);
    try {
      await api.post("/seller/create-order", {
        productId: product._id,
        sellerId: product.seller
      });
      toast.success("Order Placed Successfully!");
      navigate("/buyer");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const selectedProduct = products.find(p => p._id === selectedProductId);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
          <ShoppingCart className="text-blue-500" size={32} />
          Shop
        </h1>
        <p className="text-slate-500 mt-1">Browse products and place a dispatch request.</p>
      </div>

      {fetchingProducts ? (
        <div className="text-center text-slate-400 py-12 animate-pulse flex flex-col items-center">
           <Package size={40} className="mb-4 text-slate-300" />
           <p className="font-medium text-lg">Loading catalog...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-slate-500 py-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
           <Package size={48} className="mx-auto mb-4 text-slate-300" />
           <p className="font-medium text-lg text-slate-600">No products available</p>
           <p className="text-sm mt-1">The catalog is currently empty.</p>
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Main Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div 
                  key={p._id}
                  onClick={() => setSelectedProductId(p._id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer bg-white relative overflow-hidden group ${
                    selectedProductId === p._id 
                      ? "border-blue-600 shadow-md shadow-blue-500/10 ring-4 ring-blue-500/10"
                      : "border-slate-200 hover:border-blue-300 hover:shadow-sm"
                  }`}
                >
                  {selectedProductId === p._id && (
                    <div className="absolute top-4 right-4 text-blue-600 z-10">
                      <CheckCircle2 size={24} className="fill-blue-100" />
                    </div>
                  )}
                  <div className="w-full aspect-[4/3] rounded-xl mb-4 flex items-center justify-center bg-slate-100 overflow-hidden group-hover:scale-[1.02] transition-transform">
                    <img src={p.imageUrl ? (p.imageUrl.startsWith('/uploads') ? `http://localhost:5000${p.imageUrl}` : p.imageUrl) : `https://placehold.co/400x300/e2e8f0/475569?font=montserrat&text=${encodeURIComponent(p.name)}`} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="px-1">
                    <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-1">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-extrabold text-blue-600">₹{p.price}</p>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md border border-slate-200/50">
                        PID: {p._id.slice(-4)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Sidebar for Order Summary */}
          <div className="w-full xl:w-80 shrink-0">
            <Card className="sticky top-6 border border-slate-200 shadow-xl shadow-slate-200/40">
              <CardContent className="p-6">
                <h3 className="text-lg font-extrabold text-slate-800 mb-4 border-b border-slate-100 pb-4 flex items-center gap-2">
                   <ShoppingCart size={18} className="text-blue-500" />
                   Order Summary
                </h3>
                
                {selectedProduct ? (
                  <div className="space-y-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Selected Item</p>
                      <p className="font-semibold text-slate-800">{selectedProduct.name}</p>
                    </div>
                    <div className="flex justify-between items-center py-4 border-t border-b border-slate-100">
                      <span className="text-slate-500 font-medium tracking-wide">Total Amount</span>
                      <span className="text-3xl font-extrabold text-blue-600">₹{selectedProduct.price}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 mb-6 px-4 bg-slate-50/50 rounded-xl border border-slate-200 border-dashed">
                    <ShoppingCart size={32} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-500 font-medium">Select a product from the catalog to continue.</p>
                  </div>
                )}

                <button
                  onClick={handleOrder}
                  disabled={loading || !selectedProductId}
                  className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <>Processing...</>
                  ) : (
                    <>Place Order</>
                  )}
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CreateOrder;