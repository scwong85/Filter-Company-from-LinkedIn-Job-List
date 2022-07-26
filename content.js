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

const removeListItem = () => {
  let targetList = document.getElementsByClassName('jobs-search-results__list-item')
  readLocalStorage('hide')
    .then(hide_data => {
      for (var i = 0; i < targetList.length; i++) {
        targetList[i].style.display = "block";
      }

      if (hide_data !== 'fail' && hide_data !== undefined && hide_data !== null) {
        for(var j = 0; j < hide_data.length; j++) {
          for (var i = 0; i < targetList.length; i++) {
            let tmpCompany = targetList[i].getElementsByClassName('job-card-container__company-name') 
            if (tmpCompany !== undefined && tmpCompany.length > 0) {
              let companyName = tmpCompany[0].outerText;
              if(companyName.toLowerCase().includes(hide_data[j].toLowerCase())) {
                targetList[i].style.display = "none";
              } 
            }       
          }
        } 
      }
    })
}

const targetNode = document.body;

// Options for the observer (which mutations to observe)
// Set attributes to false if you do not care if existing nodes have changed,
//  otherwise set it true. 
const config = { attributes: false, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
  removeListItem();
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

chrome.storage.onChanged.addListener(function (changes, namespace) {
  removeListItem();
});