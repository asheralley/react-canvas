import React from "react";
import { useRef, useEffect, useState } from "react";

const getPixelRatio = (context) => {
    var backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;

    return (window.devicePixelRatio || 1) / backingStore;
};

let particleArray = [];
class AnimatedParticle {
    constructor(x, y, directionX, directionY) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
    }

    update() {}
    init() {
        for (let i = 0; i < 10; i++) {
            let x = Math.random() * (window.innerWidth - 0.3 * 2);
            let y = Math.random() * (window.innerHeight - 0.3 * 2);
            let directionX = Math.random() * 3.4 - 0.2;
            let directionY = Math.random() * 3.4 - 0.2;
            particleArray.push(
                new AnimatedParticle(x, y, directionX, directionY)
            );
        }
    }
}

const Particle = (props) => {
    let ref = useRef();
    useEffect(() => {
        let requestId;
        let x = Math.random() * (window.innerWidth - 0.3 * 2);
        let y = Math.random() * (window.innerHeight - 0.3 * 2);
        let directionX = Math.random() * 3.4 - 0.2;
        let directionY = Math.random() * 3.4 - 0.2;
        console.log(window.innerWidth, window.innerHeight);

        const render = () => {
            let canvas = ref.current;
            let context = canvas.getContext("2d");
            let ratio = getPixelRatio(context);
            let width = getComputedStyle(canvas)
                .getPropertyValue("width")
                .slice(0, -2);
            let height = getComputedStyle(canvas)
                .getPropertyValue("height")
                .slice(0, -2);

            canvas.width = width * ratio;
            canvas.height = height * ratio;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.arc(x, y, 2.3, 0, 2 * Math.PI);
            context.fill();
            x += directionX;
            y += directionY;
            if (x + 2.3 > canvas.width || x - 2.3 < 0) {
                directionX = -directionX;
            }
            if (y + 2.3 > canvas.height || y - 2.3 < 0) {
                directionY = -directionY;
            }
            // for (let i = 0; i < particleArray.length; i++) {
            //     particleArray[i].draw();
            // }
            requestId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(requestId);
        };
    }, []);
    return (
        <canvas
            ref={ref}
            style={{ width: "100%", height: "100%", background: "#e3e3e3" }}
        />
    );
};

export default Particle;
