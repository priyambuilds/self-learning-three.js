uniform float uSize;
attribute float aScale;
uniform float uTime;
attribute vec3 aRandomness;
varying vec3 vColor;

void main() 
{
    // 1. Add randomness first
    vec3 pos = position + aRandomness;

    // 2. Apply your spin
    float angle = atan(pos.x, pos.z);
    float distanceToCenter = length(pos.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
    angle += angleOffset;
    pos.x = cos(angle) * distanceToCenter;
    pos.z = sin(angle) * distanceToCenter;

    // 3. Model/View/Projection transform
    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    // 4. Point size (perspective correct)
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / -viewPosition.z);

    // 5. Color pass-through
    vColor = color;
}
