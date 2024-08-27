let keepShort = null;
let scale = null;
let progression = null;
let rests = null;
let restDuration = null;
let randomization = null;
let trills = null;
let scaleRuns = null;
let arpeggiation = null;
let attack = null;
let decay = null;
let oscillator = null;
let noteDuration = null;
let chordDuration = null;
let highlighting = null;

// advanced page
let trillLength = null;

const advancedButton = document.getElementById('advanced-button');
const backFromAdvancedButton = document.getElementById('back-from-advanced-button');

const selectModeControl = document.getElementById('select-mode');
const selectProgressionControl = document.getElementById('select-progression');
const selectRestsControl = document.getElementById('select-rests');
const selectRestDurationControl = document.getElementById('select-rest-duration');
const selectRandomizationControl = document.getElementById('select-randomization');
const selectTrillsControl = document.getElementById('select-trills');
const selectScaleRunsControl = document.getElementById('select-scale-runs');
const selectArpeggiationControl = document.getElementById('select-arpeggiation');
const selectAttackControl = document.getElementById('select-attack');
const selectDecayControl = document.getElementById('select-decay');
const selectOscillatorControl = document.getElementById('select-oscillator');
const selectNoteDurationControl = document.getElementById('select-note-duration');
const selectChordDurationControl = document.getElementById('select-chord-duration');
// advanced page
const advancedSelectModeControl = document.getElementById('advanced-select-mode');
const advancedSelectProgressionControl = document.getElementById('advanced-select-progression');
const advancedSelectRestsControl = document.getElementById('advanced-select-rests');
const advancedSelectRestDurationControl = document.getElementById('advanced-select-rest-duration');
const advancedSelectRandomizationControl = document.getElementById('advanced-select-randomization');
const advancedSelectTrillsControl = document.getElementById('advanced-select-trills');
const advancedSelectScaleRunsControl = document.getElementById('advanced-select-scale-runs');
const advancedSelectArpeggiationControl = document.getElementById('advanced-select-arpeggiation');
const advancedSelectAttackControl = document.getElementById('advanced-select-attack');
const advancedSelectDecayControl = document.getElementById('advanced-select-decay');
const advancedSelectOscillatorControl = document.getElementById('advanced-select-oscillator');
const advancedSelectNoteDurationControl = document.getElementById('advanced-select-note-duration');
const advancedSelectChordDurationControl = document.getElementById('advanced-select-chord-duration');
// advanced page advanced's
const advancedSelectTrillLengthControl = document.getElementById('advanced-select-trill-length');

const keepShortControl = document.getElementById('keep-short');
const highlightingControl = document.getElementById('highlighting');
const advancedKeepShortControl = document.getElementById('advanced-keep-short');
const advancedHighlightingControl = document.getElementById('advanced-highlighting');

const advancedModal = document.getElementById('advanced-modal');

