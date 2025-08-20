<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">Notifications</h2>
    <ul>
      <li v-for="note in notifications" :key="note.id" class="border-b py-2">
        {{ note.message }}
      </li>
    </ul>

    <div class="mt-4">
      <input v-model="newMessage" placeholder="Write notification"
             class="border p-2 rounded mr-2" />
      <button @click="addNotification" class="bg-blue-500 text-white px-4 py-2 rounded">
        Send
      </button>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default {
  name: "AppNotifications",
  data() {
    return { notifications: [], newMessage: "" };
  },
  async created() {
    const snapshot = await getDocs(collection(db, "Notifications"));
    this.notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  methods: {
    async addNotification() {
      if (!this.newMessage.trim()) return;
      await addDoc(collection(db, "Notifications"), { message: this.newMessage });
      this.notifications.push({ message: this.newMessage });
      this.newMessage = "";
    },
  },
};
</script>
