import * as THREE from 'three'

class SimonDevGLSLCourse {
  constructor() {
    this.threejs_ = null;
    this.scene_ = null;
    this.camera_ = null;
    this.material_ = null;
  }

  async initialize() {
    // Create renderer
    this.threejs_ = new THREE.WebGLRenderer({
      antialias: true
    });
    document.body.appendChild(this.threejs_.domElement);

    // Create scene
    this.scene_ = new THREE.Scene();
    
    // Create camera
    this.camera_ = new THREE.OrthographicCamera(0, 1, 1, 0, 0.1, 1000);
    this.camera_.position.set(0, 0, 1);
    
    // Add window resize handler
    window.addEventListener('resize', () => {
      this.onWindowResize_();
    }, false);

    await this.setupProject_();
    
    this.onWindowResize_();
    this.raf_();
  }

  async setupProject_() {
    try {
      // Load shader files
      const [vertexShader, fragmentShader] = await Promise.all([
        fetch('./shaders/vertex-shader.glsl').then(res => res.text()),
        fetch('./shaders/fragment-shader.glsl').then(res => res.text())
      ]);

      console.log('Loaded shaders:', { vertexShader, fragmentShader });

      // Create shader material
      this.material_ = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        side: THREE.DoubleSide
      });

      // Create and setup mesh
      const geometry = new THREE.PlaneGeometry(1, 1);
      const plane = new THREE.Mesh(geometry, this.material_);
      plane.position.set(0.5, 0.5, 0);
      
      // Add to scene
      this.scene_.add(plane);

      // Debug info
      console.log('Scene children:', this.scene_.children);
      console.log('Camera position:', this.camera_.position);
      console.log('Plane position:', plane.position);
      
    } catch (error) {
      console.error('Error in setupProject_:', error);
    }

    const geometry = new THREE.PlaneGeometry(1, 1);

    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0.5, 0.5, 0);
    this.scene_.add(plane);

    this.onWindowResize_();
  }

  onWindowResize_() {
    // Update renderer
    this.threejs_.setSize(window.innerWidth, window.innerHeight);
    this.threejs_.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Update camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera_.updateProjectionMatrix();
  }

  raf_() {
    requestAnimationFrame((t) => {
      if (this.material_) {
        // Update uniforms here if needed
      }
      
      // Render scene
      this.threejs_.render(this.scene_, this.camera_);
      this.raf_();
    });
  }
}


let APP_ = null;

window.addEventListener('DOMContentLoaded', async () => {
  APP_ = new SimonDevGLSLCourse();
  await APP_.initialize();
});
