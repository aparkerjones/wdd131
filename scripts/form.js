const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

const productSelect = document.querySelector("#productName");

if (productSelect) {
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;        // required: id as value [1](https://byui-cse.github.io/wdd131-ww-course/week05/assignment-05.html)
    option.textContent = product.name; // required: name as display [1](https://byui-cse.github.io/wdd131-ww-course/week05/assignment-05.html)
    productSelect.appendChild(option);
  });
}
