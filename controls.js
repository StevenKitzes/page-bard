let scale = null;
let progression = null;
let randomization = null;
let rests = null;
let restDuration = null;
let trills = null;
let scaleRuns = null;
let arpeggiation = null;
let attack = null;
let decay = null;
let oscillator = null;
let noteDuration = null;
let chordDuration = null;

function songify(tabs) {
  const warningText = [];

  if (!scale) warningText.push('No scale found!');
  if (!progression) warningText.push('No chord progression found!');
  if (!randomization) warningText.push('No randomization factor found!');
  if (!rests) warningText.push('No rests factor found!');
  if (!restDuration) warningText.push('No rest duration found!');
  if (!trills) warningText.push('No trills factor found!');
  if (!scaleRuns) warningText.push('No scale runs factor found!');
  if (!arpeggiation) warningText.push('No arpeggiation factor found!');
  if (!attack) warningText.push('No attack speed found!');
  if (!decay) warningText.push('No decay speed found!');
  if (!oscillator) warningText.push('No oscillator found!');
  if (!noteDuration) warningText.push('No note duration found!');
  if (!chordDuration) warningText.push('No chord duration found!');

  if (warningText.length > 0) {
    alert(warningText.join(' '));
    return;
  }

  browser.tabs.sendMessage(tabs[0].id, {
    command: "songify",
    image: browser.runtime.getURL("icons/play-button-48.png"),
    stopImage: browser.runtime.getURL("icons/stop-button-48.png"),
    scale,
    progression: progression === 'default' ? 'random' : progression,
    randomization: randomization === 'default' ? 'normal' : randomization,
    rests: rests === 'default' ? 'normal' : rests,
    restDuration: restDuration === 'default' ? 'long' : restDuration,
    trills: trills === 'default' ? 'normal' : trills,
    scaleRuns: scaleRuns === 'default' ? 'normal' : scaleRuns,
    arpeggiation: arpeggiation === 'default' ? 'normal' : arpeggiation,
    attack: attack === 'default' ? 'random' : attack,
    decay: decay === 'default' ? 'random' : decay,
    oscillator: oscillator === 'default' ? 'random' : oscillator,
    noteDuration: noteDuration === 'default' ? 'random' : noteDuration,
    chordDuration: chordDuration === 'default' ? 'random' : chordDuration,
    highlighting: document.getElementById('highlighting').checked
  });

  hideMenu();
}

function reportError(e) {
  alert('error trying to songify page! ' + e.toString());
}
function hideMenu() {
  document.getElementById('page-bard-body').style.display = "none";
}

const settingControlIds = [
  'select-mode',
  'select-progression',
  'select-randomization',
  'select-rests',
  'select-rest-duration',
  'select-trills',
  'select-scale-runs',
  'select-arpeggiation',
  'select-attack',
  'select-decay',
  'select-oscillator',
  'select-note-duration',
  'select-chord-duration'
];

settingControlIds.forEach(id => {
  const control = document.getElementById(id);
  control.addEventListener('change', e => {
    browser.storage.sync.set({
      [id]: control.value
    });
  });
});

const highlightingControl = document.getElementById('highlighting');
highlightingControl.addEventListener('change', e => {
  browser.storage.sync.set({
    highlighting: highlightingControl.checked
  });
});

setTimeout(() => {
  document.getElementById('loading-modal').style.display = 'none';
  settingControlIds.forEach(id => {
    browser.storage.sync.get(id).then(value => {
      if (!value[id]) {
        document.getElementById(id).value = 'default';
        return;
      }
      document.getElementById(id).value = value[id];
    });
  });
  browser.storage.sync.get('highlighting').then(value => {
    if (!value.highlighting) {
      document.getElementById('highlighting').checked = false;
      return;
    }
    document.getElementById('highlighting').checked = value.highlighting;
  });
}, 250);

