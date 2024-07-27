import React, { useEffect, useRef } from 'react';
import Menu from './Menu.jsx';
import './Cool.css';

function Cool() {
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        });

        sectionRefs.current.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Menu />
            <section ref={(el) => (sectionRefs.current[0] = el)} className="hidden">
                <h1>Welcome to the New Age!</h1>
            </section>
            
            <section ref={(el) => (sectionRefs.current[1] = el)} className="hidden">
                <h1>Hello There.</h1>
            </section>

            <section ref={(el) => (sectionRefs.current[2] = el)} className="hidden">
                <h1>Illya is the Best.</h1>
                <p>
                    The only thing she did wrong was nothing.
                    Just like Homura.
                </p>
            </section>

            <section ref={(el) => (sectionRefs.current[3] = el)} className="hidden">
                <h2>Watch Fate Content!</h2>
            </section>
        </>
    );
}

export default Cool;