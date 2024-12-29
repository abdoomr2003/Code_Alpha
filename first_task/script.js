document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("age-form");
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");
    const dayError = document.getElementById("day-error");
    const monthError = document.getElementById("month-error");
    const yearError = document.getElementById("year-error");
    const result = document.getElementById("result");
    const ageYears = document.getElementById("age-years");
    const ageDays = document.getElementById("age-days");

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    // Populate month options
    months.forEach((month, index) => {
      const option = document.createElement("option");
      option.value = index + 1;
      option.textContent = month;
      monthInput.appendChild(option);
    });

    const validateDate = (day, month, year) => {
      const errors = {};
      const currentYear = new Date().getFullYear();

      if (!day || day < 1 || day > 31) {
        errors.day = "Please enter a valid day (1-31)";
      }

      if (!month || month < 1 || month > 12) {
        errors.month = "Please select a valid month";
      }

      if (!year || year < 1900 || year > currentYear) {
        errors.year = `Please enter a valid year (1900-${currentYear})`;
      }

      const date = new Date(year, month - 1, day);
      if (date.getDate() !== parseInt(day)) {
        errors.day = "Invalid date for selected month";
      }

      return errors;
    };

    const calculateAge = (birthDate) => {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }

      const daysPassed = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
      return { years: age, days: daysPassed };
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const day = parseInt(dayInput.value);
      const month = parseInt(monthInput.value);
      const year = parseInt(yearInput.value);

      const errors = validateDate(day, month, year);

      // Clear previous errors
      dayError.textContent = "";
      dayError.classList.add("hidden");
      monthError.textContent = "";
      monthError.classList.add("hidden");
      yearError.textContent = "";
      yearError.classList.add("hidden");

      if (Object.keys(errors).length > 0) {
        if (errors.day) {
          dayError.textContent = errors.day;
          dayError.classList.remove("hidden");
        }
        if (errors.month) {
          monthError.textContent = errors.month;
          monthError.classList.remove("hidden");
        }
        if (errors.year) {
          yearError.textContent = errors.year;
          yearError.classList.remove("hidden");
        }
        result.classList.add("hidden");
        return;
      }

      const birthDate = new Date(year, month - 1, day);
      const age = calculateAge(birthDate);

      ageYears.textContent = age.years;
      ageDays.textContent = age.days;

      result.classList.remove("hidden");
    });
  });
