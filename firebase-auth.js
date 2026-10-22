import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const signInButton = document.querySelector("#sign-in-button");
const signOutButton = document.querySelector("#sign-out-button");
const userMenu = document.querySelector("#user-menu");
const userSummary = document.querySelector("#user-summary");
const status = document.querySelector("#auth-status");
const roleDialog = document.querySelector("#role-dialog");
const blogSection = document.querySelector("#blog");

const isConfigured = !Object.values(firebaseConfig).some((value) => String(value).startsWith("REPLACE_WITH"));

function showStatus(message, isError = false) {
  status.textContent = message;
  status.dataset.error = String(isError);
}

function setBlogAccess(canRead) {
  blogSection.dataset.locked = String(!canRead);
  blogSection.setAttribute("aria-hidden", String(!canRead));
}

if (!isConfigured) {
  setBlogAccess(false);
  signInButton.addEventListener("click", () => {
    showStatus("Firebase web configuration is required before Google sign-in can start.", true);
  });
} else {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();

  signInButton.addEventListener("click", async () => {
    signInButton.disabled = true;
    showStatus("Opening Google sign-in…");
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        showStatus("Google sign-in could not be completed. Please try again.", true);
      } else {
        showStatus("Sign-in cancelled.");
      }
    } finally {
      signInButton.disabled = false;
    }
  });

  signOutButton.addEventListener("click", async () => {
    await signOut(auth);
    setBlogAccess(false);
    showStatus("You have been signed out.");
  });

  document.querySelectorAll("[data-role]").forEach((button) => {
    button.addEventListener("click", async () => {
      const user = auth.currentUser;
      if (!user) return;
      const role = button.dataset.role;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        role,
        unauthorizedUser: false,
        updatedAt: serverTimestamp()
      }, { merge: true });
      roleDialog.close();
      userSummary.textContent = `${user.displayName || user.email} · ${role}`;
      setBlogAccess(true);
      showStatus(`Signed in as ${role}.`);
    });
  });

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      signInButton.hidden = false;
      userMenu.hidden = true;
      setBlogAccess(false);
      return;
    }
    signInButton.hidden = true;
    userMenu.hidden = false;
    const profile = await getDoc(doc(db, "users", user.uid));
    const role = profile.exists() ? profile.data().role : null;
    const unauthorizedUser = profile.exists() ? profile.data().unauthorizedUser === true : false;
    userSummary.textContent = role ? `${user.displayName || user.email} · ${role}` : (user.displayName || user.email);
    setBlogAccess(Boolean(role) && !unauthorizedUser);
    if (!role && !roleDialog.open) roleDialog.showModal();
  });
}
