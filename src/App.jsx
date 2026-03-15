import { BrowserRouter, Routes, Route } from "react-router-dom";
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