const text = `we-are/
├─ passionate-for/
│  └── digitality
│  └── food
├─ located-in/
│  └── tabakfabrik-linz
└─ opening-at/
   └── monday-friday-10am-5pm`

export const render = (parent) => {
    parent.textContent = "";
    const page = document.createElement("div");
    page.className = "page about"
    const span = document.createElement("span");
    span.classList.add("font-mono", "whitespace-pre-wrap");
    span.textContent = text;
    page.appendChild(span);
    parent.appendChild(page);
}