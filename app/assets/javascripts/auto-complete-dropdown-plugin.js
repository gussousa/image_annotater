annotorious.plugin.AutoCompleteDropdown = function(opt_config_options) {
  this._annotation_array = [];
}


annotorious.plugin.AutoCompleteDropdown.prototype.onInitAnnotator = function(annotator) {
  var self = this;
  self._loadAnnotations(anno);
  autocomplete($(annotator.editor.element).find('textarea'), self._annotation_array );
}

annotorious.plugin.AutoCompleteDropdown.prototype._loadAnnotations = function(){
  var self = this;
  jQuery.getJSON('http://localhost:3000/items/get_labels_array1?id=6', function(data) {
  })

  // self._annotation_array.push('Dogs1', 'Cats');
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.bind("input", function(e) {
      var div_tag, input_tag, i, val = inp.val();
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      div_tag = document.createElement("DIV");
      div_tag.setAttribute("id", "autocomplete-list");
      div_tag.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(div_tag);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          input_tag = document.createElement("DIV");
          input_tag.innerHTML = arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          input_tag.innerHTML += "<input type='text' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          input_tag.addEventListener("click", function(e) {
              inp.val(this.getElementsByTagName("input")[0].value)
              closeAllLists();
          });
          debugger;
          div_tag.appendChild(input_tag);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.bind("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

// var countries =  []

// $.ajax({
//         type: "POST",
//         dataType: "json",
//         url: "/items/get_labels_array",
//         data: {
//           id: 6
//         },
//         success: function(data){
//           countries = data;
//         }
//       })
