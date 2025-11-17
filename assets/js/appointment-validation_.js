document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('appointmentForm');
    if (!form) return;

    /* ------------------------------------------------------------
       MODULE 1: DATE & TIME SETUP
    ------------------------------------------------------------ */
    const setupDateTime = () => {
        const dateInput = document.getElementById('appointmentDate');
        const timeInput = document.getElementById('appointmentTime');

        const today = new Date().toISOString().split('T')[0];
        if (dateInput) dateInput.min = today;

        if (timeInput && !timeInput.value) {
            timeInput.value = "09:00"; // aligned to 15-minute steps
        }
    };


    /* ------------------------------------------------------------
       MODULE 2: VALIDATION RULES
    ------------------------------------------------------------ */
    const validators = {
        fullName: v => v.trim().length >= 3,

        mobile: v => /^[6-9][0-9]{9}$/.test(v),

        email: v => v.trim() === "" ? true : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    };


    /* ------------------------------------------------------------
       MODULE 3: FORM HANDLER
    ------------------------------------------------------------ */
    const applyRealTimeValidation = () => {
        form.addEventListener('blur', e => {
            const f = e.target;
            if (!validators[f.id]) return;

            validators[f.id](f.value)
                ? f.classList.remove('is-invalid')
                : f.classList.add('is-invalid');

        }, true);
    };

    const handleSubmit = () => {
        form.addEventListener('submit', e => {
            e.preventDefault();

            let valid = true;

            ["fullName", "mobile", "email"].forEach(id => {
                const f = document.getElementById(id);
                if (!validators[id](f.value)) {
                    f.classList.add('is-invalid');
                    valid = false;
                } else {
                    f.classList.remove('is-invalid');
                }
            });

            if (!valid) {
                const firstInvalid = form.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalid.focus();
                }
                return;
            }

            alert("Appointment request submitted successfully! We will contact you shortly.");
            form.reset();
            setupDateTime(); // restore defaults
        });
    };


    /* ------------------------------------------------------------
       INITIALIZATION
    ------------------------------------------------------------ */
    setupDateTime();
    applyRealTimeValidation();
    handleSubmit();

});
