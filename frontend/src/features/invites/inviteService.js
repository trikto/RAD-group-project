import axios from "axios";

const API_URL = "/api/events/invites/";

// Create new invite
const createInvite = async (inviteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, inviteData, config);

  return response.data;
};

// Update invite
const updateInvite = async (inviteId, inviteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + inviteId, inviteData, config);
  return response.data;
};

// Get user invites
const getInvites = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user invite
const deleteInvite = async (inviteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + inviteId, config);

  return response.data;
};

const inviteService = {
  createInvite,
  getInvites,
  deleteInvite,
  updateInvite,
};

export default inviteService;
