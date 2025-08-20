uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

attribute float aSize;

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax) {
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main(){

    vec3 newPosition = position;

    // exploding
    float explodingProgess = remap(uProgress, 0.0, 0.1, 0.0, 1.0);
    explodingProgess = clamp(explodingProgess, 0.0, 1.0);
    explodingProgess = 1.0 - pow(1.0 - explodingProgess, 3.0);
    newPosition *= explodingProgess;

    // Falling
    float fallingProgress = remap(uProgress, 0.1, 1.0, 0.0, 1.0);
    fallingProgress = clamp(fallingProgress, 0.0, 1.0);
    fallingProgress = pow(fallingProgress, 2.0);
    newPosition.y -= fallingProgress * 0.2;

    // Scaling
    float sizeOpeningProgess = remap(uProgress, 0.0, 0.125, 0.0, 1.0);
    float sizeClosingProgess = remap(uProgress, 0.125, 1.0, 1.0, 0.0);
    float sizeProgress = min(sizeOpeningProgess, sizeClosingProgess);
    sizeProgress = clamp(sizeProgress, 0.0, 1.0);

    // Final Position
    vec4 modelPositon = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPositon;
    gl_Position = projectionMatrix * viewPosition;

    // Final Size
    gl_PointSize = uSize * uResolution.y * aSize * sizeProgress;
    gl_PointSize *= 1.0 / - viewPosition.z;
}