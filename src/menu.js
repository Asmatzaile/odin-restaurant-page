const menu = [
    {
        name: "Knobs",
        price: 7,
        tags: ["most popular"],
        description: "Exquisite knobs that will make your tastebuds explode."
    },
    {
        name: "Faders",
        price: 9,
        description: "Reinvention with simplicity in mind. Our well-known knobs are unrolled and then enhanced with smoked fish."
    },
    {
        name: "Screens",
        price: 12,
        tags: ["new!"],
        description: "Our most innovative and ambitious plate. We made checking the phone at meals a thing of the past. With the highest quality standards, so that not a shard remains."
    }
];

export const render = parent => {
    const itemEls = menu.map(item => {
        const name = document.createElement("h3");
        name.classList.add("text-32", "lowercase")
        name.textContent = item.name;
        item.tags = item.tags ?? []
        const tags = item.tags.map(tagText => {
            const tag = document.createElement("span");
            tag.classList.add("uppercase", "text-16", "tag");
            tag.textContent = tagText;
            return tag;
        });
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("flex", "items-baseline", "gap-8");
        titleDiv.append(name, ...tags);

        const price = document.createElement("span");
        price.classList.add("text-32", "justify-self-end")
        price.textContent = `${item.price}.-`;

        const description = document.createElement("p");
        description.classList.add("text-24", "lowercase", "font-light")
        description.textContent = item.description;

        const itemEl = document.createElement("div");
        itemEl.classList.add("menu-item")
        itemEl.append(titleDiv, price, description);
        return itemEl;
    });

    const menuContent = document.createElement("div");
    menuContent.classList.add("max-w-read", "menu-content");
    menuContent.append(...itemEls)

    const page = document.createElement("div");
    page.className = "page menu"
    page.append(menuContent);

    parent.textContent = "";
    parent.appendChild(page);
}
