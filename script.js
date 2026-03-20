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

// --- Helpers ---
function libraryBooks() {
  return books.filter((b) => !b.is_wishlist);
}

function wishlistBooks() {
  return books.filter((b) => b.is_wishlist);
}

const giftSvg = (cls = "w-4 h-4") =>
  `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13"/><path d="M3 13h18"/><path d="M12 8c-1.5-2-4-2.5-5-1s.5 3.5 5 5c4.5-1.5 6-3.5 5-5s-3.5-1-5 1z"/></svg>`;

function starsHtml(bookId, rating, interactive = true) {
  let html = '<div class="flex items-center gap-0.5">';
  for (let i = 1; i <= 5; i++) {
    const filled = i <= (rating || 0);
    if (interactive) {
      html += `<button onclick="rateBook(${bookId}, ${i})" class="cursor-pointer hover:scale-110 transition-transform" title="${i}/5">`;
    }
    html += `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ${filled ? "text-warning" : "text-base-300"}" viewBox="0 0 24 24" fill="${filled ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    if (interactive) {
      html += `</button>`;
    }
    }
  html += '</div>';
  return html;
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
  if (pageId === "wishlist-page") {
    displayWishlist();
  }
  if (pageId === "stats-page") {
    displayStats();
  }
  if (pageId === "challenge-page") {
    displayChallenge();
  }
}

// --- Affichage des livres ---
function displayBooks() {
  const container = document.getElementById("books-container");
  const stats = document.getElementById("stats");
  const lib = libraryBooks();

  if (lib.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 opacity-50">
        <div class="text-5xl mb-4">📚</div>
        <p class="text-sm">Votre bibliothèque est vide</p>
      </div>
    `;
    stats.textContent = "";
    return;
  }

  stats.innerHTML = `
    <div class="flex flex-col gap-2 w-full">
      <div class="text-sm opacity-60">📚 ${lib.length} livre${lib.length > 1 ? "s" : ""}</div>
    </div>
  `;

  container.innerHTML = lib
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
            <div class="flex justify-between items-center">
              <p class="text-sm opacity-60">${book.author}</p>
              ${!book.is_read && (book.is_gift || book.year) ? `
              <div class="flex items-center gap-2 text-sm opacity-70">
                ${book.is_gift ? giftSvg() : ""}
                ${book.year ? `<span>${book.year}</span>` : ""}
              </div>` : ""}
            </div>
            <div class="flex flex-wrap gap-1 mt-1">
              ${book.genres
                .map(
                  (genre) =>
                    `<span class="badge badge-outline badge-sm">${genre}</span>`
                )
                .join("")}
            </div>
            ${book.is_read ? `<div class="mt-2">${starsHtml(book.id, book.rating)}</div>` : ""}
          </div>
        </div>
      `
    )
    .join("");
}

// --- Statistiques ---
function displayStats() {
  const container = document.getElementById("stats-content");
  const lib = libraryBooks();

  if (lib.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 opacity-50">
        <div class="text-5xl mb-4">📊</div>
        <p class="text-sm">Ajoutez des livres pour voir vos statistiques</p>
      </div>
    `;
    return;
  }

  const readCount = lib.filter((b) => b.is_read).length;
  const unreadCount = lib.length - readCount;
  const ratedBooks = lib.filter((b) => b.rating);
  const avgRating = ratedBooks.length > 0
    ? (ratedBooks.reduce((s, b) => s + b.rating, 0) / ratedBooks.length).toFixed(1)
    : null;
  const giftCount = lib.filter((b) => b.is_gift).length;

  // Genre data
  const genreData = {};
  lib.forEach((book) => {
    book.genres.forEach((g) => {
      if (!genreData[g]) genreData[g] = { total: 0, read: 0, unread: 0, ratingSum: 0, ratingCount: 0, books: [] };
      genreData[g].total++;
      if (book.is_read) genreData[g].read++;
      else genreData[g].unread++;
      if (book.rating) {
        genreData[g].ratingSum += book.rating;
        genreData[g].ratingCount++;
      }
      genreData[g].books.push(book);
    });
  });

  const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-warning inline-block" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

  // 1. Genres les plus présents
  const byTotal = Object.entries(genreData).sort((a, b) => b[1].total - a[1].total);

  // 2. Genres les mieux notés (only rated)
  const byRating = Object.entries(genreData)
    .filter(([, s]) => s.ratingCount > 0)
    .map(([g, s]) => [g, s.ratingSum / s.ratingCount, s.ratingCount])
    .sort((a, b) => b[1] - a[1]);

  // 3. Genres les moins bien notés
  const byWorstRating = [...byRating].sort((a, b) => a[1] - b[1]);

  // 4. Genres avec le plus de livres non lus
  const byUnread = Object.entries(genreData)
    .filter(([, s]) => s.unread > 0)
    .sort((a, b) => b[1].unread - a[1].unread);

  // 5. Genres les moins explorés (lowest read %)
  const byLeastRead = Object.entries(genreData)
    .filter(([, s]) => s.total >= 2)
    .map(([g, s]) => [g, s, Math.round((s.read / s.total) * 100)])
    .sort((a, b) => a[2] - b[2]);

  // 6. Genres 100% lus
  const fullyRead = Object.entries(genreData).filter(([, s]) => s.read === s.total && s.total > 0);

  // Helper: suggestion card for unread books
  function suggestionCards(booksArr, max = 3) {
    const unread = booksArr.filter((b) => !b.is_read).slice(0, max);
    if (unread.length === 0) return "";
    return `
      <div class="mt-3 flex flex-col gap-1.5">
        <div class="text-xs opacity-50 uppercase tracking-wide">Suggestions de lecture</div>
        ${unread.map((b) => `
          <div class="flex items-center justify-between p-2 bg-base-300/50 rounded-sm text-xs">
            <div class="min-w-0">
              <span class="font-medium">${b.title}</span>
              <span class="opacity-50 ml-1">— ${b.author}</span>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // Build sections
  function statCard(title, content) {
    return `
      <div class="card card-border bg-base-100">
        <div class="card-body p-5">
          <h3 class="text-xs font-medium opacity-60 uppercase tracking-wide mb-3">${title}</h3>
          ${content}
        </div>
      </div>
    `;
  }

  // Overview numbers
  const overviewHtml = `
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      <div class="card card-border bg-base-100">
        <div class="card-body p-4 text-center">
          <div class="text-2xl font-bold">${lib.length}</div>
          <div class="text-xs opacity-60">Livres</div>
        </div>
      </div>
      <div class="card card-border bg-base-100">
        <div class="card-body p-4 text-center">
          <div class="text-2xl font-bold text-success">${readCount}</div>
          <div class="text-xs opacity-60">Lus</div>
        </div>
      </div>
      <div class="card card-border bg-base-100">
        <div class="card-body p-4 text-center">
          <div class="text-2xl font-bold">${unreadCount}</div>
          <div class="text-xs opacity-60">Non lus</div>
        </div>
      </div>
      <div class="card card-border bg-base-100">
        <div class="card-body p-4 text-center">
          <div class="text-2xl font-bold text-warning">${avgRating || "—"}</div>
          <div class="text-xs opacity-60">Note moy.${ratedBooks.length > 0 ? ` (${ratedBooks.length})` : ""}</div>
        </div>
      </div>
    </div>
  `;

  // Most present genres
  const mostPresentHtml = statCard("Genres les plus présents", `
    <div class="flex flex-col gap-2">
      ${byTotal.slice(0, 30).map(([genre, s]) => {
        const pct = Math.round((s.total / lib.length) * 100);
        return `
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="font-medium">${genre}</span>
              <span class="opacity-60">${s.total} livre${s.total > 1 ? "s" : ""} · ${pct}%</span>
            </div>
            <progress class="progress progress-primary w-full h-2" value="${s.total}" max="${lib.length}"></progress>
          </div>
        `;
      }).join("")}
    </div>
  `);

  // Best rated genres
  let bestRatedHtml = "";
  if (byRating.length > 0) {
    bestRatedHtml = statCard("Genres les mieux notés", `
      <div class="flex flex-col gap-2">
        ${byRating.map(([genre, avg, count], i) => `
          <div class="flex items-center justify-between p-2 ${i === 0 ? "bg-warning/10 border border-warning/20" : "bg-base-200"} rounded-sm">
            <div class="flex items-center gap-2">
              ${i === 0 ? '<span class="text-sm">👑</span>' : ""}
              <span class="text-sm font-medium">${genre}</span>
            </div>
            <div class="flex items-center gap-1.5">
              ${starSvg}
              <span class="text-sm font-medium">${avg.toFixed(1)}</span>
              <span class="text-xs opacity-40">(${count} avis)</span>
            </div>
          </div>
        `).join("")}
      </div>
    `);
  }

  // Worst rated genres
  let worstRatedHtml = "";
  if (byWorstRating.length > 1) {
    const worst = byWorstRating.filter(([, avg]) => avg < 4);
    if (worst.length > 0) {
      worstRatedHtml = statCard("Genres les moins aimés", `
        <div class="flex flex-col gap-2">
          ${worst.map(([genre, avg, count]) => {
            const unreadInGenre = genreData[genre].books.filter((b) => !b.is_read);
            return `
              <div class="p-2 bg-base-200 rounded-sm">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium">${genre}</span>
                  <div class="flex items-center gap-1.5">
                    ${starSvg}
                    <span class="text-sm">${avg.toFixed(1)}</span>
                    <span class="text-xs opacity-40">(${count} avis)</span>
                  </div>
                </div>
                ${unreadInGenre.length > 0 ? `
                  <div class="text-xs opacity-50 mt-2">Peut-être qu'un de ces livres changera ton avis ?</div>
                  ${suggestionCards(genreData[genre].books, 2)}
                ` : ""}
              </div>
            `;
          }).join("")}
        </div>
      `);
    }
  }

  // Most unread genres + suggestions
  let unreadGenresHtml = "";
  if (byUnread.length > 0) {
    unreadGenresHtml = statCard("Plus gros backlog par genre", `
      <div class="flex flex-col gap-3">
        ${byUnread.slice(0, 5).map(([genre, s]) => {
          const pct = Math.round((s.read / s.total) * 100);
          return `
            <div class="p-3 bg-base-200 rounded-sm">
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium">${genre}</span>
                <span class="opacity-60">${s.unread} non lu${s.unread > 1 ? "s" : ""} / ${s.total}</span>
              </div>
              <progress class="progress progress-primary w-full h-2" value="${s.read}" max="${s.total}"></progress>
              ${suggestionCards(s.books, 3)}
            </div>
          `;
        }).join("")}
      </div>
    `);
  }

  // Least explored genres
  let leastExploredHtml = "";
  if (byLeastRead.length > 0) {
    const toExplore = byLeastRead.filter(([, , pct]) => pct < 80);
    if (toExplore.length > 0) {
      leastExploredHtml = statCard("Genres les moins explorés", `
        <div class="flex flex-col gap-3">
          ${toExplore.slice(0, 5).map(([genre, s, pct]) => `
            <div class="p-3 bg-base-200 rounded-sm">
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium">${genre}</span>
                <span class="opacity-60">${pct}% lu</span>
              </div>
              <progress class="progress progress-accent w-full h-2" value="${pct}" max="100"></progress>
              ${suggestionCards(s.books, 3)}
            </div>
          `).join("")}
        </div>
      `);
    }
  }

  // Fully read genres
  let fullyReadHtml = "";
  if (fullyRead.length > 0) {
    fullyReadHtml = statCard("Genres terminés", `
      <div class="flex flex-wrap gap-2">
        ${fullyRead.map(([genre, s]) => `
          <span class="badge badge-success gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            ${genre} (${s.total})
          </span>
        `).join("")}
      </div>
    `);
  }

  // Gift stats
  let giftHtml = "";
  if (giftCount > 0) {
    const giftRead = lib.filter((b) => b.is_gift && b.is_read).length;
    giftHtml = statCard("Cadeaux", `
      <div class="flex items-center gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold">${giftCount}</div>
          <div class="text-xs opacity-60">reçus</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-success">${giftRead}</div>
          <div class="text-xs opacity-60">lus</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold">${giftCount - giftRead}</div>
          <div class="text-xs opacity-60">en attente</div>
        </div>
      </div>
    `);
  }

  container.innerHTML = `
    <div class="max-w-4xl mx-auto">
      ${overviewHtml}
      <div class="grid gap-6 md:grid-cols-2">
        ${mostPresentHtml}
        ${bestRatedHtml}
        ${unreadGenresHtml}
        ${leastExploredHtml}
        ${worstRatedHtml}
        ${fullyReadHtml}
        ${giftHtml}
      </div>
    </div>
  `;
}

