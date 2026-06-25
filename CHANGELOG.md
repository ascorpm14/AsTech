# SteuerGPT — Changelog des améliorations

## Run #10 — 25/06/2026
- **Amélioration :** Interactive Cursor Spotlight sur la Hero Section — un dégradé radial subtil (700px, bleu→violet→transparent) suit le curseur de la souris avec un lissage Lerp fluide (0.08) optimisé `requestAnimationFrame`, créant une interaction premium "vivante" qui réagit au mouvement de l'utilisateur. Apparaît en fondu au premier mouvement (`opacity` transition 0.6s), disparaît en douceur au `mouseleave`, désactivé sur mobile pour les performances. Complète le fond ambient mesh animé (Run #4) sans le remplacer — le mesh offre une atmosphère lente et organique (25s cycle) tandis que le spotlight ajoute une couche interactive en temps réel.
- **Inspiration :** Linear.app — le leader des AI SAAS utilise un spotlight gradient qui suit le curseur dans sa hero section, créant une sensation de "magie" et de réactivité qui rend la page vivante et interactive
- **Section modifiée :** Hero — nouveau `<div class="hero-spotlight">` en HTML ; nouveau bloc CSS `.hero-spotlight` (700px, radial-gradient, pointer-events none, will-change transform, responsive hide mobile) ; nouveau bloc JS `updateSpotlight()` avec Lerp + RAF + gestion mouseenter/mouseleave
- **Statut :** ✅ Succès

## Run #9 — 25/06/2026
- **Amélioration :** Section "Integrationen & Partner" (Integrations/Trust Logos) ajoutée — grille 3×2 de 6 cartes partenaires animées (DATEV, lexoffice, sevDesk, WhatsApp Business, DSGVO-zertifiziert, SAP Business One) avec icônes colorées dégradées, hover lift + scale + rotate(-3°), animation flottante subtile (partnerFloat 6s ease-in-out) alternant entre lignes paires/impaire, staggered scroll reveal, séparateurs supérieur/inférieur avec gradient. Navigation desktop et mobile mises à jour avec lien "Partner". Transition delays du menu mobile étendus à 8 éléments.
- **Inspiration :** Linear.app, Vercel, Stripe — les leaders AI SAAS utilisent tous une section logo cloud / trust badges (souvent en marquee ou grille) pour montrer les intégrations et partenaires, créant une preuve sociale visuelle cruciale pour la conversion
- **Section modifiée :** Nouvelle section `.integrations` entre Testimonials et Pricing ; nav ajoutée "Partner" ; mobile delays étendus à nth-child(8) ; responsive CSS pour mobile (1 colonne)
- **Statut :** ✅ Succès

## Run #8 — 25/06/2026
- **Amélioration :** Animated Conic Gradient Border sur la carte "Empfohlen" (Pricing Flatrate) — un dégradé conique animé (bleu→violet→vert→bleu) tourne en continu (8s cycle) sur la bordure de la carte mise en avant, créant un effet premium "vivant" avec un halo subtil. La bordure s'illumine d'une lueur subtile grâce au contraste entre le fond blanc et les couleurs du gradient. Technique utilisée : pseudo-élément `::before` 300%×300% avec `conic-gradient`, animation `spinGradientBorder` (`transform: rotate(360deg)`), `::after` avec `inset: 2px` pour masquer l'intérieur, `overflow: hidden` sur le parent. Z-index stack : `::before` (0) → `::after` (1) → contenu (2).
- **Inspiration :** Stripe, Linear, Vercel — les leaders AI SAAS utilisent tous des bordures animées sur les cartes "Enterprise" ou "Featured" de leurs pages pricing pour mettre en avant le plan recommandé avec un effet subtil mais premium
- **Section modifiée :** Pricing — `.price-card.featured` CSS (border-color transparent, overflow hidden) + 2 nouveaux pseudo-éléments `::before`/`::after` + keyframe `spinGradientBorder`
- **Statut :** ✅ Succès

## Run #7 — 25/06/2026
- **Amélioration :** Scroll Progress Indicator — barre de progression fine (3px) en haut de la page qui se remplit du dégradé bleu→violet→vert au fil du scroll, avec ombre lumineuse subtile. Utilise `requestAnimationFrame` pour des performances optimales (pas de jank). ARIA `role="progressbar"` pour l'accessibilité.
- **Inspiration :** Linear, Stripe, Vercel — les leaders AI SAAS et produits premium utilisent tous une barre de progression subtile en haut de page pour indiquer la position de lecture et ajouter une touche de raffinement UX
- **Section modifiée :** Nouvel élément `.scroll-progress` (CSS) + `<div>` après `<body>` + JS `updateScrollProgress()` avec throttling RAF
- **Statut :** ✅ Succès

## Run #6 — 25/06/2026
- **Amélioration :** Menu hamburger mobile animé — correction du bug de navigation mobile (tous les liens étaient cachés sans accès) avec un menu overlay plein écran premium : icône hamburger → X animé (3 lignes avec rotation spring), overlay backdrop-filter blur(24px), liens dévoilés en staggered (délai progressif 0.05s→0.30s), verrouillage du scroll body, fermeture par clic sur lien, touche Escape, accessibilité ARIA
- **Inspiration :** Vercel, Linear, Claude.ai — les leaders AI SAAS utilisent tous des menus hamburger overlay avec backdrop blur et animations staggered pour la navigation mobile premium
- **Section modifiée :** Navbar — ajout bouton `.hamburger` avec 3 `.hamburger-line` animés ; nouveau `.mobile-menu` overlay fullscreen en fin de `<nav>` ; responsive CSS masque tous les `.nav-links` (y compris CTA) sur mobile et affiche le hamburger ; JS `toggleMenu()` avec body scroll lock et sortie Escape
- **Bug corrigé :** La navigation mobile était cassée — `display: none` sur les liens sans alternative. Désormais les visiteurs mobiles ont un menu complet et animé
- **Statut :** ✅ Succès

