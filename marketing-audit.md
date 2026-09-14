# Amin Auto Diagnostic — audit du parcours Google Ads → WhatsApp

## Conclusion et limites

Le parcours doit permettre de reconnaître son besoin, de vérifier que l’atelier est à Meknès, puis de commencer une conversation sans remplir un formulaire. La priorité commerciale est le coût par conversation qualifiée et par passage à l’atelier.

Audit fondé sur le code et la page publique https://amin-auto-diag.vercel.app/, les captures Google Ads fournies et les documentations officielles citées ci-dessous. Aucun accès aux rapports privés Google Ads/GA4 ni aux conversations WhatsApp : les freins relevés sont des observations ou hypothèses, pas une mesure des abandons. Aucun gain de conversion chiffré ne peut être promis. Les horaires, tarifs, délai réel de réponse et avis clients restent à confirmer.

## Diagnostic par étape

| Étape | Constat | Action |
|---|---|---|
| Recherche → annonce | Les captures mélangent plusieurs services et des termes génériques. « Valise diagnostic » peut aussi correspondre à un achat de matériel. | Séparer les groupes par intention ; examiner les termes réellement recherchés avant d’exclure. |
| Annonce → premier écran | L’ancien titre « Votre voiture. Entre de bonnes mains. » ne nommait pas le service. | Nouveau titre explicite avec Meknès et variantes par service. |
| Choix du service sur mobile | La liste des spécialités était après la grande photo. | Les cinq accès sont maintenant avant la photo ; les cinq cartes restent disponibles. |
| Confiance | Design soigné et contact direct, mais photos IA et aucune preuve client vérifiée. | Lien Google Maps visible dès le premier écran ; ajouter ensuite de vraies photos et des avis vérifiés. |
| Clic WhatsApp → envoi | Ancien message long, mélange de langues et trois champs vides, pouvant donner l’impression d’un formulaire à remplir. | Message français court, adapté au service et envoyable tel quel. |
| Attente → échange | Délai de réponse inconnu ; aucune configuration WhatsApp Business vérifiée. | Activer l’accueil automatique, organiser les réponses humaines et les absences. |
| Mesure | GA4 de base installé ; les objets dataLayer personnalisés ne déclenchaient pas à eux seuls les événements GA4 via gtag. | Envoi explicite des événements de contact à GA4. |

