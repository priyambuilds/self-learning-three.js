// uniform mat4 projectionMatrix;
// uniform mat4 modelViewMatrix;
// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;
// attribute vec3 position;
uniform vec2 uFrequency;
uniform float uTime;
// attribute vec2 uv;

varying vec2 vuv;
varying float vElevation;
// attribute float aRandom;
// varying float vRandom;
    // float a = 0.455;
    // float b = 0.555;
    // float c = a + b;

    // int foo = 123;
    // int bar = 456;
    // int foobar = foo + bar;

    // float g = 0.345;
    // int ge = 2
    // float h = g * float(ge);

    // bool isTrue = true;
    // bool isFalse = false;
    // bool isTrueAndFalse = isTrue && isFalse;
    // bool isTrueOrFalse = isTrue || isFalse;
    // bool isNotTrue = !isTrue;
    // bool isNotFalse = !isFalse;
    // bool isNotTrueAndFalse = !(isTrue && isFalse);
    // bool isNotTrueOrFalse = !(isTrue || isFalse);
    // bool isNotTrueAndNotFalse = !isTrue && !isFalse;
    // bool isNotTrueOrNotFalse = !isTrue || !isFalse;

    // vec2 foo = vec2(1.0, 2.0);
    // foo.x = 3.0;
    // foo.y = 4.0;
    // foo.xy = vec2(5.0, 6.0);
    // foo *= 2.0; // multiplying each component by 2.0

    // float lorem() { // function that returns a float
    //     float a = 1.0;
    //     float b = 2.0;

    //     return a + b;
    // }
    // float result = lorem();
void main()// called automatically. It does not return anything (void)
{   
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
    modelPosition.z += elevation;

    // modelPosition.z = aRandom * 0.1; // wave effect (sin)
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    // vRandom = aRandom;
    vuv = uv;
    vElevation = elevation;
}
