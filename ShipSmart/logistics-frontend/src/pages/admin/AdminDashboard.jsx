import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { Card, CardContent } from "../../components/ui/Card";
import { LayoutDashboard, Package, PackageCheck, Send, CheckCircle2 } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    delivered: 0,
    revenue: 0
  });

  useEffect(() => {
    api.get("/admin/orders")
      .then((res) => {
        const orders = res.data.data || [];

        const total = orders.length;
        const pending = orders.filter(o => o.status === "Pending Approval").length;
        const approved = orders.filter(o => o.status === "Approved").length;
        const delivered = orders.filter(o => o.status === "Delivered").length;

        const revenue = orders.reduce(
          (sum, o) => sum + (o.product?.price || 0),
          0
        );

        setStats({ total, pending, approved, delivered, revenue });
      })
      .catch(console.error);
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
          <LayoutDashboard className="text-blue-500" size={32} />
          Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-1">Platform-wide operations overview.</p>
      </div>

      {/* REVENUE BIG CARD */}
      <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 border-none shadow-xl shadow-indigo-900/20 text-white mb-6 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CheckCircle2 size={120} />
        </div>
        <p className="text-indigo-200 font-medium tracking-wide">Total Platform Revenue</p>
        <h2 className="text-5xl font-extrabold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
          ₹{stats.revenue.toLocaleString()}
        </h2>
      </Card>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 hover:-translate-y-1 transition-transform duration-200">
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-slate-500 font-medium">Total Orders</p>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Package size={20} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-800">{stats.total}</h2>
          </CardContent>
        </Card>

        <Card className="p-6 hover:-translate-y-1 transition-transform duration-200">
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-slate-500 font-medium">Pending</p>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <PackageCheck size={20} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-amber-600">{stats.pending}</h2>
          </CardContent>
        </Card>

        <Card className="p-6 hover:-translate-y-1 transition-transform duration-200">
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-slate-500 font-medium">Approved</p>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Send size={20} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-indigo-600">{stats.approved}</h2>
          </CardContent>
        </Card>

        <Card className="p-6 hover:-translate-y-1 transition-transform duration-200">
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-slate-500 font-medium">Delivered</p>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-emerald-600">{stats.delivered}</h2>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;