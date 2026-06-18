import { supabase } from "./utils.js";

let modal = "";
let signupForm = "";
let loginForm = "";
let loginBtn = "";
let loginBtnText = "";

function closeModalFunction() {
  modal.classList.add("hidden");

  modal.style.display = "none";

  // Restore body scrolling

  document.body.style.overflow = "";
}

(function () {
  // Navbar HTML

  const navbarHTML = `

        <nav class="bg-green-400 sticky top-0 z-20 w-full shadow-sm mb-8">

            <div class="flex flex-wrap items-center justify-between mx-auto p-4 lg:px-12">

                <a href="index.html" class="flex items-center space-x-3">

                    <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Logo" />

                    <span class="self-center text-xl text-white font-bold">SMIT E-Store</span>

                </a>

                

                <button id="mobileMenuBtn" class="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden hover:bg-green-500">

                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                        <path stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"></path>

                    </svg>

                </button>

                

                <div class="hidden w-full md:block md:w-auto" id="navbarMenu">

                    <ul class="font-medium item-center flex flex-col p-4 md:p-0 mt-4 border border-green-200 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:bg-transparent md:border-0">

                        <li><a href="index.html" class="block mt-2 py-2 px-3 text-gray-800 rounded md:text-white md:p-0 hover:text-green-200">Home</a></li>

                        <li><a href="#" class="block mt-2 py-2 px-3 text-gray-800 rounded md:text-white md:p-0 hover:text-green-200">About</a></li>

                        <li><a href="#" class="block mt-2 py-2 px-3 text-gray-800 rounded md:text-white md:p-0 hover:text-green-200">Services</a></li>

                        <li><a href="#" class="block mt-2 py-2 px-3 text-gray-800 rounded md:text-white md:p-0 hover:text-green-200">Contact</a></li>

                        <li class="md:ml-4">
                            <button id="loginModalBtn" class="w-full md:w-auto flex items-center justify-center gap-2 bg-white text-green-700 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition">

                                <i class="fas fa-user-circle"></i>

                                <span id="loginBtnText">Login / Signup</span>

                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

        

        <!-- Modal with blur effect and centering -->

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

                            <p class="text-xs text-gray-500 text-center mt-3">Demo: any email/password works</p>

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

                </div>

            </div>

        </div>

    `;

  // Add navbar to page

  document.body.insertAdjacentHTML("afterbegin", navbarHTML);

  // Modal elements

  loginBtn = document.getElementById("loginModalBtn");

  const closeBtn = document.getElementById("closeModalBtn");

  const loginTab = document.getElementById("loginTabBtn");

  const signupTab = document.getElementById("signupTabBtn");

  const loginPanel = document.getElementById("loginPanel");

  const signupPanel = document.getElementById("signupPanel");

  loginBtnText = document.getElementById("loginBtnText");

  // Check logged in user

  const user = localStorage.getItem("user");

  if (user) {
    const userData = JSON.parse(user);

    if (loginBtnText) loginBtnText.textContent = `Hi, ${userData.name}`;

    if (loginBtn) {
      loginBtn.classList.remove("bg-white", "text-green-700");

      loginBtn.classList.add("bg-green-700", "text-white");
    }
  }

  // Open modal - using flex to center
  modal = document.getElementById("authModal");
  if (loginBtn) {
    loginBtn.onclick = () => {
      modal.classList.remove("hidden");

      modal.style.display = "flex";

      // Prevent body scrolling when modal is open

      document.body.style.overflow = "hidden";
    };
  }

  // Close modal function

  // Close modal

  if (closeBtn) {
    closeBtn.onclick = closeModalFunction;
  }

  // Close modal when clicking on the backdrop (the blurred background)

  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) {
        closeModalFunction();
      }
    };
  }

  // Close modal with Escape key

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
      closeModalFunction();
    }
  });

  // Switch tabs

  if (loginTab && signupTab) {
    loginTab.onclick = () => {
      loginTab.className =
        "py-2 px-4 text-green-600 border-b-2 border-green-600 font-medium transition";

      signupTab.className =
        "py-2 px-4 text-gray-500 border-b-2 border-transparent hover:text-green-600 font-medium transition";

      loginPanel.classList.remove("hidden");

      signupPanel.classList.add("hidden");

      document.getElementById("modalTitle").textContent = "Login";
    };

    signupTab.onclick = () => {
      signupTab.className =
        "py-2 px-4 text-green-600 border-b-2 border-green-600 font-medium transition";

      loginTab.className =
        "py-2 px-4 text-gray-500 border-b-2 border-transparent hover:text-green-600 font-medium transition";

      signupPanel.classList.remove("hidden");

      loginPanel.classList.add("hidden");

      document.getElementById("modalTitle").textContent = "Sign Up";
    };
  }

  // Handle login

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

  // Handle signup
  signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.onsubmit = (e) => {
      e.preventDefault();

      const name = document.getElementById("signupName").value;

      const email = document.getElementById("signupEmail").value;

      const password = document.getElementById("signupPassword").value;

      if (name && email && password) {
        // localStorage.setItem('user', JSON.stringify({ name, email }));
        signUp(email, password, name);
      } else {
        alert("Please fill in all fields");
      }
    };
  }

  // Mobile menu toggle

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

async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    alert(error.message);
    return;
  }

  const { user, session } = data;
  loginBtnText.textContent = `Hi, ${user.user_metadata.full_name}`;
  loginBtn.classList.remove("bg-white", "text-green-700");
  loginBtn.classList.add("bg-green-700", "text-white");
  closeModalFunction();
  alert(`Welcome ${user.user_metadata.full_name}`);
}
