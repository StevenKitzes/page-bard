let scale = null;
let randomization = null;
let rests = null;
let restDuration = null;
let trills = null;
let scaleRuns = null;
let arpeggiation = null;
let attack = null;
let decay = null;
let oscillator = null;

function songify(tabs) {
  const warningText = [];

  if (!scale) warningText.push('No scale found!');
  if (!randomization) warningText.push('No randomization factor found!');
  if (!rests) warningText.push('No rests factor found!');
  if (!restDuration) warningText.push('No rest duration found!');
  if (!trills) warningText.push('No trills factor found!');
  if (!scaleRuns) warningText.push('No scale runs factor found!');
  if (!arpeggiation) warningText.push('No arpeggiation factor found!');
  if (!attack) warningText.push('No attack speed found!');
  if (!decay) warningText.push('No decay speed found!');
  if (!oscillator) warningText.push('No oscillator found!');

  if (warningText.length > 0) {
    alert(warningText.join(' '));
    return;
  }

  browser.tabs.sendMessage(tabs[0].id, {
    command: "songify",
    image: browser.runtime.getURL("icons/play-button-48.png"),
    stopImage: browser.runtime.getURL("icons/stop-button-48.png"),
    scale,
    randomization,
    rests,
    restDuration,
    trills,
    scaleRuns,
    arpeggiation,
    attack,
    decay,
    oscillator
  });

  hideMenu();
}

function reportError(e) {
  alert('error trying to songify page! ' + e.toString());
}
function hideMenu() {
  document.getElementById('page-bard-body').style.display = "none";
}

const hintDefs = [
  {
    buttonId: 'page-bard-info',
    hintCopy: "Welcome to Page Bard!  This extension reads the code that defines a website's structure (the HTML DOM) and generates a song from it.  Page Bard composes songs deterministically, meaning you get the same song for the same page every time.  It uses page elements and the website address to generate everything from the notes, to the pacing, to the key/scale in which a song will be composed.<br /><br />When you activate Page Bard, it will place an orange play button on your page in the upper right hand corner.  You can click this to play the song, then click again to stop if you want.  To listen again, you must refresh the page and start again."
  },
  {
    buttonId: 'scale-info-button',
    hintCopy: "Choose the scale for Page Bard to use when writing this page as a song.  By default, Page Bard will choose a scale based on characteristics of the page."
  },
  {
    buttonId: 'randomization-info-button',
    hintCopy: "The randomization factor determines the overall likelihood of special musical features being used in the page's composition.  In other words, how often will Page Bard choose arpeggiation, scale runs, rests, and other features besides simple musical notes?  Higher factors mean more special features; lower factors mean more plain notes."
  },
  {
    buttonId: 'rests-info-button',
    hintCopy: "In music, rests represent \"white space\" in a song.  In other words, it's like saying, take a break here where you could have played a note.  You can customize how often you want Page Bard to use rests."
  },
  {
    buttonId: 'rest-duration-info-button',
    hintCopy: "You can customize how long you'd like Page Bard to make its rests.  The duration of each rest will still vary at least a little bit based on characteristics of the page.  But here you can determine the maximum duration that Page Bard can make a rest.   (See the help blurb for 'rests' for more info.)"
  },
  {
    buttonId: 'trills-info-button',
    hintCopy: "A trill is like a flutter in the song.  It quickly alternates between two notes that are next to each other in the song's scale.  You can customize how often you want Page Bard to use trills."
  },
  {
    buttonId: 'scale-runs-info-button',
    hintCopy: "A scale run is when a few notes from the song's scale are played all in a row, in order.  A scale run might be played up the scale, or down the scale.  (Page Bard will decide this for you.)  You can customize how often you want Page Bard to use scale runs."
  },
  {
    buttonId: 'arpeggiation-info-button',
    hintCopy: "Arpeggiation is a little complicated if you're new to music theory, but here's a quick and dirty explanation for beginners.  When you play any note from a scale that a song is written with, it will usually sound good.  But if you use the first, third, and fifth  (and sometimes seventh) notes of the scale, that makes a chord, and chords sound the most like the <em>fundamental character</em> of the scale.  Now, if you play the notes of a chord all in a row in order, it's called an arpeggio, and it's like making the fundamental character of the scale into a melody.  It sounds pretty good!  An arpeggio can go up or down within the scale where it lives (Page Bard will decide this for you).  You can choose how often you want Page Bard to use this arpeggiation technique."
  },
  {
    buttonId: 'attack-info-button',
    hintCopy: "In music (or sound in general), attack refers to the speed with which the volume of a note (or sound) increases to its peak.  A fast attack characterizes a note that is at its peak volume almost as soon as it is played.  A slow attack starts off quiet and fades in, to gradually reach its full volume."
  },
  {
    buttonId: 'decay-info-button',
    hintCopy: "In music (or sound in general), decay refers to the speed at which the volume of a note (or sound) fades away after it is done being played.  A fast decay characterizes a note that cuts off quickly after it is done being played.  A note with slow decay fades away slowly, sort of trailing off."
  },
  {
    buttonId: 'oscillator-info-button',
    hintCopy: "The oscillator type determines the sound of the synethsized computer 'instrument' that Page Bard will use to play a song.  The name of an oscillator corresponds to the way the sound wave looks when drawn out as a picture.  This is a pretty deep topic that goes beyond the scope of Page Bard, but just as an example, a 'triangle' oscillator will produce a nice smooth sound, while a 'square' oscillator will produce more of a buzz.  Play around and see what you like."
  }
];
hintDefs.forEach(hint => {
  document.getElementById(hint.buttonId).addEventListener('click', e => {
    document.getElementById('hint-modal').style.display = 'unset';
    document.getElementById('hint-copy-element').innerHTML = hint.hintCopy;
  });
});

document.getElementById('hint-modal').addEventListener('click', e => {
  document.getElementById('hint-modal').style.display = 'none';
});

document.getElementById('play').addEventListener('click', e => {
  scale = "domain";
  randomization = "normal";
  rests = "normal";
  restDuration = "long";
  trills = "normal";
  scaleRuns = "normal";
  arpeggiation = "normal";
  attack = "random";
  decay = "random";
  oscillator = "random";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
});

document.getElementById('play-custom').addEventListener('click', e => {
  scale = document.getElementById('select-mode').value || 'domain';
  randomization = document.getElementById('select-randomization').value || 'normal';
  rests = document.getElementById('select-rests').value || 'normal';
  restDuration = document.getElementById('select-rest-duration').value || 'long';
  trills = document.getElementById('select-trills').value || 'normal';
  scaleRuns = document.getElementById('select-scale-runs').value || 'normal';
  arpeggiation = document.getElementById('select-arpeggiation').value || 'normal';
  attack = document.getElementById('select-attack').value || 'random';
  decay = document.getElementById('select-decay').value || 'random';
  oscillator = document.getElementById('select-oscillator').value || 'random';
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
})
