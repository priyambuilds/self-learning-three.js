vec4 getColor () {
    return vec4(1.0);
}

coid getColorUsingOut(in vec4 colour, out vec4 final) {
    final = colour * vec4(0.5);
}

vid mina() {
    vec4 final;
    getColorUsingOut(vec4(1.0), final);
    gl_FragColor = final;
}