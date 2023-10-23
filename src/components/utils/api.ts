import { kv } from "@vercel/kv";
import { Event } from "./EventTypes";

const handleError = (error: Error) => {
  console.error("Vercel KV Error:", error);
  throw error; // or handle error as needed
};

// Add event
const addEventKV = async (event: Event) => {
//   try {
//     await kv.sadd("events", JSON.stringify(event));
//   } catch (error) {
//     handleError(error as Error);
//   }
};

// Get all events
const getEventsKV = async () => {
//   try {
//     const events = await kv.smembers("events");
//     return events.map((event) => JSON.parse(event));
//   } catch (error) {
//     handleError(error as Error);
//   }
};

// Edit event
const editEventKV = async (id: string, updatedEvent: Event) => {
//   try {
//     const events = await getEventsKV();
//     if (events) {
//       const eventToUpdate = events.find((event) => event.id === id);
//       if (eventToUpdate) {
//         await kv.srem("events", JSON.stringify(eventToUpdate));
//         await kv.sadd("events", JSON.stringify(updatedEvent));
//       }
//     }
//   } catch (error) {
//     handleError(error as Error);
//   }
};

// Delete event
const deleteEventKV = async (id: string) => {
//   try {
//     const events = await getEventsKV();
//     if (events) {
//       const eventToDelete = events.find((event: Event) => event.id === id);
//       if (eventToDelete) {
//         await kv.srem("events", JSON.stringify(eventToDelete));
//       }
//     }
//   } catch (error) {
//     handleError(error as Error);
//   }
};

export { addEventKV, getEventsKV, editEventKV, deleteEventKV };
