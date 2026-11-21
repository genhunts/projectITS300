const carCards = Array.from(document.querySelectorAll(".car-card"));
const carSearch = document.getElementById("car-search");
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const fleetCount = document.getElementById("fleet-count");
const emptyState = document.getElementById("empty-state");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
let activeFilter = "all";

function updateFleet() {
  const searchTerm = carSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  carCards.forEach((card) => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.dataset.name.toLowerCase().includes(searchTerm)
      || card.querySelector(".car-type").textContent.toLowerCase().includes(searchTerm);
    const visible = matchesCategory && matchesSearch;

    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  fleetCount.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "car" : "cars"}`;
  emptyState.hidden = visibleCount > 0;
}

function selectFilter(filter) {
  const matchingButton = filterButtons.find((button) => button.dataset.filter === filter);
  if (!matchingButton) return;

  activeFilter = filter;
  filterButtons.forEach((button) => button.classList.toggle("active", button === matchingButton));
  updateFleet();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => selectFilter(button.dataset.filter));
});

document.querySelectorAll("[data-filter-link]").forEach((link) => {
  link.addEventListener("click", () => selectFilter(link.dataset.filterLink));
});

carSearch.addEventListener("input", updateFleet);

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.innerHTML = `<i class="fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}"></i>`;
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

updateFleet();
