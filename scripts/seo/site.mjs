// Site-wide constants shared by every generator module.

/** Canonical origin of the site, without a trailing slash. */
export const SITE_URL = "https://edward-h26.github.io"

/** The interactive 3D portfolio, linked from the static profile, llms.txt, and robots.txt. */
export const SISTER_SITE_URL = "https://edward-h26.github.io/PersonalWebsite/"

/** Shared social card and its pixel size, used by the Open Graph and Twitter tags. */
export const OG_IMAGE = { url: `${SITE_URL}/images/og-card.png`, width: 1200, height: 630 }

/** One-line summary used as the home page description and the WebSite description. */
export const SITE_DESCRIPTION =
  "Qiran Hu, Columbia University M.S. student and University of Illinois Urbana-Champaign research assistant working on multimodal and 3D-aware generative AI."

/** Display names for the keys of PROFILE.social. */
export const SOCIAL_LABELS = { github: "GitHub", linkedin: "LinkedIn", x: "X", scholar: "Google Scholar" }
