# Connected Timeline

A transit-map style timeline for an existing HTML site, plus an editor that only you use. Each era or storyline is a coloured **line**, points are **stations** on it, and dashed **links** join stations on different lines.

## What's here

| File | Upload to your site? | What it is |
|---|---|---|
| `timeline/timeline.js` | Yes | Draws the timeline |
| `timeline/timeline.css` | Yes | Its styles, scoped so they won't clash with yours |
| `timeline/timeline-data.js` | Yes | Your lines, stations, links and settings |
| `timeline/images/` | Yes | Pictures and logos for your stations |
| `timeline-editor.html` | **No** | The editing tool. Keep it on your computer. |
| `example.html` | No | A sample page showing where the four lines go |

## Add it to a page

1. Copy the whole `timeline` folder into your site, next to the page.
2. Paste this where the timeline should appear:

```html
<link rel="stylesheet" href="timeline/timeline.css">
<div data-timeline></div>
<script src="timeline/timeline-data.js"></script>
<script src="timeline/timeline.js"></script>
```

Options on the `<div>`: `data-height="800"`, and `data-theme="paper"` for a light background.

## Edit your timeline

1. Keep `timeline-editor.html` next to a copy of the `timeline` folder, and open it in **Chrome or Edge**.
2. Click **Open timeline folder…** and choose the `timeline` folder inside your site.
3. Edit, and watch the preview on the right:
   - **Lines**: the label in the circle (like `U.C.`), a name, a colour, and where the line starts. A line can start below a station on another line, and can run on to the right edge.
   - **Points**: title, date, the text shown along the line, a caption under the station, pictures, links and tags. Set **Position** to put a station on a branch above or below the main line. Neighbouring stations on the same branch share one side track that leaves and rejoins the line.
   - **Connections** and **Connection kinds**: links between points, each kind with its own colour, line style and arrow.
   - Tick **Show the first picture on the map** to use a logo instead of the title text.
4. Click **Save** (Ctrl+S). The editor writes `timeline-data.js` and copies new pictures into `images/`.
5. Upload the changed files to your web host as you normally do.

Stations on a line are ordered by date. Any year number works, so invented calendars are fine: put the displayed text, like "Year 79: The One Year War", in **Text on the line**.

In Firefox or Safari the editor can't write to folders. There, **Save** downloads a new `timeline-data.js` to replace the old one, and pictures are stored inside that file.

## Who can edit

Your site is static: visitors can look, search, zoom and open stations, but nothing they do changes your files. Only someone who can change the files on your web host can change the timeline. Don't upload `timeline-editor.html`.

## Link to one station

Each point has a link name (shown in the editor). `yourpage.html#link-name` opens the page with that station selected.
