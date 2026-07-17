const myLists = document.querySelector(".lists");
const dropdownbtn = document.querySelector(".fa-gear");

dropdownbtn.addEventListener("click", () => {
  DropDownLists();
});

function DropDownLists() {
  myLists.classList.toggle("click");
}
