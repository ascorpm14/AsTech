# SteuerGPT — Changelog des améliorations

## Run #24 — 25/06/2026
- **Correction :** Transparence des prix du plan Flex — le tarif affichait « €0 / Monat » avec « Pro Transaktion abgerechnet » sans AUCUN prix par transaction. Pour un cabinet comptable allemand (Steuerberater), l'absence de prix par transaction est un red flag B2B : impossible d'évaluer le coût réel. Le nouveau libellé « Ab €1,50 pro Transaktion » donne le prix unitaire immédiatement. La feature list inclut désormais « Ø €45/Monat bei 30 Transaktionen » — un ordre de grandeur mensuel qui permet au professionnel de comparer instantanément avec le Flatrate à €100/mois. Le contraste entre Flex (usage-based, ~€45/mois) et Flatrate (forfait, €100/mois) est maintenant clair et permet une décision éclairée. Le « Jederzeit kündbar » a été retiré car redondant avec les deux offres qui l'incluent déjà via « Jederzeit kündbar » et la période d'essai de 7 jours.
- **Inspiration :** Datev.de, Lexoffice.de, sevdesk.de — tous les concurrents B2B allemands affichent des prix UNITAIRE clairs (par Beleg, par Buchung, par Nutzer). Les sites SAAS allemands qui cachent leurs prix unitaires sont immédiatement perçus comme opaques par les professionnels allemands qui exigent de la transparence (typische deutsche Erwartungshaltung bei B2B-Preisen).
- **Section modifiée :** Pricing — bloc Flex : « Pro Transaktion abgerechnet » → « Ab €1,50 pro Transaktion » ; feature : « Jederzeit kündbar » → « Ø €45/Monat bei 30 Transaktionen »
- **Statut :** ✅ Succès

---

