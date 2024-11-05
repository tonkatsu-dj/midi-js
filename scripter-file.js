let midiNotes = [
    // paste output from midi-to-array.js
];

let noteIndex = 0;
let startTime = null;

function ProcessMIDI() {
    if (startTime === null) {
        startTime = Date.now();
    }

    let elapsedTime = Date.now() - startTime;

    while (noteIndex < midiNotes.length) {
        let note = midiNotes[noteIndex];
        
        if (elapsedTime >= note.start) {
            let noteOn = new NoteOn();
            noteOn.pitch = note.pitch;
            noteOn.velocity = note.velocity;
            Trace(`Playing note ${note.pitch} with velocity ${note.velocity} for ${note.duration} ms`);
            noteOn.send();

            let noteOff = new NoteOff(noteOn);
            noteOff.sendAfterMilliseconds(note.duration);

            noteIndex++;
        } else {
            break;
        }
    }
}

function Reset() {
    noteIndex = 0;
    startTime = null;
}

Reset();
