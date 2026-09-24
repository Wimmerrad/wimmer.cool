/* Timeline content. Edit it with timeline-editor.html, or by hand.
   Dates: "1804", "1945-06" or "1948-06-21" (negative years are BCE).
   Picture paths are relative to this folder. */
window.TIMELINE_DATA = {
  "settings": {
    "title": "Getter Robo Timeline/Order",
    "subtitle": "",
    "view": "map",
    "showTitle": true,
    "spacing": 210,
    "theme": "night",
    "height": "full",
    "titlePos": {
      "x": 105,
      "y": 155
    },
    "player": false
  },
  "lines": [
    {
      "id": "mech",
      "label": "",
      "name": "Getter Robo Saga",
      "color": "red",
      "pos": {
        "x": 130,
        "y": 650
      },
      "continues": false,
      "circleText": "name"
    },
    {
      "id": "theory",
      "label": "",
      "name": "Brain's Base OVA Trilogy",
      "color": "green",
      "pos": {
        "x": 1010,
        "y": 1010
      },
      "circleText": "name",
      "continues": false
    },
    {
      "id": "new-line",
      "label": "Toei",
      "name": "",
      "color": "yellow",
      "pos": {
        "x": 130,
        "y": 1010
      },
      "continues": false,
      "circleText": "name"
    },
    {
      "id": "new-line-2",
      "label": "",
      "name": "Unrelated Spin-off manga",
      "color": "violet",
      "pos": {
        "x": 130,
        "y": 1730
      },
      "circleText": "name",
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
      "directed": false,
      "description": "One thing directly built on the other"
    },
    {
      "id": "influenced",
      "name": "Referenced",
      "inverse": "Influenced by",
      "color": "yellow",
      "style": "dashed",
      "directed": false,
      "description": "An idea or character that is seen in other works"
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
    },
    {
      "id": "new-kind",
      "name": "Part of",
      "color": "green",
      "style": "dashed",
      "directed": false
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
      "images": [
        {
          "src": "images/getterrobog-2.jpg"
        }
      ],
      "look": "cover",
      "summary": "Second entry in the Getter Robo Saga"
    },
    {
      "id": "analytical-engine",
      "line": "mech",
      "title": "Getter Robo Go",
      "date": "1991",
      "images": [
        {
          "src": "images/getterrobogo.webp"
        }
      ],
      "mapImage": true,
      "look": "cover",
      "summary": "Third entry in the Getter Robo Saga"
    },
    {
      "id": "hollerith",
      "line": "mech",
      "title": "Shin Getter Robo",
      "date": "1997",
      "look": "cover",
      "images": [
        {
          "src": "images/shingetterobo.webp"
        }
      ],
      "summary": "Fourth entry in the Getter Robo Saga"
    },
    {
      "id": "turing",
      "line": "theory",
      "title": "Getter Robo Armageddon",
      "date": "1998",
      "images": [
        {
          "src": "images/armageddon.webp"
        }
      ],
      "look": "cover"
    },
    {
      "id": "shannon",
      "line": "theory",
      "title": "Shin Getter Robo vs. Neo Getter Robo",
      "date": "2000",
      "look": "cover",
      "images": [
        {
          "src": "images/shinvsneo.webp"
        }
      ]
    },
    {
      "id": "edvac-report",
      "line": "theory",
      "title": "New Getter Robo",
      "date": "2004",
      "look": "cover",
      "images": [
        {
          "src": "images/newgetterrobo.webp"
        }
      ]
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
      ],
      "summary": "Fifth and last entry in the Getter Robo Saga"
    },
    {
      "id": "getter-robo-saga",
      "title": "Getter Robo Saga",
      "date": "2002",
      "pos": {
        "x": 790,
        "y": 250
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
      "id": "getter-robo-toei",
      "title": "Getter Robo (Toei)",
      "date": "1974",
      "line": "new-line",
      "look": "cover",
      "images": [
        {
          "src": "images/getterrobotoei.jpg"
        }
      ],
      "summary": "Loose adaptation of the Getter Robo manga",
      "description": "A mediocre show that is somewhat entertaining because of how absurd it is at times. It’s definitely nothing like the original manga, but the Toei version of the character kinda grew on me and is a fun part of Getter’s history. Though it is worth noting that this is the \"original\" vision of the Getter Robo project, and the manga version mostly came from Ken's creative freedom that he learned from Go Nagai, a very similar situation to Devilman."
    },
    {
      "id": "getter-robo-g-toei",
      "title": "Getter Robo G (Toei)",
      "date": "1975",
      "line": "new-line",
      "look": "cover",
      "images": [
        {
          "src": "images/getterrobogtoei.jpg"
        }
      ],
      "summary": "Second part of the Toei show",
      "description": "A mediocre follow-up to the original Toei show that doesn't bring anything new to the table outside of Benkei, which is a character that works well in the manga due to how calm and rational he is compared to Hayato and Ryoma, but here, since Ryoma and Hayato are rather calm, mostly just a bit eccentric, Benkei adds nothing and just acts as a boring, nature-loving asshole and a big brother for Genki. The other noteworthy addition is the shine spark move, which is a lot more iconic from the Toei version than the manga version. Other than that, it's just more of the same with less whackiness and just an overall bland episode; it lacks the so-bad-it's-good of the original, and it also lacks Musashi. The new bad guys also kinda sucks; no real stakes, it's pretty much just reskinned dinosaur people but treated as demons. Hidler was pretty fun though."
    },
    {
      "id": "getter-robo-go-toei",
      "title": "Getter Robo Go (Toei)",
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
      ],
      "summary": "Theatrical release of episode 6",
      "description": "A poorly made movie cut of Episode 6 of Getter Robo, with letterboxing hiding half of the screen, and it's also not a very good episode either."
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
      ],
      "description": "Another crossover movie, and not as good as the first one. I don't like the death of a certain character being reused as a lame plot point; he died saving the entire world, not from a random alien. There was barely any character interaction, too, mostly just fight scenes; it's whatever, just not canon and kinda mean.",
      "summary": "Crossover between Getter Robo G and Great Mazinger"
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
      ],
      "summary": "Crossover between Grendizer, Getter Robo G, and Great Mazinger",
      "description": "Fun crossover with surprisingly high production value, a nice big finale for anyone who watched the Mazinger trilogy and Getter Toei duology."
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
      ],
      "summary": "Crossover between Getter Robo G and Great Mazinger",
      "description": "A cute movie that doesn't overstay its welcome. I wish it had a bit more character interaction, as most of it is just fight scenes, but the new antagonist had a good design, and overall this is kind of a throwaway movie you aren't supposed to take seriously, just a fun time with your favourite characters from 1974. It's just kinda weird that they decided to make them both aware of each other from the get-go when we've never seen them mentioned in each other's show."
    },
    {
      "id": "getter-robo-arc-2021",
      "title": "Getter Robo Arc (Anime)",
      "date": "2021",
      "pos": {
        "x": 1230,
        "y": 260
      },
      "look": "cover",
      "images": [
        {
          "src": "images/getteroboarcanime.webp"
        }
      ]
    },
    {
      "id": "getter-robo-darkness",
      "title": "Getter Robo Darkness",
      "date": "2009",
      "line": "new-line-2",
      "look": "cover",
      "images": [
        {
          "src": "images/getterobodarkness2.webp"
        }
      ]
    },
    {
      "id": "dino-getter",
      "title": "Dino Getter",
      "date": "2014",
      "line": "new-line-2",
      "look": "cover",
      "images": [
        {
          "src": "images/dinogetter.jpg"
        }
      ]
    },
    {
      "id": "chikyuu-taisen",
      "title": "Chikyuu Taisen 2053",
      "date": "2026",
      "line": "new-line-2",
      "look": "cover",
      "images": [
        {
          "src": "images/chikyuu.webp"
        }
      ]
    },
    {
      "id": "getter-robo-anthology-shinka-no-ishi",
      "title": "Getter Robo Anthology: Shinka no Ishi",
      "date": "2008",
      "line": "new-line-2",
      "look": "cover",
      "images": [
        {
          "src": "images/getteroboanthology.webp"
        }
      ]
    },
    {
      "id": "devilman-vs-getter-robo",
      "title": "Devilman vs. Getter Robo",
      "date": "2010",
      "line": "new-line-2",
      "look": "cover",
      "images": [
        {
          "src": "images/getterobodevilman.jpg"
        }
      ]
    },
    {
      "id": "getter-robo-devolution-the-last-3-minutes-of-the",
      "title": "Getter Robo Devolution: The Last 3 Minutes of the Universe",
      "date": "2015",
      "line": "new-line-2",
      "images": [
        {
          "src": "images/getterobodevolution.jpg"
        }
      ],
      "look": "cover"
    },
    {
      "id": "maou-dante-vs-getter-robo-g",
      "title": "Maou Dante vs. Getter Robo G",
      "date": "2011",
      "line": "new-line-2",
      "look": "cover",
      "images": [
        {
          "src": "images/getterobogmaodante.jpg"
        }
      ]
    },
    {
      "id": "getter-robo-high",
      "title": "Getter Robo High",
      "date": "2016",
      "line": "new-line-2",
      "look": "cover",
      "images": [
        {
          "src": "images/getterobohigh.jpg"
        }
      ]
    },
    {
      "id": "mazinkaiser-vs-shin-getter-robo",
      "title": "Mazinkaiser vs. Shin Getter Robo",
      "date": "1998",
      "line": "new-line-2",
      "look": "cover",
      "images": [
        {
          "src": "images/getterobomazinkaiser.webp"
        }
      ]
    },
    {
      "id": "shin-getter-robo-ibun-try-to-remember",
      "title": "Shin Getter Robo!! Ibun: Try to Remember",
      "date": "2001",
      "line": "new-line-2",
      "look": "cover",
      "images": [
        {
          "src": "images/getterobostrangestory.jpg"
        }
      ]
    },
    {
      "id": "getter-robo",
      "title": "Getter Robo",
      "date": "1975",
      "line": "new-line-2",
      "look": "cover",
      "images": [
        {
          "src": "images/getterobotv.jpg"
        }
      ]
    },
    {
      "id": "change-getter-robo-crater-battle",
      "title": "Change!! Getter Robo: Crater Battle",
      "date": "1998",
      "line": "new-line-2",
      "look": "cover",
      "images": [
        {
          "src": "images/getterrobocrater.png"
        }
      ]
    },
    {
      "id": "honey-vs",
      "title": "Honey VS",
      "date": "2012",
      "line": "new-line-2",
      "look": "cover",
      "images": [
        {
          "src": "images/honeyvs.webp"
        }
      ]
    },
    {
      "id": "super-robot-retsuden",
      "title": "Super Robot Retsuden",
      "date": "2002",
      "line": "new-line-2",
      "look": "cover",
      "images": [
        {
          "src": "images/retsuden.jpg"
        }
      ]
    },
    {
      "id": "getter-robo-hien-the-earth-suicide",
      "title": "Getter Robo Hien: THE EARTH SUICIDE",
      "date": "2007",
      "line": "new-line-2",
      "images": [
        {
          "src": "images/earthsuicide.jpg"
        }
      ],
      "look": "cover"
    }
  ],
  "connections": [
    {
      "id": "c1",
      "from": "jacquard",
      "to": "getter-robo-saga",
      "type": "new-kind",
      "fromEnd": [
        0,
        -107
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
      "type": "people",
      "route": "straight"
    },
    {
      "id": "c3",
      "from": "jacquard",
      "to": "getter-robo-toei",
      "type": "parallel",
      "note": "Loose adaptation"
    },
    {
      "id": "c4",
      "from": "difference-engine",
      "to": "getter-robo-g-toei",
      "type": "parallel",
      "note": "Loose adaptation"
    },
    {
      "id": "c5",
      "from": "analytical-engine",
      "to": "getter-robo-go-toei",
      "type": "parallel",
      "note": "Loose adaptation"
    },
    {
      "id": "c6",
      "from": "getter-robo-toei",
      "to": "getter-robo-movie",
      "type": "parallel",
      "note": "Theatrical release of episode 6"
    },
    {
      "id": "c7",
      "from": "getter-robo-g-toei",
      "to": "great-mazinger-vs-getter-robo-g-kuuchuu-dai-geki",
      "type": "parallel"
    },
    {
      "id": "c8",
      "from": "getter-robo-g-toei",
      "to": "grendizer-getter-robo-g-great-mazinger-kessen-da",
      "type": "parallel"
    },
    {
      "id": "c9",
      "from": "getter-robo-toei",
      "to": "great-mazinger-vs-getter-robo",
      "type": "parallel"
    },
    {
      "id": "c10",
      "from": "getter-robo-arc",
      "to": "getter-robo-arc-2021",
      "type": "parallel",
      "toEnd": [
        0,
        160
      ]
    },
    {
      "id": "c11",
      "from": "difference-engine",
      "to": "getter-robo-saga",
      "type": "new-kind",
      "toEnd": [
        0,
        159
      ]
    },
    {
      "id": "c12",
      "from": "analytical-engine",
      "to": "getter-robo-saga",
      "type": "new-kind",
      "toEnd": [
        0,
        155
      ]
    },
    {
      "id": "c13",
      "from": "hollerith",
      "to": "getter-robo-saga",
      "type": "new-kind",
      "toEnd": [
        0,
        159
      ]
    },
    {
      "id": "c14",
      "from": "getter-robo-arc",
      "to": "getter-robo-saga",
      "type": "new-kind",
      "toEnd": [
        0,
        154
      ]
    },
    {
      "id": "c15",
      "from": "edvac-report",
      "to": "hollerith",
      "type": "influenced",
      "toEnd": [
        75,
        72
      ],
      "route": "straight",
      "bends": [
        [
          1667,
          840
        ],
        [
          1110,
          840
        ],
        [
          1110,
          722
        ]
      ],
      "note": "could be considered a loose adaptation of Shin Getter Robo"
    },
    {
      "id": "c16",
      "from": "getter-robo-toei",
      "to": "shannon",
      "type": "influenced",
      "toEnd": [
        -71,
        64
      ],
      "route": "straight",
      "bends": [
        [
          450,
          1083
        ],
        [
          450,
          1190
        ],
        [
          1070,
          1190
        ],
        [
          1070,
          1250
        ],
        [
          1340,
          1250
        ],
        [
          1340,
          1074
        ]
      ],
      "fromEnd": [
        74,
        73
      ],
      "note": "Texas Mack appears in Shin vs. Neo"
    },
    {
      "id": "c17",
      "from": "shannon",
      "to": "analytical-engine",
      "type": "influenced",
      "route": "straight",
      "toEnd": [
        73,
        77
      ],
      "bends": [
        [
          1450,
          880
        ],
        [
          890,
          880
        ],
        [
          890,
          727
        ]
      ],
      "note": "Could be considered a loose adaptation of Getter Robo Go"
    },
    {
      "id": "c18",
      "from": "mazinkaiser-vs-shin-getter-robo",
      "to": "hollerith",
      "type": "new-kind",
      "route": "straight",
      "fromEnd": [
        0,
        -107
      ],
      "bends": [
        [
          570,
          1570
        ],
        [
          910,
          1570
        ],
        [
          910,
          720
        ]
      ],
      "toEnd": [
        -73,
        70
      ]
    },
    {
      "id": "c19",
      "from": "change-getter-robo-crater-battle",
      "to": "hollerith",
      "type": "new-kind",
      "route": "straight",
      "bends": [
        [
          792,
          1570
        ],
        [
          910,
          1570
        ],
        [
          910,
          720
        ]
      ],
      "toEnd": [
        -72,
        70
      ]
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
  ],
  "texts": [
    {
      "id": "text",
      "text": "   Both featured at the \nend of Shin Getter Robo",
      "x": 610,
      "y": 1535,
      "color": "green",
      "size": 14,
      "italic": false
    }
  ]
};
