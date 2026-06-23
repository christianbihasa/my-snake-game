import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Config
        const particle_count = 40;
        const particles = [];

        // Color range
        const colors = [
            'rgba(30, 41, 59, ',
            'rgba(71, 85, 105, ',
            'rgba(15, 23, 42, ',
            'rgba(6, 182, 212, '
        ];

        // Scaling
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Particle Class
        class Particle {
            constructor() {
                this.reset(true);
            }

            reset(initOld = false) {
                this.x = Math.random() * canvas.width;
                // If initializing, scatter everywhere; if regenerating, spawn off-screen bottom/top
                this.y = initOld ? Math.random() * canvas.height : canvas.height + 20;
                this.radius = Math.random() * 6 + 2; // Size variation
                this.vx = (Math.random() - 0.5) * 0.3; // Drift left/right
                this.vy = -(Math.random() * 0.4 + 0.1); // Float upwards
                this.baseColor = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = Math.random() * 0.4 + 0.1; //Soft opacity
                this.glow = Math.random() > 0.6; // Random particles glow
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around edges horizontally
                if(this.x < -20) this.x = canvas.width + 20;
                if(this.x > canvas.width + 20) this.x = -20;

                // Reset particles if out-of-bounds
                if(this.y < 20) {
                    this.reset(false);
                }
            }

            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${this.baseColor}${this.alpha}`;

                // Arcade glow profile
                if(this.glow) {
                    ctx.shadowBlur = this.radius * 2.5;
                    ctx.shadowColor = this.baseColor.includes('6, 182, 212') ? 'rgba(6, 182, 212, 0.6' : 'rgba(71, 85, 105, 0.4';
                }

                ctx.fill();
                ctx.restore();
            }
        }

        // Generate initial particle system state
        for(let i = 0; i < particle_count; i++) {
            particles.push(new Particle());
        }

        // Main animation orchestration loop
        const renderLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update state and draw vectors
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(renderLoop);
        };
        renderLoop();

        // Lifecycle cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full bg-slate-950 pointer-events-none z-0"
        />
    );
}