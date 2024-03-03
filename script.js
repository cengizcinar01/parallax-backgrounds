const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 700;
let gameSpeed = 4;

// Simplifying image source assignment using an array and map function
const layers = ['layer-1.png', 'layer-2.png', 'layer-3.png', 'layer-4.png', 'layer-5.png'].map((src) => {
    const img = new Image();
    img.src = src;
    return img;
});

window.addEventListener('load', () => {
    const slider = document.getElementById('slider');
    slider.value = gameSpeed;
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.textContent = gameSpeed; // Prefer textContent for plain text
    slider.addEventListener('change', (e) => {
        gameSpeed = e.target.value;
        showGameSpeed.textContent = e.target.value;
    });

    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.width = 2400;
            this.height = canvas.height; // Use canvas.height for dynamic sizing
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update() {
            this.speed = gameSpeed * this.speedModifier;
            this.x = (this.x - this.speed) % this.width; // Simplified to handle reset
        }
        draw() {
            ctx.drawImage(this.image, this.x, 0, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, 0, this.width, this.height);
        }
    }

    // Using the layers array directly to create Layer objects
    const gameObjects = layers.map((img, index) => new Layer(img, 0.2 * (index + 1)));

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameObjects.forEach((object) => {
            object.update();
            object.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
});
