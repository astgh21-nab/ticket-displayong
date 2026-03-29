import { TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react";

const STATS = [
  { icon: CheckCircle, label: "Total Tickets", value: "156", color: "#10b981" },
  { icon: Clock, label: "In Progress", value: "24", color: "#f59e0b" },
  { icon: AlertCircle, label: "Urgent", value: "8", color: "#ef4444" },
  { icon: TrendingUp, label: "Resolved", value: "124", color: "#3b82f6" },
];

export default function Dashboard() {
  return (
    <div className="main-content">
      <div className="topbar">
        <div className="topbar-title">Welcome Back</div>
        <p className="topbar-subtitle">
          Track your tickets and manage projects efficiently
        </p>
      </div>

      <div className="cards">
        {STATS.map(stat => {
          const Icon = stat.icon;
          return (
            <div className="card" key={stat.label}>
              <div className="card-icon">
                <Icon size={26} color={stat.color} />
              </div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}