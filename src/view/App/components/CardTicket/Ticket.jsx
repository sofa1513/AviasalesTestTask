import React from "react";
import styles from './Ticket.module.scss';
import { formatDuration, timeInFly } from "../../../../utils/ticketUtils.js";

// ключ
const generateSegmentKey = (segment) => {
    const { origin, destination, date, duration } = segment;
    return `${origin}-${destination}-${date}-${duration}`;
};

const Ticket = ({ ticket }) => {
    const priceRU = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
    });

    return (
        <div className={styles.cardTicket}>
            <div className={styles.cardTicketHeader}>
                <div className={styles.cardTicketPrice}>{priceRU.format(ticket.price)}</div>
                <div>
                    <img alt="carrier logo" src={`https://pics.avs.io/99/36/${ticket.carrier}.png`} />
                </div>
            </div>

            {ticket.segments.map((segment) => (
                <div className={styles.cardTicketInfo} key={generateSegmentKey(segment)}>
                    <div className={styles.cardTicketInfoDate}>
                        <div className={styles.cardTicketInfoDateDay}>
                            {segment.origin} – {segment.destination}
                        </div>
                        <div className={styles.cardTicketInfoDateTime}>
                            {timeInFly(segment.date, segment.duration)}
                        </div>
                    </div>
                    <div className={styles.cardTicketInfoDate}>
                        <div className={styles.cardTicketInfoDateDay}>
                            В пути
                        </div>
                        <div className={styles.cardTicketInfoDateTime}>
                            {formatDuration(segment.duration)}
                        </div>
                    </div>
                    <div className={styles.cardTicketInfoDate}>
                        <div className={styles.cardTicketInfoDateDay}>
                            {segment.stops.length} пересадки
                        </div>
                        <div className={styles.cardTicketInfoDateTime}>
                            {segment.stops.join(", ")}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Ticket;
