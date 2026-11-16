# Portfolio reference review

Reviewed 17 November 2026. These are observations from the authors' own sites, followed by decisions for this portfolio. The design retains the supplied academic layout and original research facts.

| Reference | Observed approach | Applied here |
| --- | --- | --- |
| [Jon Barron](https://jonbarron.info/) | Short biography, immediate CV/contact links, visual research entries with authors, venue/status, code and concise descriptions. | Research-first layout, consistent project entries, direct evidence links, one highlighted research project. |
| [Andrej Karpathy](https://karpathy.ai/) | Personal introduction, chronological experience, separately presented teaching and writing. | A clear introduction followed by selected work and a compact experience/education timeline. |
| [Chip Huyen](https://huyenchip.com/) | A direct description of focus, links to public tools and work, clear contact options. | Explain the research question in plain language and offer direct code, demo and contact links. |
| [Simon Willison](https://simonwillison.net/) | Working software, releases, tools and technical writing are directly linked and dated. | Keep implementation and demo links beside each project, plus current project status. A blog is deferred because no posts were supplied. |
| [Maggie Appleton](https://maggieappleton.com/) | Clear navigation distinguishes essays, notes, patterns and other kinds of work. | Separate research, selected projects, experience and contact, with section links. No empty writing sections. |

## Content decisions

- Keep the site in English, as supplied, for international research and engineering readers.
- Preserve manuscript-in-preparation and ongoing project labels. Do not present ongoing work as accepted publications.
- Keep the FAVOR result as a simulation result: 112 conditions, mean success 0.37 to 0.60, and 0.11 to 0.48 with a locked joint. These agree with the [public FAVOR results](https://github.com/lloydkwak/FAVOR#results). Real-robot validation remains in progress.
- Use the supplied CV and LaTeX sources for the role description on MakeYourBrick; do not add unverified affiliations, awards, collaborators or metrics.
- Preserve the original PDFs and project media. Thumbnails, results, individual contributions and source links carry the content.
- Keep dependencies at zero. The static site works without JavaScript; clips gain touch/keyboard controls with JavaScript. Reduced motion disables hover playback.
- Use the profile README as a short introduction and gateway to the full website. Replace the existing profile README completely, as requested by the owner.

## GitHub publication model

The personal site belongs in public repository `lloydkwak/lloydkwak.github.io`; the profile README belongs in `lloydkwak/lloydkwak`. These are separate repositories with separate purposes.

The website uses a Pages Actions workflow: validate local links and documents, package the public files, then deploy. Select **GitHub Actions** as the Pages source. Set the profile website field and repository homepage to `https://lloydkwak.github.io/` after deployment succeeds.

Official references:

- [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Managing your profile README](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme)
- [Updating the authenticated user's website field](https://docs.github.com/en/rest/users/users#update-the-authenticated-user)