function songify(tabs) {
  const warningText = [];

  if (!scale) warningText.push('No scale found!');
  if (!progression) warningText.push('No chord progression found!');
  if (!rests) warningText.push('No rests factor found!');
  if (!restDuration) warningText.push('No rest duration found!');
  if (!randomization) warningText.push('No randomization factor found!');
  if (!trills) warningText.push('No trills factor found!');
  if (!scaleRuns) warningText.push('No scale runs factor found!');
  if (!arpeggiation) warningText.push('No arpeggiation factor found!');
  if (!attack) warningText.push('No attack speed found!');
  if (!decay) warningText.push('No decay speed found!');
  if (!oscillator) warningText.push('No oscillator found!');
  if (!noteDuration) warningText.push('No note duration found!');
  if (!chordDuration) warningText.push('No chord duration found!');
  // advanced
  if (!trillLength) warningText.push('No trill length found!');

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
    rests: rests === 'default' ? 'normal' : rests,
    restDuration: restDuration === 'default' ? 'long' : restDuration,
    randomization: randomization === 'default' ? 'normal' : randomization,
    trills: trills === 'default' ? 'normal' : trills,
    scaleRuns: scaleRuns === 'default' ? 'normal' : scaleRuns,
    arpeggiation: arpeggiation === 'default' ? 'normal' : arpeggiation,
    attack: attack === 'default' ? 'random' : attack,
    decay: decay === 'default' ? 'random' : decay,
    oscillator: oscillator === 'default' ? 'random' : oscillator,
    noteDuration: noteDuration === 'default' ? 'random' : noteDuration,
    chordDuration: chordDuration === 'default' ? 'random' : chordDuration,

    // advanced
    trillLength: trillLength === 'default' ? 'medium' : trillLength,

    keepShort,
    highlighting
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
  'select-rests',
  'select-rest-duration',
  'select-randomization',
  'select-trills',
  'select-scale-runs',
  'select-arpeggiation',
  'select-attack',
  'select-decay',
  'select-oscillator',
  'select-note-duration',
  'select-chord-duration',
  // advanced page
  'advanced-select-mode',
  'advanced-select-progression',
  'advanced-select-rests',
  'advanced-select-rest-duration',
  'advanced-select-randomization',
  'advanced-select-trills',
  'advanced-select-scale-runs',
  'advanced-select-arpeggiation',
  'advanced-select-attack',
  'advanced-select-decay',
  'advanced-select-oscillator',
  'advanced-select-note-duration',
  'advanced-select-chord-duration',
  // advanced's
  'advanced-select-trill-length'
];

advancedButton.addEventListener('click', e => {
  advancedModal.style.display = 'unset';

  advancedSelectModeControl.value = selectModeControl.value;
  advancedSelectProgressionControl.value = selectProgressionControl.value;
  advancedSelectRestsControl.value = selectRestsControl.value;
  advancedSelectRestDurationControl.value = selectRestDurationControl.value;
  advancedSelectRandomizationControl.value = selectRandomizationControl.value;
  advancedSelectTrillsControl.value = selectTrillsControl.value;
  advancedSelectScaleRunsControl.value = selectScaleRunsControl.value;
  advancedSelectArpeggiationControl.value = selectArpeggiationControl.value;
  advancedSelectAttackControl.value = selectAttackControl.value;
  advancedSelectDecayControl.value = selectDecayControl.value;
  advancedSelectOscillatorControl.value = selectOscillatorControl.value;
  advancedSelectNoteDurationControl.value = selectNoteDurationControl.value;
  advancedSelectChordDurationControl.value = selectChordDurationControl.value;
  
  advancedKeepShortControl.checked = keepShortControl.checked;
  advancedHighlightingControl.checked = highlightingControl.checked;
});
backFromAdvancedButton.addEventListener('click', e => {
  advancedModal.style.display = 'none';

  selectModeControl.value = advancedSelectModeControl.value;
  selectProgressionControl.value = advancedSelectProgressionControl.value;
  selectRestsControl.value = advancedSelectRestsControl.value;
  selectRestDurationControl.value = advancedSelectRestDurationControl.value;
  selectRandomizationControl.value = advancedSelectRandomizationControl.value;
  selectTrillsControl.value = advancedSelectTrillsControl.value;
  selectScaleRunsControl.value = advancedSelectScaleRunsControl.value;
  selectArpeggiationControl.value = advancedSelectArpeggiationControl.value;
  selectAttackControl.value = advancedSelectAttackControl.value;
  selectDecayControl.value = advancedSelectDecayControl.value;
  selectOscillatorControl.value = advancedSelectOscillatorControl.value;
  selectNoteDurationControl.value = advancedSelectNoteDurationControl.value;
  selectChordDurationControl.value = advancedSelectChordDurationControl.value;

  keepShortControl.checked = advancedKeepShortControl.checked;
  highlightingControl.checked = advancedHighlightingControl.checked;
});

settingControlIds.forEach(id => {
  const control = document.getElementById(id);
  control.addEventListener('change', e => {
    browser.storage.sync.set({
      [id.replace('advanced-', '')]: control.value
    });
  });
});

