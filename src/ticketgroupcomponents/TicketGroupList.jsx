import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function TicketGroupList() {

    const [ticketGroups, setTicketGroups] = useState([]);
    const navigate = useNavigate();

    // Function declaration is hoisted, safe to call in useEffect
    function getTicketGroups() {
        apiService.getAllTicketManagers().then((data) => {
            setTicketGroups(data); // Fixed this line
        });
    }

    useEffect(() => {
        getTicketGroups();
    }, []);

    const goToAddTicketGroup = () => {
        navigate("/add-ticketgroup");
    };

    const goToUpdateTicketGroup = (id) => {
        navigate(`/update-ticketgroup/${id}`);
    };

    const goToDeleteTicketGroup = (id) => {
        navigate(`/delete-ticketgroup/${id}`);
    };

    return (
        <div>
            <h2>Ticket Group List</h2>

            <button onClick={goToAddTicketGroup}>
                Add Ticket Group
            </button>

            <br/>
            <br/>

            <table border="1">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {ticketGroups.map((group) => (
                    <tr key={group.id}>
                        <td>{group.id}</td>
                        <td>{group.name}</td>
                        <td>{group.description}</td>
                        <td>
                            <button onClick={() => goToUpdateTicketGroup(group.id)}>
                                Update
                            </button>

                            <button onClick={() => goToDeleteTicketGroup(group.id)}>
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

export default TicketGroupList;