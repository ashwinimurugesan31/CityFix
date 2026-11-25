import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

// Paste your ORIGINAL Firebase configuration here
const firebaseConfig = {
  apiKey: "AIzaSyAl9UXiblgVmD2XIjooD2aN5bLm7kVaVEo",
  authDomain: "cityfix-3bd22.firebaseapp.com",
  projectId: "cityfix-3bd22",
  storageBucket: "cityfix-3bd22.firebasestorage.app",
  messagingSenderId: "152769443505",
  appId: "1:152769443505:web:3ccb98abb9ec6efdac1490",
  measurementId: "G-BKX4WYQTDN"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("CityFix Firebase Connected Successfully!");
const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {

  complaintForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const complaint = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      issueType: document.getElementById("issueType").value,
      location: document.getElementById("location").value,
      description: document.getElementById("description").value,
      severity: document.getElementById("severity").value,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    try {

      const docRef = await addDoc(
        collection(db, "complaints"),
        complaint
      );

      document.getElementById("result").innerHTML = `
        <h2>Complaint Submitted Successfully!</h2>
        <p>Your Complaint ID: <strong>${docRef.id}</strong></p>
      `;

      complaintForm.reset();

    } catch (error) {

      console.error("Error adding complaint:", error);

      document.getElementById("result").innerHTML = `
        <p>Complaint submission failed. Please try again.</p>
      `;

    }

  });

}