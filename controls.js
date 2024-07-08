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
  })
}

function reportError(e) {
  alert('error trying to songify page! ' + e.toString());
}
function hideMenu() {
  document.getElementById('page-song-body').style.display = "none";
}

document.getElementById('play-domain').addEventListener('click', e => {
  hideMenu();
  scale = "domain";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
document.getElementById('play-ionian').addEventListener('click', e => {
  hideMenu();
  scale = "ionian";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
document.getElementById('play-dorian').addEventListener('click', e => {
  hideMenu();
  scale = "dorian";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
document.getElementById('play-phrygian').addEventListener('click', e => {
  hideMenu();
  scale = "phrygian";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
document.getElementById('play-lydian').addEventListener('click', e => {
  hideMenu();
  scale = "lydian";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
document.getElementById('play-mixolydian').addEventListener('click', e => {
  hideMenu();
  scale = "mixolydian";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
document.getElementById('play-aeolian').addEventListener('click', e => {
  hideMenu();
  scale = "aeolian";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
document.getElementById('play-locrian').addEventListener('click', e => {
  hideMenu();
  scale = "locrian";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
