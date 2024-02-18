const data = [
    { title: "Amazon", value: 100, x: 700, y: 400 },
    { title: "Google", value: 234, x: 10, y: 100 },
    { title: "Netflix", value: 70, x: 20, y: 150 },
    { title: "Facebook", value: 200, x: 90, y: 170 },
    { title: "Apple", value: 514, x: 20, y: 190 },
    { title: "Microsoft", value: 300, x: 150, y: 100 },
  ];
  
  class Graph {
    constructor(data, options) {
      this.data = data;
      this.options = options;
    }
  
    sort(isLeft, byValue = "value") {
      this.data.sort((e1, e2) =>
        isLeft ? e1[byValue] - e2[byValue] : e2[byValue] - e1[byValue]
      );
      return this;
    }
  
    render() {
      const { width, height, columnColors, parent, renderColumns } = this.options;
  
      if (this.graphWrapper) {
        parent.removeChild(this.graphWrapper);
      }
  
      this.graphWrapper = document.createElement("div");
  
      this.graphWrapper.style.display = "flex";
      this.graphWrapper.style.alignItems = "flex-end";
      this.graphWrapper.style.gap = "15px";
      this.graphWrapper.style.border = "3px dashed black";
      this.graphWrapper.style.width = `${width}px`;
      this.graphWrapper.style.height = `${height}px`;
      this.graphWrapper.style.overflow = "hidden";
  
      this.data.forEach((dataItem) => {
        const { title } = dataItem;
  
        renderColumns.forEach((dataItemKey, index) => {
          const dataItemElement = document.createElement("div");
  
          dataItemElement.style.height = `${dataItem[dataItemKey]}px`;
          dataItemElement.style.background = columnColors[index];
          dataItemElement.style.display = "flex";
          dataItemElement.style.alignItems = "flex-end";
          dataItemElement.style.padding = "0px 5px";
  
          dataItemElement.textContent = dataItemKey;
  
          if (index === 0) {
            dataItemElement.innerHTML += `<h6 style="transform: translateX(-20px) translateY(-${
              height - 50
            }px);">${title}</h6>`;
          }
  
          this.graphWrapper.appendChild(dataItemElement);
        });
      });
  
      parent.appendChild(this.graphWrapper);
      return this;
    }
  }
  
  const graph1 = new Graph(data, {
    width: 600,
    height: 500,
    columnColors: ["lightgray", "orange", "lightblue"],
    parent: document.getElementById("graph-wrapper"),
    renderColumns: [],
  })
    .sort(true, "x")
    .render();
  
  const widthInput = document.getElementById("width-input");
  const heightInput = document.getElementById("height-input");
  const applyButton = document.getElementById("apply-changes-button");
  const form = document.getElementById("form");
  
  widthInput.oninput = (event) => {
    graph1.options.width = event.target.value;
    graph1.render();
  };
  
  heightInput.oninput = (event) => {
    graph1.options.height = event.target.value;
    graph1.render();
  };
  
  ["value", "x", "y"].forEach((field) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
  
    checkbox.onchange = (event) => {
      console.log(event.target.checked, "!!!");
  
      if (event.target.checked) {
        graph1.options.renderColumns.push(field);
      } else {
        graph1.options.renderColumns = graph1.options.renderColumns.filter(
          (column) => column !== field
        );
      }
  
      graph1.render();
    };
  
    const span = document.createElement("span");
    span.textContent = field;
  
    form.appendChild(span);
    form.appendChild(checkbox);
  });
  
  const dt = { title: "Microsoft", value: 300, x: 150, y: 100 };
  
  // const dataForm = document.getElementById("create-graph-data");
  // dataForm.onsubmit = (event) => event.preventDefault();
  
  const createDataForm = {
    titleInput: document.getElementById("title-input"),
    valueInput: document.getElementById("value-input"),
    xInput: document.getElementById("x-input"),
    yInput: document.getElementById("y-input"),
  
    button: document.getElementById("create-graph-data-button"),
  };
  
  createDataForm.button.onclick = (event) => {
    const { titleInput, valueInput, xInput, yInput } = createDataForm;
  
    const newGraphData = {
      title: titleInput.value,
      value: +valueInput.value,
      x: +xInput.value,
      y: +yInput.value,
    };
  
    const { title, value, x, y } = newGraphData;
  
    if (!title || !value || !x || !y) {
      return alert("Please fill all the form fields");
    }
  
    graph1.data.push(newGraphData);
    console.log(graph1.data, "data");
  
    graph1.sort().render();
  
    // clean up the fields
    for (const key in createDataForm) {
      if (createDataForm[key].value) {
        createDataForm[key].value = "";
      }
    }
  };