import { useState } from "react";
import { faqs } from "./data"

export default function Accordion({}) {
    const [clicked, setClicked] = useState("0");

    const handleToggle = (index) => {
        if(clicked === index) {
            return setClicked("0")
        }
        setClicked(index)
    };
    
    return (
        <ul className="accordion">
            {faqs.map((faq,index) => (
                <AccordionItem 
                    onToggle={() => handleToggle(index)}
                    active={clicked === index}
                    key={index} faq={faq}
                />
            ))}
        </ul>
    )
}

const AccordionItem = ({ faq, active, onToggle }) => {
    const { question, answer } = faq;
    return (
        <li className={`accordioncomponents__item ${active ? "active" : ""}`}>
        <button className="accordioncomponents__button" onClick={onToggle}>
            {question}
            <span className="accordioncomponents__control">{active ? "—" : "+"}</span>
        </button>
        <div className={`accordioncomponents__answerwrapper ${active ? "open" : ""}`}>
            <div className="accordioncomponents__answer">{answer}</div>
        </div>
        </li>
    );
};