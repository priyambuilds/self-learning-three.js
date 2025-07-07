uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
attribute vec3 position;

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

void main()// called automatically. It does not return anything (void)
{   
    // float result = lorem();

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
