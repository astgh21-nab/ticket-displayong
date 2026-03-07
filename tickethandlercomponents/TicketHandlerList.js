import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function TicketHandlerList() {

    const [ticketHandlers, setTicketHandlers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getTicketHandlers();
    }, []);

    const getTicketHandlers = () => {
        apiService.getAllTicketHandlers().then((response) => {
            setTicketHandlers(response.data);
        });
    };

    const goToAddTicketHandler = () => {
        navigate("/add-tickethandler");
    };

    const goToUpdateTicketHandler = (id) => {
        navigate(`/update-tickethandler/${id}`);
    };

    const goToDeleteTicketHandler = (id) => {
        navigate(`/delete-tickethandler/${id}`);
    };

    return (
        <div>

            <h2>Ticket Handler List</h2>

            <button onClick={goToAddTicketHandler}>
                Add Ticket Handler
            </button>

            <br/>
            <br/>

            <table border="1">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {ticketHandlers.map((handler) => (
                        <tr key={handler.id}>
                            <td>{handler.id}</td>
                            <td>{handler.name}</td>
                            <td>{handler.email}</td>
                            <td>

                                <button onClick={() => goToUpdateTicketHandler(handler.id)}>
                                    Update
                                </button>

                                <button onClick={() => goToDeleteTicketHandler(handler.id)}>
                                    Delete
                                </button>

                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default TicketHandlerList;