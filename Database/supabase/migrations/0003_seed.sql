-- =====================================================================
-- Migration 0003: Seed data
-- =====================================================================
-- HONESTY NOTES:
--   * Experience entries are SAMPLE development phases (is_sample = true),
--     NOT real jobs. Replace with real history in the admin panel.
--   * Testimonials are SAMPLE (is_sample = true), NOT real clients.
--   * Skills are CANDIDATE technologies with honest, conservative labels.
--     None are marked "Expert" without confirmation.
--   * Projects are SAMPLE and carry no external links (buttons stay hidden).
--   * Social links are seeded UNPUBLISHED so no dead links render until you
--     add your real URLs in the admin panel.
--   * This seed is idempotent-ish: it clears the seeded content tables first.
-- =====================================================================

-- Clear content tables (safe: these hold only seed/demo content)
truncate hero_stats, about_cards, about_stats, experience,
         skills, skill_categories, projects, project_categories,
         services, testimonials, social_links restart identity cascade;

-- ---- profile (singleton) ----
update profile set
  full_name = 'Sharmaarke',
  title = 'Web & Mobile App Developer',
  tagline = 'I build fast, reliable websites and mobile apps.',
  short_bio = 'Web & mobile app developer focused on clean, performant products across web, Android, and iOS.',
  long_bio = 'I''m Sharmaarke, a Web & Mobile App Developer with 3+ years building for the web and mobile. '
           || 'I work across the stack — React on the front end, Python/FastAPI on the back end — and build '
           || 'native and cross-platform mobile apps. I care about accessible, maintainable code and interfaces that feel effortless.',
  location = 'Available worldwide (remote)',
  email = 'hello@example.com',
  years_experience_label = '3+ years'
where id = 1;

-- ---- hero (singleton) ----
update hero set
  headline = 'Building for web & mobile.',
  subtitle = 'Sharmaarke — Web & Mobile App Developer',
  description = 'I design and develop websites, web applications, and Android & iOS apps '
             || 'with a focus on speed, accessibility, and polish.',
  primary_cta_label = 'View Projects', primary_cta_href = '#projects',
  secondary_cta_label = 'Contact Me', secondary_cta_href = '#contact'
where id = 1;

-- ---- hero stats ----
insert into hero_stats (label, value, display_order) values
  ('Years of experience', '3+', 1),
  ('Projects built',      '20+', 2),
  ('Platforms',           'Web · Android · iOS', 3);

-- ---- about cards ----
insert into about_cards (icon, title, description, display_order) values
  ('Globe',       'Web Development',    'Marketing sites and full web applications with React and modern tooling.', 1),
  ('Smartphone',  'Mobile Development', 'Native (Swift/Kotlin) and cross-platform (Flutter, React Native) apps.', 2),
  ('Server',      'Backend & APIs',     'Python/FastAPI services, REST APIs, and PostgreSQL data modeling.', 3),
  ('Accessibility','Accessible by default','Semantic HTML, keyboard support, and reduced-motion friendly UIs.', 4);

-- ---- about stats (honest) ----
insert into about_stats (label, value, display_order) values
  ('Experience',       '3+ years', 1),
  ('Focus areas',      'Web · Mobile', 2),
  ('Core stack',       'React · FastAPI', 3);

-- ---- experience timeline (SAMPLE development phases) ----
insert into experience (title, organization, start_date, end_date, is_current, description, tech_tags, display_order, is_sample) values
  ('Foundations — Web fundamentals', 'Self-directed (SAMPLE)', '2022-01-01', '2022-08-31', false,
   'Built a strong base in HTML, CSS, and JavaScript; shipped first responsive sites.',
   array['HTML5','CSS3','JavaScript'], 1, true),
  ('React & modern frontend', 'Freelance / personal (SAMPLE)', '2022-09-01', '2023-06-30', false,
   'Moved to component-driven UIs with React, Tailwind CSS, and Vite; focus on performance and accessibility.',
   array['React','Tailwind CSS','Vite'], 2, true),
  ('Backend & databases', 'Freelance / personal (SAMPLE)', '2023-07-01', '2024-03-31', false,
   'Built REST APIs with Python/FastAPI and modeled data in PostgreSQL and Supabase.',
   array['Python','FastAPI','PostgreSQL','Supabase'], 3, true),
  ('Mobile development', 'Freelance / personal (SAMPLE)', '2024-04-01', null, true,
   'Building native (Swift, Kotlin) and cross-platform (Flutter, React Native) mobile apps.',
   array['Swift','Kotlin','Flutter','React Native'], 4, true);

