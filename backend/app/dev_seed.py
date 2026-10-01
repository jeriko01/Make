"""Development seed data for MemoryStore.

Populates all portfolio tables with rich, high-quality sample data
including avatar, project mockups, client testimonial photos, and icons.
"""
from __future__ import annotations


def populate_dev_store(store) -> None:
    # 1. Profile singleton
    store.update_singleton("profile", {
        "full_name": "Make",
        "title": "Senior Web & Mobile Engineering Studio",
        "tagline": "High-performance web and mobile products, built to work.",
        "short_bio": "Senior engineering studio building dependable web and mobile products from frontend to API and scalable data layer.",
        "long_bio": (
            "I turn product ideas into clear, dependable applications—from the first screen to the API "
            "and data behind it. I work across the full stack: React on the frontend, Python/FastAPI "
            "on the backend, and React Native or Flutter for mobile. I care about readable code, "
            "maintainable architecture, and digital products that feel right to the people who use them."
        ),
        "avatar_url": "/images/avatar.jpg",
        "location": "Available Worldwide (Remote)",
        "email": "hello@make.dev",
        "years_experience_label": "Senior",
    })

    # 2. Hero singleton
    store.update_singleton("hero", {
        "headline": "Web and mobile products, built to work.",
        "subtitle": "Make — Senior Web & Mobile Engineering Studio",
        "description": "I turn product ideas into clear, dependable applications—from the first screen to the API and data behind it.",
        "primary_cta_label": "Explore my work",
        "primary_cta_href": "/projects",
        "secondary_cta_label": "Let's collaborate",
        "secondary_cta_href": "/support",
    })

    # 3. Hero stats
    for stat in [
        {"label": "Years of experience", "value": "3+", "display_order": 1, "is_published": True},
        {"label": "Projects built", "value": "20+", "display_order": 2, "is_published": True},
        {"label": "Platforms", "value": "Web · Android · iOS", "display_order": 3, "is_published": True},
    ]:
        store.insert("hero_stats", stat)

    # 4. About cards
    for card in [
        {"icon": "Globe", "title": "Web Development", "description": "Marketing sites and full web applications with React, modern tooling, and responsive Tailwind layouts.", "display_order": 1, "is_published": True},
        {"icon": "Smartphone", "title": "Mobile Development", "description": "Native (Swift/Kotlin) and cross-platform (Flutter, React Native) applications with fluid interaction.", "display_order": 2, "is_published": True},
        {"icon": "Server", "title": "Backend & APIs", "description": "Python/FastAPI services, asynchronous RESTful APIs, and relational data modeling with PostgreSQL and Supabase.", "display_order": 3, "is_published": True},
        {"icon": "Shield", "title": "Accessible by Default", "description": "Semantic HTML, complete keyboard navigation, visible focus rings, and reduced-motion friendly design.", "display_order": 4, "is_published": True},
    ]:
        store.insert("about_cards", card)

    # 5. About stats
    for stat in [
        {"label": "Experience", "value": "3+ years", "display_order": 1, "is_published": True},
        {"label": "Focus areas", "value": "Web · Mobile", "display_order": 2, "is_published": True},
        {"label": "Core stack", "value": "React · FastAPI", "display_order": 3, "is_published": True},
    ]:
        store.insert("about_stats", stat)

    # 6. Experience timeline (SAMPLE development phases)
    for exp in [
        {
            "title": "Foundations — Web fundamentals",
            "organization": "Self-directed (SAMPLE)",
            "start_date": "2022-01-01",
            "end_date": "2022-08-31",
            "is_current": False,
            "description": "Built a strong foundation in HTML, CSS, and modern JavaScript; shipped first responsive projects.",
            "tech_tags": ["HTML5", "CSS3", "JavaScript"],
            "display_order": 1,
            "is_published": True,
            "is_sample": True,
        },
        {
            "title": "React & modern frontend",
            "organization": "Freelance / personal (SAMPLE)",
            "start_date": "2022-09-01",
            "end_date": "2023-06-30",
            "is_current": False,
            "description": "Built component-driven UIs with React, Tailwind CSS, and Vite; focused on performance, accessibility, and user delight.",
            "tech_tags": ["React", "Tailwind CSS", "Vite"],
            "display_order": 2,
            "is_published": True,
            "is_sample": True,
        },
        {
            "title": "Backend & databases",
            "organization": "Freelance / personal (SAMPLE)",
            "start_date": "2023-07-01",
            "end_date": "2024-03-31",
            "is_current": False,
            "description": "Engineered REST APIs with Python/FastAPI, structured relational schemas in PostgreSQL, and configured Supabase auth.",
            "tech_tags": ["Python", "FastAPI", "PostgreSQL", "Supabase"],
            "display_order": 3,
            "is_published": True,
            "is_sample": True,
        },
        {
            "title": "Mobile development",
            "organization": "Freelance / personal (SAMPLE)",
            "start_date": "2024-04-01",
            "end_date": None,
            "is_current": True,
            "description": "Developing native (Swift, Kotlin) and cross-platform (Flutter, React Native) mobile applications.",
            "tech_tags": ["Swift", "Kotlin", "Flutter", "React Native"],
            "display_order": 4,
            "is_published": True,
            "is_sample": True,
        },
    ]:
        store.insert("experience", exp)

    # 7. Skill categories & skills
    cats = [
        {"id": "cat-frontend", "name": "Frontend Web", "display_order": 1, "is_published": True},
        {"id": "cat-backend", "name": "Backend", "display_order": 2, "is_published": True},
        {"id": "cat-database", "name": "Databases & Services", "display_order": 3, "is_published": True},
        {"id": "cat-mobile", "name": "Mobile", "display_order": 4, "is_published": True},
        {"id": "cat-tools", "name": "Developer Tools", "display_order": 5, "is_published": True},
    ]
    for c in cats:
        store.insert("skill_categories", c)

    skills_data = [
        # Frontend Web
        ("cat-frontend", "HTML5", "language", "Code", 90, "Comfortable", 1),
        ("cat-frontend", "CSS3", "language", "Palette", 88, "Comfortable", 2),
        ("cat-frontend", "JavaScript", "language", "Code", 90, "Comfortable", 3),
        ("cat-frontend", "React", "library", "Atom", 92, "Comfortable", 4),
        ("cat-frontend", "Tailwind CSS", "framework", "Wind", 92, "Comfortable", 5),
        # Backend
        ("cat-backend", "Python", "language", "Terminal", 90, "Comfortable", 1),
        ("cat-backend", "FastAPI", "framework", "Zap", 88, "Comfortable", 2),
        ("cat-backend", "Node.js", "platform", "Hexagon", 78, "Familiar", 3),
        ("cat-backend", "Express", "framework", "Route", 78, "Familiar", 4),
        # Databases & Services
        ("cat-database", "PostgreSQL", "database", "Database", 86, "Comfortable", 1),
        ("cat-database", "Supabase", "platform", "Cloud", 88, "Comfortable", 2),
        ("cat-database", "MySQL", "database", "Database", 80, "Familiar", 3),
        ("cat-database", "MongoDB", "database", "Leaf", 75, "Familiar", 4),
        ("cat-database", "SQLite", "database", "HardDrive", 82, "Familiar", 5),
        # Mobile
        ("cat-mobile", "Swift", "language", "Apple", 72, "Learning", 1),
        ("cat-mobile", "Kotlin", "language", "Smartphone", 72, "Learning", 2),
        ("cat-mobile", "Flutter", "framework", "Feather", 75, "Learning", 3),
        ("cat-mobile", "Dart", "language", "Target", 75, "Learning", 4),
        ("cat-mobile", "React Native", "framework", "Atom", 74, "Learning", 5),
        # Developer Tools
        ("cat-tools", "Git", "tool", "GitBranch", 88, "Comfortable", 1),
        ("cat-tools", "GitHub", "platform", "Github", 88, "Comfortable", 2),
    ]
    for cat_id, name, stype, icon, prof, exp_lbl, ord_num in skills_data:
        store.insert("skills", {
            "category_id": cat_id,
            "name": name,
            "type": stype,
            "icon": icon,
            "proficiency": prof,
            "experience_label": exp_lbl,
            "display_order": ord_num,
            "is_published": True,
        })

    # 8. Project categories & projects
    proj_cats = [
        {"id": "pcat-all", "name": "All", "slug": "all", "display_order": 0, "is_published": True},
        {"id": "pcat-web", "name": "Web", "slug": "web", "display_order": 1, "is_published": True},
        {"id": "pcat-mobile", "name": "Mobile", "slug": "mobile", "display_order": 2, "is_published": True},
        {"id": "pcat-cross", "name": "Cross-Platform", "slug": "cross-platform", "display_order": 3, "is_published": True},
    ]
    for pc in proj_cats:
        store.insert("project_categories", pc)

    projects_data = [
        {
            "title": "Cloud-Native Web Analytics Platform",
            "slug": "cloud-native-web-platform",
            "platform": "web",
            "category_id": "pcat-web",
            "summary": "Full-stack web application featuring real-time analytical charts, responsive dark mode UI, and Python FastAPI backend.",
            "description": "High-performance production web application built with React, Vite, and Tailwind CSS on the frontend, powered by an asynchronous FastAPI backend and PostgreSQL data layer.",
            "cover_image_url": "/images/project-web.jpg",
            "tech_tags": ["React", "FastAPI", "PostgreSQL", "Tailwind CSS"],
            "is_featured": True,
            "is_published": True,
            "display_order": 1,
            "metrics": [{"label": "Architecture", "value": "Full-Stack"}, {"label": "Uptime", "value": "99.9%"}],
        },
        {
            "title": "Cross-Platform Mobile Task Suite",
            "slug": "cross-platform-task-suite",
            "platform": "cross_platform",
            "category_id": "pcat-cross",
            "summary": "Fluid cross-platform task manager and productivity suite for iOS and Android with offline-first synchronization.",
            "description": "Cross-platform mobile application engineering built using Flutter and Dart, supporting seamless offline caching, background notifications, and real-time cloud data sync.",
            "cover_image_url": "/images/project-mobile.jpg",
            "tech_tags": ["Flutter", "Dart", "Supabase", "REST API"],
            "is_featured": True,
            "is_published": True,
            "display_order": 2,
            "metrics": [{"label": "Platforms", "value": "iOS & Android"}, {"label": "Sync Engine", "value": "Offline-First"}],
        },
        {
            "title": "Native Android Weather & Radar App",
            "slug": "native-android-weather-app",
            "platform": "android",
            "category_id": "pcat-mobile",
            "summary": "Native Android weather application built in Kotlin showcasing Material 3 design and dynamic weather radar.",
            "description": "Native Android mobile app built using Kotlin and modern Jetpack components, integrating open weather APIs, location services, and responsive animated widgets.",
            "cover_image_url": "/images/project-android.jpg",
            "tech_tags": ["Kotlin", "Android SDK", "Jetpack", "REST API"],
            "is_featured": False,
            "is_published": True,
            "display_order": 3,
            "metrics": [{"label": "Platform", "value": "Android"}, {"label": "Architecture", "value": "MVVM"}],
        },
        {
            "title": "Native iOS Habit & Routine Tracker",
            "slug": "native-ios-habit-tracker",
            "platform": "ios",
            "category_id": "pcat-mobile",
            "summary": "Native iOS habit tracker and streak analytics application built with Swift and SwiftUI.",
            "description": "Native iOS application crafted in Swift and SwiftUI following Apple Human Interface Guidelines, featuring interactive streak progress rings and local notifications.",
            "cover_image_url": "/images/project-ios.jpg",
            "tech_tags": ["Swift", "iOS SDK", "SwiftUI"],
            "is_featured": False,
            "is_published": True,
            "display_order": 4,
            "metrics": [{"label": "Platform", "value": "iOS"}, {"label": "UI Framework", "value": "SwiftUI"}],
        },
    ]
    for p in projects_data:
        store.insert("projects", p)

    # 9. Services (bento grid)
    services_data = [
        {
            "title": "Websites & Web Applications",
            "description": "End-to-end web engineering from high-impact marketing websites to dynamic, reactive web applications using React and Tailwind CSS.",
            "icon": "Globe",
            "size": "large",
            "accent": "violet",
            "display_order": 1,
            "is_published": True,
        },
        {
            "title": "Native iOS Applications",
            "description": "Designing and developing fluid native iOS apps using Swift and SwiftUI, adhering to Apple Human Interface Guidelines.",
            "icon": "Apple",
            "size": "medium",
            "accent": "sky",
            "display_order": 2,
            "is_published": True,
        },
        {
            "title": "Native Android Applications",
            "description": "Engineering robust native Android applications using Kotlin, Material 3 components, and background services.",
            "icon": "Smartphone",
            "size": "medium",
            "accent": "emerald",
            "display_order": 3,
            "is_published": True,
        },
        {
            "title": "Cross-Platform Mobile Apps",
            "description": "Unified codebases delivering native-grade user experiences across Android and iOS using Flutter and React Native.",
            "icon": "Layers",
            "size": "wide",
            "accent": "indigo",
            "display_order": 4,
            "is_published": True,
        },
        {
            "title": "Backend APIs & Databases",
            "description": "High-throughput asynchronous RESTful APIs with Python FastAPI, relational PostgreSQL data modeling, and Supabase integration.",
            "icon": "Server",
            "size": "medium",
            "accent": "fuchsia",
            "display_order": 5,
            "is_published": True,
        },
    ]
    for s in services_data:
        store.insert("services", s)

    # 10. Testimonials (SAMPLE)
    testimonials_data = [
        {
            "client_name": "Alex Johnson (SAMPLE)",
            "role_company": "CTO, Apex Digital",
            "quote": "Sharmaarke delivered our full-stack web platform ahead of schedule. The code quality, architectural decisions, and responsive design are top tier.",
            "photo_url": "/images/client-1.jpg",
            "rating": 5,
            "metrics": "Delivered in 3 weeks",
            "display_order": 1,
            "is_published": True,
            "is_sample": True,
        },
        {
            "client_name": "Sara Martinez (SAMPLE)",
            "role_company": "VP Engineering, Nova Cloud",
            "quote": "A versatile developer who excels across web interfaces, backend microservices, and mobile apps. Collaborating with him was smooth and productive.",
            "photo_url": "/images/client-2.jpg",
            "rating": 5,
            "metrics": "5.0 rating",
            "display_order": 2,
            "is_published": True,
            "is_sample": True,
        },
    ]
    for t in testimonials_data:
        store.insert("testimonials", t)

    # 11. Social links
    social_data = [
        {"label": "GitHub", "url": "https://github.com", "icon": "Github", "display_order": 1, "is_published": True},
        {"label": "LinkedIn", "url": "https://linkedin.com", "icon": "Linkedin", "display_order": 2, "is_published": True},
        {"label": "Twitter", "url": "https://twitter.com", "icon": "Twitter", "display_order": 3, "is_published": True},
    ]
    for sl in social_data:
        store.insert("social_links", sl)

    # 12. Contact info & SEO
    store.update_singleton("contact_info", {
        "email": "hello@example.com",
        "location": "Available Worldwide (Remote)",
        "availability": "Currently accepting new client projects and development roles.",
    })
    store.update_singleton("seo_metadata", {
        "title": "Sharmaarke — Web & Mobile App Developer",
        "description": "Portfolio of Sharmaarke, a Web & Mobile App Developer building fast, accessible websites and Android & iOS applications.",
    })
