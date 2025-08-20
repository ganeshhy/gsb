<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">GSB Community Dashboard</h1>
        <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </header>
    
    <main class="flex-grow flex items-center justify-center">
      <!-- Pass images array to CardItem -->
      <CardItem
        :images="['https://via.placeholder.com/300x200']"
        name="Sample Event"
        description="This is a sample description"
      />
    </main>
  </div>
</template>

<script>
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import CardItem from "../components/CardItem.vue";

export default {
  name: "DashboardView",
  data() {
    return {
      activeTab: 'service-requests',
      tabs: [
        { id: 'service-requests', name: 'Service Requests' },
        { id: 'events', name: 'Events' },
        { id: 'notifications', name: 'Notifications' }
      ],
      serviceType: "",
      description: "",
      events: [],
      notifications: [],
      newMessage: ""
    };
  },
  components: {
    CardItem
  },
  async created() {
    await this.loadEvents();
    await this.loadNotifications();
  },
  methods: {
    async logout() {
      try {
        await signOut(auth);
        this.$router.push("/login");
      } catch (error) {
        alert("Error logging out: " + error.message);
      }
    },
    async submitRequest() {
      try {
        await addDoc(collection(db, "ServiceRequests"), {
          userId: auth.currentUser ? auth.currentUser.uid : "guest",
          serviceType: this.serviceType,
          description: this.description,
          createdAt: serverTimestamp(),
        });
        alert("Request submitted!");
        this.serviceType = this.description = "";
      } catch (error) {
        alert("Error: " + error.message);
      }
    },
    async loadEvents() {
      try {
        const snapshot = await getDocs(collection(db, "Events"));
        this.events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error loading events:", error);
      }
    },
    async loadNotifications() {
      try {
        const snapshot = await getDocs(collection(db, "Notifications"));
        this.notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    },
    async addNotification() {
      if (!this.newMessage.trim()) return;
      try {
        await addDoc(collection(db, "Notifications"), { 
          message: this.newMessage,
          createdAt: serverTimestamp()
        });
        this.notifications.push({ message: this.newMessage });
        this.newMessage = "";
        alert("Notification sent!");
      } catch (error) {
        alert("Error: " + error.message);
      }
    },
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>