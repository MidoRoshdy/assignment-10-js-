var bookMarkName = document.getElementById("bookmarkName");
var bookMarkURL = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");

// Load bookmarks from localStorage
function loadBookmarks() {
  var savedBookmarks = localStorage.getItem("bookmarks");
  if (savedBookmarks) {
    tableContent.innerHTML = savedBookmarks;
    Array.from(tableContent.children).forEach((row) => {
      var deleteButton = row.querySelector(".btn-danger");
      deleteButton.onclick = function () {
        tableContent.removeChild(row);
        localStorage.setItem("bookmarks", tableContent.innerHTML);
      };
    });
  }
}

function addBookmark() {
  var name = bookMarkName.value.trim();
  var url = bookMarkURL.value.trim();

  if (!name || !url) {
    alert("Please fill in both fields.");
    return;
  }

  //  validate URL
  var urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-]*)*\/?$/;
  if (!urlPattern.test(url)) {
    alert("Please enter a valid URL.");
    return;
  }

  // Create a new row
  var newRow = document.createElement("tr");

  // Create index cell
  var indexCell = document.createElement("td");
  indexCell.innerText = tableContent.children.length + 1;
  newRow.appendChild(indexCell);

  // Create name cell
  var nameCell = document.createElement("td");
  nameCell.innerText = name;
  newRow.appendChild(nameCell);

  // Create visit cell
  var visitCell = document.createElement("td");
  var visitLink = document.createElement("a");
  visitLink.href = url.startsWith("http") ? url : "http://" + url;
  visitLink.className = "btn btn-warning";
  visitLink.target = "_blank";
  visitLink.innerText = "Visit";
  visitCell.appendChild(visitLink);
  newRow.appendChild(visitCell);

  // Create delete cell
  var deleteCell = document.createElement("td");
  var deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger";
  deleteButton.innerText = "Delete";
  deleteButton.onclick = function () {
    tableContent.removeChild(newRow);
    localStorage.setItem("bookmarks", tableContent.innerHTML);
  };
  deleteCell.appendChild(deleteButton);
  newRow.appendChild(deleteCell);

  // Append the new row to the table
  tableContent.appendChild(newRow);

  // Save to localStorage
  localStorage.setItem("bookmarks", tableContent.innerHTML);

  // Clear the input fields
  bookMarkName.value = "";
  bookMarkURL.value = "";
}

// Call loadBookmarks on page load
window.onload = loadBookmarks;