Google recommande la cohérence entre annonce et page : [optimiser annonces et landing pages](https://support.google.com/google-ads/answer/6238826).

## Changements réalisés sur le site

- Titre principal explicite, services accessibles plus tôt, CTA « Contacter Amin sur WhatsApp ».
- Indication honnête : « Le message est déjà prêt. Appuyez sur Envoyer dans WhatsApp. »
- Téléphone et Google Maps au premier écran ; bouton WhatsApp mobile fixe conservé.
- Suppression des champs à compléter dans les onze liens WhatsApp.
- Trois réponses courtes sur le tarif, la compatibilité et les informations nécessaires, sous forme de sections dépliables.
- Variantes d’arrivée par service, sans supprimer les autres prestations.
- Événements GA4 whatsapp_click, phone_click et directions_click, avec placement, landing_service et funnel_version=contact_v2. Le service est aussi envoyé pour WhatsApp. Aucun texte libre du visiteur n’est ajouté à ces événements.

Les tests locaux vérifient les onze liens, les cinq variantes, les paramètres invalides, l’émission d’un événement par clic et le fonctionnement sans Analytics. La réception dans votre propriété GA4 doit encore être vérifiée dans Realtime/DebugView. [Documentation GA4](https://developers.google.com/analytics/devguides/collection/ga4/events).

## Liens à utiliser dans les groupes d’annonces

| Groupe | URL finale |
|---|---|
| Général | https://amin-auto-diag.vercel.app/ |
| Diagnostic | https://amin-auto-diag.vercel.app/?service=diagnostic |
| Clés | https://amin-auto-diag.vercel.app/?service=cles |
| FAP / EGR / AdBlue | https://amin-auto-diag.vercel.app/?service=fap |
| Puissance / couple | https://amin-auto-diag.vercel.app/?service=puissance |
| CarPlay / GPS | https://amin-auto-diag.vercel.app/?service=carplay |

Chaque lien adapte le titre, le texte d’introduction et les boutons WhatsApp généraux. Les cartes gardent leur propre message. Conserver l’auto-tagging Google Ads ; si des UTM sont utilisés, les ajouter avec & après service. Les annonces elles-mêmes n’ont pas été modifiées.

Démarrer avec les intentions précises : « diagnostic auto meknes », « programmation clé voiture meknes », « activation carplay meknes ». Ce sont des propositions de ciblage, pas des mots-clés dont le volume a été vérifié. Ne pas multiplier les groupes sans budget suffisant. Éviter les promesses non confirmées comme « toutes marques », « réponse immédiate », « gratuit » ou un prix inventé.

Pour un atelier local, vérifier le ciblage Meknès et choisir « Présence : personnes situées dans vos zones ciblées ou qui s’y rendent régulièrement ». Examiner les lieux réels des visiteurs : cette détection n’est pas parfaite. [Réglage officiel](https://support.google.com/google-ads/answer/9376662).

Examiner les recherches liées à l’achat de matériel, la formation, l’emploi ou le téléchargement : « acheter valise diagnostic », « formation diagnostic », « emploi », « logiciel gratuit ». Ajouter seulement les exclusions pertinentes ; ne pas exclure globalement « prix », « clé », « diagnostic » ou « valise » sans examiner l’intention. Mettre les assets d’appel et de localisation au service de l’atelier. Les images d’annonce doivent rester cohérentes avec la prestation.

## WhatsApp : le bon fonctionnement

Le site ouvre une conversation avec du texte prérempli. Il ne peut pas appuyer sur Envoyer à la place du visiteur. Une ouverture de chat n’avertit donc pas automatiquement Amin. [Click to chat officiel](https://faq.whatsapp.com/5913398998672934).

Message général désormais utilisé :

> Bonjour Amin Auto Diagnostic, je souhaite me renseigner pour mon véhicule. Pouvez-vous me conseiller ?

Exemple pour les clés :

> Bonjour Amin Auto Diagnostic, je souhaite programmer une clé pour mon véhicule. Est-ce possible chez vous ?

Dans WhatsApp Business, ouvrir Outils → Message d’accueil et activer cette réponse proposée :

> Bonjour et bienvenue chez Amin Auto Diagnostic à Meknès. Merci pour votre message ! Nous vous répondons dès que possible. Vous pouvez déjà nous envoyer le modèle de votre véhicule ou une photo du voyant.

Cet accueil se déclenche après un message reçu d’un nouveau client, ou après 14 jours d’inactivité, selon les destinataires configurés. Il ne répond pas à chaque message. Le téléphone doit être connecté. Il n’a pas été activé depuis ce projet. [Configuration officielle](https://faq.whatsapp.com/501866148528310/?cms_platform=android).

Prévoir également une réponse d’absence selon vos horaires réels. Ne pas annoncer un délai avant de pouvoir le tenir. Pour la réponse humaine : demander d’abord le modèle et le besoin, puis seulement les détails utiles ; proposer ensuite un créneau et envoyer l’itinéraire. Utiliser les libellés « Nouveau contact », « À qualifier », « Rendez-vous », « Venu à l’atelier » pour suivre le résultat. Éviter de demander d’emblée une longue liste d’informations.

## Mesure et priorités suivantes

Dans GA4, contrôler les trois événements et créer les dimensions personnalisées service, placement, landing_service et funnel_version si vous souhaitez les utiliser dans les rapports. [Paramètres personnalisés](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters).

Ne pas compter une ouverture WhatsApp comme un rendez-vous ou une conversation reçue. On peut suivre whatsapp_click comme micro-conversion, mais conserver le suivi des vraies conversations. Éviter de compter simultanément le clic sortant automatique GA4 et whatsapp_click comme deux conversions pour la même action.

Suivre chaque semaine :

1. Sessions issues de Google Ads et sessions avec au moins un clic WhatsApp : taux de clic contact, sans doubler les visiteurs qui cliquent plusieurs fois.
2. Conversations réellement reçues et qualifiées : véhicule, service et zone compatibles.
3. Rendez-vous pris, passages réels et dépenses publicitaires.
4. Coût par conversation qualifiée et coût par passage, puis marge lorsque disponible.

Sans rapprochement fiable, un nombre quotidien de conversations WhatsApp ne permet pas d’attribuer précisément tous les messages à Google Ads. Une question simple sur la provenance aide ; une intégration CRM/offline pourra venir plus tard. Le site ne lit pas les messages WhatsApp et ne confirme pas leur envoi.

Priorité suivante : obtenir des photos réelles de l’entrée, du technicien et d’une intervention autorisée, le quartier/adresse exacte, les horaires et des avis clients vérifiables. Les images IA actuelles sont signalées comme illustrations et ne constituent pas une preuve du travail de l’atelier. Le logo PNG fait environ 567 Ko pour un affichage de 64 px : une version web optimisée est aussi une piste technique, sans chiffre de vitesse promis et sans audit Lighthouse réalisé.

Pendant les 7 à 14 premiers jours, contrôler la qualité des recherches et la réception des événements. Ce délai sert au suivi opérationnel, pas à garantir une conclusion statistique. Comparer ensuite des périodes de trafic et budget comparables, ou organiser un véritable test A/B si le volume le permet. Ne pas augmenter fortement le budget uniquement parce que le score « Ad strength » est meilleur.

À confirmer par le propriétaire : horaires, délai habituel de réponse, 7 derniers jours de clics/dépenses, conversations reçues et rendez-vous. Aucun compte Ads ni paramètre WhatsApp Business n’a été modifié par cet audit.
