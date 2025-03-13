// Sample data for inventory items
let inventoryItems = [
    { id: 1, name: 'Iron Ore', category: 'Raw Material', quantity: '1,200 tons', status: 'In Stock' },
    { id: 2, name: 'Steel Beams', category: 'Finished Product', quantity: '500 units', status: 'Low Stock' },
    { id: 3, name: 'Welding Rods', category: 'Consumables', quantity: '10,000 pieces', status: 'In Stock' },
    { id: 4, name: 'Steel Sheets', category: 'Finished Product', quantity: '750 sheets', status: 'In Stock' },
];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.md\\:hidden button');
    const mobileMenu = document.querySelector('.hidden.md\\:flex');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            mobileMenu.classList.toggle('flex-col');
            mobileMenu.classList.toggle('absolute');
            mobileMenu.classList.toggle('top-16');
            mobileMenu.classList.toggle('right-0');
            mobileMenu.classList.toggle('bg-blue-600');
            mobileMenu.classList.toggle('w-48');
            mobileMenu.classList.toggle('p-2');
            mobileMenu.classList.toggle('rounded-bl-md');
        });
    }

    // Inventory Search Functionality
    const searchInput = document.querySelector('input[placeholder="Search inventory..."]');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredItems = inventoryItems.filter(item => 
                item.name.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm)
            );
            renderInventoryItems(filteredItems);
        });
    }

    // Add Item Button Functionality
    const addItemBtn = document.querySelector('button:has(.fa-plus)');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', () => {
            showAddItemModal();
        });
    }

    // Initial render of inventory items
    renderInventoryItems(inventoryItems);
});

// Render inventory items to the table
function renderInventoryItems(items) {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;

    tbody.innerHTML = items.map(item => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">${item.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${item.category}</td>
            <td class="px-6 py-4 whitespace-nowrap">${item.quantity}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 
                    item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                }">
                    ${item.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button class="text-blue-600 hover:text-blue-900 mr-3" onclick="editItem(${item.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-600 hover:text-red-900" onclick="deleteItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Add new item modal
function showAddItemModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 class="text-lg font-semibold mb-4">Add New Item</h3>
            <form id="addItemForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Item Name</label>
                    <input type="text" name="name" required class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Category</label>
                    <select name="category" required class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Raw Material">Raw Material</option>
                        <option value="Finished Product">Finished Product</option>
                        <option value="Consumables">Consumables</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Quantity</label>
                    <input type="text" name="quantity" required class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="flex justify-end space-x-2 mt-4">
                    <button type="button" onclick="closeModal(this)" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Item</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Add form submission handler
    const form = modal.querySelector('#addItemForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        
        const newItem = {
            id: inventoryItems.length + 1,
            name: formData.get('name'),
            category: formData.get('category'),
            quantity: formData.get('quantity'),
            status: 'In Stock'
        };
        
        inventoryItems.push(newItem);
        renderInventoryItems(inventoryItems);
        closeModal(modal);
    });
}

// Close modal
function closeModal(element) {
    const modal = element.closest('.fixed');
    modal.remove();
}

// Edit item
function editItem(id) {
    const item = inventoryItems.find(item => item.id === id);
    if (!item) return;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 class="text-lg font-semibold mb-4">Edit Item</h3>
            <form id="editItemForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Item Name</label>
                    <input type="text" name="name" value="${item.name}" required class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Category</label>
                    <select name="category" required class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Raw Material" ${item.category === 'Raw Material' ? 'selected' : ''}>Raw Material</option>
                        <option value="Finished Product" ${item.category === 'Finished Product' ? 'selected' : ''}>Finished Product</option>
                        <option value="Consumables" ${item.category === 'Consumables' ? 'selected' : ''}>Consumables</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Quantity</label>
                    <input type="text" name="quantity" value="${item.quantity}" required class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="flex justify-end space-x-2 mt-4">
                    <button type="button" onclick="closeModal(this)" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save Changes</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Form submission handler
    const form = modal.querySelector('#editItemForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const index = inventoryItems.findIndex(i => i.id === id);
        if (index !== -1) {
            inventoryItems[index] = {
                ...inventoryItems[index],
                name: formData.get('name'),
                category: formData.get('category'),
                quantity: formData.get('quantity')
            };
            renderInventoryItems(inventoryItems);
        }
        closeModal(modal);
    });
}

// Delete item
function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        inventoryItems = inventoryItems.filter(item => item.id !== id);
        renderInventoryItems(inventoryItems);
    }
}

// Production chart updates
setInterval(() => {
    const productionBars = document.querySelectorAll('.bg-blue-600.h-2');
    productionBars.forEach(bar => {
        const newWidth = Math.floor(Math.random() * 30) + 70; // Random between 70-100
        bar.style.width = `${newWidth}%`;
        const percentageSpan = bar.parentElement.previousElementSibling.querySelector('span:last-child');
        if (percentageSpan) {
            percentageSpan.textContent = `${newWidth}%`;
        }
    });
}, 5000); // Update every 5 seconds
