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
      "label": "MECH",
      "name": "Mechanical age",
      "color": "orange",
      "pos": {
        "x": 80,
        "y": 530
      }
    },
    {
      "id": "theory",
      "label": "IDEA",
      "name": "Ideas & logic",
      "color": "red",
      "start": "analytical-engine",
      "pos": {
        "x": 320,
        "y": 990
      }
    },
    {
      "id": "elec",
      "label": "ELEC",
      "name": "Electronic era",
      "color": "sky",
      "start": "turing",
      "pos": {
        "x": 1120,
        "y": 770
      }
    },
    {
      "id": "chips",
      "label": "CHIP",
      "name": "Components",
      "color": "gold",
      "start": "eniac",
      "pos": {
        "x": 1960,
        "y": 1062
      }
    },
    {
      "id": "net",
      "label": "NET",
      "name": "Networks",
      "color": "green",
      "start": "manchester-baby",
      "pos": {
        "x": 2170,
        "y": 1258
      }
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
      "title": "Jacquard loom",
      "date": "1804",
      "circa": true,
      "caption": "Punched cards steer a loom",
      "summary": "A chain of punched cards tells a loom which threads to lift, so intricate patterns can be woven automatically.",
      "description": "Joseph Marie Jacquard's attachment read one card per row of the weave. Changing the pattern meant swapping the cards, not rebuilding the machine: an early form of a replaceable program.",
      "images": [
        {
          "src": "images/getterrobo-2.webp"
        }
      ],
      "tags": [
        "punched cards"
      ],
      "mapImage": true,
      "look": "cover"
    },
    {
      "id": "difference-engine",
      "line": "mech",
      "title": "Difference Engine",
      "date": "1822",
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
      "title": "Analytical Engine",
      "date": "1837",
      "caption": "Designed, never finished",
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
      "title": "Hollerith tabulator",
      "date": "1890",
      "caption": "Counts the U.S. census",
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
      "id": "z3",
      "line": "elec",
      "track": -1,
      "title": "Zuse Z3",
      "date": "1941-05-12",
      "caption": "Germany, built from relays",
      "summary": "Konrad Zuse's relay-based Z3, the first working programmable, fully automatic digital computer, is demonstrated in Berlin."
    },
    {
      "id": "colossus",
      "line": "elec",
      "track": 1,
      "title": "Colossus",
      "date": "1944-02",
      "caption": "Britain, wartime code-breaking",
      "summary": "At Bletchley Park, the first programmable electronic digital computer helps break German teleprinter ciphers."
    },
    {
      "id": "eniac",
      "line": "elec",
      "title": "ENIAC",
      "date": "1946-02",
      "end": "1955-10",
      "caption": "Programmed by rewiring",
      "summary": "The first programmable, general-purpose electronic digital computer is unveiled in Philadelphia and runs until 1955.",
      "description": "ENIAC was programmed by setting switches and rewiring plugboards, a job done largely by its six original programmers."
    },
    {
      "id": "manchester-baby",
      "line": "elec",
      "title": "Manchester Baby",
      "date": "1948-06-21",
      "caption": "First stored program runs",
      "summary": "The Small-Scale Experimental Machine becomes the first electronic stored-program computer to run a program."
    },
    {
      "id": "alto",
      "line": "elec",
      "title": "Xerox Alto",
      "date": "1973",
      "summary": "Xerox PARC's Alto pairs a mouse and a windowed graphical display with Ethernet networking."
    },
    {
      "id": "macintosh",
      "line": "elec",
      "title": "Macintosh",
      "date": "1984-01-24",
      "caption": "Windows and a mouse for everyone",
      "summary": "Apple brings the mouse-driven graphical interface pioneered at Xerox PARC to a mass-market personal computer."
    },
    {
      "id": "transistor",
      "line": "chips",
      "title": "The transistor",
      "date": "1947-12",
      "caption": "Replaces the vacuum tube",
      "summary": "At Bell Labs, John Bardeen and Walter Brattain build the first working transistor.",
      "images": [
        {
          "src": "images/transistor.svg",
          "caption": "The transistor's circuit symbol.",
          "credit": "Illustration"
        }
      ]
    },
    {
      "id": "ic",
      "line": "chips",
      "title": "Integrated circuit",
      "date": "1958-09-12",
      "summary": "Jack Kilby at Texas Instruments demonstrates a working integrated circuit; Robert Noyce devises a practical silicon version months later."
    },
    {
      "id": "intel-4004",
      "line": "chips",
      "title": "Intel 4004",
      "date": "1971-11-15",
      "caption": "A whole CPU on one chip",
      "summary": "The first commercially available single-chip microprocessor."
    },
    {
      "id": "arpanet",
      "line": "net",
      "title": "ARPANET",
      "date": "1969-10-29",
      "caption": "“LO”, then a crash",
      "summary": "A login attempt travels from UCLA to the Stanford Research Institute. The system crashes after two letters.",
      "images": [
        {
          "src": "images/arpanet-1969.svg",
          "caption": "The four ARPANET sites connected by December 1969.",
          "credit": "Illustration"
        }
      ]
    },
    {
      "id": "tcp",
      "line": "net",
      "title": "TCP described",
      "date": "1974-05",
      "summary": "Vint Cerf and Bob Kahn publish “A Protocol for Packet Network Intercommunication”, the basis of TCP/IP."
    },
    {
      "id": "www",
      "line": "net",
      "title": "World Wide Web",
      "date": "1989-03",
      "caption": "Proposed at CERN",
      "summary": "Tim Berners-Lee proposes a hypertext system for sharing documents over the internet.",
      "links": [
        {
          "label": "The original proposal",
          "url": "https://www.w3.org/History/1989/proposal.html"
        }
      ]
    },
    {
      "id": "new-point",
      "title": "New point",
      "date": "1891",
      "line": "mech"
    }
  ],
  "connections": [
    {
      "id": "c1",
      "from": "jacquard",
      "to": "analytical-engine",
      "type": "influenced",
      "note": "Babbage planned to program his engine with Jacquard-style punched cards."
    },
    {
      "id": "c2",
      "from": "jacquard",
      "to": "hollerith",
      "type": "influenced",
      "note": "Hollerith used punched cards to store data rather than patterns."
    },
    {
      "id": "c3",
      "from": "boole",
      "to": "shannon",
      "type": "led-to",
      "note": "Shannon applied Boole's algebra to switching circuits."
    },
    {
      "id": "c4",
      "from": "hollerith",
      "to": "eniac",
      "type": "influenced",
      "note": "ENIAC read and punched IBM cards for input and output."
    },
    {
      "id": "c5",
      "from": "edvac-report",
      "to": "manchester-baby",
      "type": "led-to",
      "note": "The Baby was built to test a stored-program memory."
    },
    {
      "id": "c6",
      "from": "turing",
      "to": "manchester-baby",
      "type": "people",
      "note": "Turing joined the Manchester computing lab later in 1948."
    },
    {
      "id": "c7",
      "from": "z3",
      "to": "colossus",
      "type": "parallel",
      "note": "Built independently, on opposite sides of the war."
    },
    {
      "id": "c8",
      "from": "intel-4004",
      "to": "macintosh",
      "type": "led-to",
      "note": "Personal computers were built around single-chip microprocessors."
    },
    {
      "id": "c9",
      "from": "alto",
      "to": "macintosh",
      "type": "influenced",
      "note": "Apple engineers toured Xerox PARC in 1979."
    },
    {
      "id": "c10",
      "from": "arpanet",
      "to": "tcp",
      "type": "led-to"
    },
    {
      "id": "c11",
      "from": "tcp",
      "to": "www",
      "type": "led-to",
      "note": "The Web runs on top of the internet's TCP/IP."
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
