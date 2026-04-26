import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./authentication/Auth.jsx";
import Ticket from "./ticketcomponents/TicketList.jsx";
import TicketAdd from "./ticketcomponents/TicketAdd.jsx";
import TicketUpdate from "./ticketcomponents/TicketUpdate.jsx";
import TicketDelete from "./ticketcomponents/TicketDelete.jsx";
import UserList from "./usercomponents/UserList.jsx";
import User from "./usercomponents/User.jsx";
import UserAdd from "./usercomponents/UserAdd.jsx";
import UserUpdate from "./usercomponents/UserUpdate.jsx";
import UserDelete from "./usercomponents/UserDelete.jsx";
import SpaceList from "./spacecomponents/SpaceList.jsx";
import Space from "./spacecomponents/Space.jsx";
import SpaceAdd from "./spacecomponents/SpaceAdd.jsx";
import SpaceUpdate from "./spacecomponents/SpaceUpdate.jsx";
import SpaceDelete from "./spacecomponents/SpaceDelete.jsx";
import TicketGroupList from "./ticketgroupcomponents/TicketGroupList.jsx";
import TicketGroup from "./ticketgroupcomponents/TicketGroup.jsx";
import TicketGroupAdd from "./ticketgroupcomponents/TicketGroupAdd.jsx";
import TicketGroupUpdate from "./ticketgroupcomponents/TicketGroupUpdate.jsx";
import TicketGroupDelete from "./ticketgroupcomponents/TicketGroupDelete.jsx";
import TicketHandlerList from "./tickethandlercomponents/TicketHandlerList.jsx";
import TicketHandler from "./tickethandlercomponents/TicketHandler.jsx";
import TicketHandlerAdd from "./tickethandlercomponents/TicketHandlerAdd.jsx";
import TicketHandlerUpdate from "./tickethandlercomponents/TicketHandlerUpdate.jsx";
import TicketHandlerDelete from "./tickethandlercomponents/TicketHandlerDelete.jsx";
import TicketManagerList from "./ticketmanagercomponents/TicketManagerList.jsx";
import TicketManager from "./ticketmanagercomponents/TicketManager.jsx";
import TicketManagerAdd from "./ticketmanagercomponents/TicketManagerAdd.jsx";
import TicketManagerUpdate from "./ticketmanagercomponents/TicketManagerUpdate.jsx";
import TicketManagerDelete from "./ticketmanagercomponents/TicketManagerDelete.jsx";

// Pages
import Dashboard from "./pages/Dashboard.jsx";
import Tickets from "./pages/Tickets.jsx";
import Projects from "./pages/Projects.jsx";

import HandlerDashboard from "./pages/HandlerDashboard.jsx";
import HandlerTickets from "./pages/HandlerTickets.jsx";
import HandlerProjects from "./pages/HandlerProjects.jsx";
import AssignedTickets from "./pages/AssignedTickets.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* AUTH - Login is now the first page */}
                <Route path="/login" element={<Auth />} />
                
                {/* Redirect from root (/) to /login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* MAIN PAGES (protected routes) */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/projects" element={<Projects />} />

                                {/* TICKET HANDLER ROUTES */}
                <Route path="/tickethandler/dashboard" element={<HandlerDashboard />} />
                <Route path="/tickethandler/tickets" element={<HandlerTickets />} />
                <Route path="/tickethandler/projects" element={<HandlerProjects />} />

                            // Routes-ում ավելացրեք
                    <Route path="/tickethandler/assigned" element={<AssignedTickets />} />

                {/* TICKETS CRUD */}
                <Route path="/tickets-list" element={<Ticket />} />
                <Route path="/add-ticket" element={<TicketAdd />} />
                <Route path="/update-ticket/:id" element={<TicketUpdate />} />
                <Route path="/delete-ticket/:id" element={<TicketDelete />} />

                {/* USERS */}
                <Route path="/users" element={<UserList />} />
                <Route path="/user" element={<User />} />
                <Route path="/add-user" element={<UserAdd />} />
                <Route path="/update-user/:id" element={<UserUpdate />} />
                <Route path="/delete-user/:id" element={<UserDelete />} />

                {/* SPACES */}
                <Route path="/spaces" element={<SpaceList />} />
                <Route path="/space" element={<Space />} />
                <Route path="/add-space" element={<SpaceAdd />} />
                <Route path="/update-space/:id" element={<SpaceUpdate />} />
                <Route path="/delete-space/:id" element={<SpaceDelete />} />

                {/* TICKET GROUPS */}
                <Route path="/ticketgroups" element={<TicketGroupList />} />
                <Route path="/ticketgroup" element={<TicketGroup />} />
                <Route path="/add-ticketgroup" element={<TicketGroupAdd />} />
                <Route path="/update-ticketgroup/:id" element={<TicketGroupUpdate />} />
                <Route path="/delete-ticketgroup/:id" element={<TicketGroupDelete />} />

                {/* TICKET HANDLERS */}
                <Route path="/tickethandlers" element={<TicketHandlerList />} />
                <Route path="/tickethandler" element={<TicketHandler />} />
                <Route path="/add-tickethandler" element={<TicketHandlerAdd />} />
                <Route path="/update-tickethandler/:id" element={<TicketHandlerUpdate />} />
                <Route path="/delete-tickethandler/:id" element={<TicketHandlerDelete />} />

                {/* TICKET MANAGERS */}
                <Route path="/ticketmanagers" element={<TicketManagerList />} />
                <Route path="/ticketmanager/:id" element={<TicketManager />} />
                <Route path="/add-ticketmanager" element={<TicketManagerAdd />} />
                <Route path="/update-ticketmanager/:id" element={<TicketManagerUpdate />} />
                <Route path="/delete-ticketmanager/:id" element={<TicketManagerDelete />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;