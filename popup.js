const clearBtn = document.getElementById('clearBtn');
const addBtn = document.getElementById('addBtn');

const inputElem = document.getElementById("cname");
inputElem.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    if (inputElem !== undefined && inputElem.value !== undefined && inputElem.value !== '') {
      readLocalStorage('hide')
        .then(hide_data => {
          if (hide_data.indexOf(inputElem.value) === -1 ) {
            hide_data.push(cname.value);
            chrome.storage.local.set({
              'hide': hide_data
            });
            const hideList = document.getElementById('hideList');
            let li = addElement(inputElem.value);
            hideList.appendChild(li);
            inputElem.value = '';
          }
        })
    }
  }
});

clearBtn.addEventListener( 'click', ()=> {
	chrome.storage.local.clear();
  chrome.storage.local.set({ 'hide': [] });
  window.close();
});


const removeElement = (elem) => {
  readLocalStorage('hide')
    .then(hide_data => {
      var myIndex = hide_data.indexOf(elem);
      if (myIndex !== -1) {
        hide_data.splice(myIndex, 1);
      }
      if (hide_data.length == 0) {
        hide_data = [];
      }
      chrome.storage.local.set({
        'hide': hide_data
      });
    })
  location.reload();
}


const addElement = (elem) => {
  const li = document.createElement("li");
  const newDiv = document.createElement("div");
  const newContent = document.createTextNode(elem);
  const closeDiv = document.createElement("div");
  closeDiv.classList.add('close-div');
  closeDiv.appendChild(document.createTextNode("(remove)"));
  closeDiv.addEventListener( 'click', (event)=> {
    let cname = event.target.parentElement.textContent.replace('(remove)', '');
    removeElement(cname);
    let parent_elem = event.target.parentElement;
    let grandparent_elem = parent_elem.parentElement;
    grandparent_elem.parentNode.removeChild(grandparent_elem);
  });
  newDiv.appendChild(newContent);
  newDiv.appendChild(closeDiv);
  li.appendChild(newDiv);
  return li;
}

addBtn.addEventListener( 'click', ()=> {
  let cname = document.getElementById('cname');
  if (cname !== undefined && cname.value !== undefined && cname.value !== '') {
    readLocalStorage('hide')
      .then(hide_data => {
        if (hide_data.indexOf(cname.value) === -1 ) {
          hide_data.push(cname.value);
          chrome.storage.local.set({
            'hide': hide_data
          });
          const hideList = document.getElementById('hideList');
          let li = addElement(cname.value);
          hideList.appendChild(li);
          cname.value = '';
        }
      })
  }
});



const readLocalStorage = (key) => {
  return new Promise((resolve, reject) => {
		chrome.storage.local.get([key], function (result) {
			if (result[key] === undefined) {
				resolve('fail');
			} else {
				resolve(result[key]);
			}
    });
  });
};


readLocalStorage('hide')
  .then(hide_data => {
    if (hide_data !== 'fail' && hide_data !== undefined && hide_data !== null) {
      const hideList = document.getElementById('hideList');
      for (i in hide_data) {
        let li = addElement(hide_data[i]);
        hideList.appendChild(li);
      }
    }
  })

