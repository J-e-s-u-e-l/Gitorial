document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-button');
    const toggleButton = document.querySelector('.toggle-button');
    const sidebar = document.querySelector('.sidebar');

    // Function to show all sections of the selected page and scroll to the target section
    function showSectionsAndScroll(targetId) {
        // Get the selected page based on the clicked button
        const selectedPage = Array.from(buttons).find(a => a.getAttribute('href').substring(1) === targetId).getAttribute('data-page');

        // Hide all sections first
        document.querySelectorAll('.content').forEach(section => {
            section.style.display = 'none'; // Hide all sections
        });

        // Show all sections belonging to the selected page
        document.querySelectorAll(`.${selectedPage}`).forEach(section => {
            section.style.display = 'block'; // Show sections of the selected page
        });

        // Scroll to the targeted section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the targeted section
        }

        // Update active button
        buttons.forEach(button => {
            button.classList.remove('active'); // Remove active class from all buttons
        });
        const activeButton = Array.from(buttons).find(button => button.getAttribute('href').substring(1) === targetId);
        if (activeButton) {
            activeButton.classList.add('active'); // Add active class to the clicked button
        }
    }

    // Add click event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior

            const targetId = button.getAttribute('href').substring(1); // Get the target section ID
            showSectionsAndScroll(targetId); // Show all sections and scroll to the targeted section
        });
    });

    // Toggle sidebar visibility 
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
        toggleButton.textContent = sidebar.classList.contains('hidden') ? '→' : '←'; // Change arrow direction
    });

    // Initially hide all sections (this is already done in your CSS)
    document.querySelectorAll('.content').forEach(section => {
        section.style.display = 'none'; // Ensure all sections are hidden on load
    });

    const userName = localStorage.getItem("UserName") || "User";
    console.log('Retrieved username:', userName); // Log the retrieved username
    document.getElementById("userName").textContent = `${userName}!`;
});

// Knowledge Test Section
const totalQuestions = [15, 10, 20, 10]; // Total questions for Module 1 to 4
    const correctAnswers = [
        { // Module 1
            q1: "B", q2: "B", q3: "C", q4: "C", q5: "B",
            q6: "B", q7: "C", q8: "C", q9: "B", q10: "B",
            q11: "B", q12: "B", q13: "C", q14: "C", q15: "B"
        },
        { // Module 2
            q1: "B", q2: "B", q3: "B", q4: "B", q5: "B",
            q6: "B", q7: "C", q8: "B", q9: "C", q10: "B"
        },
        { // Module 3
            q1: "B", q2: "B", q3: "B", q4: "B", q5: "B",
            q6: "B", q7: "C", q8: "B", q9: "A", q10: "B",
            q11: "C", q12: "C", q13: "B", q14: "B", q15: "B",
            q16: "C", q17: "C", q18: "B", q19: "C", q20: "B"
        },
        { // Module 4
            q1: "C", q2: "C", q3: "C", q4: "B", q5: "C",
            q6: "B", q7: "C", q8: "B", q9: "C", q10: "B"
        }
];

function checkAnswers(event, moduleIndex) {
    event.preventDefault(); // Prevent form submission
    
    const form = document.querySelectorAll('.quizForm')[moduleIndex];
    
    if (!form) {
        console.error("Form not found. Check moduleIndex or ensure form exists.");
        return;
    }

    let score = 0;
    const numQuestions = totalQuestions[moduleIndex];

    for (let i = 1; i <= numQuestions; i++) {
        const answer = form['q' + i]?.value; // Use optional chaining to avoid undefined errors
        // const answerElement = document.getElementById('answer' + i);
        const answerElement = form.querySelector(`[data-answer="q${i}"]`);

        if (answer === correctAnswers[moduleIndex]['q' + i]) {
            score++;
            answerElement.style.display = 'none';  // Hide correct answers
        } else {
            answerElement.style.display = 'block';  // Show correct answers for incorrect responses
        }
    }

    document.querySelectorAll('.scoreDisplay')[moduleIndex].innerText = 'Your score is ' + score + '/' + numQuestions;
}