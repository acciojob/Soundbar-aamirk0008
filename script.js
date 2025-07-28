let currentlyPlaying = null;
    const soundButtons = document.querySelectorAll('.btn:not(.stop)');
    const stopButton = document.getElementById('stopBtn');

    soundButtons.forEach(button => {
            button.addEventListener('click', function() {
                const soundName = this.getAttribute('data-sound');
                playSound(soundName, this);
            });
        });

        stopButton.addEventListener('click', stopAllSounds);

        function playSound(soundName, buttonElement) {
            if (currentlyPlaying) {
                currentlyPlaying.audio.pause();
                currentlyPlaying.audio.currentTime = 0;
                currentlyPlaying.button.classList.remove('playing');
            }

            // Get the audio element from DOM
            const audio = document.getElementById(`${soundName}-audio`);
            
            if (audio) {
                // Reset to beginning
                audio.currentTime = 0;
                
                // Add ended event listener
                audio.addEventListener('ended', function() {
                    buttonElement.classList.remove('playing');
                    currentlyPlaying = null;
                });
                
                // Play the sound
                audio.play().then(() => {
                    // Successfully started playing
                    buttonElement.classList.add('playing');
                    currentlyPlaying = { audio: audio, button: buttonElement };
                }).catch(error => {
                    // Handle play error
                    console.error('Error playing audio:', error);
                });
            }
        }

        // Function to stop all sounds
        function stopAllSounds() {
            // Get all audio elements and stop them
            const allAudio = document.querySelectorAll('audio');
            allAudio.forEach(audio => {
                if (!audio.paused) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });

            // Remove playing class from all buttons
            soundButtons.forEach(button => {
                button.classList.remove('playing');
            });

            currentlyPlaying = null;
        }