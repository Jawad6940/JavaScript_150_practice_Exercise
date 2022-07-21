let panels = document.querySelectorAll(".panel");
// console.log('panels :>> ', panels[0]);
// console.log('panel :>> ', panels);
let hi= document.getElementById("hi")
console.log('h2 :>> ', hi.innerText);

panels.forEach((i) => {
    i.children[0].style.display="none";
  });

hi.style.display="block";
console.log('h2 :>> ', hi);

panels.forEach((i) => {
  i.addEventListener("click", () => {
    remove();
    i.classList.add("active");
    i.children[0].style.display="block";
  });
});

let remove = () => {
  panels.forEach((j) => {
   
    j.classList.remove("active");
    j.children[0].style.display="none";
  });
};
