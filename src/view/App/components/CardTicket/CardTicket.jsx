/* 
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import Ticket from './Ticket';
import styles from './CardTicket.module.scss';
import { toast } from 'react-toastify';
import { compareValues } from '../../../../helpers/compareValues.js';


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

    return (
        <>
            {list ? (
                <>
                    {listTickets.length > 0 ? (
                        listTickets.map((el, id) => (
                            <Ticket key={id} ticket={el} />
                        ))
                    ) : (
                        <div className={styles.noTickets}>Нет доступных билетов</div>
                    )}
                    <button className={styles.showTicketButton} onClick={() => {
                        setCardTickets((cT) => cT + 5);
                    }}>
                        Показать еще 5 билетов
                    </button>
                </>
            ) : (
                <div className={styles.cardTicketSpinner}>
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            )}
        </>
    );
};

export default CardTicket;

 */

import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import Ticket from './Ticket';
import styles from './CardTicket.module.scss';
import { toast } from 'react-toastify';
import { compareValues } from '../../../../helpers/compareValues.js';

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

    return (
        <>
            {list ? (
                <>
                    {listTickets.length > 0 ? (
                        listTickets.map((el) => {
                            
                            const uniqueKey = `${el.price}-${el.segments[0]?.date}-${el.segments[0]?.origin}-${el.segments[0]?.destination}`;

                            return (
                                <Ticket key={uniqueKey} ticket={el} />
                            );
                        })
                    ) : (
                        <div className={styles.noTickets}>Нет доступных билетов</div>
                    )}
                    <button className={styles.showTicketButton} onClick={() => {
                        setCardTickets((cT) => cT + 5);
                    }}>
                        Показать еще 5 билетов
                    </button>
                </>
            ) : (
                <div className={styles.cardTicketSpinner}>
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            )}
        </>
    );
};

export default CardTicket;
