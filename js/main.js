// Listen for form submission
document.getElementById('form').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  // Grab the values passed in the inputs
  // to get the value rather than the element put in .value
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;

  // Validates if the bookmarks validation function is not true return false
  if(!validateBookmarks(siteName, siteURL)) {
    return false;
  }

  // Creates object array for bookmark
  var bookmark = {
    name: siteName,
    url: siteURL
  }

 // If local storage with bookmark is null we initialise it into an array, then create an empty array called bookmarks and push the bookmark objects into the empry array
  if(localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);

    // Set to local storage by parsing JSON to a string
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
   // Get bookmarks from local storage if not empty
   // Since this is already a string we need to parse it to JSON
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

   // Add the bookmark to array
   bookmarks.push(bookmark);
   // Reset it back to local storage
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form upon submit
  document.getElementById('form').reset();

  // Allows to display back the updated function of fetchBookmarks
  fetchBookmarks();
  // Prevents the form from submitting
  e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url) {
  // Getting bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through bookmarks
  for(var i = 0; i < bookmarks.length; i++) {
    // if the current object of bookmarks equals to the url we separate it
    if(bookmarks[i].url == url) {
     bookmarks.splice(i, 1); 
    }
  }

  // Re-sets back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Displays saved bookmarks below
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // After we get the bookmarks array we can print them out
  var bookmarkResults = document.getElementById('bookMarkResults'); 

  // Build output
  bookmarkResults.innerHTML = '';

  // Loop through bookmarks in local storage and output in the div 
  for(var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    /// Call the bookmarks array and push bookmark into that array and append this to div with +=
    bookmarkResults.innerHTML += '<div class="bookmark-group">'+
                                 '<h3>'+name+'</h3>'+
                                 '<button name="button"><a target="_blank" href="'+url+'">Visit</a></button>'+
                                 '<button onclick="deleteBookmark(\''+url+'\')" name="button"><a href="#">Delete</a></button>'+
                                 '</div>';
  }
}

function validateBookmarks(siteName, siteURL) {
  // Bookmark validation
  if(!siteName && !siteURL) {
    document.getElementById('errorFillform').innerHTML = 'Please fill in the form below';
    return false;
  } else if(siteName == null || siteName == '') {
    document.getElementById('errorSite').innerHTML = 'Must include website name';
    return false;
  } else if(siteURL == null || siteURL == '') {
    document.getElementById('errorURL').innerHTML = 'Must include website URL';
    return false;
  }

  // Regular Expression validation
  var expressionURL = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
  var regex = new RegExp(expressionURL);

  if(!siteURL.match(regex)) {
    errorURL.style.display = 'none';
    document.getElementById('errorRegURL').innerHTML = 'Invalid URL';
    return false;
  }
  // When inputs succeed hide away all shown error messages
  errorFillform.style.display = 'none';
  errorSite.style.display = 'none';
  errorURL.style.display = 'none';
  errorRegURL.style.display = 'none';
  return true;
}