// --- Wishlist ---
function displayWishlist() {
  const container = document.getElementById("wishlist-container");
  const wish = wishlistBooks();

  if (wish.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 opacity-50">
        <div class="text-5xl mb-4">💫</div>
        <p class="text-sm">Votre wishlist est vide</p>
      </div>
    `;
    return;
  }

  container.innerHTML = wish
    .map(
      (book) => `
        <div class="card card-border bg-base-100 transition-all hover:border-primary hover:-translate-y-0.5">
          <div class="card-body p-5">
            <div class="flex justify-between items-start gap-2">
              <h3 class="card-title text-base">${book.title}</h3>
              <div class="flex items-center gap-1 shrink-0">
                <button onclick="markAsBought(${book.id})" class="btn btn-xs btn-primary" title="Marquer comme acheté">
                  Acheté
                </button>
                <button onclick="deleteBook(${book.id}, true)" class="btn btn-ghost btn-xs text-error" title="Supprimer">
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

async function addWishlistBook() {
  const titleEl = document.getElementById("wish-title");
  const authorEl = document.getElementById("wish-author");
  const genresEl = document.getElementById("wish-genres");
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

  const genres = genresInput.split(",").map((g) => g.trim()).filter((g) => g).slice(0, 3);

  const result = await api('books.php', 'POST', { title, author, genres, is_wishlist: true });

  if (result.error) {
    alert(result.error);
    return;
  }

  titleEl.value = "";
  authorEl.value = "";
  genresEl.value = "";

  await loadBooks();
  displayWishlist();

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

async function markAsBought(bookId) {
  await api('wishlist.php', 'POST', { id: bookId });
  await loadBooks();
  displayWishlist();
}

// --- Note par étoiles ---
async function rateBook(bookId, rating) {
  const book = books.find((b) => b.id === bookId);
  const newRating = book && book.rating === rating ? 0 : rating;
  await api('rate.php', 'POST', { id: bookId, rating: newRating });
  await loadBooks();
  displayBooks();
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
  const giftEl = document.getElementById("book-gift");
  const yearEl = document.getElementById("book-year");
  const title = titleEl.value.trim();
  const author = authorEl.value.trim();
  const genresInput = genresEl.value.trim();
  const is_gift = giftEl.checked;
  const year = !is_gift && yearEl.value ? parseInt(yearEl.value) : null;

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

  const result = await api('books.php', 'POST', { title, author, genres, year, is_gift });

  if (result.error) {
    alert(result.error);
    return;
  }

  titleEl.value = "";
  authorEl.value = "";
  genresEl.value = "";
  giftEl.checked = false;
  yearEl.value = "";
  yearEl.disabled = false;

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
async function deleteBook(bookId, fromWishlist = false) {
  await api('books.php', 'DELETE', { id: bookId });
  await loadBooks();
  if (fromWishlist) {
    displayWishlist();
  } else {
    displayBooks();
  }
}

// --- Genres ---
function updateGenreSelect() {
  const select = document.getElementById("genre-select");
  const allGenres = new Set();

  libraryBooks().forEach((book) => {
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
      const count = libraryBooks().filter((book) =>
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

  const filteredBooks = libraryBooks().filter((book) =>
    book.genres.includes(selectedGenre)
  );

  if (filteredBooks.length === 0) {
    contentDiv.innerHTML = `
      <p class="text-center opacity-60">Aucun livre trouvé pour ce genre</p>
    `;
    resultDiv.classList.remove("hidden");
    return;
  }

  resultDiv.classList.remove("hidden");

  let count = 0;
  const totalSpins = 15;
  const interval = setInterval(() => {
    const random = filteredBooks[Math.floor(Math.random() * filteredBooks.length)];
    contentDiv.innerHTML = `
      <h3 class="font-medium text-lg mb-2">${random.title}</h3>
      <p class="text-sm opacity-60 mb-3">${random.author}</p>
      <div class="flex flex-wrap gap-1">
        ${random.genres
          .map(
            (genre) =>
              `<span class="badge badge-outline badge-sm">${genre}</span>`
          )
          .join("")}
      </div>
    `;
    count++;
    if (count >= totalSpins) {
      clearInterval(interval);
    }
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
            <div class="font-medium text-sm flex items-center gap-2">
              <span>${book.title}</span>
              ${!book.is_read && book.is_gift ? giftSvg("w-3.5 h-3.5 opacity-70") : ""}
              ${!book.is_read && book.year ? `<span class="text-xs opacity-70 font-normal">${book.year}</span>` : ""}
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

function launchConfetti(withGifts = false) {
  const container = document.createElement("div");
  container.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;";
  document.body.appendChild(container);

  const confettiChars = ["●", "■", "▲", "★", "♦", "◆", "✦"];
  const colors = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ef4444"];
  const giftChars = ["🎁", "🎀", "🎊"];
  const count = withGifts ? 60 : 40;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    let char, size;

    if (withGifts) {
      char = giftChars[Math.floor(Math.random() * giftChars.length)];
      size = 18 + Math.random() * 14;
    } else {
      char = confettiChars[Math.floor(Math.random() * confettiChars.length)];
      size = 10 + Math.random() * 14;
    }

    el.textContent = char;
    el.style.cssText = `
      position:absolute;
      left:${Math.random() * 100}%;
      top:-20px;
      font-size:${size}px;
      color:${colors[Math.floor(Math.random() * colors.length)]};
      opacity:${0.7 + Math.random() * 0.3};
      animation:confetti-fall ${1.5 + Math.random() * 2}s ease-in forwards;
      animation-delay:${Math.random() * 0.5}s;
    `;
    container.appendChild(el);
  }

  setTimeout(() => container.remove(), 4000);
}

async function toggleReadAndRefreshChallenge(bookId) {
  const wasRead = (challenge.books || []).find((b) => b.id === bookId)?.is_read;
  await api('read.php', 'POST', { id: bookId });
  await Promise.all([loadBooks(), loadChallengeData()]);

  if (!wasRead) {
    const readCount = (challenge.books || []).filter((b) => b.is_read).length;
    const withGifts = readCount % 3 === 0;
    launchConfetti(withGifts);
  }

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

  const available = libraryBooks().filter(
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

// --- Toggle cadeau / année ---
function toggleGiftInput() {
  const giftEl = document.getElementById("book-gift");
  const yearEl = document.getElementById("book-year");
  if (giftEl.checked) {
    yearEl.value = "";
    yearEl.disabled = true;
  } else {
    yearEl.disabled = false;
  }
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
window.toggleGiftInput = toggleGiftInput;
window.addWishlistBook = addWishlistBook;
window.markAsBought = markAsBought;
window.rateBook = rateBook;
window.displayWishlist = displayWishlist;
window.displayStats = displayStats;

// --- Initialisation ---
document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([loadBooks(), loadChallengeData()]);
  displayBooks();
});
