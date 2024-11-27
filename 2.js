import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, update, ref } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword,} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDn28D6k5JIRaqIrCkwdA5CbTU8kbC_14s",
    authDomain: "muhammad-r-p.firebaseapp.com",
    databaseURL: "https://muhammad-r-p-default-rtdb.firebaseio.com",
    projectId: "muhammad-r-p",
    storageBucket: "muhammad-r-p.firebasestorage.app",
    messagingSenderId: "123407474436",
    appId: "1:123407474436:web:6e11c259e9d0366717ba51"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


const submitButton = document.getElementById('submit'); 
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value; 
    const password = document.getElementById("password").value;


    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const dt = new Date().toISOString(); 
            update(ref(database, 'users/' + user.uid), {
                last_login: dt
            })
            .then(() => {
                alert("User logged in successfully");
                localStorage.setItem("uid",user.uid)
                window.location.replace("./main.html")
            })
            .catch((dbError) => {
                console.error("Database error:", dbError);
                alert("Error updating last login");
            });
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert("Error logging in: " + errorMessage);
        });
});
