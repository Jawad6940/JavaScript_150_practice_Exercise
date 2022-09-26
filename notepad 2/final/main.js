showNotes();


// If user adds a note, add it to the localStorage

let addBtn = document.getElementById("btn");

addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.textContent);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.textContent = "";

//   console.log(notesObj);
  showNotes();
});
let optionsButtons = document.querySelectorAll(".option-button");
const modifyText = (command, defaultUi, value) => {
  //execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};
//For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
   console.log("click");
  });
});
// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
            <div>
                    <div id="note">
                        <h5>Note ${index + 1}</h5>
                       
                        <button id="${index}"onclick="deleteNote(this.id)" class="edit" >Delete Note</button>
                        <button id="${index}"onclick="editNote(this.id)" class="edit">Edit Note</button>
                      
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

function editNote(index){
    let notes = notesObj[index];

    let textarea = document.getElementById('addTxt');

    document.getElementById("addTxt").textContent="";

// ✅ Append text
textarea.textContent += notesObj[index];

const btn = document.getElementById('addBtn');

// ✅ Append text on button click
btn.addEventListener('click', function handleClick() {
  textarea.textContent += '';
});
    deleteNote(index);
}
