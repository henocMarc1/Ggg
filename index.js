document.addEventListener('DOMContentLoaded', function() {

    // 1. Récupération des éléments du DOM
    const cartCountBubble = document.getElementById('cart-count-bubble');
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');

    // 2. Initialisation du panier (Utilisation du localStorage pour simuler la persistance)
    // C'est une astuce pour que le nombre reste même si l'utilisateur change de page (dans un vrai site)
    let itemsInCart = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
    
    // 3. Mise à jour de l'affichage au chargement
    cartCountBubble.textContent = itemsInCart;

    // 4. Fonction d'ajout au panier
    addToCartButtons.forEach(function(button) {
        
        button.addEventListener('click', function() {
            
            // Empêche l'ajout multiple pour le prototype
            if (button.classList.contains('added')) {
                return;
            }

            // Incrémentation
            itemsInCart = itemsInCart + 1;
            
            // Mise à jour du localStorage et de l'affichage
            localStorage.setItem('cartCount', itemsInCart);
            cartCountBubble.textContent = itemsInCart;

            // Effet visuel
            cartCountBubble.style.transform = 'scale(1.3)';
            setTimeout(() => cartCountBubble.style.transform = 'scale(1)', 200);

            // Désactivation du bouton
            button.textContent = 'Ajouté !';
            button.classList.add('added'); 
        });
    });

    // Optionnel : Fonction de réinitialisation pour le test (si besoin)
    // console.log("Panier actuel:", itemsInCart);
    // Pour vider le panier: localStorage.removeItem('cartCount');
});
document.addEventListener('DOMContentLoaded', function() {

    // ===========================================
    // 1. GESTION DU COMPTEUR DE PANIER (Header)
    // ===========================================
    const cartCountBubble = document.getElementById('cart-count-bubble');
    // On garde la valeur en mémoire pour la persistance
    let itemsInCart = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
    cartCountBubble.textContent = itemsInCart;


    // ===========================================
    // 2. GESTION DE LA MODALE D'ACHAT RAPIDE
    // ===========================================
    
    // Éléments du DOM pour la Modale
    const modal = document.getElementById('quick-buy-modal');
    const closeModalBtn = modal.querySelector('.close-btn');
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
    const allBuyButtons = document.querySelectorAll('.btn-add-to-cart'); // Tous les boutons "Ajouter au panier"

    // Éléments de la Modale qui affichent l'info/quantité/prix
    const qtyPlusBtn = document.getElementById('qty-plus');
    const qtyMinusBtn = document.getElementById('qty-minus');
    const qtyInput = document.getElementById('qty-input');
    const modalUnitPricer = document.getElementById('modal-unit-price');
    const modalTotalPriceDisplay = document.getElementById('modal-total-price');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductImage = document.getElementById('modal-product-image');

    let currentUnitPrice = 0; // Stocke le prix unitaire du produit sélectionné
    let currentProductId = 0; // ID du produit sélectionné


    // Simulation de la base de données des produits
    // C'est ESSENTIEL pour récupérer le prix et l'image !
    const productData = {
        // IDs utilisés dans index.html
        999: { name: "Huile Végétale 2 Litres", price: 3500, image: "https://via.placeholder.com/150/FF5733/FFFFFF?text=Huile+2L+CHOC" },
        201: { name: "Riz Parfumé 5Kg", price: 5200, image: "https://via.placeholder.com/150/C8A2C8/000000?text=Riz+Parfum%C3%A9+5Kg" },
        202: { name: "Pack 6x1.5L Eau Minérale", price: 3000, image: "https://via.placeholder.com/150/ADD8E6/000000?text=Eau+Min%C3%A9rale+Pack" },
        // ... Ajoutez tous les autres produits ici si vous voulez qu'ils fonctionnent ...
    };


    // Fonction pour mettre à jour le total (quantité * prix unitaire)
    function updateTotalPrice() {
        const quantity = parseInt(qtyInput.value);
        const newTotal = quantity * currentUnitPrice;
        modalTotalPriceDisplay.textContent = `${newTotal.toLocaleString('fr-FR')} F CFA`;
    }

    // Fonction qui ouvre la modale et charge les données du produit
    function openModal(productId) {
        const product = productData[productId];
        if (!product) {
            alert("Produit non trouvé.");
            return;
        }

        // 1. Mise à jour des variables globales
        currentUnitPrice = product.price;
        currentProductId = productId;
        
        // 2. Mise à jour de l'affichage de la modale
        modalProductName.textContent = product.name;
        modalProductImage.src = product.image;
        modalUnitPricer.textContent = `${product.price.toLocaleString('fr-FR')} F CFA`;
        qtyInput.value = 1; // Toujours commencer à 1
        
        // 3. Calcul du prix initial
        updateTotalPrice();
        
        // 4. Affichage de la modale
        modal.style.display = 'block';
    }


    // Écouteur d'événement sur tous les boutons "Ajouter au panier"
    allBuyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Récupère l'ID du produit depuis l'attribut data-id
            const productId = this.getAttribute('data-id'); 
            openModal(productId);
        });
    });


    // Gérer l'incrémentation de la quantité
    qtyPlusBtn.addEventListener('click', function() {
        let quantity = parseInt(qtyInput.value);
        if (quantity < 10) { // Limite maximale pour l'exemple
            quantity++;
            qtyInput.value = quantity;
            updateTotalPrice();
        }
    });

    // Gérer la décrémentation de la quantité
    qtyMinusBtn.addEventListener('click', function() {
        let quantity = parseInt(qtyInput.value);
        if (quantity > 1) { // Limite minimale à 1
            quantity--;
            qtyInput.value = quantity;
            updateTotalPrice();
        }
    });


    // Fermer la modale
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Fermer la modale si l'utilisateur clique en dehors
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });


    // Gérer le clic final "Ajouter au Panier (Passer au paiement)"
    modalAddToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(qtyInput.value);
        
        // 1. Mise à jour du compteur de panier (pour le header)
        // On simule l'ajout de la quantité choisie dans le panier
        itemsInCart += quantity;
        localStorage.setItem('cartCount', itemsInCart);
        cartCountBubble.textContent = itemsInCart;
        
        // Effet pop sur la bulle
        cartCountBubble.style.transform = 'scale(1.3)';
        setTimeout(() => cartCountBubble.style.transform = 'scale(1)', 200);

        // 2. Redirection vers la page de commande/paiement
        // C'est l'étape que vous avez demandée : "ça t'envoie sur une nouvelle page"
        alert(`Vous avez ajouté ${quantity} article(s) au panier. Redirection vers la commande...`);
        window.location.href = 'checkout.html'; 
        
        // La modale pourrait être fermée ici : modal.style.display = 'none';
    });
    
    // ===========================================
    // FIN DES SCRIPTS
    // ===========================================

});
document.addEventListener('DOMContentLoaded', function() {

    // ... (Reste du code JavaScript) ...

    const productData = {
        // ESSENTIEL : Ces IDs doivent correspondre aux boutons dans index.html
        999: { name: "Huile Végétale 2 Litres", price: 3500, image: "https://via.placeholder.com/150/FF5733/FFFFFF?text=Huile+2L+CHOC" },
        201: { name: "Riz Parfumé 5Kg", price: 5200, image: "https://via.placeholder.com/150/C8A2C8/000000?text=Riz+Parfum%C3%A9+5Kg" },
        202: { name: "Pack 6x1.5L Eau Minérale", price: 3000, image: "https://via.placeholder.com/150/ADD8E6/000000?text=Eau+Min%C3%A9rale+Pack" },
        203: { name: "Tomates Rondes", price: 1500, image: "https://via.placeholder.com/150/DC143C/FFFFFF?text=Tomates+Rondes" },
        204: { name: "Lessive Liquide Concentrée 2L", price: 4500, image: "https://via.placeholder.com/150/ADD8E6/000000?text=Lessive+Liquide" },
        // Ajout des IDs de la modale
        105: { name: "Lait en Poudre [Marque] 1er âge", price: 12500, image: "https://via.placeholder.com/150/B0E0E6/000000?text=Lait+B%C3%A9b%C3%A9" },
        101: { name: "Huile Végétale Raffinée 2 Litres", price: 3990, image: "https://via.placeholder.com/150/F08080/FFFFFF?text=Huile+V%C3%A9g%C3%A9tale" },
        111: { name: "Lessive Liquide Concentrée 2L (Ménage)", price: 4500, image: "https://via.placeholder.com/150/ADD8E6/000000?text=Lessive+Liquide" }
    };

    // ... (Reste du code JavaScript) ...
});
document.addEventListener('DOMContentLoaded', function() {

    const productData = {
        // ID: 999 - L'Offre Choc (Doit exister pour le bloc Highlight)
        999: { name: "Huile Végétale 2 Litres Maxi Format", price: 3500, image: "https://via.placeholder.com/150/FF5733/FFFFFF?text=Huile+2L+CHOC", oldPrice: 4200 },
        
        // NOUVEAUX PRODUITS CLASSIQUES (pour la première grille)
        201: { name: "Riz Parfumé Qualité Supérieure 5Kg", price: 5200, image: "https://via.placeholder.com/150/C8A2C8/000000?text=Riz+Parfum%C3%A9+5Kg" },
        202: { name: "Pack 6x1.5L Eau Minérale Naturelle", price: 3000, image: "https://via.placeholder.com/150/ADD8E6/000000?text=Eau+Min%C3%A9rale+Pack" },
        203: { name: "Tomates Rondes Fraîches (Le Kilo)", price: 1500, image: "https://via.placeholder.com/150/DC143C/FFFFFF?text=Tomates+Rondes" },
        204: { name: "Lessive Liquide Concentrée 2L", price: 4500, image: "https://via.placeholder.com/150/ADD8E6/000000?text=Lessive+Liquide" },
        205: { name: "Sucre Blanc Fin (Sachet 1Kg)", price: 1000, image: "https://via.placeholder.com/150/FFFFFF/000000?text=Sucre+1Kg" },
        206: { name: "Farine de Blé Panifiable (5Kg)", price: 4100, image: "https://via.placeholder.com/150/F5DEB3/000000?text=Farine+5Kg" },
        207: { name: "Lait Concentré Sucré (Boîte 397g)", price: 1800, image: "https://via.placeholder.com/150/E0FFFF/000000?text=Lait+Concentré" },
        
        // GRILLE 2 : PRODUITS POPULAIRES
        208: { name: "Poisson Sardinelle à l'Huile (Boîte)", price: 850, image: "https://via.placeholder.com/150/A9A9A9/FFFFFF?text=Sardinelle+Huile" },
        209: { name: "Pâtes Spaghetti Qualité (1Kg)", price: 950, image: "https://via.placeholder.com/150/F0F8FF/000000?text=Spaghetti+1Kg" },
        210: { name: "Boîte de 12 Œufs Frais", price: 1600, image: "https://via.placeholder.com/150/FFA07A/FFFFFF?text=Œufs+x12" },
        211: { name: "Savon de Ménage (Lot de 4)", price: 1200, image: "https://via.placeholder.com/150/B0C4DE/000000?text=Savon+Ménage" },
        212: { name: "Beurre de Karité Pure (250g)", price: 2800, image: "https://via.placeholder.com/150/DDA0DD/000000?text=Beurre+Karité" },
        213: { name: "Jus de Fruit Tropical 1 Litre", price: 1400, image: "https://via.placeholder.com/150/FFD700/000000?text=Jus+Tropical" },
        214: { name: "Pain de Mie Complet (500g)", price: 1700, image: "https://via.placeholder.com/150/F5F5DC/000000?text=Pain+de+Mie" },
        215: { name: "Thé Noir Traditionnel (Boîte 50 sachets)", price: 2300, image: "https://via.placeholder.com/150/006400/FFFFFF?text=Thé+Noir" }
    };

    // ... (Le reste du code JavaScript) ...
});