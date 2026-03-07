import { BrowserRouter, Routes, Route } from "react-router-dom";

// ---------- TICKETS ----------
import Ticket from "./components/Ticket";
import TicketAdd from "./components/TicketAdd";
import TicketUpdate from "./components/TicketUpdate";
import TicketDelete from "./components/TicketDelete";

// ---------- USERS ----------
import User from "./components/User";
import UserAdd from "./components/UserAdd";
import UserUpdate from "./components/UserUpdate";
import UserDelete from "./components/UserDelete";
import UserList from "./components/UserList";

// ---------- SPACES ----------
import Space from "./components/Space";
import SpaceAdd from "./components/SpaceAdd";
import SpaceUpdate from "./components/SpaceUpdate";
import SpaceDelete from "./components/SpaceDelete";
import SpaceList from "./components/SpaceList";

// ---------- TICKET GROUPS ----------
import TicketGroup from "./components/TicketGroup";
import TicketGroupAdd from "./components/TicketGroupAdd";
import TicketGroupUpdate from "./components/TicketGroupUpdate";
import TicketGroupDelete from "./components/TicketGroupDelete";
import TicketGroupList from "./components/TicketGroupList";

// ---------- TICKET HANDLERS ----------
import TicketHandler from "./components/TicketHandler";
import TicketHandlerAdd from "./components/TicketHandlerAdd";
import TicketHandlerUpdate from "./components/TicketHandlerUpdate";
import TicketHandlerDelete from "./components/TicketHandlerDelete";
import TicketHandlerList from "./components/TicketHandlerList";

// ---------- TICKET MANAGERS ----------
import TicketManager from "./components/TicketManager";
import TicketManagerAdd from "./components/TicketManagerAdd";
import TicketManagerUpdate from "./components/TicketManagerUpdate";
import TicketManagerDelete from "./components/TicketManagerDelete";
import TicketManagerList from "./components/TicketManagerList";

// ---------- AUTH ----------
import Auth from "./components/Auth";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* AUTH */}
                <Route path="/login" element={<Auth />} />

                {/* TICKETS */}
                <Route path="/tickets" element={<Ticket />} />
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
                <Route path="/ticketmanager" element={<TicketManager />} />
                <Route path="/add-ticketmanager" element={<TicketManagerAdd />} />
                <Route path="/update-ticketmanager/:id" element={<TicketManagerUpdate />} />
                <Route path="/delete-ticketmanager/:id" element={<TicketManagerDelete />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;