import { useEffect, useState } from "react";

const getRandom = (min: number, max: number) =>
    Math.random() * (max - min) + min;

const Star = ({ delay, top, left, duration }: any) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(true);
        }, delay * 2000);

        return () => clearTimeout(timeout);
    }, [delay]);

    return (
        <div
            className="shooting-star"
            style={{
                top: `${top}vh`,
                left: `${left}vw`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                visibility: visible ? "visible" : "hidden",
            }}
        />
    );
};

const ShootingStars = () => {
    const stars = Array.from({ length: 10 }).map((_, i) => {
        const top = getRandom(0, 20);       
        const left = getRandom(0, 20);      
        const delay = getRandom(0, 10);
        const duration = getRandom(2, 4);

        return (
            <Star
                key={i}
                top={top}
                left={left}
                delay={delay}
                duration={duration}
            />
        );
    });

    return <div className="shooting-star-container">{stars}</div>;
};

export default ShootingStars;
