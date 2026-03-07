import { BrowserRouter, Routes, Route } from "react-router-dom";

import Thicket from "./components/Ticket";
import ThicketAdd from "./components/TicketAdd";
import ThicketUpdate from "./components/TicketUpdate";
import ThicketDelete from "./components/TicketDelete";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/tickets" element={<Ticket />} />
                <Route path="/tickets/add" element={<TicketAdd />} />
                <Route path="/tickets/update/:id" element={<TicketUpdate />} />
                <Route path="/tickets/delete/:id" element={<TicketDelete />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;