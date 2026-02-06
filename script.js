// Liste statique des livres (JSON)
const hardcodedBooks = [
  {
    title: "Kallocaïne",
    author: "Karin Boye",
    genres: ["Dystopie", "Science-fiction", "Anticipation"],
  },
  {
    title: "Après le monde",
    author: "Antoinette Rychner",
    genres: [
      "Post-apocalyptique",
      "Dystopie",
      "Écoféministe",
      "Collapsologie",
    ],
  },
  {
    title: "Dans la forêt",
    author: "Jean Hegland",
    genres: [
      "Post-apocalyptique",
      "Nature writing",
      "Roman d'apprentissage",
      "Survie",
    ],
  },
  {
    title: "Ubik",
    author: "Philip K. Dick",
    genres: ["Science-fiction", "Dystopie", "Philosophique", "Paranormal"],
  },
  {
    title: "2054",
    author: "Elliot Ackerman",
    genres: ["Thriller", "Anticipation", "Géopolitique", "Science-fiction"],
  },
  {
    title: "Lux",
    author: "Maxime Chattam",
    genres: [
      "Thriller",
      "Anticipation",
      "Post-apocalyptique",
      "Science-fiction",
    ],
  },
  {
    title: "Le gang de la clef à molette",
    author: "Edward Abbey",
    genres: ["Roman", "Écologie", "Aventure", "Satire"],
  },
  {
    title: "Sans âme",
    author: "Charlotte Heuse",
    genres: ["Roman", "Fantastique", "Drame"],
  },
  {
    title: "Babel",
    author: "R.F. Kuang",
    genres: ["Fantasy", "Historique", "Dark Academia", "Politique"],
  },
  {
    title: "Le Temps des sorcières",
    author: "Alix E. Harrow",
    genres: ["Fantasy", "Féministe", "Historique", "Surnaturel"],
  },
  {
    title: "Celle qui devint le soleil",
    author: "Shelley Parker-Chan",
    genres: ["Fantasy", "Historique", "Chine", "Épique"],
  },
  {
    title: "Un monde après l'autre",
    author: "Jodi Taylor",
    genres: [
      "Science-fiction",
      "Voyage dans le temps",
      "Humour",
      "Aventure",
    ],
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    genres: ["Classique", "Romance", "Gothique", "Victorien"],
  },
  {
    title: "Furies",
    author: "Julie Ruocco",
    genres: ["Thriller", "Polar", "Psychologique"],
  },
  {
    title: "Camille, 1815",
    author: "Armand Clery",
    genres: ["Historique", "Roman", "France"],
  },
  {
    title: "Le Roi et l'horloger",
    author: "Arnaldur Indriðason",
    genres: ["Polar", "Islandais", "Mystère", "Crime"],
  },
  {
    title: "La Couturière de Dachau",
    author: "Mary Chamberlain",
    genres: [
      "Historique",
      "Seconde Guerre mondiale",
      "Drame",
      "Biographique",
    ],
  },
  {
    title: "Le non de Klara",
    author: "Soazig Aaron",
    genres: ["Roman", "Féministe", "Contemporain", "Psychologique"],
  },
  {
    title: "Le Grand Feu",
    author: "Léonor de Récondo",
    genres: ["Roman", "Historique", "Drame", "Littéraire"],
  },
  {
    title: "Mendelssohn est sur le toit",
    author: "Jiří Weil",
    genres: [
      "Historique",
      "Seconde Guerre mondiale",
      "Roman tchèque",
      "Satire",
    ],
  },
  {
    title: "Les Passeurs de livres de Daraya",
    author: "Delphine Minoui",
    genres: ["Documentaire", "Guerre", "Syrie", "Témoignage"],
  },
  {
    title: "Jeanne Seymour : La Reine bien-aimée",
    author: "Alison Weir",
    genres: ["Historique", "Biographie", "Tudor", "Romance"],
  },
  {
    title: "Madame Pylinska et le secret de Chopin",
    author: "Éric-Emmanuel Schmitt",
    genres: ["Roman", "Musique", "Philosophique", "Littéraire"],
  },
  {
    title: "La Librairie des chats noirs",
    author: "Piergiorgio Pulixi",
    genres: ["Polar", "Italien", "Mystère", "Thriller"],
  },
  {
    title: "L'Empreinte",
    author: "Alexandria Marzano-Lesnevich",
    genres: ["True Crime", "Mémoire", "Justice", "Documentaire"],
  },
  {
    title: "Rouge Karma",
    author: "Jean-Christophe Grangé",
    genres: ["Thriller", "Polar", "Mystique", "Action"],
  },
  {
    title: "Metropolis",
    author: "Philip Kerr",
    genres: ["Polar historique", "Berlin", "Noir", "Crime"],
  },
  {
    title: "Nous étions le sel de la mer",
    author: "Roxanne Bouchard",
    genres: ["Roman québécois", "Drame", "Maritime", "Psychologique"],
  },
  {
    title: "Le mari parfait d'Agatha Christie",
    author: "Bénédicte Jourgeaud",
    genres: [
      "Biographie romancée",
      "Historique",
      "Mystère",
      "Littéraire",
    ],
  },
  {
    title: "Le Maître des énigmes",
    author: "Danielle Trussoni",
    genres: ["Thriller", "Mystère", "Aventure", "Ésotérique"],
  },
  {
    title: "Le Dernier inventeur",
    author: "Héloïse Guay de Bellissen",
    genres: ["Roman", "Historique", "Science", "Aventure"],
  },
  {
    title: "Là où chantent les écrevisses",
    author: "Delia Owens",
    genres: ["Roman", "Nature writing", "Mystère", "Coming-of-age"],
  },
  {
    title: "Cinq coeurs en sursis",
    author: "Laure Manel",
    genres: ["Romance", "Contemporain", "Feel-good", "Drame"],
  },
  {
    title: "Petites boîtes",
    author: "Yōko Ogawa",
    genres: ["Roman japonais", "Littéraire", "Mélancolique", "Poétique"],
  },
  {
    title: "Qu'importe la couleur du ciel",
    author: "Valérie Cohen",
    genres: ["Roman", "Contemporain", "Drame", "Psychologique"],
  },
  {
    title: "La vérité sur la lumière",
    author: "Auður Ava Ólafsdóttir",
    genres: ["Roman islandais", "Littéraire", "Poétique", "Nature"],
  },
  {
    title: "Noël surprise dans les Highlands",
    author: "Sarah Morgan",
    genres: ["Romance", "Noël", "Feel-good", "Écossais"],
  },
  {
    title: "Rhapsodie balkanique",
    author: "Maria Kassimova-Moisset",
    genres: ["Roman", "Balkans", "Historique", "Culturel"],
  },
  {
    title: "La vie avant l'homme",
    author: "Margaret Atwood",
    genres: ["Roman", "Psychologique", "Canadien", "Féministe"],
  },
  {
    title: "Le Prince à la petite tasse",
    author: "Emilie de Turckheim",
    genres: ["Roman", "Conte moderne", "Fantaisie", "Humour"],
  },
  {
    title: "Bimbo: Repenser les normes de la féminité",
    author: "Edie Blanchard",
    genres: ["Essai", "Féminisme", "Sociologie", "Culture populaire"],
  },
  {
    title: "Psychogénéalogie",
    author: "Anne Ancelin Schützenberger",
    genres: [
      "Psychologie",
      "Thérapie",
      "Famille",
      "Développement personnel",
    ],
  },
  {
    title: "Nous sommes tous des féministes",
    author: "Chimamanda Ngozi Adichie",
    genres: ["Essai", "Féminisme", "Société", "Manifeste"],
  },
  {
    title: "Ni vues ni connues",
    author: "Collectif Georgette Sand",
    genres: ["Histoire", "Féminisme", "Biographies", "Société"],
  },
  {
    title: "Histoire des préjugés",
    author: "Jeanne Guérout",
    genres: ["Histoire", "Sociologie", "Essai", "Culture"],
  },
  {
    title: "Le livre des haïku",
    author: "Jack Kerouac",
    genres: ["Poésie", "Haïku", "Beat Generation", "Zen"],
  },
  {
    title: "The Best of Europe for Women",
    author: "Choisir la cause des femmes",
    genres: ["Essai", "Féminisme", "Europe", "Politique"],
  },
  {
    title: "Les grandes oubliées",
    author: "Titiou Lecoq",
    genres: ["Histoire", "Féminisme", "Biographies", "Essai"],
  },
  {
    title: "Le deuxième sexe, I",
    author: "Simone de Beauvoir",
    genres: ["Philosophie", "Féminisme", "Essai", "Classique"],
  },
  {
    title: "Ces hommes qui m'expliquent la vie",
    author: "Rebecca Solnit",
    genres: ["Essai", "Féminisme", "Société", "Culture"],
  },
  {
    title: "Pourquoi les Kevin ne deviennent pas médecins",
    author: "Étienne Guertin-Tardif",
    genres: ["Sociologie", "Essai", "Société", "Québécois"],
  },
  {
    title: "Né d'aucune femme",
    author: "Franck Bouysse",
    genres: ["Roman", "Noir", "Rural", "Drame"],
  },
  {
    title: "Les Hauts de Hurlevent",
    author: "Emily Brontë",
    genres: ["Classique", "Gothique", "Romance", "Victorien"],
  },
  {
    title: "L'Île au trésor",
    author: "Robert Louis Stevenson",
    genres: ["Aventure", "Classique", "Pirates", "Jeunesse"],
  },
  {
    title: "Le coût de la virilité",
    author: "Lucile Peytavin",
    genres: ["Essai", "Sociologie", "Féminisme", "Économie"],
  },
  {
    title: "Clytemnestra",
    author: "Costanza Casati",
    genres: ["Mythologie", "Historique", "Féministe", "Grèce antique"],
  },
  {
    title: "Moi qui n'ai pas connu les hommes",
    author: "Jacqueline Harpman",
    genres: [
      "Science-fiction",
      "Dystopie",
      "Féministe",
      "Philosophique",
    ],
  },
  {
    title: "Ariadne",
    author: "Jennifer Saint",
    genres: ["Mythologie", "Fantasy", "Féministe", "Grèce antique"],
  },
  {
    title: "La brillante destinée d'Elizabeth Zott",
    author: "Bonnie Garmus",
    genres: ["Roman", "Féministe", "Humour", "Années 60"],
  },
  {
    title: "Dry",
    author: "Neal Shusterman",
    genres: ["Young Adult", "Dystopie", "Survie", "Écologie"],
  },
  {
    title: "La Reine du noir",
    author: "Julia Bartz",
    genres: ["Thriller", "Mystère", "Psychologique", "Huis clos"],
  },
  {
    title: "Sublime Royaume",
    author: "Yaa Gyasi",
    genres: ["Roman", "Famille", "Ghana", "Diaspora"],
  },
  {
    title: "American Gods",
    author: "Neil Gaiman",
    genres: ["Fantasy", "Mythologie", "Urban Fantasy", "Épique"],
  },
  {
    title: "Les Pirates de Dieu",
    author: "François-Henri Soulié",
    genres: ["Historique", "Aventure", "Maritime", "Religion"],
  },
  {
    title: "Les Contemplées",
    author: "Pauline Hillier",
    genres: ["Roman", "Féministe", "Contemporain", "Philosophique"],
  },
  {
    title: "La prophétesse voilée",
    author: "Jean d'Aillon",
    genres: ["Historique", "Mystère", "France", "17e siècle"],
  },
  {
    title: "Le Soleil des Scorta",
    author: "Laurent Gaudé",
    genres: ["Roman", "Saga familiale", "Italie", "Drame"],
  },
  {
    title: "Kim Jiyoung, Born 1982",
    author: "Cho Nam-Joo",
    genres: ["Roman coréen", "Féministe", "Société", "Contemporain"],
  },
  {
    title: "Les Naufragés du Wager",
    author: "David Grann",
    genres: ["Histoire", "Maritime", "Aventure", "Survie"],
  },
  {
    title: "Perspective",
    author: "Laurent Binet",
    genres: ["Roman", "Historique", "Art", "Renaissance"],
  },
  {
    title: "Les Hirondelles de Kaboul",
    author: "Yasmina Khadra",
    genres: ["Roman", "Afghanistan", "Guerre", "Drame"],
  },
  {
    title: "Les sorcières de Vardø",
    author: "Anya Bergman",
    genres: ["Historique", "Sorcellerie", "Norvège", "Féministe"],
  },
  {
    title: "L'Île des âmes",
    author: "Piergiorgio Pulixi",
    genres: ["Thriller", "Noir", "Sardaigne", "Mystère"],
  },
  {
    title: "La Septième Lune",
    author: "Piergiorgio Pulixi",
    genres: ["Thriller", "Noir", "Italien", "Mystère"],
  },
  {
    title: "Lucia",
    author: "Bernard Minier",
    genres: ["Thriller", "Polar", "Psychologique", "Suspense"],
  },
  {
    title: "Les Graciées",
    author: "Kiran Millwood Hargrave",
    genres: ["Historique", "Féministe", "Sorcellerie", "17e siècle"],
  },
  {
    title: "Les Jardins de Zagarand",
    author: "Eric de Kermel",
    genres: ["Roman", "Orient", "Spirituel", "Philosophique"],
  },
  {
    title: "Women and Other Monsters",
    author: "Jess Zimmerman",
    genres: ["Essai", "Mythologie", "Féminisme", "Culture"],
  },
  {
    title: "L'Énigme de Turnglass",
    author: "Gareth Rubin",
    genres: ["Mystère", "Historique", "Victorien", "Thriller"],
  },
  {
    title: "Off With Her Head",
    author: "Eleanor Herman",
    genres: ["Histoire", "Féminisme", "Biographies", "Pouvoir"],
  },
  {
    title: "La Parabole des talents",
    author: "Octavia E. Butler",
    genres: [
      "Science-fiction",
      "Dystopie",
      "Afrofuturisme",
      "Post-apocalyptique",
    ],
  },
  {
    title: "La Parabole du semeur",
    author: "Octavia E. Butler",
    genres: [
      "Science-fiction",
      "Dystopie",
      "Afrofuturisme",
      "Post-apocalyptique",
    ],
  },
  {
    title: "Beauté fatale",
    author: "Mona Chollet",
    genres: ["Essai", "Féminisme", "Sociologie", "Beauté"],
  },
  {
    title: "Les Dieux du tango",
    author: "Carolina De Robertis",
    genres: ["Roman", "Historique", "Argentine", "LGBTQ+"],
  },
  {
    title: "Noir comme la mer",
    author: "Mary Higgins Clark",
    genres: ["Thriller", "Suspense", "Mystère", "Crime"],
  },
  {
    title: "Le Pavillon des orphelines",
    author: "Joanna Goodman",
    genres: ["Historique", "Canada", "Drame", "Famille"],
  },
  {
    title: "L'aile des vierges",
    author: "Laurence Peyrin",
    genres: ["Historique", "Romance", "France", "19e siècle"],
  },
  {
    title: "My Absolute Darling",
    author: "Gabriel Tallent",
    genres: ["Thriller", "Psychologique", "Coming-of-age", "Survie"],
  },
  {
    title: "Tu me manques",
    author: "Harlan Coben",
    genres: ["Thriller", "Suspense", "Mystère", "Crime"],
  },
  {
    title: "Le Tueur aveugle",
    author: "Margaret Atwood",
    genres: ["Roman", "Dystopie", "Science-fiction", "Féministe"],
  },
  {
    title: "Les Sept Morts d'Evelyn Hardcastle",
    author: "Stuart Turton",
    genres: ["Mystère", "Science-fiction", "Thriller", "Énigme"],
  },
  {
    title: "Les meufs c'est des mecs bien",
    author: "Mourad Winter",
    genres: ["Humour", "Essai", "Société", "Stand-up"],
  },
  {
    title: "Marques de fabrique",
    author: "Cecile Baudin",
    genres: ["Roman", "Terroir", "France", "Social"],
  },
  {
    title: "Juliette et les Cézanne",
    author: "Jean d'Aillon",
    genres: ["Historique", "Mystère", "Art", "France"],
  },
  {
    title: "Nos pères, nos frères, nos amis",
    author: "Mathieu Palain",
    genres: ["Documentaire", "Société", "Violence", "Masculinité"],
  },
  {
    title: "Seule en sa demeure",
    author: "Cécile Coulon",
    genres: ["Roman", "Noir", "Rural", "Gothique"],
  },
  {
    title: "The Fuck-Up",
    author: "Arthur Nersesian",
    genres: ["Roman", "Urban", "New York", "Coming-of-age"],
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genres: ["Thriller", "Mystère", "Ésotérique", "Aventure"],
  },
  {
    title: "Les Promises",
    author: "Jean-Christophe Grangé",
    genres: ["Thriller", "Polar", "Mystère", "Suspense"],
  },
  {
    title: "Poirot Halloween",
    author: "Agatha Christie",
    genres: ["Mystère", "Policier", "Classique", "Whodunit"],
  },
  {
    title: "Au NON des femmes",
    author: "Jennifer Tamas",
    genres: ["Essai", "Féminisme", "Littérature", "Critique"],
  },
  {
    title: "Le Silence des vaincues",
    author: "Pat Barker",
    genres: ["Historique", "Guerre", "Mythologie", "Féministe"],
  },
  {
    title: "Le Maître du Haut Château",
    author: "Philip K. Dick",
    genres: ["Science-fiction", "Uchronie", "Dystopie", "Alternatif"],
  },
  {
    title: "Le roi transparent",
    author: "Rosa Montero",
    genres: ["Fantasy", "Historique", "Médiéval", "Féministe"],
  },
  {
    title: "Ne tirez pas sur l'oiseau moqueur",
    author: "Harper Lee",
    genres: ["Classique", "Drame", "Justice", "Américain"],
  },
  {
    title: "Je crois que j'ai tué ma femme",
    author: "Frasse Mikardsson",
    genres: ["Thriller", "Noir", "Psychologique", "Suédois"],
  },
  {
    title: "Les hommes ont peur de la lumière",
    author: "Douglas Kennedy",
    genres: ["Roman", "Psychologique", "Contemporain", "Drame"],
  },
  {
    title: "Artemisia",
    author: "Alexandra Lapierre",
    genres: [
      "Biographie romancée",
      "Art",
      "Renaissance",
      "Féministe",
    ],
  },
  {
    title: "Humus",
    author: "Gaspard Kœnig",
    genres: ["Roman", "Philosophique", "Écologie", "Politique"],
  },
  {
    title: "La Mariée portait des bottes jaunes",
    author: "Katherine Pancol",
    genres: ["Romance", "Contemporain", "Humour", "Feel-good"],
  },
  {
    title: "Les voleurs d'innocence",
    author: "Sarai Walker",
    genres: ["Roman", "Féministe", "Thriller", "Social"],
  },
  {
    title: "Le Portrait de mariage",
    author: "Maggie O'Farrell",
    genres: ["Historique", "Art", "Renaissance", "Biographique"],
  },
  {
    title: "L'École aux oiseaux",
    author: "Clare Beams",
    genres: ["Roman", "Gothique", "Historique", "Mystère"],
  },
  {
    title: "La Collectionneuse des mots oubliés",
    author: "Pip Williams",
    genres: ["Historique", "Féministe", "Linguistique", "Victorien"],
  },
  {
    title: "Eon et le douzième dragon",
    author: "Alison Goodman",
    genres: ["Fantasy", "Young Adult", "Dragons", "Asiatique"],
  },
  {
    title: "Les Fiancés de l'hiver",
    author: "Christelle Dabos",
    genres: ["Fantasy", "Young Adult", "Steampunk", "Romance"],
  },
  {
    title: "The Calling",
    author: "James Frey",
    genres: ["Young Adult", "Science-fiction", "Dystopie", "Aventure"],
  },
  {
    title: "Chapterhouse: Dune",
    author: "Frank Herbert",
    genres: [
      "Science-fiction",
      "Space Opera",
      "Épique",
      "Philosophique",
    ],
  },
  {
    title: "Heretics of Dune",
    author: "Frank Herbert",
    genres: [
      "Science-fiction",
      "Space Opera",
      "Épique",
      "Philosophique",
    ],
  },
  {
    title: "God Emperor of Dune",
    author: "Frank Herbert",
    genres: [
      "Science-fiction",
      "Space Opera",
      "Épique",
      "Philosophique",
    ],
  },
  {
    title: "Les Hauts de Hurlevent",
    author: "Brontë, Emily",
    genres: ["Classique", "Roman gothique"],
  },
  {
    title: "L'Île au trésor",
    author: "Stevenson, Robert Louis",
    genres: ["Aventure", "Classique"],
  },
];

