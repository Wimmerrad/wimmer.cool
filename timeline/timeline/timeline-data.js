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
    "height": 760
  },
  "lines": [
    { "id": "mech", "label": "MECH", "name": "Mechanical age", "color": "orange" },
    { "id": "theory", "label": "IDEA", "name": "Ideas & logic", "color": "red", "start": "analytical-engine" },
    { "id": "elec", "label": "ELEC", "name": "Electronic era", "color": "sky", "start": "turing" },
    { "id": "chips", "label": "CHIP", "name": "Components", "color": "gold", "start": "eniac" },
    { "id": "net", "label": "NET", "name": "Networks", "color": "green", "start": "manchester-baby" }
  ],
  "types": [
    { "id": "led-to", "name": "Led to", "inverse": "Grew out of", "color": "white", "style": "dashed", "directed": true, "description": "One thing directly built on the other" },
    { "id": "influenced", "name": "Influenced", "inverse": "Influenced by", "color": "yellow", "style": "dashed", "directed": true, "description": "An idea or example that shaped later work" },
    { "id": "parallel", "name": "Parallel work", "color": "magenta", "style": "dashdot", "directed": false, "description": "Similar work done independently" },
    { "id": "people", "name": "Shared people", "color": "green", "style": "dotted", "directed": false, "description": "The same people were involved in both" }
  ],
  "points": [
    {
      "id": "jacquard", "line": "mech", "title": "Jacquard loom", "date": "1804", "circa": true,
      "caption": "Punched cards steer a loom",
      "summary": "A chain of punched cards tells a loom which threads to lift, so intricate patterns can be woven automatically.",
      "description": "Joseph Marie Jacquard's attachment read one card per row of the weave. Changing the pattern meant swapping the cards, not rebuilding the machine: an early form of a replaceable program.",
      "images": [{ "src": "images/punched-card.svg", "caption": "Each row of holes selects which threads are lifted.", "credit": "Illustration" }],
      "tags": ["punched cards"]
    },
    {
      "id": "difference-engine", "line": "mech", "title": "Difference Engine", "date": "1822",
      "summary": "Charles Babbage proposes a mechanical calculator to compute and print mathematical tables without human error."
    },
    {
      "id": "analytical-engine", "line": "mech", "title": "Analytical Engine", "date": "1837",
      "caption": "Designed, never finished",
      "summary": "Babbage designs a general-purpose mechanical computer, with a “store” for memory and a “mill” for arithmetic.",
      "description": "The engine was to be programmed with punched cards borrowed from the Jacquard loom. It was never completed in Babbage's lifetime, but its design already separated memory, processing, input and output.",
      "links": [{ "label": "Analytical Engine on Wikipedia", "url": "https://en.wikipedia.org/wiki/Analytical_engine" }]
    },
    {
      "id": "hollerith", "line": "mech", "title": "Hollerith tabulator", "date": "1890",
      "caption": "Counts the U.S. census",
      "summary": "Electric punched-card tabulators count the 1890 U.S. census far faster than hand tallying.",
      "description": "Herman Hollerith's company later merged into the firm that became IBM in 1924.",
      "tags": ["punched cards"]
    },
    {
      "id": "lovelace-notes", "line": "theory", "title": "Lovelace's Notes", "date": "1843",
      "caption": "The first published program",
      "summary": "Ada Lovelace's notes on the Analytical Engine include a method for computing Bernoulli numbers.",
      "description": "Lovelace translated Luigi Menabrea's article on the engine and added notes three times longer than the original.\n\nShe argued the machine could work on any symbols, not only numbers, and might one day compose music.",
      "links": [{ "label": "Ada Lovelace on Wikipedia", "url": "https://en.wikipedia.org/wiki/Ada_Lovelace" }]
    },
    {
      "id": "boole", "line": "theory", "title": "Laws of Thought", "date": "1854",
      "summary": "George Boole treats logic as algebra: statements become true or false, 1 or 0."
    },
    {
      "id": "turing", "line": "theory", "title": "On Computable Numbers", "date": "1936",
      "caption": "Turing's universal machine",
      "summary": "Alan Turing describes a universal machine that can imitate any other by reading its description from a tape.",
      "links": [{ "label": "Turing machine on Wikipedia", "url": "https://en.wikipedia.org/wiki/Turing_machine" }]
    },
    {
      "id": "shannon", "line": "theory", "title": "Logic in circuits", "date": "1938",
      "summary": "Claude Shannon shows that relay switching circuits can carry out Boolean algebra.",
      "description": "His MIT master's thesis, “A Symbolic Analysis of Relay and Switching Circuits”, turned logic into something you could wire."
    },
    {
      "id": "edvac-report", "line": "theory", "title": "The EDVAC report", "date": "1945-06-30",
      "caption": "Programs stored in memory",
      "summary": "John von Neumann describes a computer that keeps its program in the same memory as its data."
    },
    {
      "id": "z3", "line": "elec", "track": -1, "title": "Zuse Z3", "date": "1941-05-12",
      "caption": "Germany, built from relays",
      "summary": "Konrad Zuse's relay-based Z3, the first working programmable, fully automatic digital computer, is demonstrated in Berlin."
    },
    {
      "id": "colossus", "line": "elec", "track": 1, "title": "Colossus", "date": "1944-02",
      "caption": "Britain, wartime code-breaking",
      "summary": "At Bletchley Park, the first programmable electronic digital computer helps break German teleprinter ciphers."
    },
    {
      "id": "eniac", "line": "elec", "title": "ENIAC", "date": "1946-02", "end": "1955-10",
      "caption": "Programmed by rewiring",
      "summary": "The first programmable, general-purpose electronic digital computer is unveiled in Philadelphia and runs until 1955.",
      "description": "ENIAC was programmed by setting switches and rewiring plugboards, a job done largely by its six original programmers."
    },
    {
      "id": "manchester-baby", "line": "elec", "title": "Manchester Baby", "date": "1948-06-21",
      "caption": "First stored program runs",
      "summary": "The Small-Scale Experimental Machine becomes the first electronic stored-program computer to run a program."
    },
    {
      "id": "alto", "line": "elec", "title": "Xerox Alto", "date": "1973",
      "summary": "Xerox PARC's Alto pairs a mouse and a windowed graphical display with Ethernet networking."
    },
    {
      "id": "macintosh", "line": "elec", "title": "Macintosh", "date": "1984-01-24",
      "caption": "Windows and a mouse for everyone",
      "summary": "Apple brings the mouse-driven graphical interface pioneered at Xerox PARC to a mass-market personal computer."
    },
    {
      "id": "transistor", "line": "chips", "title": "The transistor", "date": "1947-12",
      "caption": "Replaces the vacuum tube",
      "summary": "At Bell Labs, John Bardeen and Walter Brattain build the first working transistor.",
      "images": [{ "src": "images/transistor.svg", "caption": "The transistor's circuit symbol.", "credit": "Illustration" }]
    },
    {
      "id": "ic", "line": "chips", "title": "Integrated circuit", "date": "1958-09-12",
      "summary": "Jack Kilby at Texas Instruments demonstrates a working integrated circuit; Robert Noyce devises a practical silicon version months later."
    },
    {
      "id": "intel-4004", "line": "chips", "title": "Intel 4004", "date": "1971-11-15",
      "caption": "A whole CPU on one chip",
      "summary": "The first commercially available single-chip microprocessor."
    },
    {
      "id": "arpanet", "line": "net", "title": "ARPANET", "date": "1969-10-29",
      "caption": "“LO”, then a crash",
      "summary": "A login attempt travels from UCLA to the Stanford Research Institute. The system crashes after two letters.",
      "images": [{ "src": "images/arpanet-1969.svg", "caption": "The four ARPANET sites connected by December 1969.", "credit": "Illustration" }]
    },
    {
      "id": "tcp", "line": "net", "title": "TCP described", "date": "1974-05",
      "summary": "Vint Cerf and Bob Kahn publish “A Protocol for Packet Network Intercommunication”, the basis of TCP/IP."
    },
    {
      "id": "www", "line": "net", "title": "World Wide Web", "date": "1989-03",
      "caption": "Proposed at CERN",
      "summary": "Tim Berners-Lee proposes a hypertext system for sharing documents over the internet.",
      "links": [{ "label": "The original proposal", "url": "https://www.w3.org/History/1989/proposal.html" }]
    }
  ],
  "connections": [
    { "id": "c1", "from": "jacquard", "to": "analytical-engine", "type": "influenced", "note": "Babbage planned to program his engine with Jacquard-style punched cards." },
    { "id": "c2", "from": "jacquard", "to": "hollerith", "type": "influenced", "note": "Hollerith used punched cards to store data rather than patterns." },
    { "id": "c3", "from": "boole", "to": "shannon", "type": "led-to", "note": "Shannon applied Boole's algebra to switching circuits." },
    { "id": "c4", "from": "hollerith", "to": "eniac", "type": "influenced", "note": "ENIAC read and punched IBM cards for input and output." },
    { "id": "c5", "from": "edvac-report", "to": "manchester-baby", "type": "led-to", "note": "The Baby was built to test a stored-program memory." },
    { "id": "c6", "from": "turing", "to": "manchester-baby", "type": "people", "note": "Turing joined the Manchester computing lab later in 1948." },
    { "id": "c7", "from": "z3", "to": "colossus", "type": "parallel", "note": "Built independently, on opposite sides of the war." },
    { "id": "c8", "from": "intel-4004", "to": "macintosh", "type": "led-to", "note": "Personal computers were built around single-chip microprocessors." },
    { "id": "c9", "from": "alto", "to": "macintosh", "type": "influenced", "note": "Apple engineers toured Xerox PARC in 1979." },
    { "id": "c10", "from": "arpanet", "to": "tcp", "type": "led-to" },
    { "id": "c11", "from": "tcp", "to": "www", "type": "led-to", "note": "The Web runs on top of the internet's TCP/IP." }
  ]
};
