let scale = null;

function songify(tabs) {
  if (!scale) {
    alert('no scale found!');
    return;
  }

  browser.tabs.sendMessage(tabs[0].id, {
    command: "songify",
    image: browser.runtime.getURL("icons/play-button-48.png"),
    stopImage: browser.runtime.getURL("icons/stop-button-48.png"),
    scale: scale
  });
}

function reportError(e) {
  alert('error trying to songify page! ' + e.toString());
}
function hideMenu() {
  document.getElementById('page-bard-body').style.display = "none";
}

document.getElementById('page-bard-info').addEventListener('click', e => {
  const deepDescription = document.getElementById('deep-description');
  const hidden = deepDescription.classList.contains('hidden');
  if (hidden) deepDescription.classList.remove('hidden');
  else deepDescription.classList.add('hidden');
});

document.getElementById('play').addEventListener('click', e => {
  hideMenu();
  scale = "domain";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
});
document.getElementById('play-custom').addEventListener('click', e => {
  hideMenu();
  scale = document.getElementById('select-mode').value || 'domain';
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
