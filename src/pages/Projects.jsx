export default function Projects() {
  const projects = [
    { icon: "🚀", name: "Website Redesign", progress: "75% Complete" },
    { icon: "📱", name: "Mobile App", progress: "45% Complete" },
    { icon: "🔧", name: "API Upgrade", progress: "60% Complete" },
    { icon: "📊", name: "Analytics Dashboard", progress: "90% Complete" },
  ];

  return (
    <div className="main-content">
      <div className="topbar">
        <div className="topbar-title">Projects</div>
        <p className="topbar-subtitle">
          Manage your active projects and initiatives
        </p>
      </div>

      <div className="cards">
        {projects.map(project => (
          <div className="card" key={project.name}>
            <div className="card-icon">{project.icon}</div>
            <h3>{project.name}</h3>
            <p>{project.progress}</p>
          </div>
        ))}
      </div>
    </div>
  );
}