

import styles from './CardTicket.module.scss';
import { useSelector } from "react-redux";
import { Spin } from 'antd';
import { compareValues } from "../../../../helpers/compareValues.js";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { formatDuration, timeInFly } from "../../../../utils/ticketUtils.js";

const CardTicket = () => {
    const { list, sort, filters } = useSelector(state => state.TicketList);

    const [cardTickets, setCardTickets] = useState(5);

    
    const listTickets = useMemo(() => {
        if (!list || !Array.isArray(list)) return [];

        try {
            let filteredTickets = list;

            if (filters.length > 0) {
                filteredTickets = list.filter(ticket =>
                    ticket.segments.some(segment =>
                        filters.includes(segment.stops.length)
                    )
                );
            }

            const sortedTickets = sort
                ? filteredTickets.sort(compareValues(sort.key, sort.order))
                : filteredTickets;

            return sortedTickets.slice(0, cardTickets);
        } catch (e) {
            toast.error(`Ошибка при обработке билетов: ${e.message}`, {
                position: "bottom-left",
                autoClose: 6000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return [];
        }
    }, [list, sort, filters, cardTickets]);

    const priceRU = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
    });

    return (
        <>
            {list ?
                <>
                    {listTickets.map((el, id) => (
                        <div className={styles.cardTicket} key={id}>
                            <div className={styles.cardTicketHeader}>
                                <div className={styles.cardTicketPrice}>{priceRU.format(el.price)}</div>
                                <div>
                                    <img alt="ticket" src={`https://pics.avs.io/99/36/${el.carrier}.png`} />
                                </div>
                            </div>

                            {el.segments.map((value, key) => (
                                <div className={styles.cardTicketInfo} key={key}>
                                    <div className={styles.cardTicketInfoDate}>
                                        <div className={styles.cardTicketInfoDateDay}>
                                            {value.origin} – {value.destination}
                                        </div>
                                        <div className={styles.cardTicketInfoDateTime}>
                                            {timeInFly(value.date, value.duration)}
                                        </div>
                                    </div>
                                    <div className={styles.cardTicketInfoDate}>
                                        <div className={styles.cardTicketInfoDateDay}>
                                            В пути
                                        </div>
                                        <div className={styles.cardTicketInfoDateTime}>
                                            {formatDuration(value.duration)}
                                        </div>
                                    </div>
                                    <div className={styles.cardTicketInfoDate}>
                                        <div className={styles.cardTicketInfoDateDay}>
                                            {value.stops.length} пересадки
                                        </div>
                                        <div className={styles.cardTicketInfoDateTime}>
                                            {value.stops.join(", ")}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button className={styles.showTicketButton} onClick={() => {
                        setCardTickets((cT) => cT + 5);
                    }}>
                        Показать еще 5 билетов
                    </button>
                </> :
                <div className={styles.cardTicketSpinner}>
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            }
        </>
    );
}

export default CardTicket;
