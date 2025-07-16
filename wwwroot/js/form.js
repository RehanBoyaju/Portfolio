window.onload = function () {
    var form = document.querySelector(".contact__form");
    var submitButton = document.getElementById("submit");
    var loadingButton = document.getElementById("loading");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        var name = form.name.value.trim();
        var email = form.email.value.trim();
        var message = form.message.value.trim();

        if (!name || !email || !message) {
            submitButton.style.display = "block";
            loadingButton.style.display = "none";
            alert("Please fill out all fields.");

            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            submitButton.style.display = "block";
            loadingButton.style.display = "none";
            return;
        }

        var currentTime = new Date();
        submitButton.style.display = "none";  // Hide the submit button
        loadingButton.style.display = "block";  // Show the loading button"


        // Format the date as 'YYYY-MM-DD HH:MM:SS'
        var formattedTime = currentTime.getFullYear() + '-' +
            ('0' + (currentTime.getMonth() + 1)).slice(-2) + '-' +
            ('0' + currentTime.getDate()).slice(-2) + ' ' +
            ('0' + currentTime.getHours()).slice(-2) + ':' +
            ('0' + currentTime.getMinutes()).slice(-2) + ':' +
            ('0' + currentTime.getSeconds()).slice(-2);




        const oldTimeInput = form.querySelector('input[name="time"]');
        if (oldTimeInput) oldTimeInput.remove();

        const oldTitleInput = form.querySelector('input[name="title"]');
        if (oldTitleInput) oldTitleInput.remove();
        
        // Add a hidden time input before submitting
        var timeInput = document.createElement("input");
        timeInput.type = "hidden";
        timeInput.name = "time";
        timeInput.value = formattedTime;
        form.appendChild(timeInput);  // Add the hidden time input to the form

        var titleInput = document.createElement("input");
        titleInput.type = "hidden";
        titleInput.name = "title";
        titleInput.value = "Contact Form Submission for your Portfolio website"
        form.appendChild(titleInput);  // Add the hidden title input to the form



        // ✅ Send email using EmailJS with the form (which now includes the 'time' input)
        emailjs.sendForm('service_g2e2eqs', 'template_iu359mz', form)
            .then(async function () {
                form.reset();
                submitButton.style.display = "block";
                loadingButton.style.display = "none";
                alert("Message sent successfully!");

            }, async function (error) {
                form.reset();
                submitButton.style.display = "block";
                loadingButton.style.display = "none";
                alert("Failed to send message: " + JSON.stringify(error));

            });

    });

};
function delay(ms) {
    console.log("Delay for 2 seconds");
    return new Promise(resolve => setTimeout(resolve, ms));
}
