const task1 = document.getElementById('categories') as HTMLUListElement;
const task2 = document.getElementById('ingredients') as HTMLUListElement;
const task3 = document.getElementById('gallery') as HTMLUListElement;
const buttonIncrement = document.querySelector(
    '[data-action="increment"]'
) as HTMLButtonElement;
const buttonDecrement = document.querySelector(
    '[data-action="decrement"]'
) as HTMLButtonElement;

const counter = document.getElementById('value') as HTMLSpanElement;
const input = document.getElementById('name-input') as HTMLInputElement;
const fontSizeControlInput = document.getElementById(
    'font-size-control'
) as HTMLInputElement;
const fontSizeControlText = document.getElementById('text') as HTMLElement;
const nameOutput = document.getElementById('name-output') as HTMLElement;
const validationInput = document.getElementById(
    'validation-input'
) as HTMLInputElement;
const boxes = document.getElementById('boxes') as HTMLElement;
const controls = document.getElementById('controls') as HTMLElement;
const children = [...task1.children];
console.log(`В списке ${children.length} категории.`);
children.forEach((e: Element) => {
    console.log('Категория: ' + e.children[0].textContent);
    console.log('Количество элементов:' + e.children[1].children.length);
});
const ingredients = [
    'Картошка',
    'Грибы',
    'Чеснок',
    'Помидоры',
    'Зелень',
    'Приправы',
];

ingredients.forEach((element) => {
    const liElement = document.createElement('li');
    liElement.textContent = element;
    task2.appendChild(liElement);
});
const images = [
    {
        url: 'https://images.pexels.com/photos/140134/pexels-photo-140134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        alt: 'White and Black Long Fur Cat',
    },
    {
        url: 'https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        alt: 'Orange and White Koi Fish Near Yellow Koi Fish',
    },
    {
        url: 'https://images.pexels.com/photos/219943/pexels-photo-219943.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        alt: 'Group of Horses Running',
    },
];

const markup = images
    .map(
        ({ url, alt }) =>
            `<li ><img  height="360px" src=${url} alt=${alt}></li>`
    )
    .join('');

task3.insertAdjacentHTML('beforeend', markup);

buttonIncrement.addEventListener(
    'click',
    () => (counter.textContent = String(Number(counter.textContent) + 1))
);
buttonDecrement.addEventListener(
    'click',
    () => (counter.textContent = String(Number(counter.textContent) - 1))
);
input.addEventListener('input', (e) => {
    nameOutput.textContent = (e.target as HTMLInputElement).value;
    if ((e.target as HTMLInputElement).value === '') {
        nameOutput.textContent = 'незнакомец';
    }
});
input.addEventListener('blur', (e) => {
    nameOutput.textContent = 'незнакомец';
    (e.target as HTMLInputElement).value = '';
});
validationInput.addEventListener('blur', (e) => {
    const target = e.target as HTMLInputElement;

    target.className = '';
    target.value.length === Number(target.dataset.length)
        ? target.classList.add('valid')
        : target.classList.add('invalid');
});
fontSizeControlInput.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;

    fontSizeControlText.style.fontSize = target.value + 'px';
});
const randomBetween = (min: number, max: number) =>
    min + Math.floor(Math.random() * (max - min + 1));

const nodeList = [...controls.children];
const inputControl = nodeList[0];
const buttonCreate = nodeList[1];
const buttonDestroy = nodeList[2];
function destroyBoxes() {
    boxes.innerHTML = '';
}

buttonDestroy.addEventListener('click', () => destroyBoxes());
buttonCreate.addEventListener('click', () => {
    const count = isNaN((inputControl as HTMLInputElement).valueAsNumber)
        ? 0
        : (inputControl as HTMLInputElement).valueAsNumber;

    const markupArray: string[] = [];

    if (count === 0) {
        return;
    }
    for (let i = 0; i < count; i++) {
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
        const rgb = `rgb(${r},${g},${b})`;
        const markup = `<div style="
        background-color: ${rgb};
        width: ${30 + 10 * i}px;
        height: ${30 + 10 * i}px;
    "></div>`;
        markupArray.push(markup);
    }
    console.log(markupArray);
    const markup = markupArray.join(' ');
    boxes.insertAdjacentHTML('beforeend', markup);
});
