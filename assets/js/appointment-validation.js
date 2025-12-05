document.addEventListener('DOMContentLoaded', function () {

    // ======================================================
    // MODULE 1: DATE & TIME SETUP
    // ======================================================
    function setupDateTime() {
        const dateInput = document.getElementById('appointmentDate');
        const timeInput = document.getElementById('appointmentTime');

        // ===== DATE LIMITS =====
        if (dateInput) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            const todayStr = today.toISOString().split('T')[0];
            const tomorrowStr = tomorrow.toISOString().split('T')[0];

            dateInput.setAttribute('min', todayStr);
            dateInput.value = tomorrowStr; // Default selection = Tomorrow
        }

        // ===== TIME LIMITS =====
        if (timeInput) {
            timeInput.setAttribute('min', '09:00');
            timeInput.setAttribute('max', '21:00');
            timeInput.setAttribute('step', '900'); // 15 minutes

            // Default time
            if (!timeInput.value) {
                timeInput.value = '09:00';
            }

            // Snap to nearest 15-minute slot
            timeInput.addEventListener('change', () => {
                const [h, m] = timeInput.value.split(':').map(Number);
                const totalMins = h * 60 + m;

                // Round to nearest 15-min slot
                const snapped = Math.round(totalMins / 15) * 15;
                let finalH = Math.floor(snapped / 60);
                let finalM = snapped % 60;

                // Boundary enforcement
                if (finalH < 9) { finalH = 9; finalM = 0; }
                if (finalH > 21 || (finalH === 21 && finalM > 0)) {
                    finalH = 21;
                    finalM = 0;
                }

                timeInput.value = 
                    `${String(finalH).padStart(2, '0')}:${String(finalM).padStart(2, '0')}`;
            });
        }
    }




    // ======================================================
    // MODULE 2: VALIDATION RULES
    // ======================================================
    const validators = {
        fullName(value) {
            return value.trim().length >= 3;
        },

        mobile(value) {
            const mobilePattern = /^[6-9][0-9]{9}$/;
            return mobilePattern.test(value);
        },

        email(value) {
            if (value.trim() === "") return true; // optional field
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(value);
        }
    };



    // ======================================================
    // MODULE 3: FORM HANDLER
    // ======================================================
    function setupFormHandler() {

        const form = document.getElementById('appointmentForm');
        if (!form) return;

        // Real-time validation
        form.addEventListener('blur', function (event) {
            const field = event.target;
            if (!field.id) return;

            if (validators[field.id] && !validators[field.id](field.value)) {
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        }, true);

        // Submit handler
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            let isValid = true;

            const fields = ["fullName", "mobile", "email"];
            fields.forEach(id => {
                const el = document.getElementById(id);
                if (validators[id] && !validators[id](el.value)) {
                    el.classList.add('is-invalid');
                    isValid = false;
                } else {
                    el.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                alert('Appointment request submitted successfully! We will contact you shortly.');
                form.reset();
                setupDateTime(); // reset time correctly
            } else {
                const firstInvalid = form.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalid.focus();
                }
            }
        });
    }



    // ======================================================
    // INITIALIZE ALL MODULES
    // ======================================================
    setupDateTime();
    setupFormHandler();

});
