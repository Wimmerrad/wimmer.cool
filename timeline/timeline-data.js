/* Timeline content. Edit it with timeline-editor.html, or by hand.
   Dates: "1804", "1945-06" or "1948-06-21" (negative years are BCE).
   Picture paths are relative to this folder. */
window.TIMELINE_DATA = {
  "settings": {
    "title": "Engines of Thought",
    "subtitle": "Example timeline. Open timeline-editor.html to replace it with your own.",
    "view": "map",
    "showTitle": true,
    "spacing": 210,
    "theme": "night",
    "height": "full"
  },
  "lines": [
    {
      "id": "mech",
      "label": "",
      "name": "Getter Robo",
      "color": "red",
      "pos": {
        "x": 130,
        "y": 650
      },
      "continues": false
    },
    {
      "id": "theory",
      "label": "",
      "name": "Brain's Base OVA Trilogy",
      "color": "red",
      "pos": {
        "x": 1030,
        "y": 1020
      }
    },
    {
      "id": "new-line",
      "label": "Toei",
      "name": "",
      "color": "orange",
      "pos": {
        "x": 130,
        "y": 1010
      },
      "continues": false
    }
  ],
  "types": [
    {
      "id": "led-to",
      "name": "Led to",
      "inverse": "Grew out of",
      "color": "white",
      "style": "dashed",
      "directed": true,
      "description": "One thing directly built on the other"
    },
    {
      "id": "influenced",
      "name": "Influenced",
      "inverse": "Influenced by",
      "color": "yellow",
      "style": "dashed",
      "directed": true,
      "description": "An idea or example that shaped later work"
    },
    {
      "id": "parallel",
      "name": "Parallel work",
      "color": "magenta",
      "style": "dashdot",
      "directed": false,
      "description": "Similar work done independently"
    },
    {
      "id": "people",
      "name": "Shared people",
      "color": "green",
      "style": "dotted",
      "directed": false,
      "description": "The same people were involved in both"
    }
  ],
  "points": [
    {
      "id": "jacquard",
      "line": "mech",
      "title": "Getter Robo",
      "date": "1974",
      "summary": "First entry in the Getter Robo Saga",
      "images": [
        {
          "src": "images/getterrobo-2.webp"
        }
      ],
      "mapImage": true,
      "look": "cover"
    },
    {
      "id": "difference-engine",
      "line": "mech",
      "title": "Getter Robo G",
      "date": "1975",
      "summary": "Charles Babbage proposes a mechanical calculator to compute and print mathematical tables without human error.",
      "images": [
        {
          "src": "images/getterrobog-2.jpg"
        }
      ],
      "look": "cover"
    },
    {
      "id": "analytical-engine",
      "line": "mech",
      "title": "Getter Robo Go",
      "date": "1991",
      "summary": "Babbage designs a general-purpose mechanical computer, with a “store” for memory and a “mill” for arithmetic.",
      "description": "The engine was to be programmed with punched cards borrowed from the Jacquard loom. It was never completed in Babbage's lifetime, but its design already separated memory, processing, input and output.",
      "links": [
        {
          "label": "Analytical Engine on Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Analytical_engine"
        }
      ],
      "images": [
        {
          "src": "images/getterrobogo.webp"
        }
      ],
      "mapImage": true,
      "look": "cover"
    },
    {
      "id": "hollerith",
      "line": "mech",
      "title": "Shin Getter Robo",
      "date": "1997",
      "summary": "Electric punched-card tabulators count the 1890 U.S. census far faster than hand tallying.",
      "description": "Herman Hollerith's company later merged into the firm that became IBM in 1924.",
      "tags": [
        "punched cards"
      ],
      "look": "cover",
      "images": [
        {
          "src": "images/shingetterobo.webp"
        }
      ]
    },
    {
      "id": "lovelace-notes",
      "line": "theory",
      "title": "Lovelace's Notes",
      "date": "1843",
      "caption": "The first published program",
      "summary": "Ada Lovelace's notes on the Analytical Engine include a method for computing Bernoulli numbers.",
      "description": "Lovelace translated Luigi Menabrea's article on the engine and added notes three times longer than the original.\n\nShe argued the machine could work on any symbols, not only numbers, and might one day compose music.",
      "links": [
        {
          "label": "Ada Lovelace on Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Ada_Lovelace"
        }
      ],
      "images": [
        {
          "src": "images/nigewaka-anime-2082798371321090545-01-ezgif-com--3.gif"
        }
      ],
      "mapImage": true
    },
    {
      "id": "boole",
      "line": "theory",
      "title": "Laws of Thought",
      "date": "1854",
      "summary": "George Boole treats logic as algebra: statements become true or false, 1 or 0."
    },
    {
      "id": "turing",
      "line": "theory",
      "title": "On Computable Numbers",
      "date": "1936",
      "caption": "Turing's universal machine",
      "summary": "Alan Turing describes a universal machine that can imitate any other by reading its description from a tape.",
      "links": [
        {
          "label": "Turing machine on Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Turing_machine"
        }
      ]
    },
    {
      "id": "shannon",
      "line": "theory",
      "title": "Logic in circuits",
      "date": "1938",
      "summary": "Claude Shannon shows that relay switching circuits can carry out Boolean algebra.",
      "description": "His MIT master's thesis, “A Symbolic Analysis of Relay and Switching Circuits”, turned logic into something you could wire."
    },
    {
      "id": "edvac-report",
      "line": "theory",
      "title": "The EDVAC report",
      "date": "1945-06-30",
      "caption": "Programs stored in memory",
      "summary": "John von Neumann describes a computer that keeps its program in the same memory as its data."
    },
    {
      "id": "getter-robo-arc",
      "title": "Getter Robo Arc",
      "date": "2001",
      "line": "mech",
      "look": "cover",
      "images": [
        {
          "src": "images/getterroboarc.jpg"
        }
      ]
    },
    {
      "id": "getter-robo-saga",
      "title": "Getter Robo Saga",
      "date": "1804",
      "pos": {
        "x": 350,
        "y": 300
      },
      "look": "cover",
      "images": [
        {
          "src": "images/getterrobosaga.jpg"
        }
      ],
      "summary": "Compilation of Getter Robo, G, Go, Shin, and Arc",
      "line": "mech"
    },
    {
      "id": "new-point",
      "title": "New point",
      "date": "1974",
      "line": "new-line",
      "look": "cover",
      "images": [
        {
          "src": "images/getterrobotoei.jpg"
        }
      ]
    },
    {
      "id": "new-point-2",
      "title": "New point",
      "date": "1975",
      "line": "new-line",
      "look": "cover",
      "images": [
        {
          "src": "images/getterrobogtoei.jpg"
        }
      ]
    },
    {
      "id": "new-point-3",
      "title": "New point",
      "date": "1991",
      "line": "new-line",
      "look": "cover",
      "images": [
        {
          "src": "images/getterrobogoanime.webp"
        }
      ]
    },
    {
      "id": "getter-robo-movie",
      "title": "Getter Robo (Movie)",
      "date": "1974",
      "pos": {
        "x": 140,
        "y": 1340
      },
      "line": "new-line",
      "look": "cover",
      "images": [
        {
          "src": "images/gettermovie.jpg"
        }
      ]
    },
    {
      "id": "great-mazinger-vs-getter-robo-g-kuuchuu-dai-geki",
      "title": "Great Mazinger vs. Getter Robo G: Kuuchuu Dai-Gekitotsu",
      "date": "1975",
      "pos": {
        "x": 570,
        "y": 1340
      },
      "line": "new-line",
      "look": "cover",
      "images": [
        {
          "src": "images/greatgetterg.webp"
        }
      ]
    },
    {
      "id": "grendizer-getter-robo-g-great-mazinger-kessen-da",
      "title": "Grendizer: Getter Robo G - Great Mazinger Kessen! Daikaijuu",
      "date": "1976",
      "pos": {
        "x": 790,
        "y": 1340
      },
      "line": "new-line",
      "look": "cover",
      "images": [
        {
          "src": "images/grendizergettergreat.jpg"
        }
      ]
    },
    {
      "id": "great-mazinger-vs-getter-robo",
      "title": "Great Mazinger vs. Getter Robo",
      "date": "1975",
      "pos": {
        "x": 350,
        "y": 1340
      },
      "line": "new-line",
      "look": "cover",
      "images": [
        {
          "src": "images/greatgetter.webp"
        }
      ]
    }
  ],
  "connections": [
    {
      "id": "c1",
      "from": "jacquard",
      "to": "getter-robo-saga",
      "type": "led-to",
      "fromEnd": [
        0,
        -119
      ],
      "toEnd": [
        0,
        157
      ]
    },
    {
      "id": "c2",
      "from": "analytical-engine",
      "to": "hollerith",
      "type": "led-to"
    },
    {
      "id": "c3",
      "from": "jacquard",
      "to": "new-point",
      "type": "parallel",
      "note": "Loose adaptation"
    },
    {
      "id": "c4",
      "from": "difference-engine",
      "to": "new-point-2",
      "type": "parallel",
      "note": "Loose adaptation"
    },
    {
      "id": "c5",
      "from": "analytical-engine",
      "to": "new-point-3",
      "type": "parallel",
      "note": "Loose adaptation"
    },
    {
      "id": "c6",
      "from": "new-point",
      "to": "getter-robo-movie",
      "type": "parallel",
      "note": "Theatrical release of episode 6"
    },
    {
      "id": "c7",
      "from": "new-point-2",
      "to": "great-mazinger-vs-getter-robo-g-kuuchuu-dai-geki",
      "type": "parallel"
    },
    {
      "id": "c8",
      "from": "new-point-2",
      "to": "grendizer-getter-robo-g-great-mazinger-kessen-da",
      "type": "parallel"
    },
    {
      "id": "c9",
      "from": "new-point",
      "to": "great-mazinger-vs-getter-robo",
      "type": "parallel"
    }
  ],
  "music": [
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/01 二つの銀河.flac",
      "size": 27045827,
      "duration": 255.68,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "二つの銀河",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 1,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/02 水没するディンギル星.flac",
      "size": 39812971,
      "duration": 384.6933333333333,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "水没するディンギル星",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 2,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/03 移動要塞.flac",
      "size": 21832974,
      "duration": 180.72,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "移動要塞",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 3,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/04 ハイパー放射ミサイル.flac",
      "size": 12843102,
      "duration": 115.30666666666667,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "ハイパー放射ミサイル",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 4,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/05 大魔神.flac",
      "size": 13692817,
      "duration": 149.05333333333334,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "大魔神",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 5,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/06 ファイナル ヤマト.flac",
      "size": 20473236,
      "duration": 237.05333333333334,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "ファイナル ヤマト",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 6,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/07 悲しみ.flac",
      "size": 25163969,
      "duration": 269.0933333333333,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "悲しみ",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 7,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/08 超巨大戦艦ガルンボルスト.flac",
      "size": 15887875,
      "duration": 144.04,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "超巨大戦艦ガルンボルスト",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 8,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/09 古代(おれ)とヤマト.flac",
      "size": 18980998,
      "duration": 193.09333333333333,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "古代(おれ)とヤマト",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 9,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/10 薄幸のディンギル少年.flac",
      "size": 22626846,
      "duration": 241.90666666666667,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "薄幸のディンギル少年",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 10,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/11 二人のコスモゼロ.flac",
      "size": 13917730,
      "duration": 118.64,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "二人のコスモゼロ",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 11,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/12 アクエリアス レクイエム.flac",
      "size": 19875605,
      "duration": 214.09333333333333,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "アクエリアス レクイエム",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 12,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/13 SYMPHONY OF THE AQUARIUS.flac",
      "size": 58137885,
      "duration": 589.8266666666667,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "SYMPHONY OF THE AQUARIUS",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 13,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/14 ディンギル少年のテーマ.flac",
      "size": 15918107,
      "duration": 184.46666666666667,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "ディンギル少年のテーマ",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 14,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/15 沖田(父)と古代(子).flac",
      "size": 28373021,
      "duration": 272.61333333333334,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "沖田(父)と古代(子)",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 15,
      "year": "2013"
    },
    {
      "src": "music/[J-SONGS][2013.11.20][COCX-37405] YAMATO SOUND ALMANAC 1983-II Final Yamato Music Collection Part 2/16 悲愴のボレロ.flac",
      "size": 22864050,
      "duration": 229.88,
      "format": "FLAC · 44.1 kHz · 16-bit · stereo",
      "title": "悲愴のボレロ",
      "artist": "シンフォニック・オーケストラ・ヤマト",
      "album": "YAMATO SOUND ALMANAC1983-II「宇宙戦艦ヤマト完結編 音楽集 Part2」",
      "track": 16,
      "year": "2013"
    }
  ]
};
