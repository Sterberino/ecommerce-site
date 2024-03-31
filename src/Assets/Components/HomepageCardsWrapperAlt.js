import HomepageCard from "./HomepageCard";

export default function HomepageCardsWrapperAlt()
{
    return (
        <div className="cards-wrapper-alt">
            <HomepageCard
                imageUrl={'Homepage-Bored-Ape-2.jpg'}
                style={{ transform: 'translate(-60px, 80px)' }}
                title={"Bored Ape Megaluxe"}
            />
            <HomepageCard
                imageUrl={'Homepage-Bored-Ape-1.jpg'}
                style={{ transform: 'translate(-30px, 50px)' }}
                title={"Bored Ape Especial"}
            />
            <HomepageCard
                imageUrl={'Homepage-Bored-Ape-3.jpg'}
                style={{ transform: 'translate(0px, 20px)' }}
                title={"Bored Ape Ultraluxe"}
            />
            <div className="background-grid"></div>            
            <div className="blob" style={{ translate: "5% 0%" }}></div>
        </div>
    )
}