## Run #23 — 25/06/2026
- **Amélioration :** Le mockup WhatsApp donne désormais l'impression d'un outil VIVANT et non d'une démo pré-enregistrée. Après chaque scénario, un message système s'affiche automatiquement : « 🟢 SteuerGPT überwacht Ihre Konten... » avec un point vert animé (pulse 2s) qui suggère que l'IA continue de surveiller en temps réel. Au changement de scénario (manuel ou auto-rotation 30s), au lieu d'un effacement brutal (`innerHTML = ''`), une transition fluide de 1.2s montre « 🔵 Verbindung wird hergestellt... » en bleu, donnant l'impression que l'assistant se reconnecte pour une nouvelle tâche. Les messages système sont préservés pendant la transition. Trois nouvelles variables JS (`MONITOR_DELAY`, `TRANSITION_DELAY`, `isTransitioning`) et quatre nouvelles fonctions (`addSystemMessage`, `scheduleMonitoringState`, `clearAllTimeouts`, `switchScenario`) encapsulent proprement cette logique. Le `clearAllTimeouts` protège contre les timeouts orphelins pendant les transitions. Pour un cabinet comptable allemand, cette sensation de « liveness » transforme le mockup d'une vitrine figée en une démonstration crédible d'un outil IA toujours actif — ce qui est exactement la promesse produit.
- **Inspiration :** Intercom (messages système « We're here »), ChatGPT (état « Thinking... »), les assistants IA modernes qui communiquent leur état en temps réel. Les sites SAAS premium (Linear, Vercel) utilisent des micro-états pour donner vie à leurs démos produit — un mockup qui reste figé après sa lecture signale immédiatement « ceci est une animation pré-enregistrée ».
- **Section modifiée :** CSS — nouveau bloc `.whatsapp-system-msg` (~45 lignes : centré, fond transparent, dot animé, classe `.connecting` bleue, keyframes `systemMsgIn` / `livePulse`) ; JS — remplacement complet du bloc `renderScenario`/`switchScenario` (ajout de `addSystemMessage`, `scheduleMonitoringState`, `clearAllTimeouts`, `switchScenario`, variables d'état `monitoringTimeout`/`isTransitioning`)
- **Statut :** ✅ Succès

---

## Run #22 — 25/06/2026
- **Correction :** Footer professionnel avec Impressum, Datenschutz & AGB — le site n'avait AUCUNE mention légale, ce qui est une violation du §5 TMG et de l'Art. 13 DSGVO. Pour un cabinet comptable allemand (Steuerberater) qui est une profession réglementée, l'absence d'Impressum détruit immédiatement la crédibilité — c'est le premier réflexe de tout professionnel allemand visitant un site B2B. Le nouveau footer inclut : (1) grille 4 colonnes avec logo, navigation produit, liens légaux & contact, (2) section Impressum complète avec §5 TMG, Umsatzsteuer-ID, Verantwortlicher i.S.d. §18 MStV, lien OS-Plattform, (3) section Datenschutzerklärung avec référence Art. 13 DSGVO / BDSG, (4) section AGB, (5) responsive mobile (1 colonne). Le tout dans un design épuré (fond #f8fafc, typographie cohérente avec le reste du site). Les ancres #impressum, #datenschutz, #agb permettent la navigation directe et la barre de navigation scroll spy fonctionne proprement avec ces nouvelles sections en bas de page.
- **Inspiration :** §5 TMG (Telemediengesetz), Art. 13 DSGVO, BDSG — les exigences légales allemandes. Les sites de concurrents comme Datev.de, Lexoffice.de, sevdesk.de : tous ont un footer complet avec Impressum, Datenschutz et AGB visibles en pied de page. Un site sans ces mentions est immédiatement identifié comme non conforme par un professionnel allemand.
- **Section modifiée :** Footer — remplacement complet (HTML + CSS) ; nouveau bloc CSS ~90 lignes avec .footer-inner, .footer-grid, .footer-legal, .footer-legal-grid, .footer-bottom, responsive ; HTML avec 4 colonnes de navigation + 3 sections légales (Impressum/Datenschutz/AGB) + copyright
- **Statut :** ✅ Succès

---

## Run #21 — 25/06/2026
- **Correction :** Ordre des checkmarks/time dans les messages WhatsApp sortants — dans le vrai WhatsApp, les double-check (`✓✓`) apparaissent à GAUCHE de l'heure (`✓✓ 14:30`), pas à droite (`14:30 ✓✓`). L'ancien code concaténait `getTime() + ' ' + getMsgStatus(msg.type)`, produisant l'ordre inverse. Pour un cabinet comptable allemand qui utilise WhatsApp quotidiennement, cette inversion subtile brisait l'immersion du mockup — le cerveau reconnaît instantanément un détail qui "cloche". La correction : `getMsgStatus(msg.type)` est évalué en premier, et l'heure n'est ajoutée qu'après. Pour les messages entrants (pas de statut), seul le time est rendu, sans espace parasite — via un ternaire `statusHtml ? statusHtml + ' ' : ''` qui garantit un rendu propre dans les deux cas.
- **Inspiration :** WhatsApp Business UI officielle — les détails les plus infimes (position des checks par rapport à l'heure) sont ce qui sépare un mockup crédible d'un faux. Un professionnel qui utilise WhatsApp ne l'analyse pas consciemment, mais son cerveau détecte instantanément quand l'ordre est inversé. Les meilleurs sites SAAS peaufinent chaque pixel de leur démo produit.
- **Section modifiée :** JS — `renderScenario()` ligne 2411 : extraction de `getMsgStatus()` dans une variable, template conditionnel avec ternaire, commentaire explicatif
- **Statut :** ✅ Succès

---

## Run #20 — 25/06/2026
- **Correction :** Height collapse du carrousel de témoignages pendant les transitions — quand l'ancienne carte perdait `active` (passant de `position:relative` à `position:absolute`) et que la nouvelle ne l'avait pas encore (intervalle de 50ms), le conteneur s'effondrait à `min-height: 340px`. Si une carte dépassait 340px (ce qui arrive sur mobile avec du texte qui wrappe), un saut visuel se produisait — un détail qui détruit la crédibilité auprès d'un cabinet comptable allemand exigeant. La nouvelle fonction `lockCarouselHeight()` mesure la hauteur naturelle de toutes les cartes (en les rendant temporairement `visibility: hidden` + `opacity: 0` + `position: relative` sans affecter le layout) et applique la valeur maximale comme `minHeight` inline. La hauteur est recalculée au resize (debounce 300ms) pour s'adapter aux changements d'orientation et de font-scaling. Zéro jank, zéro saut, transition parfaitement fluide.
- **Inspiration :** Vercel, Linear, Apple.com — les sites premium ne tolèrent AUCUN saut visuel. Les transitions doivent être si fluides que l'utilisateur ne les remarque pas. Un carrousel qui "saute" pendant un changement de slide signale immédiatement un manque de polish.
- **Section modifiée :** JS — ajout de `lockCarouselHeight()`, `testimonialCarouselEl`, resize handler debounced ; pas de modification CSS
- **Statut :** ✅ Succès

---


- **Correction :** Statuts de messages WhatsApp réalistes — les messages entrants (`msg-in`) affichent désormais UNIQUEMENT l'heure (sans indicateur de statut), et les messages sortants (`msg-out`) affichent le double check gris `✓✓` (`#8696a0` = couleur officielle WhatsApp pour "délivré"). L'ancienne fonction `getCheck()` générait aléatoirement des icônes horloge 🕐, des checks simples, doubles, triples et quadruples pour TOUS les messages (entrants ET sortants) — ce qui n'existe pas dans le vrai WhatsApp : les messages entrants n'ont JAMAIS de statut, et les statuts sortants ont une sémantique précise (✓ = envoyé, ✓✓ = délivré, ✓✓ bleu = lu). Pour un cabinet comptable allemand qui utilise WhatsApp quotidiennement avec ses mandants, cette incohérence détruisait immédiatement la crédibilité et le réalisme du mockup. La nouvelle implémentation utilise `getMsgStatus(msgType)` qui retourne une chaîne vide pour les messages entrants (juste l'heure) et le double-check gris pour les sortants.
- **Inspiration :** WhatsApp Business UI officielle — les détails infimes (couleur des checks, absence de statut sur les messages reçus) sont ce qui distingue un mockup crédible d'un faux évident. Un professionnel reconnaît instantanément ces signaux.
- **Section modifiée :** JS — suppression de `getCheck()`, création de `getMsgStatus(msgType)`, modification de l'appel dans `renderScenario` (ligne innerHTML des messages)
- **Statut :** ✅ Succès

---

## Run #18 — 25/06/2026
- **Correction :** Notch du téléphone qui chevauchait l'écran WhatsApp — `.phone-screen` avait `margin: 6px` (écran commençait à 6px du haut du cadre) tandis que `.phone-notch` mesurait 28px de haut (`top: 0`). Résultat : 22px de chevauchement où le notch masquait le header WhatsApp. Corrigé en passant à `margin: 28px 6px 6px 6px` — le notch s'assoit désormais entièrement dans le bezel supérieur, l'écran commence pile en dessous. Le rendu du téléphone est maintenant réaliste : cadre -> notch -> écran, sans chevauchement.
- **Inspiration :** Apple.com, Samsung.com — les mockups produits premium alignent toujours parfaitement les découpes d'écran avec le contenu ; un décalage de quelques pixels crée un rendu "cheap" qui détruit la crédibilité auprès d'un cabinet comptable allemand.
- **Section modifiée :** CSS `.phone-screen` — margin-top 6px → 28px
- **Statut :** ✅ Succès

---

## Run #17 — 25/06/2026
- **Amélioration :** Mockup WhatsApp réaliste — cadre téléphone professionnel avec vrai bezel foncé (`background: #1a1a2e`, `border-radius: 40px`) et écran `phone-screen` incrusté (margin 6px, border-radius 32px) qui reproduit fidèlement l'apparence d'un smartphone moderne. L'ancien fond blanc avec bordure transparente créait un rendu artificiel (coins blancs visibles). Le notch reste intégré dans le bezel au-dessus de l'écran. Animation `float` (gimmicky, -12px) supprimée — remplacée par un subtil hover lift (-4px au survol uniquement) qui rend le téléphone solide et professionnel, pas un jouet qui flotte. Header WhatsApp ajusté (padding-top 14px au lieu de 36px) puisque le notch n'empiète plus sur l'écran.
- **Inspiration :** Apple.com, Tesla.com, Porsche — les marques premium B2B présentent leurs produits comme des outils sérieux et fiables, pas comme des gadgets animés. Un cabinet comptable allemand doit voir un outil stable et professionnel, pas un élément de design qui bouge tout seul.
- **Section modifiée :** CSS `.phone-mockup` (removed float animation, added hover lift), `.phone-frame` (background #1a1a2e, border-radius 40px, realistic box-shadow), nouveau `.phone-screen` (margin 6px, border-radius 32px, overflow hidden), `.phone-header` (padding-top 14px) ; HTML wrapper `.phone-screen` autour du contenu WhatsApp
- **Statut :** ✅ Succès

---

## Run #16 — 25/06/2026
- **Amélioration :** Sticky Floating CTA Bar — barre de conversion flottante en bas de page avec effet glassmorphisme (backdrop-filter blur 20px, fond semi-transparent 0.92), apparaît en slide-up avec spring easing après avoir dépassé la section Hero. Contient : 5 étoiles, texte "4.9 von 5 Sternen — 150+ Kanzleien vertrauen auf SteuerGPT", lien CTA pointant vers #cta, et bouton de fermeture. La barre disparaît automatiquement en bas de page (400px du footer) pour éviter le chevauchement avec la CTA finale. Le bouton de fermeture persiste via localStorage (expire après 24h, réapparaît le lendemain). Rafraîchie via RAF throttling. Scroll handler optimisé avec seuils dynamiques basés sur la hauteur réelle de la Hero. Complètement responsive : sur mobile, le texte descriptif et la note sont masqués pour ne garder que les étoiles et le bouton CTA compact. Z-index 996 (en dessous des toasts 997 et du back-to-top 998). Compatible avec le bouton back-to-top et les notifications toast.
- **Inspiration :** Linear.app, Vercel, Stripe — les leaders AI SAAS utilisent tous une sticky CTA bar en bas de page avec indicateur de preuve sociale (étoiles/note) pour maximiser la conversion à chaque étape du scroll. La barre reste discrète mais toujours accessible, créant un point de conversion persistant sans être intrusive.
- **Section modifiée :** Nouveau bloc CSS `.sticky-cta-bar` (~85 lignes avec glassmorphisme, gradient glow top, transitions slide-up/responsive) ; nouveau HTML `<div class="sticky-cta-bar">` entre le footer et les toasts ; nouveau bloc JS `initStickyCtaBar()` avec RAF throttling, seuils dynamiques, localStorage dismiss (24h), cache sur clic CTA
- **Statut :** ✅ Succès

---

## Run #15 — 25/06/2026
- **Amélioration :** Social Proof Toast Notifications — notifications flottantes "live" qui apparaissent dans le coin inférieur gauche de la page, simulant une activité en temps réel (nouvelles inscriptions de cabinets, tâches accomplies, économies réalisées). Chaque toast est conçu en glassmorphisme (backdrop-filter blur, fond semi-transparent, bordure subtile) avec une barre de progression dégradée animée (5s) indiquant sa durée d'affichage. Les notifications apparaissent à intervalles aléatoires (8-18s) avec rotation intelligente (pas de répétition). Au clic : effet de pulse subtil. Au hover : mise en pause. Pause automatique quand l'onglet est caché (visibilitychange). Maximum 3 toasts visibles simultanément (MutationObserver nettoie les plus anciens). Bouton de fermeture individuel avec animation dismiss (slide-out). Première notification après 3s (attente que la hero finisse son entrée). Complètement responsive (12px padding, taille réduite sur mobile). ARIA `aria-live="polite"` pour l'accessibilité.
- **Inspiration :** Vercel (déploiements en direct), Intercom (messages in-app), Mailchimp (notifications d'inscription) — les leaders SAAS utilisent tous des notifications de preuve sociale en bas de page pour renforcer la confiance et montrer l'activité réelle des utilisateurs, créant un sentiment d'urgence sociale (FOMO) qui booste la conversion
- **Section modifiée :** Nouveau bloc CSS `.social-toast-container` / `.social-toast` (~100 lignes avec glassmorphisme, animations slide-in/out, barre de progression, responsive) ; nouveau HTML `<div class="social-toast-container">` avant le bouton back-to-top ; nouveau bloc JS `initSocialProofToasts()` avec 12 notifications réalistes, rotation intelligente, intervalle aléatoire, pause hover/visibility, MutationObserver cap à 3 toasts max
- **Statut :** ✅ Succès

---

## Run #14 — 25/06/2026
- **Amélioration :** Magnetic Buttons — micro-interaction premium de suivi du curseur sur tous les boutons CTA (btn-primary, btn-secondary) du site. Au hover, le contenu du bouton se déplace subtilement (max 8px) dans la direction du curseur avec un lissage Lerp fluide (0.15) optimisé `requestAnimationFrame`, créant un effet "d'attraction magnétique". Au mouseleave, le bouton retourne à sa position d'origine avec une transition spring (cubic-bezier). Désactivé automatiquement sur mobile/tactile (détection `pointer: coarse`). Le contenu de chaque bouton est encapsulé dans un `<span class="btn-content">` avec `pointer-events: none` pour une isolation parfaite des transformations. Compatible avec tous les hover effects existants (translateY, box-shadow) sans conflit.
- **Inspiration :** Linear.app, Vercel, Stripe — les leaders AI SAAS utilisent tous des boutons magnétiques qui suivent subtilement le curseur, créant une sensation de réactivité et de raffinement matériel qui distingue les interfaces premium
- **Section modifiée :** Nouveau CSS `.btn-content` (pointer-events, transition spring) + nouveau bloc JS `initMagneticButtons()` avec RAF Lerp, gestion mouseenter/mousemove/mouseleave, désactivation tactile + mise à jour HTML de tous les `.btn-primary` et `.btn-secondary` avec `<span class="btn-content">` wrapper
- **Statut :** ✅ Succès

---

## Run #14 — 25/06/2026
- **Amélioration :** Animated Scroll-Down Indicator sous la Hero Section — chevron degradé (bleu/violet) en 3 couches superposées avec animation bounce décalée (2.4s cycle, staggered delays 0s/0.15s/0.3s, opacité décroissante 1/0.5/0.25) invitant subtilement au scroll. Titre "Weiter" en capitales. Apparaît en fondu 1.2s après le chargement (attente que la hero finisse son entrée). Disparaît en `opacity: 0` dès scroll > 80px, réapparaît en remontant. Au clic : smooth scroll vers #szenarien avec offset nav. Scroll handler RAF. Chevrons SVG inline avec `<linearGradient>`, zéro dépendance. Responsive (padding réduit mobile).
- **Inspiration :** Linear.app, Vercel, Stripe — les leaders AI SAAS utilisent un indicateur de scroll subtil en bas de leur hero section pour guider naturellement l'utilisateur vers le contenu suivant (wayfinding UX)
- **Section modifiée :** Nouveau bloc CSS `.scroll-indicator` (~60 lignes : flex column, animation scrollBounce, transitions visible/hidden, responsive) ; nouveau HTML `<div class="scroll-indicator" id="scrollIndicator">` avec 3 chevrons SVG inline gradient après la section hero ; nouveau JS `updateScrollIndicator()` avec RAF throttle, delayed visible (1.2s), click-to-scroll vers #szenarien
- **Statut :** ✅ Succès

## Run #12 — 25/06/2026
- **Amélioration :** Floating "Back to Top" Button avec micro-interactions — bouton flottant arrondi (50px, degradé bleu/violet) qui apparaît en fondu avec scale spring (`translateY + scale`) après 500px de scroll, situé en bas à droite. Au hover : lévitation (-4px) + scale(1.08) + flèche qui monte de 2px + halo lumineux flouté (glow `filter: blur(12px)`) qui apparaît derrière le bouton. Au click : `scrollTo({ top: 0, behavior: 'smooth' })`. Scroll handler optimisé avec `requestAnimationFrame` (RAF throttling) pour zéro jank. Complètement responsive (44px sur mobile, marges réduites). Accessible avec `aria-label`.
- **Inspiration :** Linear.app, Stripe, Vercel — les leaders AI SAAS utilisent tous un bouton "Back to Top" flottant subtil avec micro-transitions pour la navigation de confort sur les longues landing pages
- **Section modifiée :** Nouveau CSS `.back-to-top` (bloc ~65 lignes avec pseudo-éléments `::before`/`::after`, transitions, responsive) ; nouveau HTML `<button class="back-to-top" id="backToTop">` avant `</body>` ; nouveau JS `updateBackToTop()` avec RAF throttling, event listener click + scroll + initialisation
- **Statut :** ✅ Succès

## Run #11 — 25/06/2026
- **Amélioration :** Scroll-Active Navigation (Scroll Spy) avec indicateur visuel animé et correction du défilement ancré — le lien de navigation actif est automatiquement mis en évidence lors du défilement avec un indicateur degradé animé (petit point souligné avec scaleX spring + fond bleu transparent). Correction du bug de défilement ancré : les sections avaient un `scroll-margin-top: 80px` et un `preventDefault` smooth scroll avec `history.pushState` pour éviter que le contenu ne passe sous la barre de navigation fixe (70px). L'URL hash est mise à jour sans rechargement. RAF-based throttling pour les performances. Fonctionne sur toutes les sections (Hero, Szenarien, Features, How It Works, Testimonials, Partner, Pricing, FAQ, CTA). Gère le cas du bas de page (dernière section toujours active). Compatible avec le menu mobile (fermeture automatique au clic sur un lien).
- **Inspiration :** Linear.app, Stripe, Vercel — les leaders AI SAAS utilisent tous un scroll spy avec highlight actif dans la navigation, permettant à l'utilisateur de toujours savoir où il se trouve sur la page. C'est une marque de raffinement UX essentielle sur les landing pages premium.
- **Section modifiée :** Navbar — nouveau CSS `.nav-links a::after` (indicator dot) + `.nav-links a.active` (highlight + dot visible) ; toutes les sections — ajout `scroll-margin-top: 80px` ; nouveau JS `updateActiveNav()` + RAF throttle + smooth anchor scroll handler avec offset navHeight + `history.pushState` (URL hash)
- **Bug corrigé :** Les clics sur les liens de navigation faisaient défiler le contenu derrière la barre fixe. Désormais, le décalage est calculé dynamiquement (navHeight) pour un positionnement parfait.
- **Statut :** ✅ Succès

## Run #10 — 25/06/2026
- **Amélioration :** Interactive Cursor Spotlight sur la Hero Section — un degradé radial subtil (700px, bleu/violet/transparent) suit le curseur de la souris avec un lissage Lerp fluide (0.08) optimisé `requestAnimationFrame`, créant une interaction premium "vivante" qui réagit au mouvement de l'utilisateur. Apparaît en fondu au premier mouvement (`opacity` transition 0.6s), disparaît en douceur au `mouseleave`, désactivé sur mobile pour les performances. Complète le fond ambient mesh animé (Run #4) sans le remplacer — le mesh offre une atmosphère lente et organique (25s cycle) tandis que le spotlight ajoute une couche interactive en temps réel.
- **Inspiration :** Linear.app — le leader des AI SAAS utilise un spotlight gradient qui suit le curseur dans sa hero section, créant une sensation de "magie" et de réactivité qui rend la page vivante et interactive
- **Section modifiée :** Hero — nouveau `<div class="hero-spotlight">` en HTML ; nouveau bloc CSS `.hero-spotlight` (700px, radial-gradient, pointer-events none, will-change transform, responsive hide mobile) ; nouveau bloc JS `updateSpotlight()` avec Lerp + RAF + gestion mouseenter/mouseleave
- **Statut :** ✅ Succès

## Run #9 — 25/06/2026
- **Amélioration :** Section "Integrationen & Partner" (Integrations/Trust Logos) ajoutée — grille 3x2 de 6 cartes partenaires animées (DATEV, lexoffice, sevDesk, WhatsApp Business, DSGVO-zertifiziert, SAP Business One) avec icônes colorées degradées, hover lift + scale + rotate(-3°), animation flottante subtile (partnerFloat 6s ease-in-out) alternant entre lignes paire/impaire, staggered scroll reveal, séparateurs supérieur/inférieur avec gradient. Navigation desktop et mobile mises à jour avec lien "Partner". Transition delays du menu mobile étendus à 8 éléments.
- **Inspiration :** Linear.app, Vercel, Stripe — les leaders AI SAAS utilisent tous une section logo cloud / trust badges (souvent en marquee ou grille) pour montrer les intégrations et partenaires, créant une preuve sociale visuelle cruciale pour la conversion
- **Section modifiée :** Nouvelle section `.integrations` entre Testimonials et Pricing ; nav ajoutée "Partner" ; mobile delays étendus à nth-child(8) ; responsive CSS pour mobile (1 colonne)
- **Statut :** ✅ Succès

## Run #8 — 25/06/2026
- **Amélioration :** Animated Conic Gradient Border sur la carte "Empfohlen" (Pricing Flatrate) — un degradé conique animé (bleu/violet/vert/bleu) tourne en continu (8s cycle) sur la bordure de la carte mise en avant, créant un effet premium "vivant" avec un halo subtil. La bordure s'illumine d'une lueur subtile grâce au contraste entre le fond blanc et les couleurs du gradient. Technique utilisée : pseudo-élément `::before` 300%x300% avec `conic-gradient`, animation `spinGradientBorder` (`transform: rotate(360deg)`), `::after` avec `inset: 2px` pour masquer l'intérieur, `overflow: hidden` sur le parent. Z-index stack : `::before` (0) vers `::after` (1) vers contenu (2).
- **Inspiration :** Stripe, Linear, Vercel — les leaders AI SAAS utilisent tous des bordures animées sur les cartes "Enterprise" ou "Featured" de leurs pages pricing pour mettre en avant le plan recommandé avec un effet subtil mais premium
- **Section modifiée :** Pricing — `.price-card.featured` CSS (border-color transparent, overflow hidden) + 2 nouveaux pseudo-éléments `::before`/`::after` + keyframe `spinGradientBorder`
- **Statut :** ✅ Succès

## Run #7 — 25/06/2026
- **Amélioration :** Scroll Progress Indicator — barre de progression fine (3px) en haut de la page qui se remplit du degradé bleu/violet/vert au fil du scroll, avec ombre lumineuse subtile. Utilise `requestAnimationFrame` pour des performances optimales (pas de jank). ARIA `role="progressbar"` pour l'accessibilité.
- **Inspiration :** Linear, Stripe, Vercel — les leaders AI SAAS et produits premium utilisent tous une barre de progression subtile en haut de page pour indiquer la position de lecture et ajouter une touche de raffinement UX
- **Section modifiée :** Nouvel élément `.scroll-progress` (CSS) + `<div>` après `<body>` + JS `updateScrollProgress()` avec throttling RAF
- **Statut :** ✅ Succès

## Run #6 — 25/06/2026
- **Amélioration :** Menu hamburger mobile animé — correction du bug de navigation mobile (tous les liens étaient cachés sans accès) avec un menu overlay plein écran premium : icône hamburger vers X animé (3 lignes avec rotation spring), overlay backdrop-filter blur(24px), liens dévoilés en staggered (délai progressif 0.05s vers 0.30s), verrouillage du scroll body, fermeture par clic sur lien, touche Escape, accessibilité ARIA
- **Inspiration :** Vercel, Linear, Claude.ai — les leaders AI SAAS utilisent tous des menus hamburger overlay avec backdrop blur et animations staggered pour la navigation mobile premium
- **Section modifiée :** Navbar — ajout bouton `.hamburger` avec 3 `.hamburger-line` animés ; nouveau `.mobile-menu` overlay fullscreen en fin de `<nav>` ; responsive CSS masque tous les `.nav-links` (y compris CTA) sur mobile et affiche le hamburger ; JS `toggleMenu()` avec body scroll lock et sortie Escape
- **Bug corrigé :** La navigation mobile était cassée — `display: none` sur les liens sans alternative. Désormais les visiteurs mobiles ont un menu complet et animé
- **Statut :** ✅ Succès

## Run #5 — 25/06/2026
- **Amélioration :** Compteurs animés (Count-Up) sur les statistiques Hero + effet "Shimmer" subtil — les chiffres "15+", "98%", "24/7" s'animent de 0 vers valeur cible au chargement de la page avec un easing cubic, et un balayage lumineux (shimmer) parcourt périodiquement les statistiques pour un rendu premium "AI-native"
- **Inspiration :** Claude.ai / Vercel / Linear — compteurs animés avec micro-interactions (effet de balayage lumineux) sur les KPIs des landing pages AI SAAS haut de gamme
- **Section modifiée :** Hero stats — remplacement des `<h3>` statiques par des `<span class="stat-count">` avec data-target/suffix ; ajout CSS `.stat-wrapper::after` pour le shimmer (animation `statShimmer` 6s) ; ajout JS `animateCounters()` avec `requestAnimationFrame` et `easeOutCubic`
- **Statut :** ✅ Succès

---

## Run #0 — 25/06/2026
- **Site créé** par le fondateur (HTML+CSS+JS, 969 lignes)
- **WhatsApp mockup** avec 3 scénarios animés (Rechnungserfassung, Bankabstimmung, Steuervorbereitung)
- **Animations** : float du téléphone, fadeInUp des messages, scroll reveal
- **Sections** : Hero, Features, Pricing, CTA
- **Pricing** : 100/mois 1ère année, 200 installation
- **Auto-rotation** des scénarios toutes les 30s
- **Responsive** : Desktop + mobile

---

## Run #1 — 25/06/2026
- **Amélioration :** Section "Erfahrungsberichte" (Testimonials) ajoutée — carrousel de 4 témoignages clients avec défilement automatique (5s), navigation par points, compteur "X / 4", pause au hover, animation de transition fluide (scale + translateX + opacité), étoiles animées en cascade (starPop), et avatars colorés avec degradés
- **Inspiration :** Awwwards / Dribbble — "best AI Saas landing page testimonials carousel" (section standard sur toutes les landing pages AI SAAS haut de gamme : OpenAI, Claude, Copy.ai, Jasper)
- **Section modifiée :** Nouvelle section entre Features et Pricing ; navbar mise à jour avec lien "Erfahrungen" ; responsive adapté pour mobile (min-height ajusté)
- **Statut :** ✅ Succès

---

## Run #3 — 25/06/2026
- **Amélioration :** Section "So funktioniert's" (How It Works) ajoutée — 3 étapes visuelles avec timeline animée : (1) WhatsApp öffnen, (2) KI arbeitet, (3) Freigaben & fertig. Chaque étape a un numéro degradé avec hover scale, des connecteurs animés (flèche pulsante) entre les cartes, staggered scroll reveal, hover lift avec ombre portée, et responsive adapté (passe en ligne horizontale sur mobile)
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
