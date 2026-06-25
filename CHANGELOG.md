# SteuerGPT — Changelog des améliorations

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
