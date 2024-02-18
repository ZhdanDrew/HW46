// DOM - Document Object Model

const elements = new Array(12)
  .fill(1)
  .map(() => {
    const random = Math.floor(Math.random() * window.innerWidth);

    const div = document.createElement("div");

    div.onclick = (event) => {
      const { target } = event;
      const widthLength = target.style.width.length;

      const widthValue = +target.style.width.slice(0, widthLength - 2);

      const newValue = widthValue + 20;

      event.target.style.width = `${newValue}px`;
      div.style.background = `rgba(${newValue * 3.5}, ${
        newValue / 10
      }, ${60}, 0.5)`;

      event.target.textContent = newValue;
    };

    div.textContent = random;

    div.style.fontSize = "50px";
    div.style.setProperty("font-weight", "600");
    div.style.margin = "10px";
    div.style.padding = "10px";
    div.style.color = "white";
    div.style.transition = "0.5s all";
    div.style.background = `rgba(${random * 3.5}, ${random / 10}, ${60}, 0.5)`;
    div.style.width = `${random}px`;

    document.body.appendChild(div);

    return div;
  })
  .forEach((div) => {
    div.style.boxShadow = "0px 0px 10px 0.3px grey";

    div.ondblclick = () => {
      document.body.removeChild(div);
    };
  });

window;

// html
window.document;