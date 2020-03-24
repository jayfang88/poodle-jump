// console.log("Webpack is working!")
import Platform from './platform';
window.platform = Platform;

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let platform = new Platform({
        pos: [50, 50]
    })
    platform.draw(ctx)

    // console.log('DOM full loaded and parsed')
});