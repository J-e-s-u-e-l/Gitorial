document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessageContainer = document.getElementById('error-message');

    // Clear previous error messages
    removeErrorMessage();

    // Validate password and confirm password
    if (password !== confirmPassword) {
        insertErrorMessage('Passwords do not match.'); // Use the error message function
        return;
    }

    // Prepare data for submission
    const userData = {
        email: email,
        username: username,
        password: password
    };

    // Send data to the server
    fetch('https://localhost:7203/api/Auth/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {
                handleServerErrors(errData); // Handle server errors
                throw new Error('Signup failed'); // Throw an error to go to the catch block
            });
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
        console.log('Signup successful:', data);
        // Redirect to the login page or another page after successful signup
        window.location.href = '../html/sign-in.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Function to insert error messages
function insertErrorMessage(message) {
    const errorMessageContainer = document.getElementById('error-message');
    errorMessageContainer.textContent = message; // Set the error message
    errorMessageContainer.style.display = 'block'; // Show the error message
}

// Function to remove error messages
function removeErrorMessage() {
    const errorMessageContainer = document.getElementById('error-message');
    errorMessageContainer.textContent = ""; // Clear the message
    errorMessageContainer.style.display = 'none'; // Hide the message
}

// Function to handle server validation errors
function handleServerErrors(errData) {
    if (errData && !errData.succeeded) {
        const errorDescriptions = errData.errors.map(error => error.description);
        insertErrorMessage(errorDescriptions.join(', ')); // Display all error descriptions as a single message
    }
}