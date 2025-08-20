varying vec3 vPosition;
varying vec3 vNormal;

float float random2D(vec2 value){
    return fract(sin(dot(value.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main(){

    //Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Final Position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // model Normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // varyings
    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}