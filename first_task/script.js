function calculateAge() {
    // Retrieve day, month, and year values from input fields
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    // Check if all fields are filled
    if (!day || !month || !year) {
    alert('Please fill in all fields.');
    return;
    }

    // Validate that entered values are positive numbers
    if (day <= 0 || month <= 0 || year <= 0) {
    alert('Please enter a valid number.');
    return;
    }

    // Get current date
    const today = new Date();
    // Create a date object for the birth date
    const birthDate = new Date(year, month - 1, day);

    // Calculate age by subtracting birth year from current year
    let age = today.getFullYear() - birthDate.getFullYear();
    // Calculate the difference in months
    const m = today.getMonth() - birthDate.getMonth();

    // Adjust age if birth month and day have not occurred yet this year
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
    }

    // Display the calculated age in the result element
    document.getElementById('result').innerText = `You are ${age} years old.`;
}
