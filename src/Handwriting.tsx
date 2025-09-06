import React, { useRef, useEffect } from 'react';

type HandwritingProps = {
    textPathData: string;
    visible: boolean;
};

export default function Handwriting({ textPathData, visible }: HandwritingProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !visible) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }

        const path = new Path2D(textPathData); // SVG 경로 데이터로 Path 객체 생성

        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'); // 임시 SVG 요소 생성
        svgPath.setAttribute('d', textPathData);
        const totalLength = svgPath.getTotalLength();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.setLineDash([totalLength, totalLength]); // 선의 패턴을 (총 길이만큼의 실선, 총 길이만큼의 공백)으로 설정
        ctx.lineDashOffset = totalLength; // 선의 시작점을 총 길이만큼 밀어서 안 보이게 함

        let startTime: number | null = null;
        const animationDuration = 5000;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            const offset = totalLength - (progress / animationDuration) * totalLength;
            ctx.lineDashOffset = offset > 0 ? offset : 0; 

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.stroke(path);

            if (progress < animationDuration) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);

    }, [visible, textPathData]);

    if (!visible) return null;

    return <canvas ref={canvasRef} className="handwriting-canvas" />;

}