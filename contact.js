document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let nom = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let message = document.getElementById('message').value.trim();
    let formMessage = document.getElementById('form-message');

    if (nom === '' || email === '' || message === '') {
        formMessage.innerText = 'Veuillez remplir tous les champs obligatoires.';
        formMessage.className = 'error';
    } else {
        formMessage.innerText = '✓ Message envoyé avec succès ! Nous vous répondrons sous 24h.';
        formMessage.className = 'success';
        document.getElementById('contact-form').reset();
    }
});

document.getElementById('hamburger').addEventListener('click', function() {
    let menu = document.getElementById('nav-menu');
    menu.classList.toggle('ouvert');
});