## Run #5 — 25/06/2026
- **Amélioration :** Compteurs animés (Count-Up) sur les statistiques Hero + effet "Shimmer" subtil — les chiffres "15+", "98%", "24/7" s'animent de 0 → valeur cible au chargement de la page avec un easing cubic, et un balayage lumineux (shimmer) parcourt périodiquement les statistiques pour un rendu premium "AI-native"
- **Inspiration :** Claude.ai / Vercel / Linear — compteurs animés avec micro-interactions (effet de balayage lumineux) sur les KPIs des landing pages AI SAAS haut de gamme
- **Section modifiée :** Hero stats — remplacement des `<h3>` statiques par des `<span class="stat-count">` avec data-target/suffix ; ajout CSS `.stat-wrapper::after` pour le shimmer (animation `statShimmer` 6s) ; ajout JS `animateCounters()` avec `requestAnimationFrame` et `easeOutCubic`
- **Statut :** ✅ Succès

---

## Run #0 — 25/06/2026
- **Site créé** par le fondateur (HTML+CSS+JS, 969 lignes)
- **WhatsApp mockup** avec 3 scénarios animés (Rechnungserfassung, Bankabstimmung, Steuervorbereitung)
- **Animations** : float du téléphone, fadeInUp des messages, scroll reveal
- **Sections** : Hero, Features, Pricing, CTA
- **Pricing** : €100/mois 1ère année, €200 installation
- **Auto-rotation** des scénarios toutes les 30s
- **Responsive** : Desktop + mobile

---

## Run #1 — 25/06/2026
- **Amélioration :** Section "Erfahrungsberichte" (Testimonials) ajoutée — carrousel de 4 témoignages clients avec défilement automatique (5s), navigation par points, compteur "X / 4", pause au hover, animation de transition fluide (scale + translateX + opacité), étoiles animées en cascade (starPop), et avatars colorés avec dégradés
- **Inspiration :** Awwwards / Dribbble — "best AI Saas landing page testimonials carousel" (section standard sur toutes les landing pages AI SAAS haut de gamme : OpenAI, Claude, Copy.ai, Jasper)
- **Section modifiée :** Nouvelle section entre Features et Pricing ; navbar mise à jour avec lien "Erfahrungen" ; responsive adapté pour mobile (min-height ajusté)
- **Statut :** ✅ Succès

---

## Run #3 — 25/06/2026
- **Amélioration :** Section "So funktioniert's" (How It Works) ajoutée — 3 étapes visuelles avec timeline animée : (1) 📱 WhatsApp öffnen, (2) 🤖 KI arbeitet, (3) ✅ Freigeben & fertig. Chaque étape a un numéro dégradé avec hover scale, des connecteurs animés (flèche pulsante →) entre les cartes, staggered scroll reveal, hover lift avec ombre portée, et responsive adapté (passe en ligne horizontale sur mobile)
- **Inspiration :** OpenAI / Claude / Copy.ai — section "How It Works" standard sur toutes les landing pages AI SAAS premium, avec timeline visuelle 3 étapes
- **Section modifiée :** Nouvelle section entre Features et Testimonials ; navbar mise à jour avec lien "So funktioniert's"
- **Statut :** ✅ Succès

---

## Run #2 — 25/06/2026
- **Amélioration :** Section FAQ (Accordéon) ajoutée — 6 questions/réponses fréquentes avec animations fluides d'ouverture/fermeture (max-height + padding transition), icône "+" qui tourne à 45° et devient gradient au clic, bordure bleue et ombre portée sur l'item actif, accordéon "single-open" (ferme les autres quand on en ouvre un), liens ARIA pour l'accessibilité, staggered scroll reveal (reveal-delay-1/2)
- **Inspiration :** OpenAI, Claude, Copy.ai — section FAQ standard sur toutes les landing pages AI SAAS premium
- **Section modifiée :** Nouvelle section entre Pricing et CTA ; navbar mise à jour avec lien "FAQ"
- **Statut :** ✅ Succès

---

## Run #4 — 25/06/2026
- **Amélioration :** Ambient Gradient Mesh animé sur la Hero Section — fond multi-couches avec 4 radial-gradients (bleu/violet/vert) qui se déplacent lentement (25s cycle) via translate + rotate + scale, créant une atmosphère premium "AI-native" rappelant Claude.ai et Midjourney
- **Inspiration :** Claude.ai (Anthropic), Midjourney, ChatGPT/OpenAI — les leaders AI SAAS utilisent tous des fonds de gradient animés subtils pour leur hero section
- **Section modifiée :** Hero section — ajout de `position: relative; overflow: hidden;` sur `.hero`, nouveau pseudo-élément `::before` avec 4 calques de radial-gradient animés, z-index ajusté sur `.hero-left` et `.hero-right` pour rester au-dessus du fond
- **Statut :** ✅ Succès
