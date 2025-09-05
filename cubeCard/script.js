// Get the cube element
const cube = document.getElementById('cube');

// Variables for mouse interaction
let mouseX = 0;
let mouseY = 0;
let rotationX = -20;
let rotationY = 0;
let isMouseDown = false;

// Mouse event listeners for interaction
document.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    cube.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
    cube.style.cursor = 'grab';
    // Resume animation after interaction
    setTimeout(() => {
        cube.style.animation = 'autoRotate 15s infinite linear';
    }, 1000);
});

document.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
        // Calculate mouse position relative to viewport
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        
        // Update cube rotation based on mouse movement
        rotationX = -20 + mouseY * 30;
        rotationY = mouseX * 30;
        
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        cube.style.animation = 'none';
    }
});

// Touch support for mobile devices
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isMouseDown = true;
});

document.addEventListener('touchend', () => {
    isMouseDown = false;
    setTimeout(() => {
        cube.style.animation = 'autoRotate 15s infinite linear';
    }, 1000);
});

document.addEventListener('touchmove', (e) => {
    if (isMouseDown) {
        e.preventDefault();
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        
        const deltaX = (touchX - touchStartX) / window.innerWidth * 2;
        const deltaY = (touchY - touchStartY) / window.innerHeight * 2;
        
        rotationX = -20 - deltaY * 60;
        rotationY = deltaX * 60;
        
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        cube.style.animation = 'none';
    }
});

// Keyboard controls for additional interaction
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            rotationY -= 90;
            break;
        case 'ArrowRight':
            rotationY += 90;
            break;
        case 'ArrowUp':
            rotationX -= 90;
            break;
        case 'ArrowDown':
            rotationX += 90;
            break;
        case ' ':
            // Spacebar to pause/resume animation
            if (cube.style.animationPlayState === 'paused') {
                cube.style.animationPlayState = 'running';
            } else {
                cube.style.animationPlayState = 'paused';
            }
            break;
        case 'r':
        case 'R':
            // Reset cube rotation
            rotationX = -20;
            rotationY = 0;
            cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
            cube.style.animation = 'autoRotate 15s infinite linear';
            break;
    }
    
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        cube.style.animation = 'none';
        
        setTimeout(() => {
            cube.style.animation = 'autoRotate 15s infinite linear';
        }, 2000);
    }
});

// Add visual feedback when clicking on squares
document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Add a click effect
        square.style.transform = 'scale(0.9)';
        square.style.filter = 'brightness(1.3)';
        
        setTimeout(() => {
            square.style.transform = 'scale(1)';
            square.style.filter = 'brightness(1)';
        }, 150);
    });
});

// Set initial cursor style
cube.style.cursor = 'grab';

// Console message for users
console.log('🎮 Rubik\'s Cube Controls:');
console.log('🖱️  Mouse: Click and drag to rotate');
console.log('📱 Touch: Touch and drag on mobile');
console.log('⌨️  Arrow Keys: Rotate cube');
console.log('⏯️  Spacebar: Pause/Resume animation');
console.log('🔄 R: Reset to default position');
console.log('🎯 Click squares: Visual feedback');
console.log('🎨 Hover cube: Pause and zoom');