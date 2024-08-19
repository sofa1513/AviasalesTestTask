import styles from "./TransFilter.module.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filtersAction } from "../../../../store/reducers/TicketList.js";

const TransFilter = () => {
    const [checkbox, setCheckbox] = useState([5, 0, 1, 2, 3]);
    const dispatch = useDispatch();

    const checkList = [
        { id: 1, name: "all", title: "Все", select: 5 },
        { id: 2, name: "NotTransfers", title: "Без пересадок", select: 0 },
        { id: 3, name: "OneTransfers", title: "1 пересадка", select: 1 },
        { id: 4, name: "TwoTransfers", title: "2 пересадки", select: 2 },
        { id: 5, name: "ThreeTransfers", title: "3 пересадки", select: 3 }
    ];

    useEffect(() => {
        dispatch(filtersAction(checkbox));
    }, [checkbox, dispatch]);

    const handlerCheckbox = (event) => {
        const { checked, value } = event.target;
        const selectedValue = parseInt(value);

        if (selectedValue === 5) {
            const allOthersChecked = [0, 1, 2, 3].every(val => checkbox.includes(val));
            setCheckbox(checked ? [0, 1, 2, 3, 5] : []);
        } else {
            setCheckbox(prev => {
                const updatedState = checked
                    ? [...prev, selectedValue]
                    : prev.filter(val => val !== selectedValue);

                const allOthersChecked = [0, 1, 2, 3].every(val => updatedState.includes(val));

                return allOthersChecked ? [...updatedState, 5] : updatedState.filter(val => val !== 5);
            });
        }
    };

    return (
        <aside className={styles.TransFilter}>
            <p className={styles.TransFilterTitle}>Количество пересадок</p>
            {checkList.map((item) =>
                <label key={item.id} className={styles.TransFilterLabel}>
                    <input
                        className={styles.TransFilterInput}
                        value={item.select}
                        type="checkbox"
                        checked={checkbox.includes(item.select)}
                        onChange={handlerCheckbox} 
                    />
                    <p>{item.title}</p>
                </label>
            )}
        </aside>
    );
};

export default TransFilter;
