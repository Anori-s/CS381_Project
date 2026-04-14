const lostItems = [
{ id: 1, title: "iPhone 14 Pro Max", category: "electronics", location: "Library, 2nd Floor", date: "Jan 12, 2026", description: "Black iPhone with silver case", icon: "📱", owner: "Nora Al-Otaibi", contact: "nora@yic.edu.sa" },
{ id: 2, title: "Samsung Galaxy Watch", category: "electronics", location: "Gym Locker Room", date: "Jan 14, 2026", description: "Black Samsung watch with rubber strap", icon: "⌚", owner: "Sara Al-Harbi", contact: "sara@yic.edu.sa" },
{ id: 3, title: "Toyota Car Key", category: "keys", location: "Parking Lot B", date: "Jan 13, 2026", description: "Toyota key with blue lanyard", icon: "🔑", owner: "Lama Al-Ghamdi", contact: "lama@yic.edu.sa" },
{ id: 4, title: "Apple Charger + Cable", category: "electronics", location: "CS Lab 204", date: "Jan 15, 2026", description: "White Apple USB-C charger and cable", icon: "🔌", owner: "Rana Al-Zahrani", contact: "rana@yic.edu.sa" },
{ id: 6, title: "Grey Hoodie (Size L)", category: "clothing", location: "Building A", date: "Jan 11, 2026", description: "Champion grey hoodie", icon: "👕", owner: "Hind Al-Qahtani", contact: "hind@yic.edu.sa" },
{ id: 7, title: "Apple AirPods Pro", category: "electronics", location: "Canteen", date: "Jan 14, 2026", description: "White AirPods with case", icon: "🎧", owner: "Mona Al-Dossary", contact: "mona@yic.edu.sa" }
];
const foundItems = [
{ id: 101, title: "iPhone 13", category: "electronics", location: "Cafeteria", date: "Jan 14, 2026", description: "Blue iPhone 13 with clear case", icon: "📱", finder: "Reem Al-Shammari", contact: "reem@yic.edu.sa" },
{ id: 102, title: "Car Keys (Hyundai)", category: "keys", location: "Near Gate A", date: "Jan 13, 2026", description: "Hyundai key with red lanyard", icon: "🔑", finder: "Aisha Al-Rashidi", contact: "aisha@yic.edu.sa" },
{ id: 103, title: "Samsung Charger", category: "electronics", location: "CS Lab 101", date: "Jan 12, 2026", description: "White Samsung fast charger", icon: "🔌", finder: "Hessa Al-Balawi", contact: "hessa@yic.edu.sa" },
{ id: 104, title: "Apple Watch Series 8", category: "electronics", location: "Library", date: "Jan 15, 2026", description: "Silver Apple Watch with white band", icon: "⌚", finder: "Nouf Al-Anazi", contact: "nouf@yic.edu.sa" },
{ id: 105, title: "Student ID Card", category: "keys", location: "Cafeteria", date: "Jan 13, 2026", description: "YIC student ID card", icon: "💳", finder: "Dania Al-Malki", contact: "dania@yic.edu.sa" }
];
localStorage.setItem('lostItems', JSON.stringify(lostItems));
localStorage.setItem('foundItems', JSON.stringify(foundItems));
function displayItems(items, containerId, type) {
const container = document.getElementById(containerId);
if (!container) return;
if (items.length === 0) {
container.innerHTML = '<p>No items found.</p>';
return;
}
let html = '';
for (let i = 0; i < items.length; i++) {
const item = items[i];
const statusClass = type === 'lost' ? 'status-lost' : 'status-found';
const statusText = type === 'lost' ? 'Lost' : 'Found';
html += `
<div class="item-card" onclick="viewItem(${item.id}, '${type}')">
<div class="item-icon">${item.icon}</div>
<div class="item-title">${item.title}</div>
<div class="item-location">📍 ${item.location}</div>
<div class="item-date">📅 ${item.date}</div>
<div class="item-status ${statusClass}">${statusText}</div>
</div>
`;
}
container.innerHTML = html;
}
function viewItem(id, type) {
window.location.href = `item-detail.html?id=${id}&type=${type}`;
}
function setupTabs() {
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.panel');
for (let i = 0; i < tabBtns.length; i++) {
tabBtns[i].addEventListener('click', function() {
for (let j = 0; j < tabBtns.length; j++) {
tabBtns[j].classList.remove('active');
}
this.classList.add('active');
for (let k = 0; k < panels.length; k++) {
panels[k].classList.remove('active-panel');
}
const tabId = this.getAttribute('data-tab');
if (tabId === 'lost') {
document.getElementById('lostPanel').classList.add('active-panel');
} else if (tabId === 'found') {
document.getElementById('foundPanel').classList.add('active-panel');
}
});
}
}
function setupSearch() {
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
if (searchBtn) {
searchBtn.addEventListener('click', function() {
const searchTerm = searchInput.value.toLowerCase();
const category = categoryFilter.value;
let filteredLost = lostItems;
let filteredFound = foundItems;
if (searchTerm) {
filteredLost = lostItems.filter(item =>
item.title.toLowerCase().includes(searchTerm) ||
item.description.toLowerCase().includes(searchTerm) ||
item.location.toLowerCase().includes(searchTerm)
);
filteredFound = foundItems.filter(item =>
item.title.toLowerCase().includes(searchTerm) ||
item.description.toLowerCase().includes(searchTerm) ||
item.location.toLowerCase().includes(searchTerm)
);
}
if (category !== 'all') {
filteredLost = filteredLost.filter(item => item.category === category);
filteredFound = filteredFound.filter(item => item.category === category);
}
displayItems(filteredLost, 'lostItemsGrid', 'lost');
displayItems(filteredFound, 'foundItemsGrid', 'found');
const total = filteredLost.length + filteredFound.length;
alert('🔍 Found ' + total + ' items matching your search');
});
}
}
function init() {
displayItems(lostItems, 'lostItemsGrid', 'lost');
displayItems(foundItems, 'foundItemsGrid', 'found');
setupTabs();
setupSearch();
}
window.onload = init;