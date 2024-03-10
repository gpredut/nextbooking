// handler.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

// Define handler functions for each route
export const usersHandler = async (req, res) => {
  // Placeholder logic for handling users route
  try {
    // Perform users-related logic here
    res.status(200).json({ message: "Users data retrieved successfully" });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Internal server error" });
  }
};

export const hotelsHandler = async (req, res) => {
  // Placeholder logic for handling hotels route
  try {
    // Perform hotels-related logic here
    res.status(200).json({ message: "Hotels data retrieved successfully" });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Internal server error" });
  }
};

export const roomsHandler = async (req, res) => {
  // Placeholder logic for handling rooms route
  try {
    // Perform rooms-related logic here
    res.status(200).json({ message: "Rooms data retrieved successfully" });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Internal server error" });
  }
};

// Main handler function
export default async function handler(req, res) {
  // Connect to the database
  await connect();

  // Log message
  console.log("Connected to backend.");

  // Determine which route to handle
  if (req.url.startsWith("/api/users")) {
    return usersHandler(req, res);
  } else if (req.url.startsWith("/api/hotels")) {
    return hotelsHandler(req, res);
  } else if (req.url.startsWith("/api/rooms")) {
    return roomsHandler(req, res);
  } else {
    // Handle unknown routes
    res.status(404).json({ message: "Route not found" });
  }
}
