import { Mesh, Program, Renderer, Triangle, Vec3 } from 'ogl';
import { useEffect, useRef } from 'react';

interface OrbProps {
  hue?: number;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
  backgroundColor?: string;
}

export default function Orb({
  hue = 0,
  hoverIntensity = 0.2,
  rotateOnHover = true,
  forceHoverState = false,
  backgroundColor = '#000000'
}: OrbProps) {
  const ctnDom = useRef<HTMLDivElement>(null);

  const vert = /* glsl */ `
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const frag = /* glsl */ `
    precision highp float;
    uniform float iTime;
    uniform vec3 iResolution;
    uniform float hue;
    uniform float hover;
    uniform float rot;
    uniform float hoverIntensity;
    uniform vec3 backgroundColor;
    varying vec2 vUv;

    vec3 rgb2yiq(vec3 c) {
      return vec3(dot(c,vec3(0.299,0.587,0.114)),dot(c,vec3(0.596,-0.274,-0.322)),dot(c,vec3(0.211,-0.523,0.312)));
    }
    vec3 yiq2rgb(vec3 c) {
      return vec3(c.x+0.956*c.y+0.621*c.z, c.x-0.272*c.y-0.647*c.z, c.x-1.106*c.y+1.703*c.z);
    }
    vec3 adjustHue(vec3 color, float hueDeg) {
      float hueRad = hueDeg * 3.14159265 / 180.0;
      vec3 yiq = rgb2yiq(color);
      float cosA = cos(hueRad); float sinA = sin(hueRad);
      return yiq2rgb(vec3(yiq.x, yiq.y*cosA - yiq.z*sinA, yiq.y*sinA + yiq.z*cosA));
    }
    vec3 hash33(vec3 p3) {
      p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
      p3 += dot(p3, p3.yxz + 19.19);
      return -1.0 + 2.0 * fract(vec3(p3.x+p3.y, p3.x+p3.z, p3.y+p3.z) * p3.zyx);
    }
    float snoise3(vec3 p) {
      const float K1 = 0.333333333; const float K2 = 0.166666667;
      vec3 i = floor(p + (p.x+p.y+p.z)*K1);
      vec3 d0 = p - (i - (i.x+i.y+i.z)*K2);
      vec3 e = step(vec3(0.0), d0 - d0.yzx);
      vec3 i1 = e*(1.0-e.zxy); vec3 i2 = 1.0-e.zxy*(1.0-e);
      vec3 d1 = d0-(i1-K2); vec3 d2 = d0-(i2-K1); vec3 d3 = d0-0.5;
      vec4 h = max(0.6-vec4(dot(d0,d0),dot(d1,d1),dot(d2,d2),dot(d3,d3)),0.0);
      vec4 n = h*h*h*h*vec4(dot(d0,hash33(i)),dot(d1,hash33(i+i1)),dot(d2,hash33(i+i2)),dot(d3,hash33(i+1.0)));
      return dot(vec4(31.316), n);
    }

    const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);
    const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);
    const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);

    vec4 draw(vec2 uv) {
      vec3 color1 = adjustHue(baseColor1, hue);
      vec3 color2 = adjustHue(baseColor2, hue);
      vec3 color3 = adjustHue(baseColor3, hue);

      float ang = atan(uv.y, uv.x);
      float len = length(uv);
      float n0 = snoise3(vec3(uv * 0.65, iTime * 0.5)) * 0.5 + 0.5;

      // Ring parameters - thin circle by default, thickens on hover
      float ringRadius = 0.7;
      float thickness = mix(0.038, 0.22, hover);
      float radiusNoise = hover * n0 * 0.12;
      float effRadius = ringRadius + radiusNoise;

      // Distance from ring center-line
      float distToRing = abs(len - effRadius);

      // Sharp ring core
      float ringCore = smoothstep(thickness, thickness * 0.08, distToRing);

      // Soft outer glow
      float glowFalloff = mix(12.0, 4.0, hover);
      float glow = exp(-distToRing * glowFalloff) * 0.55;

      // Color gradient rotating around the ring (purple left, blue right)
      float cl = cos(ang + iTime * 0.6) * 0.5 + 0.5;
      vec3 ringColor = mix(color1, color2, cl);

      // Orbiting bright highlight spot
      vec2 lightPos = vec2(cos(iTime * -0.8), sin(iTime * -0.8)) * ringRadius;
      float lightDist = distance(uv, lightPos);
      float highlight = exp(-lightDist * lightDist * 6.0) * 1.4;

      // Combine ring + glow + highlight
      float intensity = ringCore + glow;
      vec3 col = ringColor * intensity + ringColor * highlight * 0.4;

      // On hover: partial center fill with deep color
      float centerFill = hover * smoothstep(effRadius * 0.9, effRadius * 0.3, len) * 0.2;
      col += mix(color3, ringColor, 0.3) * centerFill;

      float alpha = clamp(intensity + highlight * 0.3 + centerFill, 0.0, 1.0);
      return vec4(clamp(col, 0.0, 1.0), alpha);
    }

    vec4 mainImage(vec2 fragCoord) {
      vec2 center = iResolution.xy * 0.5;
      float size = min(iResolution.x, iResolution.y);
      vec2 uv = (fragCoord - center) / size * 2.0;
      float angle = rot;
      float s = sin(angle); float c = cos(angle);
      uv = vec2(c*uv.x - s*uv.y, s*uv.x + c*uv.y);
      uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
      uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);
      return draw(uv);
    }

    void main() {
      vec2 fragCoord = vUv * iResolution.xy;
      vec4 col = mainImage(fragCoord);
      gl_FragColor = vec4(col.rgb, col.a);
    }
  `;

  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vert, fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height) },
        hue: { value: hue }, hover: { value: 0 }, rot: { value: 0 },
        hoverIntensity: { value: hoverIntensity },
        backgroundColor: { value: hexToVec3(backgroundColor) }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!container) return;
      const dpr = window.devicePixelRatio || 1;
      const w = container.clientWidth, h = container.clientHeight;
      renderer.setSize(w * dpr, h * dpr);
      gl.canvas.style.width = w + 'px';
      gl.canvas.style.height = h + 'px';
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    let targetHover = 0, lastTime = 0, currentRot = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      const uvX = ((e.clientX - rect.left - rect.width / 2) / size) * 2.0;
      const uvY = ((e.clientY - rect.top - rect.height / 2) / size) * 2.0;
      targetHover = Math.sqrt(uvX * uvX + uvY * uvY) < 0.85 ? 1 : 0;
    };
    const handleMouseLeave = () => { targetHover = 0; };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    let rafId: number;
    const update = (t: number) => {
      rafId = requestAnimationFrame(update);
      const dt = (t - lastTime) * 0.001;
      lastTime = t;
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.hue.value = hue;
      program.uniforms.hoverIntensity.value = hoverIntensity;
      const effectiveHover = forceHoverState ? 1 : targetHover;
      program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.08;
      if (rotateOnHover && effectiveHover > 0.5) currentRot += dt * 0.3;
      program.uniforms.rot.value = currentRot;
      program.uniforms.backgroundColor.value = hexToVec3(backgroundColor);
      renderer.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState, backgroundColor]);

  return <div ref={ctnDom} className="w-full h-full" />;
}

function hexToVec3(color: string) {
  if (color.startsWith('#')) {
    return new Vec3(parseInt(color.slice(1, 3), 16) / 255, parseInt(color.slice(3, 5), 16) / 255, parseInt(color.slice(5, 7), 16) / 255);
  }
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (m) return new Vec3(parseInt(m[1]) / 255, parseInt(m[2]) / 255, parseInt(m[3]) / 255);
  return new Vec3(0, 0, 0);
}
