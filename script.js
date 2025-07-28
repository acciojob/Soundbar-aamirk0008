//your JS code here. If required.
let audioElements = {};
        let currentlyPlaying = null;

        // Get all sound buttons and stop button
        const soundButtons = document.querySelectorAll('.btn:not(.stop)');
        const stopButton = document.getElementById('stopBtn');

        // Add click event listeners to sound buttons
        soundButtons.forEach(button => {
            button.addEventListener('click', function() {
                const soundName = this.getAttribute('data-sound');
                playSound(soundName, this);
            });
        });

        // Add click event listener to stop button
        stopButton.addEventListener('click', stopAllSounds);

        // Function to play sound
        function playSound(soundName, buttonElement) {
            // Stop currently playing sound
            if (currentlyPlaying) {
                currentlyPlaying.audio.pause();
                currentlyPlaying.audio.currentTime = 0;
                currentlyPlaying.button.classList.remove('playing');
            }

            // Create audio element if it doesn't exist
            if (!audioElements[soundName]) {
                audioElements[soundName] = new Audio(`sounds/${soundName}.mp3`);
                
                // Add error handling
                audioElements[soundName].addEventListener('error', function() {
                    console.error(`Failed to load audio file: sounds/${soundName}.mp3`);
                });

                // Add ended event listener
                audioElements[soundName].addEventListener('ended', function() {
                    buttonElement.classList.remove('playing');
                    currentlyPlaying = null;
                });
            }

            // Play the sound
            const audio = audioElements[soundName];
            audio.currentTime = 0; // Reset to beginning
            
            audio.play().then(() => {
                // Successfully started playing
                buttonElement.classList.add('playing');
                currentlyPlaying = { audio: audio, button: buttonElement };
            }).catch(error => {
                // Handle play error (for demo purposes, we'll still show the playing state)
                console.error('Error playing audio:', error);
                buttonElement.classList.add('playing');
                currentlyPlaying = { audio: audio, button: buttonElement };
                
                // Remove playing state after 2 seconds for demo
                setTimeout(() => {
                    buttonElement.classList.remove('playing');
                    currentlyPlaying = null;
                }, 2000);
            });
        }

        // Function to stop all sounds
        function stopAllSounds() {
            // Stop all audio elements
            Object.values(audioElements).forEach(audio => {
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