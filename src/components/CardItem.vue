<template>
  <div class="max-w-sm mx-auto">
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <!-- Image Carousel -->
      <div class="relative">
        <img
          :src="images[currentIndex]"
          alt="profile"
          class="w-full h-64 object-cover transition duration-500"
        />

        <!-- Prev Button -->
        <button
          @click="prevImage"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full"
        >
          ‹
        </button>

        <!-- Next Button -->
        <button
          @click="nextImage"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full"
        >
          ›
        </button>

        <!-- Dots Indicator -->
        <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <span
            v-for="(img, index) in images"
            :key="index"
            class="h-2 w-2 rounded-full"
            :class="index === currentIndex ? 'bg-white' : 'bg-gray-400'"
          ></span>
        </div>
      </div>

      <!-- Info Section -->
      <div class="p-4">
        <h2 class="text-lg font-bold">{{ name }}</h2>
        <p class="text-gray-600">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    images: { type: Array, required: true }, // multiple images
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    nextImage() {
      this.currentIndex =
        (this.currentIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) %
        this.images.length;
    },
    
  },
};
</script>

<style scoped>
</style>