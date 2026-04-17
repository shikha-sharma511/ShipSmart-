import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Package, PlusCircle, ShoppingCart, Users, LogOut } from "lucide-react";

const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  const { user, logout } = useAuth();

  const isAdmin = path.startsWith("/admin");
  const isSeller = path.startsWith("/seller");
  const isBuyer = path.startsWith("/buyer");

  const menu = isAdmin
    ? [
      { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
      { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={20} /> },
      { name: "Delivery Agents", path: "/admin/delivery-agents", icon: <Users size={20} /> }
    ]
    : isSeller
      ? [
        { name: "Dashboard", path: "/seller", icon: <LayoutDashboard size={20} /> },
        { name: "Products", path: "/seller/products", icon: <Package size={20} /> },
        { name: "Add Product", path: "/seller/add-product", icon: <PlusCircle size={20} /> }
      ]
      : isBuyer
        ? [
          { name: "Dashboard", path: "/buyer", icon: <LayoutDashboard size={20} /> },
          { name: "Shop", path: "/buyer/create-order", icon: <ShoppingCart size={20} /> }
        ]
        : [];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden text-slate-800 font-sans">

      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center justify-center border-b border-slate-100">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-3 shadow-lg shadow-blue-500/30">
            SS
          </div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 tracking-tight">
            ShipSmart
          </h2>
        </div>

        <div className="px-4 py-6 text-sm">
          <div className="text-slate-400 font-semibold uppercase tracking-wider mb-2 ml-2">
            MAIN MENU
          </div>
          
          <nav className="flex flex-col gap-1.5">
            {menu.map((item) => {
              const basePath = isAdmin ? "/admin" : isSeller ? "/seller" : "/buyer";
              const isActive = location.pathname === item.path || 
                (item.path !== basePath && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className={`${isActive ? "text-blue-600" : "text-slate-400"}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex-grow" />

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-200/50">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex flex-shrink-0 items-center justify-center font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-slate-800 truncate">{user?.name || "User"}</p>
                <p className="text-xs text-slate-500 truncate capitalize">{user?.role || "Role"}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">
          {children}
        </div>
      </main>
      
    </div>
  );
};

export default Layout;