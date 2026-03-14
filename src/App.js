import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./authentication/Auth.js";
import Ticket from "./ticketcomponents/Ticket.js";
import TicketAdd from "./ticketcomponents/TicketAdd.js";
import TicketUpdate from "./ticketcomponents/TicketUpdate.js";
import TicketDelete from "./ticketcomponents/TicketDelete.js";
import UserList from "./usercomponents/UserList.js";
import User from "./usercomponents/User.js";
import UserAdd from "./usercomponents/UserAdd.js";
import UserUpdate from "./usercomponents/UserUpdate.js";
import UserDelete from "./usercomponents/UserDelete.js";
import SpaceList from "./spacecomponents/SpaceList.js";
import Space from "./spacecomponents/Space.js";
import SpaceAdd from "./spacecomponents/SpaceAdd.js";
import SpaceUpdate from "./spacecomponents/SpaceUpdate.js";
import SpaceDelete from "./spacecomponents/SpaceDelete.js";
import TicketGroupList from "./ticketgroupcomponents/TicketGroupList.js";
import TicketGroup from "./ticketgroupcomponents/TicketGroup.js";
import TicketGroupAdd from "./ticketgroupcomponents/TicketGroupAdd.js";
import TicketGroupUpdate from "./ticketgroupcomponents/TicketGroupUpdate.js";
import TicketGroupDelete from "./ticketgroupcomponents/TicketGroupDelete.js";
import TicketHandlerList from "./tickethandlercomponents/TicketHandlerList.js";
import TicketHandler from "./tickethandlercomponents/TicketHandler.js";
import TicketHandlerAdd from "./tickethandlercomponents/TicketHandlerAdd.js";
import TicketHandlerUpdate from "./tickethandlercomponents/TicketHandlerUpdate.js";
import TicketHandlerDelete from "./tickethandlercomponents/TicketHandlerDelete.js";
import TicketManagerList from "./ticketmanagercomponents/TicketManagerList.js";
import TicketManager from "./ticketmanagercomponents/TicketManager.js";
import TicketManagerAdd from "./ticketmanagercomponents/TicketManagerAdd.js";
import TicketManagerUpdate from "./ticketmanagercomponents/TicketManagerUpdate.js";
import TicketManagerDelete from "./ticketmanagercomponents/TicketManagerDelete.js";


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