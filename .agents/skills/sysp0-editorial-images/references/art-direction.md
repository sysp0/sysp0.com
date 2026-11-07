# Art direction

## Visual language

- Warm ivory or very pale neutral background, close to the site's `#F6F5F2`.
- Deep indigo/navy architectural forms, close to `#191970`.
- Small, deliberate highlights in vivid orange, close to `#FB5607`.
- Translucent glass or clear acrylic objects can distinguish information, work items, or evidence from the surrounding structure.
- Tactile matte surfaces, precise edges, soft directional shadows, restrained depth, generous negative space.
- Quiet editorial polish. The image should feel considered and slightly surprising, not like stock art or a product screenshot.

`assets/brand-master.webp` establishes the palette, lighting, depth, and restraint. Its sculptural path, glass cubes, and orange focal cube are one geometric example, not a layout to repeat. Preserve the visual language through ivory space, navy structure, a small orange focus, and precise material rendering.

The two `style-reference-*` images are earlier visual references. They show palette, material, contrast, and restraint only. They are not layouts to reproduce. One uses branching channels and clustered blocks; the other uses a short conveyor and simple solids. Do not reuse either composition literally.

## Article headers and cards

The front matter `image:` is the article's header, blog card, and social preview. Keep it in the existing series of sculptural geometric covers: navy architectural shapes or paths, a few simple solids or translucent forms, warm ivory ground, and a small orange focal element. Choose a distinct geometry that hints at the article's central idea. The composition must read at thumbnail size. Do not use literal workspaces, documents, devices, or human figures as the main header subject.

## Images inside the article

Translate the specific argument of each section into one legible visual relationship. Start with its real action or decision, then choose an appropriate metaphor: documents, instruments, physical workspaces, human hands, architectural cutaways, or abstract forms. Change viewpoint, silhouette, scale, and focal placement from one image to the next. Keep only elements that help explain the section. Do not reuse the header image in the body.

For a software-factory article, recognizable issue cards, investigation tools, test evidence, a review gesture, and a return connection can show the workflow more clearly than a bare loop. A cutaway workspace can show infrastructure; a comparison instrument can show measurement. Make each image answer a different question. Keep the composition asymmetrical and airy; avoid rows of identical stations.

## Prompt and review

Describe the subject, its metaphor, composition, light, palette, materials, and intended crop. Explicitly forbid text, logos, watermarks, UI mockups, and common technology clichés such as robots, code rain, circuit boards, or glowing brains. Avoid adding a human figure unless the idea specifically needs a human decision point.

Check the result at small size: the main relationship should read immediately, the orange should remain an accent, and the background should leave the article breathing room. Regenerate with one targeted composition change if it looks too close to either reference or too busy.

## Asset use

Keep generated images inside `public/blog/images/` when an article references them. Prefer WebP for published assets; create a smaller variant if the blog index uses responsive artwork. Keep author-supplied diagrams separate and intact. Use descriptive, short alt text in the article.
