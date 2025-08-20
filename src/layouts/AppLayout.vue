<template>
  <div>
    <!-- Page content slot -->
    <router-view />

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-2">
      <button @click="goTo('/dashboard')" class="flex flex-col items-center">
        🏠 <span class="text-xs">Home</span>
      </button>
      <button @click="goTo('/events')" class="flex flex-col items-center">
        📅 <span class="text-xs">Events</span>
      </button>
      <button @click="goTo('/services')" class="flex flex-col items-center">
        🛠 <span class="text-xs">Services</span>
      </button>
      <button @click="goTo('/profile')" class="flex flex-col items-center">
        👤 <span class="text-xs">Profile</span>
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
  methods: {
    goTo(path) {
      this.$router.push(path); // ✅ now navigation works
    },
  },
};
</script>
