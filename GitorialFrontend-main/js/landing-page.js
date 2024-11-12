document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem("UserName") || "User";
    console.log('Retrieved username:', userName); // Log the retrieved username
    document.getElementById("userName").textContent = `${userName}`;
  });