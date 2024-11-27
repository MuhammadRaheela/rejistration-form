import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, set, ref,  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
var userId = localStorage.getItem("userId")




// google

googleProvider.setCustomParameters({ 'prompt': 'select_account' });
const google = document.getElementById("googleLoginBtn");
google.addEventListener("click", function () {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      set(ref(database, 'users/' + user.uid), {
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      })
        .then(() => {
          console.log("User data saved successfully.");
        })
        .catch((error) => {
          console.error("Error saving user data:", error.message);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error Code: ${errorCode}, Error Message: ${errorMessage}`);
    });
});






// github

githubProvider.setCustomParameters({ 'prompt': 'select_account' });
const github = document.getElementById("githubLoginBtn");
github.addEventListener("click", function () {
  signInWithPopup(auth, githubProvider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      set(ref(database, 'users/' + user.uid), {
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      })

      
        .then(() => {
          console.log("User data saved successfully.");
        })
        .catch((error) => {
          console.error("Error saving user data:", error.message);
        });

        
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error Code: ${errorCode}, Error Message: ${errorMessage}`);
    });
});





















// createUserWithEmailAndPassword
submit.addEventListener("click", async (e) => {
  e.preventDefault();

  var file = imageupload.files[0];
  if (!file) {
    alert("Please select an image");
  }

  // url niklala cloudnary sy

  console.log(file);
  const CLOUDNAME = "docmzargc";
  const USINGNEDUPLOAD = "Raheel";
  const URL = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`;
  const formData = new FormData();
  formData.append("upload_preset", USINGNEDUPLOAD);
  formData.append("file", file);

  fetch(URL, {
    method: "POST",
    body: formData,
  })
    .then((resp) => {
      return resp.json();
    })
    .then(async (data) => {
      console.log(data);

    // endddddddd  

    
      const imageupload = document.getElementById("imageupload");
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const username = document.getElementById("username").value;
      const imageUrl = data.secure_url;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          
          set(ref(database, 'users/' + user.uid), {
            username: username,
            email: email,
            userId :user.uid,
            profilePicture: imageUrl,
          });
          
              
          console.log("User UID: ", user.uid);
          localStorage.setItem("userUID", user.uid);
          alert("User created successfully!");
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    })
    .catch((error) => {
      console.error("There was an error with the image upload:", error);
      alert("There was an error uploading the image.");
    });
});
