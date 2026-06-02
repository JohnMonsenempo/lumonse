let total = 0;

function ajouterAuPanier(nomProduit) {
    total = total + 1;
    document.getElementById('cart-count').innerText = total;

    let notification = document.getElementById('notification');
    notification.innerText = nomProduit + ' ajouté au panier !';
    notification.classList.add('visible');

    setTimeout(function() {
        notification.classList.remove('visible');
    }, 2500);
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let nom = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let message = document.getElementById('message').value.trim();
    let formMessage = document.getElementById('form-message');

    if (nom === '' || email === '' || message === '') {
        formMessage.innerText = 'Veuillez remplir tous les champs.';
        formMessage.className = 'error';
    } else {
        formMessage.innerText = 'Message envoyé avec succès !';
        formMessage.className = 'success';
        document.getElementById('contact-form').reset();
    }
});

fetch('produits.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(produits) {
        let container = document.getElementById('product-list');
        
        produits.forEach(function(produit) {
            container.innerHTML += `
                <div class="product-item">
                    <img src="${produit.image}" alt="${produit.nom}">
                    <h3>${produit.nom}</h3>
                    <p>Prix: ${produit.prix}€</p>
                    <a href="#" class="btn" onclick="ajouterAuPanier('${produit.nom}')">
                        Ajouter au panier
                    </a>
                </div>
            `;
        });
    });