// --- Système d'IDs et persistance ---
function generateId(book) {
  return (book.title + "|" + book.author)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-|àâäéèêëïîôùûüÿçœæ]/g, "");
}

function loadUserBooks() {
  try {
    return JSON.parse(localStorage.getItem("userBooks")) || [];
  } catch {
    return [];
  }
}

function saveUserBooks(userBooks) {
  localStorage.setItem("userBooks", JSON.stringify(userBooks));
}

function loadReadBookIds() {
  try {
    return JSON.parse(localStorage.getItem("readBookIds")) || [];
  } catch {
    return [];
  }
}

function saveReadBookIds(ids) {
  localStorage.setItem("readBookIds", JSON.stringify(ids));
}

function loadChallenge() {
  try {
    return JSON.parse(localStorage.getItem("readingChallenge")) || null;
  } catch {
    return null;
  }
}

function saveChallenge(challenge) {
  if (challenge) {
    localStorage.setItem("readingChallenge", JSON.stringify(challenge));
  } else {
    localStorage.removeItem("readingChallenge");
  }
}

let books = [];
let readBookIds = [];
let challenge = null;

function initBooks() {
  const userBooks = loadUserBooks();
  readBookIds = loadReadBookIds();
  challenge = loadChallenge();

  const hBooks = hardcodedBooks.map((b) => ({
    ...b,
    id: generateId(b),
  }));

  books = [...hBooks, ...userBooks];
}