keepShortControl.addEventListener('change', e => {
  browser.storage.sync.set({
    keepShort: keepShortControl.checked
  });
});
highlightingControl.addEventListener('change', e => {
  browser.storage.sync.set({
    highlighting: highlightingControl.checked
  });
});

advancedKeepShortControl.addEventListener('change', e => {
  browser.storage.sync.set({
    keepShort: advancedKeepShortControl.checked
  });
});
advancedHighlightingControl.addEventListener('change', e => {
  browser.storage.sync.set({
    highlighting: advancedHighlightingControl.checked
  });
});

setTimeout(() => {
  document.getElementById('loading-modal').style.display = 'none';
  settingControlIds.forEach(id => {
    // this conditional block for advanced options
    if ([
      'advanced-select-trill-length'
    ].includes(id)) {
      const trimmedId = id.replace('advanced-', '');
      browser.storage.sync.get(trimmedId).then(value => {
        if (!value[trimmedId]) {
          document.getElementById(id).value = 'default';
          return;
        }
        document.getElementById(id).value = value[trimmedId];
      });
      return;
    }

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
      highlightingControl.checked = false;
      return;
    }
    highlightingControl.checked = value.highlighting;
  });
  browser.storage.sync.get('keepShort').then(value => {
    if (!value.keepShort) {
      keepShortControl.checked = false;
      return;
    }
    keepShortControl.checked = value.keepShort;
  });
  browser.storage.sync.get('advancedHighlighting').then(value => {
    if (!value.advancedHighlighting) {
      advancedHighlightingControl.checked = false;
      return;
    }
    advancedHighlightingControl.checked = value.advancedHighlighting;
  });
  browser.storage.sync.get('advancedKeepShort').then(value => {
    if (!value.advancedKeepShort) {
      advancedKeepShortControl.checked = false;
      return;
    }
    advancedKeepShortControl.checked = value.advancedKeepShort;
  });
}, 250);

