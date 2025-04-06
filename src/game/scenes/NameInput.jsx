import React from 'react';
import Phaser from 'phaser';
import GameStore from '../GameStore';

class NameInput extends Phaser.Scene {
    constructor() {
        super({ key: 'NameInput' });
    }

    preload() {
        // Load any assets if needed
    }

    create() {
       
    }

    update() {
        // Update logic if needed
        let inputText = this.add.text(10, 10, '', {
            fontSize: '24px',
            fill: '#ffffff'
            });

            // Listen for key presses
            this.input.keyboard.on('keydown', (event) => {
            // Check if the pressed key is a letter (A-Z or a-z)
            if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
                // Update the text with the pressed letter
                inputText.setText(inputText.text + event.key);
            }
            // Check if the pressed key is the backspace key
            else if (event.key === 'Backspace') {
                // Update the text by removing the last character
                inputText.setText(inputText.text.slice(0, -1));
            }
            });
    }

    // Clean up the input field when the scene is destroyed
    shutdown() {
            
        }
}

export default NameInput