import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const apiService = {

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
    }

};

export default apiService;