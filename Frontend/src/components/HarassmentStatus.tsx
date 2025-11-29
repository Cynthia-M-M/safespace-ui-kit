import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

type ThreatLevel = 'calm' | 'low' | 'medium' | 'high' | 'critical';

interface Props {
  threatLevel: ThreatLevel;
}

const threatConfig = {
  calm: { color: '#34C759', label: 'SAFE', particles: 50, speed: 0.5, chaos: 1 },
  low: { color: '#FFCC00', label: 'LOW RISK', particles: 75, speed: 1, chaos: 2 },
  medium: { color: '#FF9500', label: 'MODERATE', particles: 100, speed: 1.5, chaos: 4 },
  high: { color: '#FF3B30', label: 'HIGH RISK', particles: 150, speed: 2.5, chaos: 8 },
  critical: { color: '#AF0000', label: 'CRITICAL', particles: 200, speed: 4, chaos: 12 },
};

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  config: typeof threatConfig[ThreatLevel];

  constructor(effect: Effect) {
    this.config = effect.config;
    this.x = Math.random() * effect.width;
    this.y = Math.random() * effect.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * this.config.speed;
    this.speedY = (Math.random() - 0.5) * this.config.speed;
  }

  update(effect: Effect) {
    this.config = effect.config;
    this.x += this.speedX + (Math.random() - 0.5) * this.config.chaos * 0.1;
    this.y += this.speedY + (Math.random() - 0.5) * this.config.chaos * 0.1;

    if (this.x > effect.width || this.x < 0) this.speedX *= -1;
    if (this.y > effect.height || this.y < 0) this.speedY *= -1;

    if (this.x > effect.width) this.x = effect.width;
    if (this.x < 0) this.x = 0;
    if (this.y > effect.height) this.y = effect.height;
    if (this.y < 0) this.y = 0;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.config.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
  }
}

class Effect {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  particles: Particle[];
  config: typeof threatConfig[ThreatLevel];

  constructor(canvas: HTMLCanvasElement, threatLevel: ThreatLevel) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.particles = [];
    this.config = threatConfig[threatLevel];
    this.createParticles();
  }

  setConfig(threatLevel: ThreatLevel) {
    const newConfig = threatConfig[threatLevel];
    this.config = newConfig;
    const particleDifference = newConfig.particles - this.particles.length;
    if (particleDifference > 0) {
      for (let i = 0; i < particleDifference; i++) {
        this.particles.push(new Particle(this));
      }
    } else {
      this.particles.splice(0, -particleDifference);
    }
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.particles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  handleParticles(context: CanvasRenderingContext2D) {
    this.particles.forEach(particle => {
      particle.update(this);
      particle.draw(context);
    });
  }
}


export default function HarassmentStatus({ threatLevel }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const effectRef = useRef<Effect | null>(null);
  const controls = useAnimation();
  const config = threatConfig[threatLevel];

  useEffect(() => {
    controls.start({
      borderColor: config.color,
      boxShadow: `0 0 20px ${config.color}33`,
      transition: { duration: 0.5 },
    });
  }, [threatLevel, controls, config.color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    if (!effectRef.current) {
        effectRef.current = new Effect(canvas, threatLevel);
    }
    effectRef.current.setConfig(threatLevel);

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      effectRef.current?.handleParticles(ctx);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [threatLevel]);

  return (
    <motion.div
      animate={controls}
      className="relative w-full h-64 md:h-80 rounded-2xl border-2 bg-gray-900/20 overflow-hidden flex items-center justify-center"
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <motion.div 
        key={threatLevel}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center"
      >
        <p className="text-white text-lg font-medium">Threat Analysis</p>
        <h2 className="text-6xl font-bold" style={{ color: config.color }}>
          {config.label}
        </h2>
      </motion.div>
    </motion.div>
  );
}
