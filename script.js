const products = [
      { name: "Wireless Headphones", price: "₹1999", description: "Noise-canceling over-ear headphones with Bluetooth.", image: "https://tse3.mm.bing.net/th/id/OIP.EHQ9iaJ07zOLx-BllkdiYwHaEJ?pid=Api&P=0&h=180", category: "Electronics" },
      { name: "Smart Watch", price: "₹2999", description: "Stylish smart watch with health tracking.", image: "https://tse4.mm.bing.net/th/id/OIP.pvaItcX7Fo3LuTY6hpdkvQHaEK?pid=Api&P=0&h=180", category: "Fashion" },
      { name: "Gaming Mouse", price: "₹899", description: "Ergonomic RGB gaming mouse.", image: "https://tse1.mm.bing.net/th/id/OIP.CNedvNpIGhgza-8E5wdBqAAAAA?pid=Api&P=0&h=180", category: "Electronics" },
      { name: "Laptop Stand", price: "₹599", description: "Aluminum adjustable laptop stand.", image: "https://tse2.mm.bing.net/th/id/OIP.NfEgdWeocRRM7y2AaPYWYwHaGd?pid=Api&P=0&h=180", category: "Accessories" },
      { name: "Men's Casual Shirt", price: "₹1199", description: "Comfortable cotton shirt for daily wear.", image: "https://tse1.mm.bing.net/th/id/OIP.sdXZhwgOL_SPEWe_CXUjiQHaMp?pid=Api&P=0&h=180", category: "Fashion" },
      { name: "Women's Handbag", price: "₹1499", description: "Elegant handbag with spacious compartments.", image: "https://tse1.mm.bing.net/th/id/OIP.ZD2FL5oQWWr0fxJajEq_JQHaGJ?pid=Api&P=0&h=180", category: "Fashion" },
      { name: "Bluetooth Speaker", price: "₹1299", description: "Compact wireless speaker with powerful sound.", image: "https://tse2.mm.bing.net/th/id/OIP.TPp7UhAmDyrtMaXAEeVGKwHaHa?pid=Api&P=0&h=180", category: "Electronics" },
      { name: "Phone Tripod", price: "₹499", description: "Flexible tripod stand for smartphone photography.", image: "https://tse1.mm.bing.net/th/id/OIP.NXt2eN2PtFUH9hnWgsy42gAAAA?pid=Api&P=0&h=180", category: "Accessories" },
      { name: "Running Shoes", price: "₹2199", description: "Lightweight and breathable shoes for everyday wear.", image: "https://tse4.mm.bing.net/th/id/OIP.TT5G3ICTyt3L8nKfQG_wKQHaEK?pid=Api&P=0&h=180", category: "Fashion" },
      { name: "Sunglasses", price: "₹899", description: "UV-protection stylish sunglasses.", image: "https://tse1.mm.bing.net/th/id/OIP.msIjpVHw-1WRUcZoTGl4AAHaEK?pid=Api&P=0&h=180", category: "Accessories" },
      { name: "USB-C Hub", price: "₹1099", description: "Multi-port USB hub for laptops and tablets.", image: "https://tse2.mm.bing.net/th/id/OIP.w2Bptt-o7V5mOlBVm9gO5gHaF7?pid=Api&P=0&h=180", category: "Electronics" },
      { name: "Backpack", price: "₹1699", description: "Waterproof backpack with laptop compartment.", image: "https://tse2.mm.bing.net/th/id/OIP.fsZ0w15ffKONqHW3ikJ0uAHaEJ?pid=Api&P=0&h=180", category: "Accessories" }
    ];

    let cart = [];

    function goToLogin() {
      document.getElementById("welcomeScreen").classList.remove("active");
      document.getElementById("loginScreen").classList.add("active");
    }

    function loginUser() {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      if (!username || !password) {
        alert("Please enter both fields");
        return false;
      }
      document.getElementById("loginScreen").classList.remove("active");
      document.getElementById("appScreen").style.display = "block";
      renderProducts();
      return false;
    }

    function renderProducts(filteredProducts = products) {
      const productList = document.getElementById("productList");
      productList.innerHTML = '';
      filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product";
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <strong>${product.price}</strong><br>
          <button onclick="addToCart('${product.name}', '${product.price}')">Add to Cart</button>
        `;
        productList.appendChild(productCard);
      });
    }

    function addToCart(name, price) {
      cart.push({ name, price });
      updateCart();
      alert(`${name} added to cart!`);
    }

    function updateCart() {
      const cartItems = document.getElementById("cartItems");
      const cartCount = document.getElementById("cartCount");
      const cartTotal = document.getElementById("cartTotal");

      cartItems.innerHTML = '';
      cartCount.textContent = cart.length;

      if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        cartTotal.textContent = '';
        return;
      }

      let total = 0;

      cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <span>${item.name} - ${item.price}</span>
          <button onclick="removeItem(${index})">Remove</button>
        `;
        cartItems.appendChild(div);
        total += parseFloat(item.price.replace(/[₹,]/g, ''));
      });

      cartTotal.textContent = `Total: ₹${total.toLocaleString("en-IN")}`;
    }

    function removeItem(index) {
      cart.splice(index, 1);
      updateCart();
    }

    function toggleSection(section) {
      const cartSection = document.getElementById("cartSection");
      const productSection = document.getElementById("productList");

      if (section === 'cart') {
        cartSection.style.display = 'block';
        productSection.style.display = 'none';
      } else {
        cartSection.style.display = 'none';
        productSection.style.display = 'grid';
      }
    }

    function filterByCategory(category) {
      if (category === 'all') {
        renderProducts(products);
      } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
      }
    }
