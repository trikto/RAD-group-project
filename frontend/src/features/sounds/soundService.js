import axios from "axios";

const API_URL = "/api/events/sounds/";

// Create new sound
const createSound = async (soundData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, soundData, config);

  return response.data;
};

// Update sound
const updateSound = async (soundId, soundData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + soundId, soundData, config);
  return response.data;
};

// Get user sounds
const getSounds = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user sound
const deleteSound = async (soundId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + soundId, config);

  return response.data;
};

const soundService = {
  createSound,
  getSounds,
  deleteSound,
  updateSound,
};

export default soundService;