function isRead(bookId) {
  return readBookIds.includes(bookId);
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

  stats.innerHTML = `📚 ${books.length} livre${books.length > 1 ? "s" : ""} dans votre collection`;

  container.innerHTML = books
    .map(
      (book) => `
        <div class="card bg-base-100 border border-base-300 transition-all hover:border-primary hover:-translate-y-0.5 ${isRead(book.id) ? "opacity-50" : ""}">
          <div class="card-body p-5">
            <div class="flex justify-between items-start gap-2">
              <h3 class="card-title text-base">
                ${book.title}
                ${isRead(book.id) ? '<span class="text-xs font-normal text-success"> — Lu</span>' : ""}
              </h3>
              <div class="flex items-center gap-1 shrink-0">
                <button onclick="toggleRead('${book.id}')" class="btn btn-xs ${isRead(book.id) ? "btn-success" : "btn-outline"}" title="${isRead(book.id) ? "Marquer non lu" : "Marquer comme lu"}">
                  ${isRead(book.id) ? "✓ Lu" : "Marquer lu"}
                </button>
                <button onclick="deleteBook('${book.id}')" class="btn btn-ghost btn-xs text-error" title="Supprimer">
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
function toggleRead(bookId) {
  if (readBookIds.includes(bookId)) {
    readBookIds = readBookIds.filter((id) => id !== bookId);
  } else {
    readBookIds.push(bookId);
  }
  saveReadBookIds(readBookIds);
  displayBooks();
}

// --- Ajouter un livre ---
function addBook() {
  const titleEl = document.getElementById("book-title");
  const authorEl = document.getElementById("book-author");
  const genresEl = document.getElementById("book-genres");
  const title = titleEl.value.trim();
  const author = authorEl.value.trim();
  const genresInput = genresEl.value.trim();

  // Reset error states
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
  const newBook = { title, author, genres, id: generateId({ title, author }) };

  if (books.some((b) => b.id === newBook.id)) {
    alert("Ce livre existe déjà dans votre bibliothèque.");
    return;
  }

  books.push(newBook);

  const userBooks = loadUserBooks();
  userBooks.push(newBook);
  saveUserBooks(userBooks);

  titleEl.value = "";
  authorEl.value = "";
  genresEl.value = "";

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
function deleteBook(bookId) {
  books = books.filter((b) => b.id !== bookId);

  const userBooks = loadUserBooks().filter((b) => b.id !== bookId);
  saveUserBooks(userBooks);

  if (challenge && challenge.bookIds.includes(bookId)) {
    challenge.bookIds = challenge.bookIds.filter((id) => id !== bookId);
    saveChallenge(challenge);
  }

  readBookIds = readBookIds.filter((id) => id !== bookId);
  saveReadBookIds(readBookIds);

  displayBooks();
}

// --- Genres ---
function updateGenreSelect() {
  const select = document.getElementById("genre-select");
  const allGenres = new Set();

  books.forEach((book) => {
    book.genres.forEach((genre) => allGenres.add(genre));
  });

  select.innerHTML = '<option value="">Sélectionner un genre</option>';

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
function createChallenge() {
  const input = document.getElementById("challenge-goal");
  const goal = parseInt(input.value);
  if (!goal || goal < 1) {
    input.classList.add("input-error");
    setTimeout(() => {
      input.classList.remove("input-error");
    }, 2000);
    return;
  }
  challenge = { goal, year: new Date().getFullYear(), bookIds: [] };
  saveChallenge(challenge);
  displayChallenge();
}

function deleteChallenge() {
  if (!confirm("Supprimer le challenge en cours ?")) return;
  challenge = null;
  saveChallenge(null);
  displayChallenge();
}

function addToChallenge(bookId) {
  if (!challenge) return;
  if (challenge.bookIds.includes(bookId)) return;
  challenge.bookIds.push(bookId);
  saveChallenge(challenge);
  displayChallenge();
}

function removeFromChallenge(bookId) {
  if (!challenge) return;
  challenge.bookIds = challenge.bookIds.filter((id) => id !== bookId);
  saveChallenge(challenge);
  displayChallenge();
}

function displayChallenge() {
  const container = document.getElementById("challenge-content");

  if (!challenge) {
    container.innerHTML = `
      <div class="max-w-md mx-auto">
        <div class="card bg-base-100 border border-base-300">
          <div class="card-body text-center">
            <h2 class="card-title justify-center">Créer un challenge de lecture</h2>
            <p class="opacity-60">Combien de livres souhaitez-vous lire cette année ?</p>
            <div class="flex items-center justify-center gap-2 mt-4">
              <input type="number" id="challenge-goal" class="input input-bordered w-24 text-center text-lg" min="1" placeholder="10" />
              <button onclick="createChallenge()" class="btn btn-primary">Créer mon challenge</button>
            </div>
          </div>
        </div>
      </div>
    `;
    return;
  }

  const challengeBooks = challenge.bookIds
    .map((id) => books.find((b) => b.id === id))
    .filter(Boolean);
  const readCount = challengeBooks.filter((b) => isRead(b.id)).length;
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
        <div class="flex justify-between items-center p-3 bg-base-200 border border-base-300 rounded-sm mb-2 ${isRead(book.id) ? "opacity-50" : ""}">
          <div class="flex-1">
            <div class="font-medium text-sm">
              ${book.title}
              ${isRead(book.id) ? '<span class="text-xs font-normal text-success"> — Lu</span>' : ""}
            </div>
            <div class="text-xs opacity-60">${book.author}</div>
          </div>
          <div class="flex items-center gap-1">
            <button onclick="toggleRead('${book.id}'); displayChallenge();" class="btn btn-xs ${isRead(book.id) ? "btn-success" : "btn-outline"}" title="${isRead(book.id) ? "Marquer non lu" : "Marquer lu"}">
              ${isRead(book.id) ? "✓ Lu" : "Marquer lu"}
            </button>
            <button onclick="removeFromChallenge('${book.id}')" class="btn btn-ghost btn-xs text-error" title="Retirer du challenge">
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
      <div class="card bg-base-100 border border-base-300">
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
        </div>
      </div>
    </div>
  `;
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
  const challengeIds = challenge ? challenge.bookIds : [];

  const available = books.filter(
    (b) =>
      !challengeIds.includes(b.id) &&
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
      <div class="flex justify-between items-center p-3 border border-base-300 rounded-sm mb-1 cursor-pointer transition-all hover:border-primary" onclick="addToChallenge('${book.id}'); closeBookSelector(); displayChallenge();">
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

// --- Initialisation ---
document.addEventListener("DOMContentLoaded", () => {
  initBooks();
  displayBooks();
});
