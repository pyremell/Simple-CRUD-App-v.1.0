const app = new (function () {
  this.el = document.getElementById('entries');
  this.entries = [];

  // Fetch all the entries (Read)
  this.FetchAll = function () {
    let data = ''; // Store all entries here

    // Create table row and table cells for edit and delete and store them in data variable
    if (this.entries.length > 0) {
      for (let i = 0; i < this.entries.length; i++) {
        data += '<tr>';
        data += '<td>' + (i + 1) + '. ' + this.entries[i] + '</td>';
        data +=
          '<td><button onclick="app.Edit(' +
          i +
          ')" class="btn btn-warning">Edit</button></td>';
        data +=
          '<td><button onclick="app.Delete(' +
          i +
          ')" class="btn btn-danger">Delete</button></td>';
        data += '</tr>';
      }
    }
    this.Count(this.entries.length);
    return (this.el.innerHTML = data);
  };

  // Add new entry (Create)
  this.Add = function () {
    el = document.getElementById('add-tf');
    let entry = el.value;

    if (entry) {
      this.entries.push(entry.trim());
      el.value = '';
      this.FetchAll();
    }
  };

  // Edit an entry (Edit)
  this.Edit = function (item) {
    el = document.getElementById('edit-tf');
    this.el.value = this.entries[item];
    document.getElementById('edit-box').style.display = 'block';
    self = this;

    document.getElementById('save-edit').onsubmit = function () {
      let entry = el.value;

      if (entry) {
        self.entries.splice(item, 1, entry.trim());
        self.FetchAll();
        CloseInput();
      }
    };
  };

  // Remove an entry (Delete)
  this.Delete = function (item) {
    this.entries.splice(item, 1);
    this.FetchAll();
  };

  // Counter
  this.Count = function (data) {
    let el = document.getElementById('counter');

    let name = 'Entries';
    if (data) {
      if (data == 1) {
        name = 'Entry';
      }
      el.innerHTML = data + ' ' + name;
    } else {
      el.innerHTML = 'No ' + name;
    }
  };
})();

// Call this function to always update list
app.FetchAll();

function CloseInput() {
  document.getElementById('edit-box').style.display = 'none';
}
