import axios from "axios";

const API_URL = "/api/events/decorations/";

// Create new decoration
const createDecoration = async (decorationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, decorationData, config);

  return response.data;
};

// Update decoration
const updateDecoration = async (decorationId, decorationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + decorationId,
    decorationData,
    config
  );
  return response.data;
};

// Get user decorations
const getDecorations = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user decoration
const deleteDecoration = async (decorationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + decorationId, config);

  return response.data;
};

const decorationService = {
  createDecoration,
  getDecorations,
  deleteDecoration,
  updateDecoration,
};

export default decorationService;
