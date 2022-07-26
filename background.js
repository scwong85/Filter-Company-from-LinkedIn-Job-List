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

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.clear();
  chrome.contextMenus.create({
		id: 'hide',
		title: "Hide!: %s",
		contexts: ["selection"]
	});
  chrome.storage.local.set({ 'hide': [] });

});

chrome.contextMenus.onClicked.addListener( ( info, tab ) => {
  readLocalStorage('hide')
    .then(hide_data => {
      if (hide_data !== 'fail' && hide_data !== undefined && hide_data !== null) {
        if (hide_data.indexOf(info.selectionText) === -1 ) {
          hide_data.push(info.selectionText);
          chrome.storage.local.set({
            'hide': hide_data
          });
        }
      }
      return true;
    })
    .catch(err => {});
});

