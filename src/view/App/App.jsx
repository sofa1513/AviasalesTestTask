import TransFilter from "./components/TransFilter/TransFilter.jsx";
import TabFilter from "./components/GradeFilter/GradeFilter.jsx";
import CardTicket from "./components/CardTicket/CardTicket.jsx";
import { Alert } from "antd";

import img from "../../assets/logo.svg";
import styles from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getSearchApi} from "../../services/TicketList/SearchTicket.js";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
    let {filters} = useSelector(state => state.TicketList);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSearchApi());
    }, [dispatch]);

    return (
        <>
        <ToastContainer />
            <img className={styles.appLogo} alt="logo" src={img}/>
            <div className={styles.appWrapper}>
                <aside>
                    <TransFilter/>
                </aside>
                <div className={styles.appMain}>
                    <TabFilter/>
                    {filters.length ===0?
                        <Alert
                            description="Рейсов, подходящих под заданные фильтры, не найдено"
                            type="info"
                        />
                        :
                        <CardTicket/>
                    }

                </div>
            </div>
        </>
    )
}

export default App;
