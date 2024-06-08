document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://6662ac4162966e20ef097175.mockapi.io/api/products/products';
    const addProductBtn = document.getElementById('addProductBtn');
    const productModal = document.getElementById('productModal');
    const closeModal = document.querySelector('.close');
    const productForm = document.getElementById('productForm');
    const productIdInput = document.getElementById('productId');
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productImageInput = document.getElementById('productImage');
    const modalTitle = document.getElementById('modalTitle');

    addProductBtn.addEventListener('click', () => {
        openModal();
    });

    closeModal.addEventListener('click', () => {
        closeModalFunc();
    });

    window.addEventListener('click', (event) => {
        if (event.target == productModal) {
            closeModalFunc();
        }
    });

    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = productIdInput.value;
        const name = productNameInput.value;
        const price = productPriceInput.value;
        const imageUrl = productImageInput.value;

        const product = { name, price, imageUrl };

        if (id) {
              await fetch(`${apiURL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
        } else {
       
            await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
        }
        closeModalFunc();
        loadProducts();
    });

    async function loadProducts() {
        const response = await fetch(apiURL);
        const products = await response.json();
        const productList = document.getElementById('productList');
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <p>Name: ${product.name}</p>
                <p>Price: $${product.price}</p>
                <button onclick="editProduct(${product.id}, '${product.name}', ${product.price}, '${product.imageUrl}')">Edit</button>
            `;
            productList.appendChild(productCard);
        });
    }

    window.editProduct = (id, name, price, imageUrl) => {
        productIdInput.value = id;
        productNameInput.value = name;
        productPriceInput.value = price;
        productImageInput.value = imageUrl;
        modalTitle.innerText = 'Edit Product';
        openModal();
    };

    function openModal() {
        productModal.style.display = 'block';
    }

    function closeModalFunc() {
        productModal.style.display = 'none';
        productForm.reset();
        productIdInput.value = '';
        modalTitle.innerText = 'Add Product';
    }

    loadProducts();
});
