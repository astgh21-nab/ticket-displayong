import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const apiService = {
        // ---------- ADMINS ----------

    getAllAdmins: () => {
        return axios.get(`${API_URL}admins`).then((response) => response.data);
    },

    getAdminById: (adminId) => {
        return axios.get(`${API_URL}admins/${adminId}`).then((response) => response.data);
    },

    createAdmin: (admin) => {
        return axios.post(`${API_URL}admins`, admin).then((response) => response.data);
    },

    updateAdmin: (adminId, admin) => {
        return axios.put(`${API_URL}admins/${adminId}`, admin).then((response) => response.data);
    },

    deleteAdmin: (adminId) => {
        return axios.delete(`${API_URL}admins/${adminId}`).then((response) => response.data);
    },

    // ---------- TICKETS ----------

    getAllTickets: () => {
        return axios.get(`${API_URL}tickets`).then((response) => response.data);
    },

    getTicketById: (ticketId) => {
        return axios.get(`${API_URL}tickets/${ticketId}`).then((response) => response.data);
    },

    createTicket: (ticket) => {
        return axios.post(`${API_URL}tickets`, ticket).then((response) => response.data);
    },

    updateTicket: (ticketId, ticket) => {
        return axios.put(`${API_URL}tickets/${ticketId}`, ticket).then((response) => response.data);
    },

    deleteTicketById: (ticketId) => {
        return axios.delete(`${API_URL}tickets/${ticketId}`).then((response) => response.data);
    },


    // ---------- AUTH ----------

    login: (authData) => {
        return axios.post(`${API_URL}auth/login`, authData)
            .then((response) => response.data);
    },

    // ---------- TICKET GROUP ----------

    getAllTicketGroups: () => {
        return axios.get(`${API_URL}ticket-groups`).then((response) => response.data);
    },

    getTicketGroupById: (groupId) => {
        return axios.get(`${API_URL}ticket-groups/${groupId}`).then((response) => response.data);
    },

    createTicketGroup: (group) => {
        return axios.post(`${API_URL}ticket-groups`, group).then((response) => response.data);
    },

    updateTicketGroup: (groupId, group) => {
        return axios.put(`${API_URL}ticket-groups/${groupId}`, group).then((response) => response.data);
    },

    deleteTicketGroupById: (groupId) => {
        return axios.delete(`${API_URL}ticket-groups/${groupId}`).then((response) => response.data);
    },


    // ---------- SPACES ----------

    getAllSpaces: () => {
        return axios.get(`${API_URL}spaces`).then((response) => response.data);
    },

    getSpaceById: (spaceId) => {
        return axios.get(`${API_URL}spaces/${spaceId}`).then((response) => response.data);
    },

    createSpace: (space) => {
        return axios.post(`${API_URL}spaces`, space).then((response) => response.data);
    },

    updateSpace: (spaceId, space) => {
        return axios.put(`${API_URL}spaces/${spaceId}`, space).then((response) => response.data);
    },

    deleteSpaceById: (spaceId) => {
        return axios.delete(`${API_URL}spaces/${spaceId}`).then((response) => response.data);
    },


    // ---------- USERS ----------

    getAllUsers: () => {
        return axios.get(`${API_URL}users`).then((response) => response.data);
    },

    getUserById: (userId) => {
        return axios.get(`${API_URL}users/${userId}`).then((response) => response.data);
    },

    createUser: (user) => {
        return axios.post(`${API_URL}users`, user).then((response) => response.data);
    },

    updateUser: (userId, user) => {
        return axios.put(`${API_URL}users/${userId}`, user).then((response) => response.data);
    },

    deleteUserById: (userId) => {
        return axios.delete(`${API_URL}users/${userId}`).then((response) => response.data);
    },


  // ---------- TICKET HANDLERS ----------

    getAllTicketHandlers: () => {
        return axios.get(`${API_URL}tickethandlers`).then((response) => response.data);
    },

    getTicketHandlerById: (handlerId) => {
        return axios.get(`${API_URL}tickethandlers/${handlerId}`).then((response) => response.data);
    },

    createTicketHandler: (handler) => {
        return axios.post(`${API_URL}tickethandlers`, handler).then((response) => response.data);
    },

    updateTicketHandler: (handlerId, handler) => {
        return axios.put(`${API_URL}tickethandlers/${handlerId}`, handler).then((response) => response.data);
    },

    deleteTicketHandlerById: (handlerId) => {
        return axios.delete(`${API_URL}tickethandlers/${handlerId}`).then((response) => response.data);
    },


    // apiService.js
getTicketsByHandler: () => axios.get(`${API_BASE}/tickets/handler`),
getAllTicketHandlers: () => axios.get(`${API_BASE}/ticket-handlers`),
getTicketHandlerById: (id) => axios.get(`${API_BASE}/ticket-handlers/${id}`),
createTicketHandler: (data) => axios.post(`${API_BASE}/ticket-handlers`, data),
updateTicketHandler: (id, data) => axios.put(`${API_BASE}/ticket-handlers/${id}`, data),
deleteTicketHandler: (id) => axios.delete(`${API_BASE}/ticket-handlers/${id}`),
updateTicketStatus: (id, data) => axios.put(`${API_BASE}/tickets/${id}/status`, data),

    // ---------- TICKET MANAGERS ----------

getAllTicketManagers: () => {
    return axios.get(`${API_URL}ticketmanagers`).then((response) => response.data);
},

getTicketManagerById: (managerId) => {
    return axios.get(`${API_URL}ticketmanagers/${managerId}`).then((response) => response.data);
},

createTicketManager: (manager) => {
    return axios.post(`${API_URL}ticketmanagers`, manager).then((response) => response.data);
},

updateTicketManager: (managerId, manager) => {
    return axios.put(`${API_URL}ticketmanagers/${managerId}`, manager).then((response) => response.data);
},

deleteTicketManager: (managerId) => {
    return axios.delete(`${API_URL}ticketmanagers/${managerId}`).then((response) => response.data);
},

};

export default apiService;