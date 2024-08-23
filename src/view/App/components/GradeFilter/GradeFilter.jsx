
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
            title: "Самый дешевый", 
            sortKey: "price", 
            order: "asc" 
        },
        { 
            id: 2,  
            title: "Самый быстрый", 
            sortKey: "duration", 
            order: "asc" 
        },
        { 
            id: 3, 
            title: "Оптимальный", 
            sortKey: "optimal", 
            order: "asc" 
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
                    className={`${styles.GradeFilterSelect} ${el.id === activeId ? styles.active : ''}`} 
                    key={el.id} 
                    onClick={() => filterClickSort(el.id)}
                >
                    {el.title}
                </button>
            ))}
        </div>
    );
}

export default GradeFilter;