const hintDefs = [
  {
    buttonId: 'keep-short-info-button',
    hintCopy: "If you check this box, Page Bard will limit song length to somewhere near or less than 5 minutes.  By default, the song length will simply correlate to the amount of information contained in a web page.  If the page is very large, or has lots of hidden information behind the scenes, a page's song can become arbitrarily (extremely) long.  In early tests of Page Bard, songs were observed having lengths of over 20 minutes for very complex web pages.  But they could get even longer!"
  },
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
  },

  // for advanced page
  {
    buttonId: 'advanced-keep-short-info-button',
    hintCopy: "If you check this box, Page Bard will limit song length to somewhere near or less than 5 minutes.  By default, the song length will simply correlate to the amount of information contained in a web page.  If the page is very large, or has lots of hidden information behind the scenes, a page's song can become arbitrarily (extremely) long.  In early tests of Page Bard, songs were observed having lengths of over 20 minutes for very complex web pages.  But they could get even longer!"
  },
  {
    buttonId: 'advanced-scale-info-button',
    hintCopy: "Choose the scale for Page Bard to use when writing this page as a song.  By default, Page Bard will choose a scale based on characteristics of the page."
  },
  {
    buttonId: 'advanced-progression-info-button',
    hintCopy: "Choose the chord progression you'd like Page Bard to follow when writing a song for this page.  The chord progression often determins the type or genre of song you'll get.  For example, the blues are associated with a particular chord progression, while jazz is typified by another.  The details can get hairy, so feel free to do some outside research if you'd like to know more, but here you can select, in broad strokes, the loose feel you'd like Page Bard to shoot for.  By default, Page Bard will choose a chord progression based off of characteristics of the page."
  },
  {
    buttonId: 'advanced-randomization-info-button',
    hintCopy: "The randomization factor determines the overall likelihood of special musical features being used in the page's composition.  In other words, how often will Page Bard choose arpeggiation, scale runs, rests, and other features besides simple musical notes?  Higher factors mean more special features; lower factors mean more plain notes."
  },
  {
    buttonId: 'advanced-rests-info-button',
    hintCopy: "In music, rests represent \"white space\" in a song.  In other words, it's like saying, take a break here where you could have played a note.  You can customize how often you want Page Bard to use rests."
  },
  {
    buttonId: 'advanced-rest-duration-info-button',
    hintCopy: "You can customize how long you'd like Page Bard to make its rests.  The duration of each rest will still vary at least a little bit based on characteristics of the page.  But here you can determine the maximum duration that Page Bard can make a rest.   (See the help blurb for 'rests' for more info.)"
  },
  {
    buttonId: 'advanced-trills-info-button',
    hintCopy: "A trill is like a flutter in the song.  It quickly alternates between two notes that are next to each other in the song's scale.  You can customize how often you want Page Bard to use trills."
  },
  {
    buttonId: 'advanced-scale-runs-info-button',
    hintCopy: "A scale run is when a few notes from the song's scale are played all in a row, in order.  A scale run might be played up the scale, or down the scale.  (Page Bard will decide this for you.)  You can customize how often you want Page Bard to use scale runs."
  },
  {
    buttonId: 'advanced-arpeggiation-info-button',
    hintCopy: "Arpeggiation is a little complicated if you're new to music theory, but here's a quick and dirty explanation for beginners.  When you play any note from a scale that a song is written with, it will usually sound good.  But if you use the first, third, and fifth  (and sometimes seventh) notes of the scale, that makes a chord, and chords sound the most like the <em>fundamental character</em> of the scale.  Now, if you play the notes of a chord all in a row in order, it's called an arpeggio, and it's like making the fundamental character of the scale into a melody.  It sounds pretty good!  An arpeggio can go up or down within the scale where it lives (Page Bard will decide this for you).  You can choose how often you want Page Bard to use this arpeggiation technique."
  },
  {
    buttonId: 'advanced-attack-info-button',
    hintCopy: "In music (or sound in general), attack refers to the speed with which the volume of a note (or sound) increases to its peak.  A fast attack characterizes a note that is at its peak volume almost as soon as it is played.  A slow attack starts off quiet and fades in, to gradually reach its full volume."
  },
  {
    buttonId: 'advanced-decay-info-button',
    hintCopy: "In music (or sound in general), decay refers to the speed at which the volume of a note (or sound) fades away after it is done being played.  A fast decay characterizes a note that cuts off quickly after it is done being played.  A note with slow decay fades away slowly, sort of trailing off."
  },
  {
    buttonId: 'advanced-oscillator-info-button',
    hintCopy: "The oscillator type determines the sound of the synethsized computer 'instrument' that Page Bard will use to play a song.  The name of an oscillator corresponds to the way the sound wave looks when drawn out as a picture.  This is a pretty deep topic that goes beyond the scope of Page Bard, but just as an example, a 'triangle' oscillator will produce a nice smooth sound, while a 'square' oscillator will produce more of a buzz.  Play around and see what you like."
  },
  {
    buttonId: 'advanced-note-duration-info-button',
    hintCopy: "Use this setting to set the song's cadence, or how fast the song plays.  By default, Page Bard will determine the speed of the song based on characteristics of the page."
  },
  {
    buttonId: 'advanced-chord-duration-info-button',
    hintCopy: "When Page Bard is composing a song that uses a chord progression, you can determine how long the song will linger on each chord before moving to the next chord in the progression.  In other words, you can decide if the song spends a long time on the first chord before starting to play notes from the second chord; or spends a short time on one chord and quickly starts playing notes from the next.  See the help dialog for 'chord progression' to learn more."
  },
  {
    buttonId: 'advanced-highlighting-info-button',
    hintCopy: "Check this box if you want to turn highlighting on.  This will highlight each element on the page as it is being played.  It won't look super pretty but it can be educational or interesting to see which elements create which type of music.  It's important to note that a lot of elements don't have any visual representation in the browser (such as scripts, meta tags, style tags, etc).  So sometimes you'll hear music but won't see anything highlighted."
  },

  // advanced's
  {
    buttonId: 'advanced-trill-length-info-button',
    hintCopy: "You can determine how long you'd like trills to be able to last.  A short trill will visit a neighboring note from the base note just once.  A long trill will alternate between the base and a neighboring note several times.  Changing this setting will determine the maximum possible length of a trill that Page Bard will consider when composing a page's song.  By default, Page Bard will allow short and medium trills."
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
  rests = "normal";
  restDuration = "long";
  randomization = "normal";
  trills = "normal";
  scaleRuns = "normal";
  arpeggiation = "normal";
  attack = "random";
  decay = "random";
  oscillator = "random";
  noteDuration = "random";
  chordDuration = "random";

  trillLength = "medium";
  
  keepShort = false;
  highlighting = true;
  
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
});

