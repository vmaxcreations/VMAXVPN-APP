// Authentication Logic for VMAX VPN 

// Wait for Firebase to load
document.addEventListener('DOMContentLoaded', () => {

    // --- Registration Logic ---
    const registerForm = document.getElementById('form-email');
    if (registerForm && window.location.pathname.includes('register.html')) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const inputs = registerForm.querySelectorAll('input');
            const fullName = inputs[0].value;
            const dob = inputs[1].value;
            const email = inputs[2].value;
            const password = inputs[3].value;

            try {
                // 1. Create user in Firebase Authentication
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // 2. Save additional user details in Firestore Database
                await db.collection("users").doc(user.uid).set({
                    fullName: fullName,
                    dob: dob,
                    email: email,
                    role: "user", // default role
                    status: "Active",
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                alert("Registration Successful! Please log in.");
                window.location.href = "login.html";

            } catch (error) {
                console.error("Registration Error:", error);
                alert("Error: " + error.message);
            }
        });
    }

    // Phone / Mobile Authentication Logic Removed due to OTP issues
    // Using Email only as per user request

    // --- Login Logic ---
    const loginForm = document.getElementById('form-email');
    if (loginForm && window.location.pathname.includes('login.html')) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const inputs = loginForm.querySelectorAll('input');
            const email = inputs[0].value;
            const password = inputs[1].value;

            try {
                // Sign in user
                const userCredential = await auth.signInWithEmailAndPassword(email, password);

                // Let's check user role from Firestore before redirecting
                const doc = await db.collection("users").doc(userCredential.user.uid).get();
                if (doc.exists) {
                    const userData = doc.data();
                    if (userData.role === "admin") {
                        window.location.href = "admin.html";
                    } else {
                        // Regular user redirect (E.g. user-dashboard.html, but we will send them to home for now)
                        alert("Login Successful! Welcome back.");
                        window.location.href = "index.html";
                    }
                } else {
                    // No user data found but auth successful
                    window.location.href = "index.html";
                }

            } catch (error) {
                console.error("Login Error:", error);
                alert("Error: " + error.message);
            }
        });
    }

    // --- Auth State Observer (Optional: secure the Admin page) ---
    if (window.location.pathname.includes('admin.html')) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, check if they are admin
                db.collection("users").doc(user.uid).get().then((doc) => {
                    if (!doc.exists || doc.data().role !== "admin") {
                        // Not an admin
                        alert("Access Denied: You do not have admin privileges.");
                        window.location.href = "index.html";
                    }
                });
            } else {
                // No user is signed in
                window.location.href = "login.html";
            }
        });
    }
});
