const { Midi } = require('@tonejs/midi');
const fs = require('fs');
const midiData = fs.readFileSync('/path/file.mid');
const midi = new Midi(midiData);

let midiNotes = [];

midi.tracks.forEach(track => {
    track.notes.forEach(note => {
        midiNotes.push({
            pitch: note.midi,
            velocity: note.velocity,
            start: note.time * 1000,
            duration: note.duration * 1000
        });
    });
});

const midiNotesString = JSON.stringify(midiNotes, null, 2);
fs.writeFileSync('notes.txt', midiNotesString, 'utf8');