const hintDefs = [
  {
    buttonId: 'page-bard-info',
    hintCopy: "Welcome to Page Bard, the browser extension that will play (almost any<sup>1</sup>) website you visit as a song!  Page Bard reads the code that defines a website's structure (the HTML DOM) and generates a song from it.  Songs are composed deterministically, meaning you get the same song for the same page every time<sup>2</sup>.  It uses page elements and the website address to generate everything from musical notes, to song pacing, to the scale in which a song will be composed.<br /><br />When you activate Page Bard from this extension menu, it will place an orange play button on your page in the upper right hand corner.  You can click this to play the song, then click again to stop if you want.  To listen again, you must refresh the page and start again.<br /><br /><sup>1</sup> - Some websites intentionally or incidentally interfere with Page Bard's ability to play music.  If you don't see the orange play button appear, or you hear no music, or you hear one long, annoying tone, it means the current site is blocking Page Bard from making music.<br /><br /><sup>2</sup> - If a page is different every time you view it (like a page with ads or social media feeds that change all the time) then parts of the song will change to reflect that."
  },
  {
    buttonId: 'scale-info-button',
    hintCopy: "Choose the scale for Page Bard to use when writing this page as a song.  By default, Page Bard will choose a scale based on characteristics of the page."
  },
  {
    buttonId: 'progression-info-button',
    hintCopy: "Choose the chord progression you'd like Page Bard to follow when writing a song for this page.  The chord progression often determins the type or genre of song you'll get.  For example, the blues are associated with a particular chord progression, while jazz is typified by another.  The details can get hairy, so feel free to do some outside research if you'd like to know more, but here you can select, in broad strokes, the loose feel you'd like Page Bard to shoot for.  By default, Page Bard will choose a chord progression based off of characteristics of the page."
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
  },
  {
    buttonId: 'note-duration-info-button',
    hintCopy: "Use this setting to set the song's cadence, or how fast the song plays.  By default, Page Bard will determine the speed of the song based on characteristics of the page."
  },
  {
    buttonId: 'chord-duration-info-button',
    hintCopy: "When Page Bard is composing a song that uses a chord progression, you can determine how long the song will linger on each chord before moving to the next chord in the progression.  In other words, you can decide if the song spends a long time on the first chord before starting to play notes from the second chord; or spends a short time on one chord and quickly starts playing notes from the next.  See the help dialog for 'chord progression' to learn more."
  },
  {
    buttonId: 'highlighting-info-button',
    hintCopy: "Check this box if you want to turn highlighting on.  This will highlight each element on the page as it is being played.  It won't look super pretty but it can be educational or interesting to see which elements create which type of music.  It's important to note that a lot of elements don't have any visual representation in the browser (such as scripts, meta tags, style tags, etc).  So sometimes you'll hear music but won't see anything highlighted."
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
  scale = "default";
  progression = "random";
  randomization = "normal";
  rests = "normal";
  restDuration = "long";
  trills = "normal";
  scaleRuns = "normal";
  arpeggiation = "normal";
  attack = "random";
  decay = "random";
  oscillator = "random";
  noteDuration = "random";
  chordDuration = "random";
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
});

document.getElementById('play-custom').addEventListener('click', e => {
  scale = document.getElementById('select-mode').value;
  progression = document.getElementById('select-progression').value;
  randomization = document.getElementById('select-randomization').value;
  rests = document.getElementById('select-rests').value;
  restDuration = document.getElementById('select-rest-duration').value;
  trills = document.getElementById('select-trills').value;
  scaleRuns = document.getElementById('select-scale-runs').value;
  arpeggiation = document.getElementById('select-arpeggiation').value;
  attack = document.getElementById('select-attack').value;
  decay = document.getElementById('select-decay').value;
  oscillator = document.getElementById('select-oscillator').value;
  noteDuration = document.getElementById('select-note-duration').value;
  chordDuration = document.getElementById('select-chord-duration').value;
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
});

document.getElementById('reset-to-defaults').addEventListener('click', e => {
  document.getElementById('select-mode').value = 'default';
  document.getElementById('select-progression').value = 'default';
  document.getElementById('select-randomization').value = 'default';
  document.getElementById('select-rests').value = 'default';
  document.getElementById('select-rest-duration').value = 'default';
  document.getElementById('select-trills').value = 'default';
  document.getElementById('select-scale-runs').value = 'default';
  document.getElementById('select-arpeggiation').value = 'default';
  document.getElementById('select-attack').value = 'default';
  document.getElementById('select-decay').value = 'default';
  document.getElementById('select-oscillator').value = 'default';
  document.getElementById('select-note-duration').value = 'default';
  document.getElementById('select-chord-duration').value = 'default';
  document.getElementById('highlighting').checked = true;

  settingControlIds.forEach(id => {
    const control = document.getElementById(id);
    browser.storage.sync.set({
      [id]: control.value
    });
  });  
  browser.storage.sync.set({
    highlighting: document.getElementById('highlighting').checked
  });
});
