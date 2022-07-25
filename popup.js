const clearBtn = document.getElementById('clearBtn');
const addBtn = document.getElementById('addBtn');

clearBtn.addEventListener( 'click', ()=> {
	chrome.storage.local.clear();
  chrome.storage.local.set({ 'hide': [] });
  window.close();
});

addBtn.addEventListener( 'click', ()=> {
  let cname = document.getElementById('cname');
  if (cname !== undefined && cname.value !== undefined && cname.value !== '') {
    readLocalStorage('hide')
      .then(hide_data => {
        hide_data.push(cname.value);
        //hide_data = hide_data + info.selectionText;
        chrome.storage.local.set({
          'hide': hide_data
        });
        const hideList = document.getElementById('hideList');
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(cname.value));
        hideList.appendChild(li);
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
    console.log('hide_data', hide_data);
    if (hide_data !== 'fail' && hide_data !== undefined && hide_data !== null) {
      const hideList = document.getElementById('hideList');
      for (i in hide_data) {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(hide_data[i]));
        hideList.appendChild(li);
      }
    }
  })

