// --- État global ---
let books = [];
let challenge = null;

// --- API helper ---
async function api(endpoint, method = 'GET', body = null) {
  const options = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch('/api/' + endpoint, options);
  return res.json();
}

// --- Chargement des données ---
async function loadBooks() {
  books = await api('books.php');
}

async function loadChallengeData() {
  challenge = await api('challenge.php');
}

// --- Navigation ---
function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  document.querySelectorAll("[role='tab']").forEach((tab) => {
    tab.classList.remove("tab-active");
  });
  document.getElementById(pageId).classList.add("active");
  event.target.classList.add("tab-active");

  if (pageId === "random-page") {
    updateGenreSelect();
    document.getElementById("random-result").classList.add("hidden");
  }
  if (pageId === "list-page") {
    displayBooks();
  }
  if (pageId === "challenge-page") {
    displayChallenge();
  }
}

// --- Affichage des livres ---
function displayBooks() {
  const container = document.getElementById("books-container");
  const stats = document.getElementById("stats");

  if (books.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 opacity-50">
        <div class="text-5xl mb-4">📚</div>
        <p class="text-sm">Votre bibliothèque est vide</p>
      </div>
    `;
    stats.textContent = "";
    return;
  }

  const readCount = books.filter((b) => b.is_read).length;
  const readPct = Math.round((readCount / books.length) * 100);

  stats.innerHTML = `
    <div class="flex flex-col gap-2 w-full">
      <div class="flex justify-between text-sm">
        <span>📚 ${books.length} livre${books.length > 1 ? "s" : ""} dans votre collection</span>
        <span>${readCount} lu${readCount > 1 ? "s" : ""} — ${readPct}%</span>
      </div>
      <progress class="progress progress-primary w-full" value="${readPct}" max="100"></progress>
    </div>
  `;

  container.innerHTML = books
    .map(
      (book) => `
        <div class="card card-border bg-base-100 transition-all hover:border-primary hover:-translate-y-0.5 ${book.is_read ? "opacity-50" : ""}">
          <div class="card-body p-5">
            <div class="flex justify-between items-start gap-2">
              <h3 class="card-title text-base">
                ${book.title}
                ${book.is_read ? '<span class="text-xs font-normal text-success"> — Lu</span>' : ""}
              </h3>
              <div class="flex items-center gap-1 shrink-0">
                <button onclick="toggleRead(${book.id})" class="btn btn-xs ${book.is_read ? "btn-success" : "btn-outline"}" title="${book.is_read ? "Marquer non lu" : "Marquer comme lu"}">
                  ${book.is_read ? "✓ Lu" : "Marquer lu"}
                </button>
                <button onclick="deleteBook(${book.id})" class="btn btn-ghost btn-xs text-error" title="Supprimer">
                  ×
                </button>
              </div>
            </div>
            <p class="text-sm opacity-60">${book.author}</p>
            <div class="flex flex-wrap gap-1 mt-1">
              ${book.genres
                .map(
                  (genre) =>
                    `<span class="badge badge-outline badge-sm">${genre}</span>`
                )
                .join("")}
            </div>
          </div>
        </div>
      `
    )
    .join("");
}

// --- Marquer comme lu ---
async function toggleRead(bookId) {
  await api('read.php', 'POST', { id: bookId });
  await loadBooks();
  displayBooks();
}

// --- Ajouter un livre ---
async function addBook() {
  const titleEl = document.getElementById("book-title");
  const authorEl = document.getElementById("book-author");
  const genresEl = document.getElementById("book-genres");
  const title = titleEl.value.trim();
  const author = authorEl.value.trim();
  const genresInput = genresEl.value.trim();

  titleEl.classList.remove("input-error");
  authorEl.classList.remove("input-error");
  genresEl.classList.remove("input-error");

  if (!title || !author || !genresInput) {
    if (!title) titleEl.classList.add("input-error");
    if (!author) authorEl.classList.add("input-error");
    if (!genresInput) genresEl.classList.add("input-error");

    setTimeout(() => {
      titleEl.classList.remove("input-error");
      authorEl.classList.remove("input-error");
      genresEl.classList.remove("input-error");
    }, 2000);
    return;
  }

  const genres = genresInput
    .split(",")
    .map((g) => g.trim())
    .filter((g) => g)
    .slice(0, 3);

  const result = await api('books.php', 'POST', { title, author, genres });

  if (result.error) {
    alert(result.error);
    return;
  }

  titleEl.value = "";
  authorEl.value = "";
  genresEl.value = "";

  await loadBooks();
  displayBooks();

  const btn = event.target.closest(".btn") || event.target;
  const originalText = btn.innerHTML;
  btn.innerHTML = "✓ Ajouté";
  btn.classList.remove("btn-primary");
  btn.classList.add("btn-success");
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.classList.remove("btn-success");
    btn.classList.add("btn-primary");
  }, 1500);
}

// --- Supprimer un livre ---
async function deleteBook(bookId) {
  await api('books.php', 'DELETE', { id: bookId });
  await loadBooks();
  displayBooks();
}

// --- Genres ---
function updateGenreSelect() {
  const select = document.getElementById("genre-select");
  const allGenres = new Set();

  books.forEach((book) => {
    book.genres.forEach((genre) => allGenres.add(genre));
  });

  select.innerHTML = '<option disabled selected>Sélectionner un genre</option>';

  if (allGenres.size === 0) {
    select.innerHTML +=
      '<option value="" disabled>Aucun genre disponible</option>';
    return;
  }

  Array.from(allGenres)
    .sort()
    .forEach((genre) => {
      const count = books.filter((book) =>
        book.genres.includes(genre)
      ).length;
      select.innerHTML += `<option value="${genre}">${genre} (${count})</option>`;
    });
}

// --- Livre aléatoire ---
function getRandomBook() {
  const selectedGenre = document.getElementById("genre-select").value;
  const resultDiv = document.getElementById("random-result");
  const contentDiv = document.getElementById("random-book-content");

  if (!selectedGenre) {
    const select = document.getElementById("genre-select");
    select.classList.add("select-error");
    setTimeout(() => {
      select.classList.remove("select-error");
    }, 2000);
    return;
  }

  const filteredBooks = books.filter((book) =>
    book.genres.includes(selectedGenre)
  );

  if (filteredBooks.length === 0) {
    contentDiv.innerHTML = `
      <p class="text-center opacity-60">Aucun livre trouvé pour ce genre</p>
    `;
    resultDiv.classList.remove("hidden");
    return;
  }

  const randomBook =
    filteredBooks[Math.floor(Math.random() * filteredBooks.length)];

  resultDiv.classList.add("hidden");
  setTimeout(() => {
    contentDiv.innerHTML = `
      <h3 class="font-medium text-lg mb-2">${randomBook.title}</h3>
      <p class="text-sm opacity-60 mb-3">${randomBook.author}</p>
      <div class="flex flex-wrap gap-1">
        ${randomBook.genres
          .map(
            (genre) =>
              `<span class="badge badge-outline badge-sm">${genre}</span>`
          )
          .join("")}
      </div>
    `;
    resultDiv.classList.remove("hidden");
  }, 100);
}

// --- Challenge de lecture ---
async function createChallenge() {
  const input = document.getElementById("challenge-goal");
  const goal = parseInt(input.value);
  if (!goal || goal < 1) {
    input.classList.add("input-error");
    setTimeout(() => {
      input.classList.remove("input-error");
    }, 2000);
    return;
  }
  await api('challenge.php', 'POST', { goal });
  await loadChallengeData();
  displayChallenge();
}

async function deleteChallenge() {
  if (!confirm("Supprimer le challenge en cours ?")) return;
  await api('challenge.php', 'DELETE');
  challenge = null;
  displayChallenge();
}

async function addToChallenge(bookId) {
  if (!challenge) return;
  await api('challenge.php?action=add_book', 'POST', { book_id: bookId });
  await loadChallengeData();
  displayChallenge();
}

async function removeFromChallenge(bookId) {
  if (!challenge) return;
  await api('challenge.php?action=remove_book', 'POST', { book_id: bookId });
  await loadChallengeData();
  displayChallenge();
}

function displayChallenge() {
  const container = document.getElementById("challenge-content");

  if (!challenge) {
    container.innerHTML = `
      <div class="max-w-md mx-auto">
        <div class="card card-border bg-base-100">
          <div class="card-body text-center">
            <h2 class="card-title justify-center">Créer un challenge de lecture</h2>
            <p class="opacity-60">Combien de livres souhaitez-vous lire cette année ?</p>
            <div class="flex items-center justify-center gap-2 mt-4">
              <input type="number" id="challenge-goal" class="input w-24 text-center text-lg" min="1" placeholder="10" />
              <button onclick="createChallenge()" class="btn btn-primary">Créer mon challenge</button>
            </div>
          </div>
        </div>
      </div>
    `;
    return;
  }

  const challengeBooks = challenge.books || [];
  const readCount = challengeBooks.filter((b) => b.is_read).length;
  const unreadChallengeBooks = challengeBooks.filter((b) => !b.is_read);
  const pct =
    challenge.goal > 0
      ? Math.min(100, Math.round((readCount / challenge.goal) * 100))
      : 0;

  let bookListHtml = "";
  if (challengeBooks.length === 0) {
    bookListHtml = `
      <div class="text-center py-8 opacity-50">
        <div class="text-4xl mb-3">📖</div>
        <p class="text-sm">Aucun livre dans le challenge. Ajoutez des livres depuis votre bibliothèque !</p>
      </div>
    `;
  } else {
    bookListHtml = challengeBooks
      .map(
        (book) => `
        <div class="flex justify-between items-center p-3 bg-base-200 rounded-sm mb-2 border border-base-300 ${book.is_read ? "opacity-50" : ""}">
          <div class="flex-1">
            <div class="font-medium text-sm">
              ${book.title}
              ${book.is_read ? '<span class="text-xs font-normal text-success"> — Lu</span>' : ""}
            </div>
            <div class="text-xs opacity-60">${book.author}</div>
          </div>
          <div class="flex items-center gap-1">
            <button onclick="toggleReadAndRefreshChallenge(${book.id})" class="btn btn-xs ${book.is_read ? "btn-success" : "btn-outline"}" title="${book.is_read ? "Marquer non lu" : "Marquer lu"}">
              ${book.is_read ? "✓ Lu" : "Marquer lu"}
            </button>
            <button onclick="removeFromChallenge(${book.id})" class="btn btn-ghost btn-xs text-error" title="Retirer du challenge">
              ✕
            </button>
          </div>
        </div>
      `
      )
      .join("");
  }

  container.innerHTML = `
    <div class="max-w-2xl mx-auto">
      <div class="card card-border bg-base-100">
        <div class="card-body">
          <div class="flex justify-between items-center mb-4">
            <h2 class="card-title">Challenge ${challenge.year}</h2>
            <button onclick="deleteChallenge()" class="btn btn-outline btn-error btn-xs">Supprimer le challenge</button>
          </div>

          <div class="mb-6">
            <div class="flex justify-between text-sm mb-2">
              <span><strong class="text-lg">${readCount}</strong> / ${challenge.goal} livres lus</span>
              <span>${pct}%</span>
            </div>
            <progress class="progress progress-primary w-full" value="${pct}" max="100"></progress>
          </div>

          <div class="mb-4">
            <button onclick="openBookSelector()" class="btn btn-primary">
              Ajouter un livre au challenge
            </button>
          </div>

          ${bookListHtml}

          ${unreadChallengeBooks.length > 0 ? `
          <div class="divider"></div>
          <div class="text-center">
            <button onclick="spinRoulette()" class="btn btn-secondary">
              Tirer au sort ma prochaine lecture
            </button>
            <div id="roulette-result" class="mt-4 hidden">
              <div class="card card-border bg-base-200">
                <div class="card-body p-4 text-center">
                  <div class="text-xs uppercase tracking-wide text-secondary mb-2">Tu vas lire...</div>
                  <div id="roulette-book-title" class="font-medium text-lg"></div>
                  <div id="roulette-book-author" class="text-sm opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
          ` : ""}
        </div>
      </div>
    </div>
  `;
}

function spinRoulette() {
  const unread = (challenge.books || []).filter((b) => !b.is_read);
  if (unread.length === 0) return;

  const resultDiv = document.getElementById("roulette-result");
  const titleDiv = document.getElementById("roulette-book-title");
  const authorDiv = document.getElementById("roulette-book-author");

  resultDiv.classList.add("hidden");

  let count = 0;
  const totalSpins = 15;
  const interval = setInterval(() => {
    const random = unread[Math.floor(Math.random() * unread.length)];
    titleDiv.textContent = random.title;
    authorDiv.textContent = random.author;
    resultDiv.classList.remove("hidden");
    count++;
    if (count >= totalSpins) {
      clearInterval(interval);
    }
  }, 100);
}

async function toggleReadAndRefreshChallenge(bookId) {
  await api('read.php', 'POST', { id: bookId });
  await Promise.all([loadBooks(), loadChallengeData()]);
  displayChallenge();
}

// --- Sélecteur de livres pour le challenge ---
function openBookSelector() {
  const modal = document.getElementById("book-selector-modal");
  document.getElementById("book-selector-search").value = "";
  renderBookSelectorList("");
  modal.showModal();
}

function closeBookSelector() {
  document.getElementById("book-selector-modal").close();
}

function filterBookSelector() {
  const query = document
    .getElementById("book-selector-search")
    .value.trim()
    .toLowerCase();
  renderBookSelectorList(query);
}

function renderBookSelectorList(query) {
  const list = document.getElementById("book-selector-list");
  const challengeBookIds = challenge && challenge.books
    ? challenge.books.map((b) => b.id)
    : [];

  const available = books.filter(
    (b) =>
      !b.is_read &&
      !challengeBookIds.includes(b.id) &&
      (b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query))
  );

  if (available.length === 0) {
    list.innerHTML =
      '<p class="text-center opacity-60 py-4">Aucun livre disponible</p>';
    return;
  }

  list.innerHTML = available
    .map(
      (book) => `
      <div class="flex justify-between items-center p-3 rounded-sm mb-1 cursor-pointer transition-all border border-base-300 hover:border-primary" onclick="addToChallenge(${book.id}); closeBookSelector();">
        <div>
          <div class="font-medium text-sm">${book.title}</div>
          <div class="text-xs opacity-60">${book.author}</div>
        </div>
        <span class="text-primary text-lg">+</span>
      </div>
    `
    )
    .join("");
}

// --- Exposer les fonctions au scope global (nécessaire pour onclick en mode module) ---
window.showPage = showPage;
window.addBook = addBook;
window.deleteBook = deleteBook;
window.toggleRead = toggleRead;
window.getRandomBook = getRandomBook;
window.createChallenge = createChallenge;
window.deleteChallenge = deleteChallenge;
window.addToChallenge = addToChallenge;
window.removeFromChallenge = removeFromChallenge;
window.toggleReadAndRefreshChallenge = toggleReadAndRefreshChallenge;
window.spinRoulette = spinRoulette;
window.openBookSelector = openBookSelector;
window.closeBookSelector = closeBookSelector;
window.filterBookSelector = filterBookSelector;

// --- Initialisation ---
document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([loadBooks(), loadChallengeData()]);
  displayBooks();
});