document.getElementById('play-custom').addEventListener('click', e => {
  scale = selectModeControl.value;
  progression = selectProgressionControl.value;
  rests = selectRestsControl.value;
  restDuration = selectRestDurationControl.value;
  randomization = selectRandomizationControl.value;
  trills = selectTrillsControl.value;
  scaleRuns = selectScaleRunsControl.value;
  arpeggiation = selectArpeggiationControl.value;
  attack = selectAttackControl.value;
  decay = selectDecayControl.value;
  oscillator = selectOscillatorControl.value;
  noteDuration = selectNoteDurationControl.value;
  chordDuration = selectChordDurationControl.value;

  trillLength = advancedSelectTrillLengthControl.value;
  
  keepShort = keepShortControl.checked;
  highlighting = highlightingControl.checked;
  
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(songify)
    .catch(reportError);
});

document.getElementById('reset-to-defaults').addEventListener('click', resetToDefaults);
document.getElementById('advanced-reset-to-defaults').addEventListener('click', resetToDefaults);

function resetToDefaults (e) {
  selectModeControl.value = 'default';
  selectProgressionControl.value = 'default';
  selectRestsControl.value = 'default';
  selectRestDurationControl.value = 'default';
  selectRandomizationControl.value = 'default';
  selectTrillsControl.value = 'default';
  selectScaleRunsControl.value = 'default';
  selectArpeggiationControl.value = 'default';
  selectAttackControl.value = 'default';
  selectDecayControl.value = 'default';
  selectOscillatorControl.value = 'default';
  selectNoteDurationControl.value = 'default';
  selectChordDurationControl.value = 'default';
  
  advancedSelectModeControl.value = 'default';
  advancedSelectProgressionControl.value = 'default';
  advancedSelectRestsControl.value = 'default';
  advancedSelectRestDurationControl.value = 'default';
  advancedSelectRandomizationControl.value = 'default';
  advancedSelectTrillsControl.value = 'default';
  advancedSelectScaleRunsControl.value = 'default';
  advancedSelectArpeggiationControl.value = 'default';
  advancedSelectAttackControl.value = 'default';
  advancedSelectDecayControl.value = 'default';
  advancedSelectOscillatorControl.value = 'default';
  advancedSelectNoteDurationControl.value = 'default';
  advancedSelectChordDurationControl.value = 'default';
  
  keepShortControl.checked = false;
  highlightingControl.checked = false;
  advancedKeepShortControl.checked = false;
  advancedHighlightingControl.checked = false;

  settingControlIds.forEach(id => {
    const control = document.getElementById(id);
    browser.storage.sync.set({
      [id]: control.value
    });
  });
  highlighting = highlightingControl.checked;
  browser.storage.sync.set({
    highlighting
  });
  keepShort = keepShortControl.checked;
  browser.storage.sync.set({
    keepShort
  });
  advancedHighlighting = advancedHighlightingControl.checked;
  browser.storage.sync.set({
    advancedHighlighting
  });
  advancedKeepShort = advancedKeepShortControl.checked;
  browser.storage.sync.set({
    advancedKeepShort
  });
}
