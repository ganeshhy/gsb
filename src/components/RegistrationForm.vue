<template>
  <div class="min-h-screen bg-gray-100 py-6">
    <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">Family Registration</h2>

      <form @submit.prevent="register">
        <input v-model="headName" placeholder="Head of Family" class="form-input w-full mb-3" required />
        <input v-model="familyName" placeholder="Family Name" class="form-input w-full mb-3" required />
        <input v-model="address" placeholder="Address" class="form-input w-full mb-3" required />
        <input v-model="mobile" type="tel" placeholder="Mobile Number" class="form-input w-full mb-3" required />
        <input v-model="placeofBirth" placeholder="Place of Birth" class="form-input w-full mb-3" required />
        <select v-model="gender" class="form-select w-full mb-3" required>
          <option disabled value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <!-- House God Dropdown -->
        <select v-model="houseGod" class="form-select w-full mb-3" required>
          <option disabled value="">Select House God</option>
          <option value="Krishna">Krishna</option>
          <option value="Shiva">Shiva</option>
          <option value="Durga">Durga</option>
          <option value="Ganesh">Ganesh</option>
          <option value="Other">Other</option>
        </select>

        <input v-model="Gothra" placeholder="Gothra" class="form-input w-full mb-3" required />
        <input v-model="Daiva" placeholder="Daiva" class="form-input w-full mb-3" required />
        <input v-model="Address" placeholder="Address" class="form-input w-full mb-3" required />
        <input v-model="Location" placeholder="Location" class="form-input w-full mb-3" required />
        <select v-model="interest" class="form-select w-full mb-3" required>
          <option disabled value="">Select Interest</option>
          <option value="Music">Music</option>
          <option value="Dance">Dance</option>
          <option value="Sports">Sports</option>
          <option value="Art">Art</option>
          <option value="Other">Other</option>
        </select>

        <!-- Day & Time Availability Array (Dropdown Method) -->
        <div class="mb-3">
          <label class="block font-semibold mb-2">Day & Time Availability <span class="text-red-500">*</span></label>
          <div v-for="(item, index) in availabilityDropdown" :key="index" class="flex items-center mb-2">
            <select v-model="item.day" class="form-select w-40 mr-2" required>
              <option disabled value="">Select Day</option>
              <option v-for="day in daysOfWeek" :key="day" :value="day">{{ day }}</option>
            </select>
            <input v-model="item.time" type="time" class="form-input w-40 mr-2" :disabled="!item.day" required />
            <button type="button" @click="removeAvailability(index)" class="text-red-500 ml-2">Remove</button>
          </div>
          <button type="button" @click="addAvailability" class="bg-gray-200 px-2 py-1 rounded mt-2">Add Day & Time</button>
        </div>

        <button type="submit" class="bg-purple-600 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default {
  name: "RegistrationView",
  data() {
    return {
      headName: "",
      familyName: "",
      address: "",
      mobile: "",
      placeofBirth: "",
      houseGod: "",
      Gothra: "",
      gender: "",
      Daiva: "",
      Address: "",
      Location: "",
      interest: "",
      daysOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      availabilityDropdown: []
    };
  },
  methods: {
    addAvailability() {
      this.availabilityDropdown.push({ day: "", time: "" });
    },
    removeAvailability(index) {
      this.availabilityDropdown.splice(index, 1);
    },
    async register() {
      // Validate all fields
      if (
        !this.headName ||
        !this.familyName ||
        !this.address ||
        !this.mobile ||
        !this.placeofBirth ||
        !this.houseGod ||
        !this.Gothra ||
        !this.Daiva ||
        !this.gender ||
        !this.Address ||
        !this.Location ||
        !this.interest ||
        this.availabilityDropdown.length === 0 ||
        this.availabilityDropdown.some(item => !item.day || !item.time)
      ) {
        alert("Please fill all fields and select at least one day & time.");
        return;
      }

      try {
        const selectedAvailability = this.availabilityDropdown
          .filter(item => item.day && item.time);

        await addDoc(collection(db, "Families"), {
          headName: this.headName,
          familyName: this.familyName,
          address: this.address,
          mobile: this.mobile,
          placeofBirth: this.placeofBirth,
          houseGod: this.houseGod,
          Gothra: this.Gothra,
          gender: this.gender,
          Daiva: this.Daiva,
          Address: this.Address,
          Location: this.Location,
          interest: this.interest,
          availability: selectedAvailability,
          createdAt: serverTimestamp(),
        });
        alert("Family registered successfully!");
        this.$router.push("/login");
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  },
}
</script>