<template>
  <div class="min-h-screen bg-gray-100 py-6">
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-center mb-6">GSB Community Portal</h1>
      
      <h2 class="text-2xl font-bold mb-4">Login with Phone</h2>

      <input 
        v-model="phone" 
        placeholder="Enter phone number (+91...)" 
        class="form-input w-full mb-3" 
      />

      <!-- reCAPTCHA container -->
      <div id="recaptcha-container"></div>

      <button 
        @click="sendOtp" 
        class="bg-blue-600 text-white px-4 py-2 rounded w-full mb-3">
        Send OTP
      </button>

      <input 
        v-model="otp" 
        placeholder="Enter OTP" 
        class="form-input w-full mb-3" 
      />

      <button 
        @click="verifyOtp" 
        class="bg-green-600 text-white px-4 py-2 rounded w-full">
        Verify OTP
      </button>

      <!-- 👉 Register button -->
      <p class="mt-4 text-center">
        Don’t have an account? 
        <button 
  @click="$router.push('/register')" 
  class="bg-purple-500 text-white px-4 py-2 rounded w-full mt-3">
  Register New Family
</button>

      </p>
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default {
  data() {
    return { 
      phone: "", 
      otp: "", 
      confirmationResult: null 
    };
  },
  methods: {
    setupRecaptcha() {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
      }
    );
  }
}
,

    async sendOtp() {
      if (!this.phone) {
        alert("Please enter phone number");
        return;
      }
      try {
        this.setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        this.confirmationResult = await signInWithPhoneNumber(auth, this.phone, appVerifier);
        alert("OTP sent!");
      } catch (error) {
        console.error("OTP Error:", error);
        alert("Error sending OTP: " + error.message);
        window.recaptchaVerifier = null;
      }
    },

    async verifyOtp() {
      try {
        if (!this.confirmationResult) {
          alert("Please request OTP first");
          return;
        }
        await this.confirmationResult.confirm(this.otp);
        alert("Login successful!");
        this.$router.push("/dashboard");
      } catch {
        alert("Invalid OTP!");
      }
    }
  }
};
</script>
