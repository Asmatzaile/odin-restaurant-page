export const render = (parent) => {
    parent.textContent = "";
    const page = document.createElement("div");
    page.className = "page home"
    const title = document.createElement("h1");
    title.textContent = "Just Digital Restaurant";
    page.appendChild(title);
    parent.appendChild(page);
}