import zaczkie_large from '@/public/projects/zaczkie-large.png'
import jarvvitch_large from '@/public/projects/Jarvvitch-large.png'
import soundless_small from '@/public/projects/soundless-square.webp'
import soundless_large from '@/public/projects/soundless-large.webp'

// Import the TranslationDictionary interface
import { TranslationDictionary } from './en'

// Use the imported interface for the dict variable
export const dict: TranslationDictionary = {
  common: {
    nav: {
      personal: "Prywatnie",
      home: "Strona główna",
      about: "O mnie",
      cv: "Moje CV",
      experience: "Doświadczenie",
      projects: "Projekty",
      patrons: "Patroni",
      prices: "Cennik",
      contact: "Kontakt",
      backToProjects: "Powrót do projektów",
      skipNavigation: "Pomiń nawigację",
    },
    siteName: "Kris German",
    readyToGetStarted: {
      title: "Gotowy, aby zacząć?",
      description: "Porozmawiajmy o Twoim projekcie i stwórzmy razem coś niesamowitego.",
      button: "Skontaktuj się ze mną"
    },
  },
  prices: {
    title: "Cennik",
    description: "Oferuję przejrzyste opcje cenowe dostosowane do Twoich potrzeb. Niezależnie od tego, czy jesteś małą firmą, która dopiero zaczyna, czy dużym przedsiębiorstwem poszukującym kompleksowych rozwiązań, mam pakiety zaprojektowane, aby pomóc Ci odnieść sukces.",
    packages: {
      title: "Pakiety cenowe",
      ctaButton: "Rozpocznij",
      basic: {
        title: "Pakiet Podstawowy",
        price: "1499 zł",
        originalPrice: "1799 zł",
        description: "Idealny dla małych firm potrzebujących czystej, prostej strony",
        features: [
          "Responsywny design",
          "Do 5 stron",
          "Podstawowa konfiguracja SEO",
          "Formularz kontaktowy",
          "1 miesiąc wsparcia",
          "Realizacja w 2-3 tygodnie"
        ]
      },
      professional: {
        title: "Pakiet Profesjonalny",
        price: "2499 zł",
        description: "Idealny dla rozwijających się firm o specyficznych potrzebach",
        features: [
          "Wszystko z Pakietu Podstawowego",
          "Strona one-page (hero + 5-7 sekcji) lub do ~8-10 stron",
          "Zaawansowana optymalizacja SEO",
          "Integracja bloga (podstawowy CMS)",
          "3 miesiące wsparcia",
          "2 rundy poprawek",
          "Realizacja w 3-4 tygodnie"
        ]
      },
      enterprise: {
        title: "Pakiet Enterprise",
        price: "od 3999 zł",
        description: "Kompletne rozwiązanie dla ustabilizowanych firm",
        features: [
          "Wszystko z Pakietu Profesjonalnego",
          "Nieograniczona liczba stron",
          "Funkcjonalność e-commerce",
          "Niestandardowe animacje",
          "Optymalizacja wydajności",
          "6 miesięcy wsparcia",
          "Nieograniczone poprawki",
          "Priorytetowe wsparcie",
          "Realizacja w 5-6 tygodni"
        ]
      }
    },
    customServices: {
      title: "Usługi niestandardowe",
      webDevelopment: {
        title: "Tworzenie stron internetowych",
        services: [
          { name: "Rozwój niestandardowych funkcji", price: "130 zł/godz." },
          { name: "Naprawy błędów", price: "100 zł/godz." },
          { name: "Optymalizacja wydajności", price: "150 zł/godz." },
          { name: "Integracja API", price: "180 zł/godz." }
        ]
      },
      uiUxDesign: {
        title: "Usługi projektowania UI/UX",
        services: [
          { name: "Projektowanie UI/UX stron internetowych", price: "90 zł/godz." },
          { name: "Projektowanie UI/UX aplikacji mobilnych", price: "130 zł/godz." },
          { name: "Responsywne systemy projektowania", price: "150 zł/godz." },
          { name: "Biblioteka komponentów UI", price: "130 zł/godz.", originalPrice: "180 zł/godz." }
        ]
      },
      portfolioWebsites: {
        title: "Strony portfolio",
        services: [
          { name: "Portfolio One-Page (hero + 5-7 sekcji, lekka animacja)", price: "1999-2999 zł" },
          { name: "Multi-Page (3-5 prostych stron)", price: "1499-2299 zł" },
          { name: "Premium (5+ stron, CMS/blog, tech SEO)", price: "od 3899 zł" },
          { name: "Utrzymanie", price: "90-180 zł/miesiąc" }
        ]
      }
    },
    faq: {
      title: "Często zadawane pytania",
      items: [
        {
          question: "Jak długo trwa wykonanie strony internetowej?",
          answer: "Zazwyczaj podstawowa strona zajmuje 2-3 tygodnie, profesjonalna strona 4-6 tygodni, a rozwiązania enterprise 8-12 tygodni. Harmonogram zależy od złożoności projektu i cykli informacji zwrotnej."
        },
        {
          question: "Czy oferujesz plany utrzymania?",
          answer: "Tak, oferuję miesięczne plany utrzymania zaczynające się od 449 zł/miesiąc, które obejmują aktualizacje, poprawki bezpieczeństwa i drobne zmiany treści."
        },
        {
          question: "Jakie metody płatności akceptujesz?",
          answer: "Akceptuję karty kredytowe, PayPal i przelewy bankowe. Projekty zazwyczaj wymagają 50% zaliczki z góry, a pozostała część jest płatna po zakończeniu."
        },
        {
          question: "Czy mogę samodzielnie aktualizować stronę?",
          answer: "Oczywiście! Tworzę strony z przyjaznymi dla użytkownika systemami zarządzania treścią i zapewniam szkolenie, abyś mógł dokonywać aktualizacji samodzielnie."
        }
      ]
    },
    termsOfService: {
      title: "Warunki świadczenia usług",
      sections: {
        paymentTerms: {
          title: "Warunki płatności",
          items: [
            "Projekty zazwyczaj wymagają 50% zaliczki, aby rozpocząć. Pozostała kwota jest należna po zakończeniu i przed uruchomieniem lub przekazaniem zasobów.",
            "Faktury są płatne w ciągu 7 dni, chyba że uzgodniono inaczej. Opóźnione płatności mogą wstrzymać pracę i mogą wiązać się z opłatą za opóźnienie.",
            "Prace pilne (przyspieszone terminy) mogą podlegać dodatkowej opłacie."
          ]
        },
        scope: {
          title: "Zakres, poprawki i zmiany",
          items: [
            "Każdy pakiet zawiera określoną liczbę rund poprawek; dodatkowe poprawki lub zmiany zakresu są rozliczane według stawki godzinowej.",
            "Znaczące zmiany, które odbiegają od uzgodnionego zakresu, mogą wymagać zrewidowanej wyceny i harmonogramu.",
            "Wprowadzanie treści obejmuje rozsądne ilości tekstu i obrazów. Masowe wprowadzanie danych lub migracje mogą być wyceniane oddzielnie."
          ]
        },
        timeline: {
          title: "Harmonogram projektu i obowiązki klienta",
          items: [
            "Szacowane czasy dostawy zakładają terminowe informacje zwrotne od klienta i dostarczenie zasobów. Opóźnienia w zatwierdzeniach lub treści wydłużą harmonogramy.",
            "Projekty nieaktywne przez ponad 30 dni mogą zostać zarchiwizowane i podlegać opłacie za ponowne uruchomienie.",
            "Ostateczna akceptacja następuje po przeglądzie i zatwierdzeniu uzgodnionych rezultatów."
          ]
        },
        ownership: {
          title: "Własność, portfolio i atrybucja",
          items: [
            "Po pełnej płatności posiadasz końcowe rezultaty (kod, projekty i zasoby, które stworzyłem dla projektu).",
            "Mogę prezentować pracę w moim portfolio i materiałach marketingowych, chyba że uzgodniono inaczej na piśmie.",
            "Klienci muszą upewnić się, że posiadają ważne licencje na wszelkie treści lub zasoby stron trzecich, które dostarczają."
          ]
        },
        technical: {
          title: "Standardy techniczne i usługi stron trzecich",
          items: [
            "Strony internetowe są budowane zgodnie z nowoczesnymi najlepszymi praktykami i testowane na aktualnych wersjach głównych przeglądarek. Wsparcie dla starszych przeglądarek może być określone oddzielnie.",
            "Wydajność, SEO i dostępność są implementowane według rozsądnych standardów, ale nie mogą gwarantować konkretnych rankingów, wyników lub rezultatów.",
            "Hosting, domeny, analityka, dostawcy płatności i inne usługi stron trzecich pozostają Twoją odpowiedzialnością, w tym opłaty i warunki."
          ]
        },
        warranty: {
          title: "Gwarancja, utrzymanie i wsparcie",
          items: [
            "Naprawy błędów dla dostarczonej pracy są objęte krótkim okresem gwarancyjnym po uruchomieniu (rozsądne wady przypisywane mojej pracy).",
            "Bieżące utrzymanie i prośby o funkcje są dostępne w ramach oddzielnych umów lub rozliczenia godzinowego.",
            "Wsparcie jest zapewniane w standardowych godzinach pracy, chyba że uzgodniono inaczej."
          ]
        },
        cancellation: {
          title: "Anulowanie i zakończenie",
          items: [
            "Jeśli projekt zostanie anulowany po rozpoczęciu pracy, płatność jest należna za pracę wykonaną do tego momentu. Początkowa zaliczka jest bezzwrotna.",
            "Każda ze stron może zakończyć projekt z powodu istotnego naruszenia za pisemnym powiadomieniem."
          ]
        },
        liability: {
          title: "Odpowiedzialność i siła wyższa",
          items: [
            "W najszerszym zakresie dozwolonym przez prawo, odpowiedzialność jest ograniczona do kwoty zapłaconej za konkretne świadczone usługi.",
            "Żadna ze stron nie ponosi odpowiedzialności za opóźnienia lub niepowodzenia spowodowane zdarzeniami poza rozsądną kontrolą (siła wyższa)."
          ]
        },
        unlimitedPages: {
          title: "Wyjaśnienie dotyczące \"Nieograniczonej liczby stron\"",
          description: "\"Nieograniczona liczba stron\" oznacza, że nie ma z góry określonego limitu w ramach normalnych potrzeb biznesowych dla szablonowych stron i tras. Nie oznacza to nieskończonej liczby stron lub nieograniczonego wprowadzania treści. Katalogi o dużej objętości, masywne blogi, masowe importy lub programowe generowanie stron mogą wymagać oddzielnego określenia zakresu, automatyzacji lub dodatkowych opłat. Wprowadzanie treści jest objęte w rozsądnym zakresie; bardzo duże ilości treści mogą być wyceniane oddzielnie."
        }
      }
    },
    cta: {
      title: "Gotowy, aby zacząć?",
      description: "Skontaktuj się z nami już dziś, aby uzyskać bezpłatną konsultację i omówić, jak mogę ożywić Twoją wizję.",
      buttonText: "Skontaktuj się ze mną"
    }
  },
  about: {
    title: "O mnie",
    name: "Kris German",
    role: "Projektant i Programista",
    bio: {
      intro: "Cześć! Jestem Kris German, {age}-letni projektant i programista z Polski. Rozpocząłem swoją przygodę z projektowaniem w 2016 roku i od tego czasu pasjonuję się tworzeniem pięknych, funkcjonalnych doświadczeń cyfrowych.",
      projects: "Na przestrzeni lat pracowałem nad różnymi projektami, od gier po aplikacje webowe. Uwielbiam odkrywać nowe technologie i przesuwać granice możliwości."
    },
    experience: {
      label: "Doświadczenie",
      years: "Lat",
      since: "Od"
    },
    skills: {
      title: "Umiejętności",
      design: {
        title: "Projektowanie",
        items: ["Projektowanie UI/UX", "Identyfikacja wizualna", "Projektowanie gier", "Projektowanie wizualne"]
      },
      development: {
        title: "Programowanie",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
      },
      tools: {
        title: "Narzędzia",
        items: ["Figma", "VS Code", "Git"]
      }
    }
  },
  projects: {
    title: "Projekty",
    noProjectsFound: "Nie znaleziono projektów dla wybranego filtra.",
    filters: {
      all: "Wszystkie",
      games: "Gry",
      webApps: "Aplikacje Web",
      desktop: "Aplikacje na Komputery",
      mobile: "Aplikacje na Telefony",
      websites: "Strony WWW",
      mods: "Mody"
    },
    categories: {
      webApps: "Aplikacje web",
      mobile: "Aplikacje na Telefony",
      games: "Gry",
      desktop: "Aplikacje na Komputery",
      websites: "Strony WWW",
      mods: "Mody"
    },
    status: {
      inDevelopment: "W trakcie rozwoju",
      completed: "Ukończony",
      archived: "Zarchiwizowany",
      concept: "Koncept",
      onHold: "Wstrzymany"
    },
    sections: {
      about: "O projekcie",
      features: "Funkcje",
      development: "Rozwój",
      details: "Szczegóły",
      category: "Kategoria",
      statusLabel: "Status",
      role: "Rola",
      timeline: "Czas trwania",
      platform: "Platforma",
      technologies: "Technologie",
      relatedLinks: "Powiązane linki"
    },
    cta: {
      title: "Wesprzyj naszą pracę",
      description: "Wesprzyj nas, aby otrzymać ekskluzywne aktualizacje i nagrody",
      patreon: "Patreon",
      githubSponsors: "Github Sponsors"
    },
    data: [
      {
        slug: "familiar-art",
        title: "Familiar - Targowisko sztuki",
        description: "Nowoczesne i łatowe narzędzie dla artystów wszelkiego rodzaju.",
        category: ["webApps", "mobile"],
        status: ["inDevelopment", "concept"],
        technologies: [
          "TanStack",
          "React",
          "Tailwindcss",
          "E-commerce",
        ],
        links: [
          {
            name: "Wkrótce",
            url: "#",
            description: "wkrótce",
          },
        ],
        thumbnail: {
          square: {
            src: zaczkie_large.src,
            alt: "Podgląd portfolio Zaczkie Art",
            blur: zaczkie_large.src
          },
          large: {
            src: zaczkie_large.src,
            alt: "Podgląd portfolio Zaczkie Art",
            blur: zaczkie_large.src
          }
        },
        content: {
          about: [
            "Nowoczesne targowisko dla artystów wszelkiego rodzaju.",
          ],
          features: [
            "Wkrótce",
          ]
        },
        details: {
          role: "Projektant UI/UX",
          timeline: "01.01.2026",
          platform: "Web"
        }
      },
      {
        slug: "zaczkie-art",
        title: "Zaczkie Art",
        description: "Portfolio dla artysty cyfrowego i ilustratora",
        category: ["websites"],
        status: ["completed"],
        technologies: ["Next.js", "React", "CSS", "Responsive Design", "Gallery System"],
        links: [{name: "Strona", url: "https://zaczkie.art", description: "Portfolio online"}],
        thumbnail: {
          square: {
            src: zaczkie_large.src,
            alt: "Podgląd portfolio Zaczkie Art",
            blur: zaczkie_large.src
          },
          large: {
            src: zaczkie_large.src,
            alt: "Podgląd portfolio Zaczkie Art",
            blur: zaczkie_large.src
          }
        },
        content: {
          about: ["Niestandardowa strona portfolio dla Zaczkie, prezentująca sztukę cyfrową i ilustracje."],
          features: ["Galeria sztuki z kategoriami", "Informacje o zleceniach", "Bio artysty i kontakt"]
        },
        details: {role: "Web Developer", timeline: "23.07.2025", platform: "Web"}
      },
      {
        slug: "jarvvitch-art",
        title: "Jarvvitch Art",
        description: "Portfolio dla artysty cyfrowego",
        category: ["websites"],
        status: ["completed"],
        technologies: ["Next.js", "React", "Tailwind CSS", "Responsive Design", "Image Optimization"],
        links: [{name: "Strona", url: "https://www.jarvvitch.art/", description: "Portfolio online"}],
        thumbnail: {
          square: {
            src: jarvvitch_large.src,
            alt: "Podgląd portfolio Jarvvitch",
            blur: jarvvitch_large.src
          },
          large: {
            src: jarvvitch_large.src,
            alt: "Podgląd portfolio Jarvvitch",
            blur: jarvvitch_large.src
          }
        },
        content: {
          about: ["Strona portfolio zaprojektowana dla artysty cyfrowego do prezentacji swoich prac i ilustracji."],
          features: ["Responsywna galeria obrazów", "Zoptymalizowane ładowanie obrazów", "Przejrzysta nawigacja"]
        },
        details: {role: "Web Developer", timeline: "11.09.2025", platform: "Web"}
      },
      {
        slug: "rabbit-hole-social",
        title: "Rabbit Hole",
        description: "Portal społecznościowy dla artystów i klientów",
        category: ["webApps"],
        status: ["inDevelopment"],
        technologies: ["Next.js (App Router)", "Tailwind CSS v4", "shadcn/ui", "Zod v4", "Supabase Auth"],
        links: [{name: "Dokumentacja Next.js", url: "https://nextjs.org/docs", description: "Framework napędzający Rabbit Hole"}],
        // thumbnail: {
        //   square: {
        //     src: portfolio_small.src,
        //     alt: "Podgląd strony Rabbit Hole",
        //     blur: portfolio_small.src
        //   },
        //   large: {
        //     src: portfolio_large.src,
        //     alt: "Podgląd strony Rabbit Hole",
        //     blur: portfolio_large.src
        //   }
        // },
        content: {
          about: ["RabbitHole to ekskluzywna platforma społecznościowa, gdzie artyści udostępniają treści w tematycznych społecznościach."],
          features: ["Feed postów w układzie masonry/grid", "System podwójnych kont", "System kluczy zaproszeń"]
        },
        details: {role: "Full-Stack Developer", timeline: `${new Date().getFullYear()} - Obecnie`, platform: "Aplikacja Web"}
      },
      {
        slug: "soundless",
        title: "SoundLess",
        description: "Innowacyjna gra horror, w której gracze poruszają się w ciemności, korzystając z mechaniki echolokacji.",
        category: ["games", "desktop"],
        status: ["inDevelopment", "concept"],
        technologies: ["Godot", "GDScript", "Projektowanie dźwięku", "Programowanie shaderów"],
        links: [{name: "Dodaj do listy życzeń na Steam", url: "https://store.steampowered.com", description: "Dodaj naszą grę do listy życzeń już teraz!"}],
        thumbnail: {
          square: {
            src: soundless_small.src,
            alt: "Podgląd aplikacji SoundLess",
            blur: soundless_small.src
          },
          large: {
            src: soundless_large.src,
            alt: "Podgląd aplikacji SoundLess",
            blur: soundless_large.src
          }
        },
        content: {
          about: ["SoundLess to unikalne doświadczenie horroru, które wyzwala graczy do poruszania się w całkowitej ciemności, używając tylko dźwięku."],
          features: ["Innowacyjna mechanika rozgrywki oparta na echolokacji", "Niestandardowy system propagacji i odbicia dźwięku"]
        },
        details: {role: "Dyrektor Gry", timeline: "20.08.2024 - Obecnie", platform: "PC"}
      },
      {
        slug: "tinybuddies",
        title: "TinyBuddies",
        description: "Urocza gra mobilna inspirowana Tamagotchi, w której gracze opiekują się wirtualnymi zwierzakami.",
        category: ["games", "mobile"],
        status: ["inDevelopment", "archived"],
        technologies: ["Godot", "GDScript", "Projektowanie gier"],
        // thumbnail: {
        //   square: {
        //     src: tinybuddies_small.src,
        //     alt: "Podgląd gry TinyBuddies",
        //     blur: tinybuddies_small.src
        //   },
        //   large: {
        //     src: tinybuddies_large.src,
        //     alt: "Podgląd gry TinyBuddies",
        //     blur: tinybuddies_large.src
        //   }
        // },
        content: {
          about: ["TinyBuddies przywraca nostalgiczną radość opieki nad wirtualnymi zwierzakami z nowoczesnym twistem."],
          features: ["Opieka nad zwierzakiem w czasie rzeczywistym", "Powiadomienia push", "Mini-gry i aktywności"]
        },
        details: {role: "Dyrektor Projektu", timeline: "12.03.2024 - Obecnie", platform: "iOS i Android"}
      }
    ]
  },
  experience: {
    title: "Doświadczenie",
    subtitle: "Chronologiczna podróż przez moje doświadczenie zawodowe i edukację.",
    dateFormats: {
      short: "DD.MM.YYYY",
      medium: "MMM YYYY",
      long: "MMMM YYYY"
    },
    data: [
      {
        company: "Gecko Creative",
        position: "Freelancer, Główny koordynator",
        type: "Pełny etat",
        startDate: "2023",
        endDate: "present",
        description: "Współzałożyłem i prowadzę studio tworzenia gier z zespołem ponad 10+ artystów i programistów",
        achievements: [
          "Założyłem i rozwinąłem studio z 10+ członkami zespołu",
          "Kieruję rozwojem wielu projektów gier",
          "Tworzę grę mobilną TinyBuddies i horror SoundLess",
          "Zarządzam współpracą zespołu i koordynacją projektów",
          "Tworzę infrastrukturę techniczną i przepływy pracy studia"
        ],
        tags: [
          "Tworzenie Gier",
          "Godot",
          "GDScript",
          "Przywództwo Zespołu",
          "Zarządzanie Projektami",
          "Projektowanie Gier",
          "Projektowanie UI/UX"
        ],
        projects: [
          {
            name: "TinyBuddies",
            description: "Urocza gra mobilna, w której gracze opiekują się i wychowują unikalne wirtualne zwierzaki w przytulnym świecie pixel art. Posiada dynamiczne osobowości zwierząt, mini-gry i interakcje społeczne.",
            link: ""
          },
          {
            name: "SoundLess",
            description: "Innowacyjna gra horrorowa, w której gracze poruszają się w ciemności za pomocą mechaniki echolokacji. Zbudowana z niestandardowym systemem propagacji dźwięku i dynamicznymi interakcjami ze środowiskiem.",
            link: ""
          }
        ]
      },
      {
        company: "DIGITAL-SERVICE",
        position: "Frontend Developer",
        type: "Niepełny etat",
        startDate: "24.04.2018",
        endDate: "26/06/2023",
        description: "Tworzenie i utrzymywanie stron internetowych klientów przy użyciu WordPressa i nowoczesnych technologii webowych",
        achievements: [
          "Zbudowałem i utrzymywałem wiele stron internetowych dla klientów",
          "Wdrożyłem niestandardowe motywy i wtyczki WordPress",
          "Zoptymalizowałem wydajność stron i SEO",
          "Współpracowałem z klientami, aby spełnić ich specyficzne wymagania",
          "Zarządzałem hostingiem i utrzymaniem stron internetowych"
        ],
        tags: [
          "WordPress",
          "PHP",
          "JavaScript",
          "HTML",
          "CSS",
          "jQuery",
          "SEO",
          "Hosting Stron",
          "Komunikacja z Klientem"
        ]
      },
      // {
      //   company: "Gimnazjum",
      //   position: "Uczeń",
      //   type: "Edukacja",
      //   startDate: "2014",
      //   endDate: "2018",
      //   description: "Ukończyłem edukację gimnazjalną.",
      //   achievements: [],
      //   tags: []
      // }
    ],
  },
  home: {
    hero: {
      greeting: "Cześć, jestem Kris",
      roles: ["Projektant", "Programista", "Twórca Gier", "Kontrybutor Open Source"],
      description: "Pasjonuję się tworzeniem kreatywnych rzeczy. Specjalizuję się w projektowaniu i tworzeniu UI/UX, a ostatnio jestem również twórcą gier."
    },
    experience: {
      title: "Doświadczenie",
      subtitle: "Najważniejsze momenty z mojej zawodowej podróży.",
      projectsLabel: "Projekty",
      achievementsLabel: "Kluczowe Osiągnięcia",
      viewProject: "Zobacz Projekt",
      showDetails: "Pokaż Szczegóły",
      viewFullExperience: "Zobacz Pełne Doświadczenie"
    },
    featuredProjects: {
      title: "Wyróżnione Projekty",
      subtitle: "Wybór moich ostatnich prac."
    },
    honorsAwards: {
      title: "Wyróżnienia i Nagrody",
      subtitle: "Uznanie za moją pracę i wkład."
    },
    connect: {
      title: "Połączmy się",
      subtitle: "Znajdź mnie na tych platformach."
    },
    cta: {
      title: "Gotowy na rozpoczęcie projektu?",
      subtitle: "Pracujmy razem, aby ożywić Twoje pomysły.",
      button: "Skontaktuj się"
    }
  },
  contact: {
    title: "Kontakt",
    description: "Porozmawiajmy o Twoim projekcie lub po prostu przywitaj się",
    header: {
      title: "Skontaktuj się",
      description: "Porozmawiajmy o Twoim projekcie lub po prostu przywitaj się"
    },
    form: {
      title: "Wyślij wiadomość",
      sending: "Wysyłanie...",
      successMessage: "Wiadomość wysłana pomyślnie! Dziękuję {name}, wkrótce się odezwę.",
      errorMessage: "Nie udało się wysłać wiadomości. Spróbuj ponownie lub użyj innej metody kontaktu.",
      submit: "Wyślij wiadomość",
      recaptchaNotice: "Ta strona jest chroniona przez reCAPTCHA oraz Politykę prywatności i Warunki korzystania z usług Google.",
      privacyPolicy: "Polityka prywatności",
      termsOfService: "Warunki korzystania z usług",
      and: "i",
      apply: "mają zastosowanie",
      fields: {
        name: "Imię",
        namePlaceholder: "Twoje imię",
        email: "Email",
        emailPlaceholder: "twoj@email.com",
        message: "Wiadomość",
        messagePlaceholder: "Opowiedz mi o swoim projekcie..."
      }
    },
    otherWays: {
      title: "Inne sposoby kontaktu",
      email: {
        title: "Email",
        value: "kris@hasira.me",
        description: "Najlepszy dla zapytań biznesowych"
      },
      discord: {
        title: "Discord",
        value: "hasiradoo",
        description: "Szybkie rozmowy i pytania"
      },
      telegram: {
        title: "Telegram",
        value: "@hasiradooo",
        description: "Jestem tu 99% czasu"
      },
      twitter: {
        title: "Twitter",
        value: "@hasiradoo",
        description: "Śledź moją podróż"
      },
      bsky: {
        title: "Bsky",
        value: "@hasira.me",
        description: "Śledź moją podróż"
      }
    },
    availability: {
      title: "Dostępność",
      description: "Obecnie dostępny dla nowych projektów i współpracy. Zazwyczaj odpowiadam w ciągu 24 godzin."
    }
  },
  cv: {
    title: "Życiorys",
    tip: "Wskazówka: przełącz na jasny motyw, aby uzyskać najlepszy kontrast podczas eksportu.",
    downloadPng: "Pobierz jako PNG",
    downloadPdf: "Pobierz jako PDF",
    exporting: "Eksportowanie…",
    fileName: {
      png: "CV-Krystian-German-PL.png",
      pdf: "CV-Krystian-German-PL.pdf",
    },
    content: {
      name: "Krystian German",
      tagline: "Front-End Developer • Entuzjasta UI/UX",
      contact: {
        email: "kris@hasira.me",
        phone: "+48 123 456 789",
        location: "Gdańsk, Polska",
        website: "hasira.me",
        labels: {
          email: "Email:",
          phone: "Telefon:",
          location: "Lokalizacja:",
          website: "Strona:",
        }
      },
      headings: {
        skills: "Umiejętności",
        tools: "Narzędzia",
        education: "Edukacja",
        languages: "Języki",
        summary: "Podsumowanie",
        experience: "Doświadczenie",
        projects: "Projekty",
      },
      skills: [
        "Języki programowania stron internetowych (JavaScript/TypeScript, React, CSS)",
        "Podstawowa obsługa serwerów Linux",
        "Projektowanie interfejsów użytkownika (UI)",
        "Poprawianie jakości doświadczenia użytkownika (UX)",
      ],
      tools: [
        "Git i GitHub",
        "Figma",
        "Visual Studio Code",
      ],
      languages: [
        { language: "Polski", level: "Ojczysty" },
        { language: "Angielski", level: "Komunikatywny" },
      ],
      education: [
        { degree: "Uczeń", school: "Gimnazjum w Cedrach Wielkich", period: "2014–2018" },
      ],
      summary:
        "Front-end developer z pasją do tworzenia dostępnych, wydajnych i atrakcyjnych wizualnie aplikacji webowych. Doświadczony w React i nowoczesnych narzędziach, skupiony na czystym UI i przemyślanym UX.",
      experience: [
        {
          roleCompany: "Freelancer gier indie • Gecko Creative",
          period: "2023 — obecnie",
          location: "Gdańsk",
          bullets: [
            "Uczę się i tworzę gry w Godot (GDScript)",
            "Prowadzę wczesne projekty indie gier (TinyBuddies, prototyp SoundLess)",
            "Organizuję zespół i przygotowuję rejestrację działalności",
          ],
        },
        {
          roleCompany: "Frontend Developer • DIGITAL-SERVICE",
          period: "2018 — 2023",
          location: "Kiezmark",
          bullets: [
            "Tworzyłem i utrzymywałem liczne strony internetowe dla klientów",
            "Implementowałem niestandardowe motywy i wtyczki WordPress",
            "Optymalizowałem wydajność stron oraz SEO",
            "Współpracowałem z klientami, aby sprostać ich specyficznym wymaganiom",
            "Zarządzałem hostingiem i bieżącym utrzymaniem stron",
          ],
        },
      ],
      gdprConsent: "Wyrażam zgodę na przetwarzanie moich danych osobowych w celach rekrutacyjnych zgodnie z ustawą o ochronie danych osobowych."
    }
  },
  patrons: {
    title: "Patroni",
    description: "Dziękuję wszystkim, którzy wspierają moją pracę i pomagają mi tworzyć niesamowite projekty.",
    githubSponsors: {
      title: "Sponsorzy GitHub",
      description: "Wspaniałe osoby wspierające mnie na GitHub Sponsors",
      noSponsors: "Jeszcze nie ma sponsorów. Zostań pierwszym!",
      becomeASponsor: "Zostań sponsorem",
      loading: "Ładowanie sponsorów GitHub...",
      emptyTitle: "Jeszcze Brak Sponsorów GitHub",
      emptyDescription: "Zostań pierwszym, który wesprze moją pracę open-source! Twoje sponsorowanie pomaga mi kontynuować tworzenie i utrzymywanie projektów."
    },
    patreonSupporters: {
      title: "Wspierający Patreon",
      description: "Niesamowici patroni wspierający mnie na Patreon",
      noPatrons: "Jeszcze nie ma patronów. Dołącz do nas!",
      noSupporters: "Jeszcze nie ma wspierających Patreon. Dołącz do społeczności i wesprzyj moją pracę!",
      becomeAPatron: "Zostań Patronem",
      becomeASupporter: "Zostań Wspierającym Patreon",
      loading: "Ładowanie wspierających Patreon...",
      emptyTitle: "Jeszcze nie ma wspierających Patreon",
      emptyDescription: "Zostań pierwszym, który wesprze moją pracę open-source! Twoje sponsorowanie pomaga mi kontynuować tworzenie i utrzymywanie projektów."
    },
    common: {
      perMonth: "/miesiąc",
      supportingSince: "Wspiera od",
      oneTime: "jednorazowo",
      custom: "Niestandardowy",
      showMore: "Pokaż więcej",
      showLess: "Pokaż mniej",
      itemsPerPage: "elementów na stronę",
      filterBy: "Filtruj według",
      sortBy: "Sortuj według",
      allTiers: "Wszystkie poziomy",
      amount: "Kwota",
      date: "Data",
      name: "Nazwa",
      highToLow: "Od najwyższej do najniższej",
      lowToHigh: "Od najniższej do najwyższej",
      newest: "Najnowsze",
      oldest: "Najstarsze"
    },
    cta: {
      title: "Wesprzyj Moją Pracę",
      description: "Twoje wsparcie pomaga mi poświęcić więcej czasu na projekty open-source, tworzenie treści edukacyjnych i budowanie niesamowitych narzędzi dla społeczności.",
      githubSponsors: "GitHub Sponsors",
      patreon: "Patreon"
    }
  },
  footer: {
    personalInfo: {
      name: "Krystian German",
      role: "Projektant i Programista",
      since: "Od 2016"
    },
    sections: {
      socials: "Media społecznościowe",
      navigation: "Nawigacja",
      resources: "Zasoby"
    },
    socialLinks: {
      github: "GitHub",
      twitter: "Twitter",
      bsky: "Bsky",
      patreon: "Patreon",
      discord: "Discord",
      telegram: "Telegram"
    },
    navigationLinks: {
      home: "Strona główna",
      about: "O mnie",
      projects: "Projekty",
      experience: "Doświadczenie",
      patrons: "Patroni",
      contact: "Kontakt"
    },
    resourceLinks: {
      gameStudio: "Gecko Creative",
      blog: "Blog",
      sourceCode: "Kod źródłowy"
    },
    copyright: {
      allRightsReserved: "Wszelkie prawa zastrzeżone",
      madeBy: "Stworzone przez Kris German"
    }
  }
};

export default dict;
