

import { useState } from 'react';
import styles from './GradeFilter.module.scss';
import { useDispatch } from 'react-redux';
import { sortAction } from "../../../../store/reducers/TicketList.js";

function GradeFilter() {
    const [activeId, setActiveId] = useState(1);
    const dispatch = useDispatch();
    const data = [
        {
            id: 1,
            selectId: 1,
            title: "Самый дешевый",
            sortKey: "price",
            order: "asc"
        },
        {
            id: 2,
            selectId: 2,
            title: "Самый быстрый",
            sortKey: "duration",
            order: "asc"
        },
        {
            id: 3,
            selectId: 3,
            title: "Оптимальный",
            sortKey: "optimal",
            order: "asc" // Можно задать логику сортировки "оптимальный", если есть такие данные
        }
    ];

    const filterClickSort = (id) => {
        const selectedFilter = data.find(item => item.id === id);
        if (selectedFilter) {
            dispatch(sortAction({ key: selectedFilter.sortKey, order: selectedFilter.order }));
            setActiveId(id);
        }
    };

    return (
        <div className={styles.GradeFilter}>
            {data.map(el => (
                <button 
                    className={`${styles.GradeFilterSelect} ${el.selectId === activeId ? styles.active : ''}`} 
                    key={el.id} 
                    onClick={() => filterClickSort(el.selectId)}
                >
                    {el.title}
                </button>
            ))}
        </div>
    );
}

export default GradeFilter;
