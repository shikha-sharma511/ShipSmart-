import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/Table";
import { toast } from "react-hot-toast";
import { UserPlus, Users, Truck } from "lucide-react";

const DeliveryAgents = () => {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    try {
      const res = await api.get("/delivery-agents");
      setAgents(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch delivery agents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const addAgent = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter a valid agent name.");

    try {
      const promise = api.post("/delivery-agents", { name });
      toast.promise(promise, { loading: 'Adding...', success: 'Agent Added!', error: 'Failed to add agent' });
      await promise;
      setName("");
      fetchAgents();
    } catch (err) {}
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
          <Truck className="text-blue-500" size={32} />
          Delivery Fleet
        </h1>
        <p className="text-slate-500 mt-1">Manage delivery personnel and assign logistics operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ADD AGENT FORM */}
        <div className="md:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700">
                <UserPlus size={20} />
                Onboard New Agent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={addAgent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Agent Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20"
                >
                  Register Agent
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* AGENTS LIST */}
        <div className="md:col-span-2">
          <Card className="p-0 overflow-hidden">
            <CardHeader className="bg-slate-50/50 p-6 border-b border-slate-100 m-0">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users size={20} className="text-slate-400" />
                  Active Agents Roster
                </span>
                <span className="bg-white border border-slate-200 text-slate-600 text-xs py-1 px-3 rounded-full font-bold">
                  {agents.length} Total
                </span>
              </CardTitle>
            </CardHeader>

            {loading ? (
              <div className="p-12 text-center text-slate-400 font-medium animate-pulse">Loading Agents...</div>
            ) : agents.length === 0 ? (
              <div className="p-12 text-center">
                <Users size={40} className="text-slate-300 mx-auto mb-3" />
                <h3 className="text-slate-600 font-semibold mb-1">No agents found</h3>
                <p className="text-sm text-slate-400">Onboard a new agent to start assigning deliveries.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent Profile</TableHead>
                    <TableHead>Agent ID</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow key={agent._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold uppercase">
                            {agent.name.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-800">{agent.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                          {agent._id}
                        </code>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </div>

      </div>
    </Layout>
  );
};

export default DeliveryAgents;