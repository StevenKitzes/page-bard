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

document.getElementById('play-major').addEventListener('click', e => {
  scale = "major";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
document.getElementById('play-7').addEventListener('click', e => {
  scale = "7";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
document.getElementById('play-major-7').addEventListener('click', e => {
  scale = "major-7";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
document.getElementById('play-minor').addEventListener('click', e => {
  scale = "minor";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
document.getElementById('play-minor-7').addEventListener('click', e => {
  scale = "minor-7";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
document.getElementById('play-minor-major-7').addEventListener('click', e => {
  scale = "minor-major-7";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
