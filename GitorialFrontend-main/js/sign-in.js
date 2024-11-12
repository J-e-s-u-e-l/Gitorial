document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    const errorMessageContainer = document.getElementById('error-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        removeErrorMessage(); // Clear previous error messages

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Create an object to hold the data
        const requestData = {
            email: email,
            password: password
        };

        // Send the POST request using Fetch API
        fetch("https://localhost:7203/api/Auth/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errData) => {
                        // Check if the error message matches the expected message
                        if (errData.message === "Username or Password is incorrect") {
                            insertErrorMessage(errData.message); // Show the error message
                        }
                        // Throw an error to skip the next then blocks
                        throw new Error("Network response was not ok: " + JSON.stringify(errData));
                    });
                }
                return response.json(); // Parse the JSON for successful response
            })
            .then((data) => {
                const userName = data.userName; // Extract UserName from the JSON response
                console.log("Success:", userName); // Log the UserName
                localStorage.setItem("UserName", userName); // Store it in localStorage
                window.location.href = "../html/landing-page.html"; // Redirect to the landing page
            })
            .catch((error) => console.error("Error:", error));
    });

    function insertErrorMessage(message) {
        errorMessageContainer.textContent = message; // Set the error message
        errorMessageContainer.style.display = 'block'; // Show the error message
    }

    function removeErrorMessage() {
        errorMessageContainer.textContent = ""; // Clear the message
        errorMessageContainer.style.display = 'none'; // Hide the message
    }
});