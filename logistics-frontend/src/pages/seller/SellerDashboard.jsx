import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Package, TrendingUp, LayoutDashboard } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];

const SellerDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0
  });

  useEffect(() => {
    api.get("/seller/products")
      .then((res) => {
        const products = res.data.data || [];
        const totalProducts = products.length;
        const totalValue = products.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
        setStats({ totalProducts, totalValue });
      })
      .catch(console.error);
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
          <LayoutDashboard className="text-blue-500" size={32} />
          Seller Dashboard
        </h1>
        <p className="text-slate-500 mt-1">Overview of your store's performance and inventory.</p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 border-none text-white shadow-lg shadow-blue-500/30 p-6">
          <CardContent className="space-y-2 relative overflow-hidden">
            <div className="absolute right-0 top-0 text-white/10 -mt-4 -mr-4">
              <TrendingUp size={100} />
            </div>
            <p className="text-blue-100 font-medium flex items-center gap-2">
              <TrendingUp size={18} />
              Inventory Value
            </p>
            <h2 className="text-4xl font-bold tracking-tight">
              ₹{stats.totalValue.toLocaleString()}
            </h2>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-slate-500 font-medium">Total Products</p>
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Package size={20} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-800">
              {stats.totalProducts}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* CHART VIEW */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(value) => `₹${value}`} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SellerDashboard;