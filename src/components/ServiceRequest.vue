<template>
  <form @submit.prevent="submitRequest" class="p-6 max-w-lg mx-auto">
    <h2 class="text-2xl font-bold mb-4">Service Request</h2>

    <input v-model="serviceType" placeholder="Service Type" class="form-input w-full mb-3" />
    <textarea v-model="description" placeholder="Description" class="form-input w-full mb-3"></textarea>

    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">
      Submit Request
    </button>
  </form>
</template>

<script>
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase";

export default {
  data() {
    return { serviceType: "", description: "" };
  },
  methods: {
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
  },
};
</script>
