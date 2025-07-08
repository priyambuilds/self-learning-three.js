precision mediump float;
// varying float vRandom;
uniform sampler2D uTexture;
varying vec2 vuv;
varying float vElevation;
void main()
{
    // gl_FragColor = vec4(vRandom, vRandom*0.5, 1.0, 1.0);
    vec4 textureColor = texture2D(uTexture, vuv);
    textureColor.xyz *= vElevation * 2.0 + 0.5;
    gl_FragColor = textureColor;
}