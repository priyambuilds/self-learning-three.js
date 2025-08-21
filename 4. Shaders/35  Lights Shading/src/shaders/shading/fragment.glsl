uniform vec3 uColor;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/ambientLight.glsl
#include ../includes/directionalLight.glsl
#include ../includes/pointLight.glsl


void main()
{
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 color = uColor;

    // Ambient Light
    vec3 light = vec3(0.0);
    light += ambientLight
    (
        vec3(1.0),  // Light color
        0.03 // Light intensity
    );

    // Directional Light
    light += directionaltLight(
        vec3(0.1, 0.1, 1.0), // Light color
        1.0, // Light intensity
        normal,
        vec3(0.0, 0.0, 3.0), // Light position
        viewDirection,// view direction
        20.0 // spedular power
    );

     // Point Light 1
    light += pointLight(
        vec3(1.0, 0.1, 0.1), // Light color
        1.0, // Light intensity
        normal,
        vec3(0.0, 2.5, 0.0), // Light position
        viewDirection,// view direction
        20.0, // specular power
        vPosition, // Position
        0.25 // light decay
    );

     // Point Light 2
    light += pointLight(
        vec3(0.1, 1.0, 0.5), // Light color
        1.0, // Light intensity
        normal,
        vec3(2.0, 2.0, 2.0), // Light position
        viewDirection,// view direction
        20.0, // specular power
        vPosition, // Position
        0.25 // light decay
    );
    color *= light;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}