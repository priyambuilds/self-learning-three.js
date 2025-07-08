varying vec2 vUv;

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

    float barX = step(0.4, mod(vUv.x*10.0, 1.0));
    barX *= step(0.8, mod(vUv.y*10.0, 1.0));
    float barY = step(0.8., mod(vUv.x*10.0, 1.0));
    barY *= step(0.4, mod(vUv.y*10.0, 1.0));
    float strength = barX + barY;
    gl_FragColor = vec4(strength, strength, strength, 1.0);

}