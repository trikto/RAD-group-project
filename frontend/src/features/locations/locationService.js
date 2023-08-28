import axios from "axios";

const API_URL = "/api/events/locations/";

// Create new location
const createLocation = async (locationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, locationData, config);

  return response.data;
};

// Update location
const updateLocation = async (locationId, locationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + locationId, locationData, config);
  return response.data;
};

// Get user locations
const getLocations = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user location
const deleteLocation = async (locationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + locationId, config);

  return response.data;
};

const locationService = {
  createLocation,
  getLocations,
  deleteLocation,
  updateLocation,
};

export default locationService;
