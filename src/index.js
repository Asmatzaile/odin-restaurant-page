import "./style.css"
import { render as renderHome } from "./home";
import { render as renderAbout } from "./about";

const pages = {
    options: ["Home", "Menu", "About"],
    _current: "Home",
    set current(value) {
        this._current = value;
        render();
    },
    get current() {return this._current}
}

const createButton = (content, action) => {
    const button = document.createElement("button");
    button.textContent = content;
    button.onclick = action;
    return button;
}
const createNav = () => {
    const nav = document.createElement("nav");
    const navButtons = pages.options.map(content => {
        const button = createButton(content, () => pages.current = content);
        if (content === pages.current) button.classList.add("selected");
        return button;
    });
    nav.append(...navButtons);
    return nav;
}

const header = document.querySelector("header");
const digitButtonText = "01101010";
const renderHeader = () => {
    const digitButton = createButton(digitButtonText);
    digitButton.classList.add("font-mono", "rounded-full")
    const nav = createNav();
    header.textContent = "";
    header.append(digitButton, nav);
}

const content = document.querySelector("#content");
const renderContent = () => {
    switch (pages.current) {
        case "Home":
            return renderHome(content);
        case "About":
            return renderAbout(content);
        default:
            content.textContent = "";
    }
}

const render = () => {
    renderHeader();
    renderContent();
}

render();