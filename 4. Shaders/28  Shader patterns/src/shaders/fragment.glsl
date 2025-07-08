varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
} 

void main()
{

    // gl_FragColor = vec4(vUv.x, vUv.x,vUv.x, 1.0);

    // float strength = mod(vUv.y*10.0, 1.0);
    // if(strength < 0.5) 
    // {
    //     strength = 0.0;
    // }
    // else {
    //     strength = 1.0;
    // }
    // strength = strength < 0.5 ? 0.0 : 1.0;
    // strength = step(0.5, strength);


    // float strength = step(0.8, mod(vUv.x*10.0, 1.0));
    // strength += step(0.8, mod(vUv.y*10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // float strength = step(0.8, mod(vUv.x*10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y*10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // float strength = step(0.4, mod(vUv.x*10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y*10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // float barX = step(0.4, mod(vUv.x*10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y*10.0, 1.0));
    // float barY = step(0.8., mod(vUv.x*10.0, 1.0));
    // barY *= step(0.4, mod(vUv.y*10.0, 1.0));
    // float strength = barX + barY;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // float barX = step(0.4, mod(vUv.x*10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y+0.2, 1.0));
    // float barY = step(0.8, mod(vUv.x+0.2, 1.0));
    // barY *= step(0.4, mod(vUv.y*10.0, 1.0));
    // float strength = barX + barY;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // float strength = abs(vUv.x -0.5);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)) );
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)) );
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // float strength = floor(vUv.x * 10.0)/10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // float strength = floor(vUv.x * 10.0)/10.0;
    // strength*= floor(vUv.y * 10.0)/10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // float strength = random(vUv);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // vec2 gridUv = vec2 (
    // floor(vUv.x * 10.0)/10.0,
    // floor(vUv.y * 10.0)/10.0
    // );
    // float strength = random(gridUv);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // vec2 gridUv = vec2 (
    // floor(vUv.x * 10.0)/10.0,
    // floor((vUv.y+vUv.x*0.5) * 10.0)/10.0 
    // );
    // float strength = random(gridUv);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // float strength = length(vUv);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // float strength = length(vUv -0.5);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    float strength = 1.0 - distance(vUv, vec2(0.5));
    gl_FragColor = vec4(strength, strength, strength, 1.0);

}