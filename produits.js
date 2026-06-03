let tousLesProduits = [];
let total = JSON.parse(localStorage.getItem('panier'))?.reduce((acc, p) => acc + p.quantite, 0) || 0;
document.getElementById('cart-count').innerText = total;

fetch('produits.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(produits) {
        tousLesProduits = produits;
        afficherProduits(produits);
    });

function afficherProduits(produits) {
    let container = document.getElementById('product-list');
    container.innerHTML = '';

    produits.forEach(function(produit) {
        container.innerHTML += `
            <div class="product-item" data-categorie="${produit.categorie}">
                <img src="${produit.image}" alt="${produit.nom}">
                <h3>${produit.nom}</h3>
                <p>Prix: ${produit.prix}€</p>
                <a href="#" class="btn" onclick="ajouterAuPanier('${produit.nom}', ${produit.prix})">
                    Ajouter au panier
                </a>
            </div>
        `;
    });

    animerAuScroll();
}

function ajouterAuPanier(nomProduit, prix) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];

    let produitExistant = panier.find(p => p.nom === nomProduit);

    if (produitExistant) {
        produitExistant.quantite += 1;
    } else {
        panier.push({ nom: nomProduit, prix: prix, quantite: 1 });
    }

    localStorage.setItem('panier', JSON.stringify(panier));

    total = panier.reduce((acc, p) => acc + p.quantite, 0);
    document.getElementById('cart-count').innerText = total;

    let notification = document.getElementById('notification');
    notification.innerText = nomProduit + ' ajouté au panier !';
    notification.classList.add('visible');

    setTimeout(function() {
        notification.classList.remove('visible');
    }, 2500);
}

document.querySelectorAll('.filtre-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filtre-btn').forEach(b => b.classList.remove('actif'));
        this.classList.add('actif');

        let categorie = this.dataset.categorie;
        if (categorie === 'tous') {
            afficherProduits(tousLesProduits);
        } else {
            let filtrés = tousLesProduits.filter(p => p.categorie === categorie);
            afficherProduits(filtrés);
        }
    });
});

document.getElementById('search').addEventListener('input', function() {
    let recherche = this.value.toLowerCase();
    let produits = document.querySelectorAll('.product-item');

    produits.forEach(function(produit) {
        let nom = produit.querySelector('h3').innerText.toLowerCase();
        produit.style.display = nom.includes(recherche) ? 'block' : 'none';
    });
});

document.getElementById('hamburger').addEventListener('click', function() {
    let menu = document.getElementById('nav-menu');
    menu.classList.toggle('ouvert');
});

function animerAuScroll() {
    let produits = document.querySelectorAll('.product-item');
    produits.forEach(function(produit) {
        let position = produit.getBoundingClientRect().top;
        let hauteurEcran = window.innerHeight;
        if (position < hauteurEcran - 50) {
            produit.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animerAuScroll);
window.addEventListener('load', animerAuScroll);