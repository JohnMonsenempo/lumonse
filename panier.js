let panier = JSON.parse(localStorage.getItem('panier')) || [];

function afficherPanier() {
    let liste = document.getElementById('panier-liste');
    let totalElement = document.getElementById('panier-total');
    
    if (panier.length === 0) {
        liste.innerHTML = '<p style="text-align:center">Votre panier est vide.</p>';
        totalElement.innerText = '0€';
        return;
    }

    liste.innerHTML = '';
    let total = 0;

    panier.forEach(function(produit, index) {
        total += produit.prix * produit.quantite;
        liste.innerHTML += `
            <div class="panier-item">
                <span>${produit.nom}</span>
                <span>${produit.prix}€ x ${produit.quantite}</span>
                <span>${produit.prix * produit.quantite}€</span>
                <button onclick="supprimerProduit(${index})">✕</button>
            </div>
        `;
    });

    totalElement.innerText = total + '€';
    document.getElementById('cart-count').innerText = 
        panier.reduce((acc, p) => acc + p.quantite, 0);
}

function supprimerProduit(index) {
    panier.splice(index, 1);
    localStorage.setItem('panier', JSON.stringify(panier));
    afficherPanier();
}

document.getElementById('vider-panier').addEventListener('click', function() {
    localStorage.removeItem('panier');
    panier = [];
    afficherPanier();
});

document.getElementById('hamburger').addEventListener('click', function() {
    let menu = document.getElementById('nav-menu');
    menu.classList.toggle('ouvert');
});

afficherPanier();