let total = 0;

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

let tousLesProduits = [
    { id: 1, nom: "Veste en cuir", prix: 99, image: "product1.jpg", categorie: "vestes" },
    { id: 2, nom: "Manteau d'hiver", prix: 149, image: "product2.jpg", categorie: "manteaux" },
    { id: 3, nom: "Robe élégante", prix: 79, image: "product3.jpg", categorie: "robes" },
    { id: 4, nom: "Jean slim", prix: 59, image: "product4.jpg", categorie: "jeans" },
    { id: 5, nom: "T-shirt basique", prix: 19, image: "product5.jpg", categorie: "t-shirts" },
    { id: 6, nom: "Pull en laine", prix: 49, image: "product6.jpg", categorie: "pulls" },
    { id: 7, nom: "Chaussures de sport", prix: 89, image: "product7.jpg", categorie: "chaussures" },
    { id: 8, nom: "Sac à main en cuir", prix: 129, image: "product8.jpg", categorie: "accessoires" },
    { id: 9, nom: "T-shirt oversize", prix: 29, image: "product9.jpg", categorie: "t-shirts" }
];

afficherProduits(tousLesProduits);

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

let cartCount = JSON.parse(localStorage.getItem('panier'))?.reduce((acc, p) => acc + p.quantite, 0) || 0;
document.getElementById('cart-count').innerText = cartCount;