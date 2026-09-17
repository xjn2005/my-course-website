# Paper-style course home

## Scope

Refresh the course website's shared presentation so its content sits on a centered white page against a pale gray canvas. Remove the blog from the public site. Rename the general course-policy page to **General Information** and make its content applicable to any course.

## Layout and visual treatment

- On desktop, `site-shell` is a white paper panel with a restrained border and shadow, centered within a pale gray page background.
- The existing readable content width and responsive mobile layout remain. On small screens, the panel becomes edge-to-edge and drops its ornamental chrome.
- Typography, course listings, course subpages, and existing accent links retain their current visual language.

## Information architecture

- The home page continues to list course archives by semester.
- Its only supplemental link is **General Information**.
- The former Blog link, index route, post route, and blog content collection are removed.
- The general-information page links back to the course home.

## General Information content

The page groups universal course guidance into four brief sections:

1. **Course Participation** — expectations for attendance, preparation, and respectful classroom engagement.
2. **Assessment and Submission** — following assignment requirements and submitting work by announced deadlines.
3. **Academic Integrity** — original work, appropriate citation, permitted collaboration, and transparent use of external or AI tools.
4. **Communication** — checking course announcements and contacting the instructor early when help or clarification is needed.

## Validation

Run the production build to confirm all remaining routes render and the removed blog collection has no active references.
