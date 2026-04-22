/**
 * anomalous-matter-hero.js — vanilla JS port of the AnomalousMatterHero React component
 * Requires Three.js to be loaded before this script.
 */
(function () {
  'use strict';

  // sky-300: hsl(203, 92%, 53%) ≈ #29b6f6
  var SKY_BLUE = new THREE.Color(0x29b6f6);

  var VERTEX_SHADER = `
    uniform float time;
    varying vec3 vNormal;
    varying vec3 vPosition;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g  = step(x0.yzx, x0.xyz);
      vec3 l  = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x  = x_ * ns.x + ns.yyyy;
      vec4 y  = y_ * ns.x + ns.yyyy;
      vec4 h  = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vNormal   = normal;
      vPosition = position;
      float displacement = snoise(position * 2.0 + time * 0.5) * 0.2;
      vec3 newPosition = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;

  var FRAGMENT_SHADER = `
    uniform vec3 color;
    uniform vec3 pointLightPos;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 n        = normalize(vNormal);
      vec3 lightDir = normalize(pointLightPos - vPosition);
      float diffuse = max(dot(n, lightDir), 0.0);
      float fresnel = 1.0 - dot(n, vec3(0.0, 0.0, 1.0));
      fresnel = pow(fresnel, 2.0);
      vec3 finalColor = color * diffuse + color * fresnel * 0.5;
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  function init() {
    var mount = document.getElementById('hero-scene');
    if (!mount || typeof THREE === 'undefined') return;

    var w = mount.clientWidth;
    var h = mount.clientHeight;

    var scene    = new THREE.Scene();
    var camera   = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 3;

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    var geometry = new THREE.IcosahedronGeometry(1.2, 64);
    var uniforms = {
      time:          { value: 0 },
      pointLightPos: { value: new THREE.Vector3(0, 0, 5) },
      color:         { value: SKY_BLUE }
    };
    var material = new THREE.ShaderMaterial({
      uniforms:       uniforms,
      vertexShader:   VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      wireframe:      true
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    var pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    var frameId;

    function animate(t) {
      uniforms.time.value   = t * 0.0003;
      mesh.rotation.y      += 0.0005;
      mesh.rotation.x      += 0.0002;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate(0);

    function onResize() {
      var nw = mount.clientWidth;
      var nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    }

    function onMouseMove(e) {
      var x   = (e.clientX / window.innerWidth)  *  2 - 1;
      var y   = (e.clientY / window.innerHeight) * -2 + 1;
      var vec = new THREE.Vector3(x, y, 0.5).unproject(camera);
      var dir = vec.sub(camera.position).normalize();
      var dist = -camera.position.z / dir.z;
      var pos  = camera.position.clone().add(dir.multiplyScalar(dist));
      pointLight.position.copy(pos);
      uniforms.pointLightPos.value = pos;
    }

    window.addEventListener('resize',    onResize);
    window.addEventListener('mousemove', onMouseMove);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
