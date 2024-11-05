let midiNotes = [
    { pitch: 82, velocity: 100, start: 0, duration: 234 },
    { pitch: 82, velocity: 100, start: 468, duration: 117 },
    { pitch: 80, velocity: 100, start: 527, duration: 175 },
    { pitch: 82, velocity: 100, start: 703, duration: 117 },
    { pitch: 77, velocity: 100, start: 820, duration: 234 },
    { pitch: 77, velocity: 100, start: 1406, duration: 234 },
    { pitch: 75, velocity: 100, start: 1640, duration: 234 },
    { pitch: 80, velocity: 100, start: 1875, duration: 234 },
    { pitch: 77, velocity: 100, start: 2343, duration: 234 },
    { pitch: 80, velocity: 100, start: 2578, duration: 117 },
    { pitch: 75, velocity: 100, start: 2695, duration: 234 },
    { pitch: 75, velocity: 100, start: 3281, duration: 234 },
    { pitch: 73, velocity: 100, start: 3515, duration: 234 },
    { pitch: 82, velocity: 100, start: 3750, duration: 234 },
    { pitch: 82, velocity: 100, start: 4218, duration: 117 },
    { pitch: 80, velocity: 100, start: 4277, duration: 175 },
    { pitch: 82, velocity: 100, start: 4653, duration: 117 },
    { pitch: 77, velocity: 100, start: 4570, duration: 234 },
    { pitch: 77, velocity: 100, start: 5156, duration: 234 },
    { pitch: 75, velocity: 100, start: 5390, duration: 234 },
    { pitch: 80, velocity: 100, start: 5625, duration: 234 },
    { pitch: 85, velocity: 100, start: 6093, duration: 234 },
    { pitch: 77, velocity: 100, start: 6328, duration: 117 },
    { pitch: 75, velocity: 100, start: 6445, duration: 234 },
    { pitch: 85, velocity: 100, start: 7031, duration: 58 },
    { pitch: 82, velocity: 100, start: 7089, duration: 58 },
    { pitch: 80, velocity: 100, start: 7148, duration: 58 },
    { pitch: 77, velocity: 100, start: 7207, duration: 58 },
    { pitch: 75, velocity: 100, start: 7265, duration: 58 },
    { pitch: 73, velocity: 100, start: 7324, duration: 58 },
    { pitch: 72, velocity: 100, start: 7382, duration: 58 },
    { pitch: 70, velocity: 100, start: 7441, duration: 58 },
    { pitch: 82, velocity: 100, start: 7500, duration: 234 },
    { pitch: 82, velocity: 100, start: 7968, duration: 117 },
    { pitch: 80, velocity: 100, start: 8027, duration: 175 },
    { pitch: 82, velocity: 100, start: 8403, duration: 117 },
    { pitch: 77, velocity: 100, start: 8510, duration: 234 },
    { pitch: 82, velocity: 100, start: 9068, duration: 234 },
    { pitch: 84, velocity: 100, start: 9140, duration: 234 },
    { pitch: 85, velocity: 100, start: 9375, duration: 234 },
    { pitch: 85, velocity: 100, start: 10443, duration: 117 },
    { pitch: 89, velocity: 100, start: 10502, duration: 175 },
    { pitch: 85, velocity: 100, start: 10678, duration: 117 },
    { pitch: 84, velocity: 100, start: 10795, duration: 234 },
    { pitch: 84, velocity: 100, start: 11381, duration: 234 },
    { pitch: 80, velocity: 100, start: 11615, duration: 234 },
    { pitch: 77, velocity: 100, start: 11850, duration: 234 },
    { pitch: 77, velocity: 100, start: 12318, duration: 234 },
    { pitch: 80, velocity: 100, start: 12553, duration: 117 },
    { pitch: 82, velocity: 100, start: 12670, duration: 234 },
    { pitch: 82, velocity: 100, start: 13256, duration: 234 },
    { pitch: 84, velocity: 100, start: 13490, duration: 117 },
    { pitch: 85, velocity: 100, start: 13607, duration: 1054 },
    { pitch: 84, velocity: 100, start: 14662, duration: 937 }
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
