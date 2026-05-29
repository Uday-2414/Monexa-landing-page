import type React from 'react';
import { useCallback, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Point {
  position: Position;
  time: number;
  drift: Position;
  age: number;
  direction: Position;
}

interface SVGFollowerProps {
  colors?: string[];
  removeDelay?: number;
  active?: boolean;
  className?: string;
}

class Follower {
  private points: Point[] = [];
  private line: SVGPathElement;
  private color: string;
  private stage: SVGSVGElement;
  private removeDelay: number;

  constructor(stage: SVGSVGElement, color: string, removeDelay: number) {
    this.stage = stage;
    this.color = color;
    this.removeDelay = removeDelay;
    this.line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.line.style.fill = color;
    this.line.style.stroke = color;
    this.line.style.strokeWidth = '1';
    this.stage.appendChild(this.line);
  }

  private getDrift() {
    return (Math.random() - 0.5) * 3;
  }

  public add(position: Position) {
    const direction = { x: 0, y: 0 };

    if (this.points[0]) {
      direction.x = (position.x - this.points[0].position.x) * 0.25;
      direction.y = (position.y - this.points[0].position.y) * 0.25;
    }

    const point: Point = {
      position,
      time: Date.now(),
      drift: {
        x: this.getDrift() + direction.x / 2,
        y: this.getDrift() + direction.y / 2,
      },
      age: 0,
      direction,
    };

    const shapeChance = Math.random();
    const chance = 0.1;
    if (shapeChance < chance) this.makeCircle(point);
    else if (shapeChance < chance * 2) this.makeSquare(point);
    else if (shapeChance < chance * 3) this.makeTriangle(point);

    this.points.unshift(point);
  }

  private createLine(points: Point[]) {
    const path: string[] = [points.length ? 'M' : ''];

    if (points.length > 0) {
      let forward = true;
      let index = 0;

      while (index >= 0) {
        const point = points[index];
        const offsetX = point.direction.x * ((index - points.length) / points.length) * 0.6;
        const offsetY = point.direction.y * ((index - points.length) / points.length) * 0.6;
        const x = point.position.x + (forward ? offsetY : -offsetY);
        const y = point.position.y + (forward ? offsetX : -offsetX);
        point.age += 0.2;

        path.push(String(x + point.drift.x * point.age));
        path.push(String(y + point.drift.y * point.age));

        index += forward ? 1 : -1;
        if (index === points.length) {
          index -= 1;
          forward = false;
        }
      }
    }

    return path.join(' ');
  }

  public trim() {
    if (this.points.length > 0) {
      const last = this.points[this.points.length - 1];
      const now = Date.now();
      if (last.time < now - this.removeDelay) {
        this.points.pop();
      }
    }

    this.line.setAttribute('d', this.createLine(this.points));
  }

  public destroy() {
    if (this.stage.contains(this.line)) {
      this.stage.removeChild(this.line);
    }
  }

  private makeCircle(point: Point) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const radius = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1;
    circle.setAttribute('r', String(radius));
    circle.style.fill = this.color;
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    this.moveShape(circle, point);
  }

  private makeSquare(point: Point) {
    const size = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.5;
    const square = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    square.setAttribute('width', String(size));
    square.setAttribute('height', String(size));
    square.style.fill = this.color;
    this.moveShape(square, point);
  }

  private makeTriangle(point: Point) {
    const size = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.5;
    const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    triangle.setAttribute('points', `0,0 ${size},${size / 2} 0,${size}`);
    triangle.style.fill = this.color;
    this.moveShape(triangle, point);
  }

  private moveShape(shape: SVGElement, point: Point) {
    this.stage.appendChild(shape);
    const driftX = point.position.x + point.direction.x * (Math.random() * 20) + point.drift.x * (Math.random() * 10);
    const driftY = point.position.y + point.direction.y * (Math.random() * 20) + point.drift.y * (Math.random() * 10);

    shape.style.transform = `translate(${point.position.x}px, ${point.position.y}px)`;
    shape.style.transition = 'all 0.5s ease-out';

    window.setTimeout(() => {
      shape.style.transform = `translate(${driftX}px, ${driftY}px) scale(0) rotate(${Math.random() * 360}deg)`;
      window.setTimeout(() => {
        if (this.stage.contains(shape)) {
          this.stage.removeChild(shape);
        }
      }, 500);
    }, 10);
  }
}

export function SVGFollower({
  colors = ['#ff6b6b', '#fff200', '#45b7d1', '#96ceb4', '#ffeaa7'],
  removeDelay = 400,
  active = true,
  className = '',
}: SVGFollowerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const followersRef = useRef<Follower[]>([]);
  const animationRef = useRef<number | null>(null);

  const addPoint = useCallback((clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const position: Position = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };

    followersRef.current.forEach((follower) => follower.add(position));
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    addPoint(event.clientX, event.clientY);
  }, [addPoint]);

  const handleTouchMove = useCallback((event: React.TouchEvent) => {
    const touch = event.touches[0];
    if (touch) {
      addPoint(touch.clientX, touch.clientY);
    }
  }, [addPoint]);

  const animate = useCallback(() => {
    followersRef.current.forEach((follower) => follower.trim());
    animationRef.current = window.requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    const section = containerRef.current?.parentElement;
    if (!active || !svg || !section) {
      return undefined;
    }

    const handleNativeMouseMove = (event: MouseEvent) => {
      addPoint(event.clientX, event.clientY);
    };

    const handleNativeTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        addPoint(touch.clientX, touch.clientY);
      }
    };

    followersRef.current = colors.map((color) => new Follower(svg, color, removeDelay));
    animationRef.current = window.requestAnimationFrame(animate);
    section.addEventListener('mousemove', handleNativeMouseMove);
    section.addEventListener('touchmove', handleNativeTouchMove, { passive: true });

    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
      section.removeEventListener('mousemove', handleNativeMouseMove);
      section.removeEventListener('touchmove', handleNativeTouchMove);
      followersRef.current.forEach((follower) => follower.destroy());
      followersRef.current = [];
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
    };
  }, [active, colors, removeDelay, animate, addPoint]);

  if (!active) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      aria-hidden="true"
    >
      <svg ref={svgRef} className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" />
    </div>
  );
}
