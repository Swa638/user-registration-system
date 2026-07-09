const userForm = document.getElementById("userForm");
const messageBox = document.getElementById("message");
const userList = document.getElementById("userList");
const totalUsers = document.getElementById("totalusers");
const showMessage = (text, type) => {
messageBox.textContent = text;
messageBox.className = `notification ${type}`;
};

// Load all users
async function loadUsers() {
try {
const response = await fetch("/users");
const result = await response.json();

userList.innerHTML = "";
totalUsers.innerHTML = `Total Users: ${result.data.length}`;

result.data.forEach((user) => {
userList.innerHTML += `
<div class="card">
<h3>👤 ${user.name}</h3>
<p><strong>📩 Email:</strong> ${user.email}</p>
<p><strong>📞 Phone:</strong> ${user.phone}</p>
<p><strong>💁‍♂️ Age:</strong> ${user.age}</p>
</div>
`;
});
} catch (error) {
console.error(error);
}
}

// Register User
userForm.addEventListener("submit", async (event) => {
event.preventDefault();

const userData = {
name: document.getElementById("name").value.trim(),
email: document.getElementById("email").value.trim(),
phone: document.getElementById("phone").value.trim(),
age: document.getElementById("age").value
};

try {
const response = await fetch("/register", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(userData)
});

const data = await response.json();

if (response.ok) {
showMessage(data.message, "success");
userForm.reset();

// Refresh user list
loadUsers();

} else {
showMessage(data.message || "Unable to register user.", "error");
}

} catch (error) {
console.error(error);
showMessage("Something went wrong.", "error");
}
});

// Load users when page opens
loadUsers();