-- ---- skill categories + skills (CANDIDATE technologies, honest labels) ----
with cats as (
  insert into skill_categories (name, display_order) values
    ('Frontend Web', 1),
    ('Backend', 2),
    ('Databases & Services', 3),
    ('Mobile', 4),
    ('Developer Tools', 5)
  returning id, name
)
insert into skills (category_id, name, type, icon, experience_label, display_order)
select c.id, s.name, s.stype::skill_type, s.icon, s.exp, s.ord
from cats c
join (values
  -- Frontend Web
  ('Frontend Web','HTML5','language','FileCode','Comfortable',1),
  ('Frontend Web','CSS3','language','Palette','Comfortable',2),
  ('Frontend Web','JavaScript','language','Braces','Comfortable',3),
  ('Frontend Web','React','library','Atom','Comfortable',4),
  ('Frontend Web','Tailwind CSS','framework','Wind','Comfortable',5),
  -- Backend
  ('Backend','Python','language','Terminal','Comfortable',1),
  ('Backend','FastAPI','framework','Zap','Comfortable',2),
  ('Backend','Node.js','platform','Hexagon','Familiar',3),
  ('Backend','Express','framework','Route','Familiar',4),
  -- Databases & Services
  ('Databases & Services','PostgreSQL','database','Database','Comfortable',1),
  ('Databases & Services','Supabase','platform','Cloud','Comfortable',2),
  ('Databases & Services','MySQL','database','Database','Familiar',3),
  ('Databases & Services','MongoDB','database','Leaf','Familiar',4),
  ('Databases & Services','SQLite','database','HardDrive','Familiar',5),
  -- Mobile
  ('Mobile','Swift','language','Apple','Learning',1),
  ('Mobile','Kotlin','language','Smartphone','Learning',2),
  ('Mobile','Flutter','framework','Feather','Learning',3),
  ('Mobile','Dart','language','Target','Learning',4),
  ('Mobile','React Native','framework','Atom','Learning',5),
  -- Developer Tools
  ('Developer Tools','Git','tool','GitBranch','Comfortable',1),
  ('Developer Tools','GitHub','platform','Github','Comfortable',2)
) as s(cat,name,stype,icon,exp,ord) on s.cat = c.name;

-- ---- project categories ----
insert into project_categories (name, slug, display_order) values
  ('All', 'all', 0),
  ('Web', 'web', 1),
  ('Mobile', 'mobile', 2),
  ('Full-Stack', 'full-stack', 3);

-- ---- projects (SAMPLE; no external links so buttons stay hidden) ----
insert into projects (title, slug, platform, summary, description, tech_tags, is_featured, display_order)
values
  ('Portfolio Platform (Sample)', 'portfolio-platform-sample', 'web',
   'A dynamic, database-driven portfolio with an admin dashboard.',
   'A full-stack portfolio (this project''s architecture): React + Vite frontend, FastAPI backend, Supabase Postgres, and a secure admin dashboard for editing every section.',
   array['React','FastAPI','Supabase','Tailwind CSS'], true, 1),
  ('Task Manager App (Sample)', 'task-manager-sample', 'cross_platform',
   'A cross-platform to-do and task manager.',
   'Cross-platform mobile app concept for managing tasks and reminders, built to explore Flutter and offline-first patterns.',
   array['Flutter','Dart'], true, 2),
  ('Weather Android App (Sample)', 'weather-android-sample', 'android',
   'A native Android weather app.',
   'Native Android app concept showing current conditions and forecasts with a clean Material UI.',
   array['Kotlin'], false, 3),
  ('Notes iOS App (Sample)', 'notes-ios-sample', 'ios',
   'A native iOS notes app.',
   'Native iOS notes app concept focused on fast capture and clean typography.',
   array['Swift'], false, 4),
  ('REST API Service (Sample)', 'rest-api-service-sample', 'web',
   'A documented FastAPI backend service.',
   'A FastAPI backend concept with Pydantic validation, PostgreSQL, and auto-generated OpenAPI docs.',
   array['Python','FastAPI','PostgreSQL'], false, 5);

-- ---- services (bento grid) ----
insert into services (title, description, icon, size, accent, display_order) values
  ('Website Development', 'Fast, responsive marketing sites and landing pages that convert.', 'Globe', 'large', 'violet', 1),
  ('Web Applications', 'Full web apps with auth, dashboards, and real-time data.', 'LayoutDashboard', 'wide', 'indigo', 2),
  ('Android Apps', 'Native Android apps built with Kotlin.', 'Smartphone', 'small', 'emerald', 3),
  ('iOS Apps', 'Native iOS apps built with Swift.', 'Apple', 'small', 'sky', 4),
  ('Cross-Platform Apps', 'One codebase for Android & iOS with Flutter or React Native.', 'Layers', 'medium', 'fuchsia', 5);

-- ---- testimonials (SAMPLE) ----
insert into testimonials (client_name, role_company, quote, rating, display_order, is_sample) values
  ('Sample Client', 'Product Owner (SAMPLE)', 'Delivered a polished web app on time and communicated clearly throughout. (Sample testimonial — replace with a real one.)', 5, 1, true),
  ('Sample Client', 'Startup Founder (SAMPLE)', 'Great attention to detail and accessibility. Our mobile app felt fast and looked clean. (Sample testimonial.)', 5, 2, true),
  ('Sample Client', 'Small Business Owner (SAMPLE)', 'Rebuilt our site and it loads instantly now. Easy to work with. (Sample testimonial.)', 4, 3, true);

-- ---- social links (UNPUBLISHED until you add real URLs) ----
insert into social_links (platform, label, url, display_order, is_published) values
  ('github',   'GitHub',   'https://github.com/your-username',      1, false),
  ('linkedin', 'LinkedIn', 'https://linkedin.com/in/your-username', 2, false),
  ('twitter',  'X',        'https://x.com/your-username',           3, false);

-- ---- contact info (singleton) ----
update contact_info set
  email = 'hello@example.com',
  location = 'Available worldwide (remote)',
  availability = 'Open to freelance and full-time opportunities.'
where id = 1;

-- ---- SEO (singleton) ----
update seo_metadata set
  title = 'Make — Sharmaarke · Web & Mobile App Developer',
  description = 'Portfolio of Sharmaarke, a Web & Mobile App Developer building websites, web apps, and Android & iOS apps.',
  keywords = array['Sharmaarke','web developer','mobile app developer','React','FastAPI','portfolio'],
  twitter_handle = null
where id = 1;
