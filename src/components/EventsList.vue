<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Upcoming Events</h2>
    <ul>
      <li
        v-for="event in events"
        :key="event.id"
        class="mb-3 p-3 border rounded bg-white shadow-sm"
      >
        <h3 class="text-lg font-semibold">{{ event.title }}</h3>
        <p class="text-gray-600">Date: {{ event.date }}</p>
        <p class="text-gray-700">{{ event.description }}</p>
      </li>
    </ul>
    
  </div>
  
</template>

<script>
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default {
  name: "EventsView",
  data() {
    return { events: [] };
  },
  async created() {
    try {
      const snapshot = await getDocs(collection(db, "Events"));
      this.events = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  },
};
</script>
