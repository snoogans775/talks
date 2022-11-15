export function normalizeMousePosition({x, y}) {
    return {
        mouseX: (x / window.innerWidth).toFixed(2),
        mouseY: (y / window.innerHeight).toFixed(2)
    }
} 