import "./style.css"
import { render as renderHome } from "./home";
import { render as renderMenu } from "./menu";
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

let isScrambled = false;
let scrambleController = undefined;
let documentTitle;

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
const toggleScramble = () => {
    if (!isScrambled) documentTitle = document.title;
    isScrambled = !isScrambled;
    if (isScrambled) {
        scramble();
        const id = setInterval(scramble, 100);
        scrambleController = new AbortController;
        scrambleController.signal.addEventListener("abort", () => clearInterval(id));
    }
    else {
        scrambleController?.abort();
        document.title = documentTitle;
        render();
    }
}

const renderHeader = () => {
    const digitButton = createButton(digitButtonText, toggleScramble);
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
        case "Menu":
            return renderMenu(content);
        case "About":
            return renderAbout(content);
        default:
            content.textContent = "No content yet";
    }
}

function randomChar() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
    return chars[Math.floor(Math.random() * chars.length)];
}

const scrambleString = string => string.split("").map(c => (c.match(/\w/) ? randomChar() : c)).join("");

const scrambleNodeText = node => { // thanks for this, chattie
    if (node.nodeType === Node.TEXT_NODE) node.nodeValue = scrambleString(node.nodeValue)
    else node.childNodes.forEach(scrambleNodeText);
}

const scramble = () => {
    scrambleNodeText(document.body);
    document.title = scrambleString(document.title);
}

const render = () => {
    renderHeader();
    renderContent();
    if (isScrambled) scramble();
}

render();