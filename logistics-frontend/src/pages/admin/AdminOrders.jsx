import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { Card } from "../../components/ui/Card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { toast } from "react-hot-toast";
import { ListChecks } from "lucide-react";

// Stepper Component for Lifecycle
const OrderStepper = ({ currentStatus }) => {
  const steps = ["Pending Approval", "Approved", "Out for Delivery", "Delivered"];
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="flex items-center w-full max-w-sm mt-3 relative">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 -translate-y-1/2 rounded-full" />
      {/* Active Line */}
      <div 
        className="absolute top-1/2 left-0 h-[2px] bg-blue-500 -translate-y-1/2 transition-all duration-500 rounded-full" 
        style={{ width: `${currentIndex === 0 ? 0 : (currentIndex / (steps.length - 1)) * 100}%` }}
      />
      
      {steps.map((step, index) => {
        const isCompleted = index <= currentIndex;
        return (
          <div key={step} className="flex-1 relative flex justify-center z-10" title={step}>
            <div className={`w-3.5 h-3.5 rounded-full border-2 transition-colors duration-300 ${isCompleted ? 'bg-blue-500 border-blue-500 shadow-sm shadow-blue-500/50' : 'bg-white border-slate-300'}`} />
          </div>
        );
      })}
    </div>
  );
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [agents, setAgents] = useState({});
  const [deliveryAgents, setDeliveryAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    api.get("/delivery-agents")
      .then((res) => setDeliveryAgents(res.data.data || []))
      .catch(console.error);
  }, []);

  const approveOrder = async (id) => {
    try {
      const promise = api.put(`/admin/orders/${id}/approve`);
      toast.promise(promise, { loading: 'Approving...', success: 'Order Approved!', error: 'Failed to approve' });
      await promise;
      fetchOrders();
    } catch (e) {}
  };

  const assignAgent = async (orderId) => {
    const agentId = agents[orderId];
    if (!agentId) return toast.error("Please select a delivery agent first.");

    try {
      const promise = api.put(`/admin/orders/${orderId}/assign`, { deliveryAgentId: agentId });
      toast.promise(promise, { loading: 'Assigning...', success: 'Agent Assigned!', error: 'Failed to assign' });
      await promise;
      fetchOrders();
    } catch (e) {}
  };

  const markDelivered = async (id) => {
    try {
      const promise = api.put(`/admin/orders/${id}/delivered`);
      toast.promise(promise, { loading: 'Updating...', success: 'Marked as Delivered!', error: 'Failed to deliver' });
      await promise;
      fetchOrders();
    } catch (e) {}
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending Approval": return <Badge variant="warning">Pending</Badge>;
      case "Approved": return <Badge variant="primary">Approved</Badge>;
      case "Out for Delivery": return <Badge variant="primary">Dispatched</Badge>;
      case "Delivered": return <Badge variant="success">Delivered</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
            <ListChecks className="text-blue-500" size={32} />
            Orders Management
          </h1>
          <p className="text-slate-500 mt-1">Monitor lifecycle and route orders to delivery teams.</p>
        </div>
      </div>

      <div className="grid gap-6 auto-rows-max">
        {loading ? (
          <div className="text-slate-400 p-8 text-center animate-pulse font-medium">Loading Orders...</div>
        ) : orders.length === 0 ? (
          <Card className="p-16 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">No Orders Yet</h3>
            <p className="text-slate-500">Wait for buyers to create some orders.</p>
          </Card>
        ) : (
          orders.map((o) => (
            <Card key={o._id} className="p-6 transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                
                {/* Left side info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl font-bold text-slate-800 leading-none">{o.product?.name || "Deleted Product"}</h2>
                      {getStatusBadge(o.status)}
                    </div>
                    <p className="text-sm text-slate-500 font-medium tracking-wide">ORDER ID: {o._id.toUpperCase()}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 max-w-sm text-sm">
                    <div>
                      <p className="text-slate-400 uppercase text-xs font-bold tracking-wider mb-1">Buyer</p>
                      <p className="text-slate-800 font-medium">{o.buyer?.name || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 uppercase text-xs font-bold tracking-wider mb-1">Seller</p>
                      <p className="text-slate-800 font-medium">{o.seller?.name || "N/A"}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-slate-500 text-xs font-semibold mb-2 ml-1">LIFECYCLE STATUS</p>
                    <OrderStepper currentStatus={o.status} />
                  </div>
                </div>

                {/* Right side actions */}
                <div className="shrink-0 flex flex-col items-end gap-3 min-w-[200px]">
                  
                  {o.status === "Pending Approval" && (
                    <button
                      onClick={() => approveOrder(o._id)}
                      className="w-full bg-emerald-500 text-white font-medium px-4 py-2.5 rounded-lg hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/20"
                    >
                      Approve Order
                    </button>
                  )}

                  {o.status === "Approved" && (
                    <div className="w-full space-y-2">
                      <select
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-medium text-slate-700 bg-slate-50"
                        value={agents[o._id] || ""}
                        onChange={(e) => setAgents({ ...agents, [o._id]: e.target.value })}
                      >
                        <option value="">Select Agent...</option>
                        {deliveryAgents.map((agent) => (
                          <option key={agent._id} value={agent._id}>{agent.name}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => assignAgent(o._id)}
                        className="w-full bg-blue-600 text-white font-medium px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
                      >
                        Assign & Dispatch
                      </button>
                    </div>
                  )}

                  {o.status === "Out for Delivery" && (
                    <button
                      onClick={() => markDelivered(o._id)}
                      className="w-full bg-indigo-600 text-white font-medium px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20"
                    >
                      Mark as Delivered
                    </button>
                  )}
                  
                  {o.status === "Delivered" && (
                    <button disabled className="w-full bg-slate-100 text-slate-400 font-medium px-4 py-2.5 rounded-lg border border-slate-200 cursor-not-allowed">
                      Completed Workflow
                    </button>
                  )}

                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </Layout>
  );
};

export default AdminOrders;