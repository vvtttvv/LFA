/**
 * @param {FiniteAutomaton} 
 * @param {string} canvasId 
 */
export default function drawAutomaton(automaton, canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    const states = Array.from(automaton.states);
    const numStates = states.length;
 
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;  
 
    let positions = {};
    for (let i = 0; i < numStates; i++) {
        let angle = (2 * Math.PI * i) / numStates;
        let x = centerX + radius * Math.cos(angle);
        let y = centerY + radius * Math.sin(angle);
        positions[states[i]] = { x, y };
    }
 
    function drawArrow(x1, y1, x2, y2, label) { 
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
 
        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = Math.atan2(dy, dx);
 
        let arrowX = x2 - 10 * Math.cos(angle);
        let arrowY = y2 - 10 * Math.sin(angle);
 
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(
            arrowX - 5 * Math.cos(angle - Math.PI / 6),
            arrowY - 5 * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            arrowX - 5 * Math.cos(angle + Math.PI / 6),
            arrowY - 5 * Math.sin(angle + Math.PI / 6)
        );
        ctx.fill();
 
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        ctx.fillStyle = "blue";
        ctx.font = "14px Arial";
        ctx.fillText(label, midX, midY);
        ctx.fillStyle = "black";
    }
 
    for (let state of states) {
        if (!automaton.transitions[state]) continue;
        for (let symbol of Object.keys(automaton.transitions[state])) {
            let nextStates = automaton.transitions[state][symbol]; 
            for (let nxt of nextStates) { 
                if (nxt === state) {
                    drawSelfLoop(positions[state].x, positions[state].y, symbol);
                } else {
                    drawArrow(
                        positions[state].x,
                        positions[state].y,
                        positions[nxt]?.x ?? positions[state].x,
                        positions[nxt]?.y ?? positions[state].y,
                        symbol
                    );
                }
            }
        }
    }
 
    for (let state of states) {
        let { x, y } = positions[state]; 
        let r = 18;
 
        let isFinal = automaton.finalStates.has(state);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();

        if (isFinal) {
            ctx.beginPath();
            ctx.arc(x, y, r - 4, 0, 2 * Math.PI, false);
            ctx.stroke();
        }
 
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(state, x, y);
 
        if (state === automaton.initialState) { 
            ctx.beginPath();
            ctx.moveTo(x - 2*r - 20, y);
            ctx.lineTo(x - r, y);
            ctx.stroke(); 
            ctx.beginPath();
            ctx.moveTo(x - r, y);
            ctx.lineTo(x - r - 5, y - 5);
            ctx.lineTo(x - r - 5, y + 5);
            ctx.fill();
        }
    }
 
    function drawSelfLoop(cx, cy, label) {
        // Радиус круга состояния (в вашем коде r=18)
        const r = 18;
        // Насколько далеко уходим от круга, чтобы нарисовать "петлю"
        const loopOffset = 30;
    
        // Точка, откуда начинаем (например, верхняя точка окружности)
        const startX = cx;
        const startY = cy - r;
    
        // «Средняя» точка, до которой уходим, чтобы получился небольшой уголок
        const midX = cx - loopOffset;
        const midY = cy - r - loopOffset;
    
        // Фактически возвращаемся обратно в ту же точку
        const endX = startX;
        const endY = startY;
    
        // Линия «туда и обратно»
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(midX, midY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    
        // Рисуем стрелку на последнем отрезке (от midX,midY до endX,endY)
        const dx = endX - midX;
        const dy = endY - midY;
        const angle = Math.atan2(dy, dx);
    
        // Координаты конца стрелки (чуть «отступим», чтобы треугольник стрелки был виден)
        const arrowX = endX - 10 * Math.cos(angle);
        const arrowY = endY - 10 * Math.sin(angle);
    
        // Собственно «треугольник» стрелки
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(
            arrowX - 5 * Math.cos(angle - Math.PI / 6),
            arrowY - 5 * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            arrowX - 5 * Math.cos(angle + Math.PI / 6),
            arrowY - 5 * Math.sin(angle + Math.PI / 6)
        );
        ctx.fill();
    
        // Подпись (метка символа) рядом
        ctx.fillStyle = "blue";
        ctx.fillText(label, midX, midY - 5);
        ctx.fillStyle = "black";
    }
    
}
