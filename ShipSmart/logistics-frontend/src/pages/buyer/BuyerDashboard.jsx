import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { Card, CardContent } from "../../components/ui/Card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/Table";
import { ShoppingBag, Loader2, MapPin, PackageCheck, AlertCircle } from "lucide-react";

// Stepper Component for Lifecycle
const OrderStepper = ({ currentStatus }) => {
  const steps = ["Pending Approval", "Approved", "Out for Delivery", "Delivered"];
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="flex items-center w-full max-w-[200px] mt-1 relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full" />
      <div 
        className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 transition-all duration-500 rounded-full" 
        style={{ width: `${currentIndex <= 0 ? 0 : (currentIndex / (steps.length - 1)) * 100}%` }}
      />
      {steps.map((step, index) => {
        const isCompleted = index <= currentIndex;
        return (
          <div key={step} className="flex-1 relative flex justify-center z-10" title={step}>
            <div className={`w-2.5 h-2.5 rounded-full border-2 transition-colors duration-300 ${isCompleted ? 'bg-blue-500 border-blue-500' : 'bg-white border-slate-200'}`} />
          </div>
        );
      })}
    </div>
  );
};

const BuyerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, pending: 0, delivered: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/buyer/orders")
      .then((res) => {
        const data = res.data.data || [];
        setOrders(data);

        const totalOrders = data.length;
        const pending = data.filter((o) => o.status !== "Delivered").length;
        const delivered = data.filter((o) => o.status === "Delivered").length;
        setStats({ totalOrders, pending, delivered });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
          <ShoppingBag className="text-blue-500" size={32} />
          My Orders
        </h1>
        <p className="text-slate-500 mt-1">Track and manage your purchases.</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 hover:-translate-y-1 transition-transform duration-200">
          <CardContent className="space-y-2">
            <p className="text-slate-500 font-medium">Total Orders</p>
            <h2 className="text-3xl font-bold text-slate-800">{stats.totalOrders}</h2>
          </CardContent>
        </Card>

        <Card className="p-6 hover:-translate-y-1 transition-transform duration-200">
          <CardContent className="space-y-2">
            <p className="text-amber-600 font-medium">Pending Delivery</p>
            <h2 className="text-3xl font-bold text-amber-600">{stats.pending}</h2>
          </CardContent>
        </Card>

        <Card className="p-6 hover:-translate-y-1 transition-transform duration-200">
          <CardContent className="space-y-2">
            <p className="text-emerald-600 font-medium">Delivered</p>
            <h2 className="text-3xl font-bold text-emerald-600">{stats.delivered}</h2>
          </CardContent>
        </Card>
      </div>

      {/* ORDERS LIST */}
      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 font-medium animate-pulse">Loading Your Orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle size={40} className="text-slate-300 mx-auto mb-3" />
            <h3 className="text-slate-600 font-semibold mb-1">No orders yet</h3>
            <p className="text-sm text-slate-400">Looks like you haven't bought anything. Start shopping!</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Details</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o._id}>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-slate-800">{o.product?.name || "Deleted Product"}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">ID: {o._id.slice(-6)}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-slate-600">{o.status}</span>
                      <OrderStepper currentStatus={o.status} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium text-sm">
                      {o.status === "Delivered" ? (
                        <><PackageCheck size={16} className="text-emerald-500" /> Delivered</>
                      ) : o.status === "Out for Delivery" ? (
                        <><MapPin size={16} className="text-blue-500" /> Dispatched</>
                      ) : (
                        <><Loader2 size={16} className="text-amber-500 animate-spin" /> Processing</>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-bold text-slate-700 font-mono">
                      ₹{o.product?.price ? parseFloat(o.product.price).toLocaleString() : "N/A"}
                    </span>
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

export default BuyerDashboard;