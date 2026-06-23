import { supabase } from "./utils.js";

let modal = "";
let signupForm = "";
let loginForm = "";
let loginBtn = "";
let loginBtnText = "";
let loginBtnContainer = "";
let afterLoginContainer = "";
let profileModal = "";
let passwordModal = "";

function loader(button) {
  const original = button.innerHTML;
  button.disabled = true;
  button.innerHTML = `
    <div role="status" class="flex item-center justify-center">
    <svg aria-hidden="true" class="w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
</div>
  `;

  return original;
}

function removeLoader(button, orginal) {
  button.disabled = false;
  button.innerHTML = orginal;
}

function closeModalFunction() {
  modal.classList.add("hidden");
  modal.style.display = "none";
  document.body.style.overflow = "";
}

function closeProfileModal() {
  if (profileModal) {
    profileModal.classList.add("hidden");
    profileModal.style.display = "none";
    document.body.style.overflow = "";
  }
}

function closePasswordModal() {
  if (passwordModal) {
    passwordModal.classList.add("hidden");
    passwordModal.style.display = "none";
    document.body.style.overflow = "";
  }
}

(function () {
  const navbarHTML = `
    <nav class="bg-green-400 sticky top-0 z-20 w-full shadow-sm mb-8">
      <div class="flex flex-wrap items-center justify-between mx-auto p-4 lg:px-12">
        <a href="index.html" class="flex items-center space-x-3">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 lg:h-8" alt="Logo" />
          <span class="self-center lg:text-xl text-white font-bold">SMIT E-Store</span>
        </a>
        
        <div class="flex items-center md:order-2">
          <div id="afterLoginContainer">
            <li id="loginBtnContainer" class="md:ml-4 hidden md:block">
              <button id="loginModalBtn" class="w-full md:w-auto flex items-center justify-center gap-2 bg-white text-green-700 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition">
                <i class="fas fa-user-circle"></i>
                <span id="loginBtnText">Login / Signup</span>
              </button>
            </li>
          </div>
          <button id="mobileMenuBtn" class="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden hover:bg-green-500">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"></path>
            </svg>
          </button>
        </div>

        <div class="hidden w-full md:block md:w-auto" id="navbarMenu">
          <ul class="font-medium item-center flex flex-col p-4 md:p-0 mt-4 border border-green-200 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:bg-transparent md:border-0">
            <li><a href="index.html" class="block mt-2 py-2 px-3 text-gray-800 rounded md:text-white md:p-0 hover:text-green-200">Home</a></li>
            <li><a href="#" class="block mt-2 py-2 px-3 text-gray-800 rounded md:text-white md:p-0 hover:text-green-200">About</a></li>
            <li><a href="#" class="block mt-2 py-2 px-3 text-gray-800 rounded md:text-white md:p-0 hover:text-green-200">Services</a></li>
            <li><a href="#" class="block mt-2 py-2 px-3 text-gray-800 rounded md:text-white md:p-0 hover:text-green-200">Contact</a></li>
            <li id="loginBtnContainerMobile" class="md:ml-4 md:hidden">
              <button id="loginModalBtnMobile" class="w-full md:w-auto flex items-center justify-center gap-2 bg-white text-green-700 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition">
                <i class="fas fa-user-circle"></i>
                <span id="loginBtnTextMobile">Login / Signup</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Auth Modal -->
    <div id="authModal" class="fixed inset-0 hidden items-center justify-center z-50" style="background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(8px);">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold text-gray-800" id="modalTitle">Login</h3>
            <button id="closeModalBtn" class="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
          </div>
          
          <div class="flex gap-3 mb-6 border-b">
            <button id="loginTabBtn" class="py-2 px-4 text-green-600 border-b-2 border-green-600 font-medium transition">Login</button>
            <button id="signupTabBtn" class="py-2 px-4 text-gray-500 border-b-2 border-transparent hover:text-green-600 font-medium transition">Sign Up</button>
          </div>

          <div id="loginPanel">
            <form id="loginForm">
              <input type="email" id="loginEmail" placeholder="Email Address" class="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
              <input type="password" id="loginPassword" placeholder="Password" class="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
              <button type="submit" class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">Login</button>
            </form>
          </div>

          <div id="forgetPanel" class="hidden">
            <form id="forgetForm">
              <input type="email" id="forgetEmail" placeholder="Email Address" class="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
              <button  type="submit" class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">Forget Password</button>
            </form>
          </div>

          <div id="signupPanel" class="hidden">
            <form id="signupForm">
              <input type="text" id="signupName" placeholder="Full Name" class="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
              <input type="email" id="signupEmail" placeholder="Email Address" class="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
              <input type="password" id="signupPassword" placeholder="Password" class="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
              <button type="submit" class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">Create Account</button>
            </form>
          </div>
          <p id="forgetBtn" class="text-xs cursor-pointer hover:opacity-35 text-gray-500 text-center mt-3">Forget Password</p>
        </div>
      </div>
    </div>

    <!-- Profile Update Modal -->
    <div id="profileModal" class="fixed inset-0 hidden items-center justify-center z-50" style="background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(8px);">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold text-gray-800">Update Profile</h3>
            <button id="closeProfileModalBtn" class="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
          </div>
          
          <form id="updateProfileForm">
            <div class="mb-4">
              
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input type="text" id="updateName" placeholder="Full Name" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input type="email" id="updateEmail" placeholder="Email Address" class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" disabled />
            </div>

            <button type="submit" class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">Update Profile</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Password Update Modal -->
    <div id="passwordModal" class="fixed inset-0 hidden items-center justify-center z-50" style="background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(8px);">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold text-gray-800">Change Password</h3>
            <button id="closePasswordModalBtn" class="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
          </div>
          
          <form id="updatePasswordForm">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Current Password</label>
              <input type="password" id="currentPassword" placeholder="Enter current password" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">New Password</label>
              <input type="password" id="newPassword" placeholder="Enter new password" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required minlength="6" />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm new password" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required minlength="6" />
            </div>

            <button type="submit" class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", navbarHTML);

  afterLoginContainer = document.getElementById("afterLoginContainer");
  loginBtn = document.getElementById("loginModalBtn");
  loginBtnContainer = document.getElementById("loginBtnContainer");
  const loginBtnContainerMobile = document.getElementById(
    "loginBtnContainerMobile",
  );
  const loginBtnMobile = document.getElementById("loginModalBtnMobile");

  const closeBtn = document.getElementById("closeModalBtn");
  const loginTab = document.getElementById("loginTabBtn");
  const signupTab = document.getElementById("signupTabBtn");
  const loginPanel = document.getElementById("loginPanel");
  const signupPanel = document.getElementById("signupPanel");
  const forgetPanel = document.getElementById("forgetPanel");
  const forgetBtn = document.getElementById("forgetBtn");

  loginBtnText = document.getElementById("loginBtnText");

  // Profile modal elements
  profileModal = document.getElementById("profileModal");
  const closeProfileBtn = document.getElementById("closeProfileModalBtn");

  // Password modal elements
  passwordModal = document.getElementById("passwordModal");
  const closePasswordBtn = document.getElementById("closePasswordModalBtn");

  const user = localStorage.getItem("user");
  if (user) {
    const userData = JSON.parse(user);
    if (loginBtnText) loginBtnText.textContent = `Hi, ${userData.name}`;
    if (loginBtn) {
      loginBtn.classList.remove("bg-white", "text-green-700");
      loginBtn.classList.add("bg-green-700", "text-white");
    }
  }

  modal = document.getElementById("authModal");
  if (loginBtn) {
    loginBtn.onclick = () => {
      modal.classList.remove("hidden");
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    };
  }

  if (loginBtnMobile) {
    loginBtnMobile.onclick = () => {
      modal.classList.remove("hidden");
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    };
  }

  if (closeBtn) {
    closeBtn.onclick = closeModalFunction;
  }

  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) {
        closeModalFunction();
      }
    };
  }

  // Profile modal close handlers
  if (closeProfileBtn) {
    closeProfileBtn.onclick = closeProfileModal;
  }

  if (profileModal) {
    profileModal.onclick = (e) => {
      if (e.target === profileModal) {
        closeProfileModal();
      }
    };
  }

  // Password modal close handlers
  if (closePasswordBtn) {
    closePasswordBtn.onclick = closePasswordModal;
  }

  if (passwordModal) {
    passwordModal.onclick = (e) => {
      if (e.target === passwordModal) {
        closePasswordModal();
      }
    };
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modal && !modal.classList.contains("hidden")) {
        closeModalFunction();
      }
      if (profileModal && !profileModal.classList.contains("hidden")) {
        closeProfileModal();
      }
      if (passwordModal && !passwordModal.classList.contains("hidden")) {
        closePasswordModal();
      }
    }
  });

  if (loginTab && signupTab && forgetBtn) {
    loginTab.onclick = () => {
      loginTab.className =
        "py-2 px-4 text-green-600 border-b-2 border-green-600 font-medium transition";
      signupTab.className =
        "py-2 px-4 text-gray-500 border-b-2 border-transparent hover:text-green-600 font-medium transition";
      loginPanel.classList.remove("hidden");
      signupPanel.classList.add("hidden");
      forgetPanel.classList.add("hidden");
      document.getElementById("modalTitle").textContent = "Login";
    };

    signupTab.onclick = () => {
      signupTab.className =
        "py-2 px-4 text-green-600 border-b-2 border-green-600 font-medium transition";
      loginTab.className =
        "py-2 px-4 text-gray-500 border-b-2 border-transparent hover:text-green-600 font-medium transition";
      signupPanel.classList.remove("hidden");
      loginPanel.classList.add("hidden");
      forgetPanel.classList.add("hidden");
      document.getElementById("modalTitle").textContent = "Sign Up";
    };

    forgetBtn.onclick = () => {
      signupTab.className =
        "py-2 px-4 text-gray-500 border-b-2 border-transparent hover:text-green-600 font-medium transition";
      loginTab.className =
        "py-2 px-4 text-gray-500 border-b-2 border-transparent hover:text-green-600 font-medium transition";
      signupPanel.classList.add("hidden");
      loginPanel.classList.add("hidden");
      forgetPanel.classList.remove("hidden");
      document.getElementById("modalTitle").textContent = "Forget Password";
    };
  }

  const forgetForm = document.getElementById("forgetForm");
  if (forgetForm) {
    forgetForm.onsubmit = (e) => {
      e.preventDefault();
      const forgetEmail = document.getElementById("forgetEmail").value;
      forgetPassword(forgetEmail);
    };
  }

  loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      if (email && password) {
        signIn(email, password);
      } else {
        alert("Please fill in all fields");
      }
    };
  }

  signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;
      if (name && email && password) {
        signUp(email, password, name);
      } else {
        alert("Please fill in all fields");
      }
    };
  }

  // Profile update form handler
  const updateProfileForm = document.getElementById("updateProfileForm");
  if (updateProfileForm) {
    updateProfileForm.onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById("updateName").value;
      const fileInput = document.getElementById("profileImage");
      await updateUserProfile(name, fileInput.files[0]);
    };
  }

  // Password update form handler
  const updatePasswordForm = document.getElementById("updatePasswordForm");
  if (updatePasswordForm) {
    updatePasswordForm.onsubmit = async (e) => {
      e.preventDefault();
      const currentPassword = document.getElementById("currentPassword").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (newPassword !== confirmPassword) {
        alert("New passwords do not match!");
        return;
      }

      if (newPassword.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
      }

      await updateUserPassword(currentPassword, newPassword);
    };
  }

  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navbarMenu = document.getElementById("navbarMenu");
  if (mobileBtn && navbarMenu) {
    mobileBtn.onclick = () => navbarMenu.classList.toggle("hidden");
  }
})();

async function signUp(email, password, name) {
  console.log(name);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    alert(error.message);
    return;
  }
  closeModalFunction();
  alert(`Account created! Welcome ${name}`);
  signupForm.reset();
}

async function logOut() {
  const { error } = await supabase.auth.signOut();
  localStorage.removeItem("user");
  window.location.reload();
}

async function updateUserProfile(name, imageFile) {
  try {
    let avatarUrl = null;

    // Upload image if provided
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Error uploading image: " + uploadError.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);
      avatarUrl = publicUrl;
    }

    // Update user metadata
    const updates = {
      data: {
        full_name: name,
        ...(avatarUrl && { avatar_url: avatarUrl }),
      },
    };

    const { data, error } = await supabase.auth.updateUser(updates);

    if (error) {
      alert("Error updating profile: " + error.message);
      return;
    }

    // Update local storage
    const userData = {
      name: name,
      email: data.user.email,
      ...(avatarUrl && { avatar_url: avatarUrl }),
    };
    localStorage.setItem("user", JSON.stringify(userData));

    closeProfileModal();
    alert("Profile updated successfully!");
    window.location.reload();
  } catch (error) {
    alert("An error occurred while updating profile: " + error.message);
  }
}

async function updateUserPassword(currentPassword, newPassword) {
  try {
    // First, verify current password by attempting to sign in
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user.email,
        password: currentPassword,
      });

    if (signInError) {
      alert("Current password is incorrect!");
      return;
    }

    // Update password
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert("Error updating password: " + error.message);
      return;
    }

    closePasswordModal();
    alert("Password updated successfully!");
    document.getElementById("updatePasswordForm").reset();
  } catch (error) {
    alert("An error occurred while updating password: " + error.message);
  }
}

async function updateUIForLoggedInUser(user) {
  const fullName = user.user_metadata.full_name || "User";
  const email = user.user_metadata.email || user.email || "";
  const avatarUrl = user.user_metadata.avatar_url || null;
  const initial = fullName.charAt(0).toUpperCase();

  const loginBtnContainer = document.getElementById("loginBtnContainer");
  const loginBtnContainerMobile = document.getElementById(
    "loginBtnContainerMobile",
  );

  if (loginBtnContainer) {
    loginBtnContainer.style.display = "none";
  }
  if (loginBtnContainerMobile) {
    loginBtnContainerMobile.style.display = "none";
  }

  afterLoginContainer.innerHTML = "";
  afterLoginContainer.innerHTML = `
    <div class="relative mx-2 -mt-1">
      <button id="avatarButton" class="flex items-center gap-2 hover:bg-gray-100 rounded-full lg:px-3 lg:py-1.5 transition-colors duration-200">
        <div class="w-6 lg:w-9 h-6 lg:h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center text-[12px] lg:text-base justify-center text-white font-semibold text-sm shadow-md">
          ${initial}
        </div>
        <span class="text-sm font-medium text-gray-700 hidden md:block">${fullName.split(" ")[0]}</span>
        <svg class="w-3 h-3 text-gray-500 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <div id="userDropdown" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
        <div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <p class="text-sm font-semibold text-gray-800">${fullName}</p>
          <p class="text-xs text-gray-500 truncate">${email}</p>
        </div>

        <div class="py-1">
          <button id="profileBtn" class="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Profile
          </button>
          <button id="settingsBtn" class="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Settings
          </button>
        </div>

        <div class="border-t border-gray-200 py-1">
          <button id="logoutBtn" class="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
            <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  `;

  const avatarButton = document.getElementById("avatarButton");
  const dropdown = document.getElementById("userDropdown");

  if (avatarButton && dropdown) {
    avatarButton.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target) && !avatarButton.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    });
  }

  // Profile button handler
  const profileBtn = document.getElementById("profileBtn");
  if (profileBtn) {
    profileBtn.addEventListener("click", () => {
      dropdown.classList.add("hidden");
      openProfileModal(user);
    });
  }

  // Settings button handler (opens password modal)
  const settingsBtn = document.getElementById("settingsBtn");
  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      dropdown.classList.add("hidden");
      openPasswordModal();
    });
  }

  let logoutBtn = document.getElementById("logoutBtn");
  logoutBtn?.addEventListener("click", logOut);
}

function openProfileModal(user) {
  const profileModal = document.getElementById("profileModal");
  if (!profileModal) return;

  // Populate form fields
  const fullName = user.user_metadata.full_name || "";
  const email = user.email || "";

  document.getElementById("updateName").value = fullName;
  document.getElementById("updateEmail").value = email;

  // Set profile image preview
  const preview = document.getElementById("profileImagePreview");
  if (preview) {
    const initial = fullName.charAt(0).toUpperCase();
    preview.textContent = initial;
    preview.style.background =
      "linear-gradient(to bottom right, #4ade80, #16a34a)";

    // If there's an avatar URL, set it as background image
  }

  profileModal.classList.remove("hidden");
  profileModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function openPasswordModal() {
  const passwordModal = document.getElementById("passwordModal");
  if (!passwordModal) return;

  // Reset form
  document.getElementById("updatePasswordForm").reset();

  passwordModal.classList.remove("hidden");
  passwordModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

async function signIn(email, password) {
  const signBtn = document.querySelector('#loginForm button[type="submit"]');
  console.log(signBtn);
  const original = loader(signBtn);
  console.log(original);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
      removeLoader(signBtn, original)
      return;
    }
    const { user, session } = data;
    updateUIForLoggedInUser(user);
    closeModalFunction();
    alert(`Welcome ${user.user_metadata.full_name}`);
    window.location.reload();
  } catch (err) {
    alert(error.message);
  } finally {
    removeLoader(signBtn, original)
  }
}

async function forgetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://127.0.0.1:5500/index.html",
  });
  if (error) {
    alert(error.message);
    return;
  }
  closeModalFunction();
}

(async function () {
  const { data, error } = await supabase.auth.getSession();
  let user = "";
  console.log(data);
  if (data.session) {
    user = data.session.user;
  }
  if (error) {
    await logOut();
  }
  if (user) {
    await updateUIForLoggedInUser(user);
  }
})();
