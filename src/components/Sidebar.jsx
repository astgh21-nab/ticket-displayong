import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, CheckSquare, FolderOpen } from "lucide-react";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/tickets", label: "Tickets", icon: CheckSquare },
  { path: "/projects", label: "Projects", icon: FolderOpen },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-logo">A</span>
        <span className="sidebar-name">ASNADA</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <Icon size={18} className="sidebar-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}