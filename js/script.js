const translations = {
  pt: {
    flagSrc: "https://flagcdn.com/w20/br.png",
    lang: "PT",
    searchPlaceholder: "Digite o que você procura...",
    navAbout: "Quem Somos",
    navServices: "Serviços",
    navExperience: "Experiência",
    navDifferentials: "Diferenciais",
    navTechnologies: "Tecnologias",
    navProjects: "Projetos",
    navContact: "Contato",
    heroTitle: "Qualidade de software para entregas mais seguras.",
    heroText: "Reduza falhas críticas, retrabalho e riscos em produção com uma estratégia de QA orientada a processos, automação e confiabilidade.",
    heroButton: "Solicitar diagnóstico",
    heroSecondary: "Conhecer serviços"
  },
  en: {
    flagSrc: "https://flagcdn.com/w20/us.png",
    lang: "EN",
    searchPlaceholder: "Type what you are looking for...",
    navAbout: "About us",
    navServices: "Services",
    navExperience: "Experience",
    navDifferentials: "Differentials",
    navTechnologies: "Technologies",
    navProjects: "Projects",
    navContact: "Contact",
    heroTitle: "Software quality for safer deliveries.",
    heroText: "Reduce critical failures, rework and production risks with a QA strategy focused on processes, automation and reliability.",
    heroButton: "Request assessment",
    heroSecondary: "Explore services"
  },
  es: {
    flagSrc: "https://flagcdn.com/w20/es.png",
    lang: "ES",
    searchPlaceholder: "Escribe lo que buscas...",
    navAbout: "Quiénes somos",
    navServices: "Servicios",
    navExperience: "Experiencia",
    navDifferentials: "Diferenciales",
    navTechnologies: "Tecnologías",
    navProjects: "Proyectos",
    navContact: "Contacto",
    heroTitle: "Calidad de software para entregas más seguras.",
    heroText: "Reduzca fallas críticas, retrabajo y riesgos en producción con una estrategia de QA orientada a procesos, automatización y confiabilidad.",
    heroButton: "Solicitar diagnóstico",
    heroSecondary: "Conocer servicios"
  }
};

const langButton = document.getElementById("langButton");
const languageMenu = document.getElementById("languageMenu");
const currentFlag = document.getElementById("currentFlag");
const currentLang = document.getElementById("currentLang");
const searchInput = document.getElementById("searchInput");

if (langButton && languageMenu) {
  langButton.addEventListener("click", () => {
    languageMenu.classList.toggle("open");
  });
}

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedLang = button.getAttribute("data-lang");
    const dictionary = translations[selectedLang];

    currentFlag.src = dictionary.flagSrc;
    currentFlag.alt = dictionary.lang;
    currentLang.textContent = dictionary.lang;
    searchInput.placeholder = dictionary.searchPlaceholder;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");

      if (dictionary[key]) {
        element.textContent = dictionary[key];
      }
    });

    languageMenu.classList.remove("open");
  });
});

const searchArea = document.getElementById("searchArea");
const searchToggle = document.getElementById("searchToggle");

if (searchToggle && searchArea) {
  searchToggle.addEventListener("click", () => {
    if (searchArea.classList.contains("open") && searchInput.value.trim() !== "") {
      runSearch();
      return;
    }

    searchArea.classList.toggle("open");

    if (searchArea.classList.contains("open")) {
      searchInput.focus();
    } else {
      searchInput.value = "";
    }
  });
}

function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function runSearch() {
  const term = normalizeText(searchInput.value);

  const searchMap = [
    {
      words: [
        "servico", "servicos", "service", "services", "servicio", "servicios",
        "teste", "testes", "testing", "qa", "api", "automacao", "automation",
        "estrategia", "strategy"
      ],
      target: "#servicos"
    },
    {
      words: [
        "diferencial", "diferenciais", "beneficio", "beneficios", "benefit",
        "benefits", "valor", "qualidade", "reducao", "falhas", "retrabalho"
      ],
      target: "#diferenciais"
    },
    {
      words: [
        "tecnologia", "tecnologias", "technology", "technologies",
        "cypress", "playwright", "javascript", "jira", "azure", "sql", "testlink"
      ],
      target: "#tecnologias"
    },
    {
      words: [
        "projeto", "projetos", "project", "projects", "claro", "vivo",
        "amil", "karsten", "philips", "banco", "bb", "telefonica"
      ],
      target: "#clientes"
    },
    {
      words: [
        "experiencia", "experience", "carreira", "atuacao"
      ],
      target: "#experiencia"
    },
    {
      words: [
        "contato", "contact", "contacto", "whatsapp", "email", "e-mail",
        "mensagem", "orcamento", "diagnostico"
      ],
      target: "#contato"
    },
    {
      words: [
        "quem somos", "sobre", "about", "empresa", "company", "g7"
      ],
      target: "#sobre"
    }
  ];

  const result = searchMap.find((item) =>
    item.words.some((word) => {
      const normalizedWord = normalizeText(word);
      return term.includes(normalizedWord) || normalizedWord.includes(term);
    })
  );

  if (result) {
    document.querySelector(result.target).scrollIntoView({ behavior: "smooth" });
    searchArea.classList.remove("open");
    searchInput.value = "";
  } else if (term.length > 0) {
    alert("Não encontrei essa informação. Tente buscar por serviços, projetos, contato, estratégia, tecnologias ou QA.");
  }
}

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    runSearch();
  }
});

document.addEventListener("click", (event) => {
  const clickedOutsideLanguage =
    languageMenu &&
    langButton &&
    !languageMenu.contains(event.target) &&
    !langButton.contains(event.target);

  if (clickedOutsideLanguage) {
    languageMenu.classList.remove("open");
  }
});
