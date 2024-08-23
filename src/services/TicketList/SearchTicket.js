

import { aviasalesHost } from "../aviasalesHost.js";
import { listAction } from "../../store/reducers/TicketList.js";
import { toast } from "react-toastify";

export const getTicketsApi = (id) => 
    async (dispatch) => {
        let allTickets = []; // Масси ввсех билетов
        let stop = false; // Флаг  завершения цикла

        while (!stop) {
            try {
                const { data } = await aviasalesHost.get(`tickets?searchId=${id}`).catch((e) => {
                    if (e.response) {
                        toast.error(e.response.data, {
                            position: "bottom-left",
                            autoClose: 6000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                });

                //  билеты к общему списку
                allTickets = [...allTickets, ...data.tickets];
                
                //  флаг остановки
                stop = data.stop;

            } catch (e) {
                console.log(e.message);
                stop = true; // ошибк
            }
        }

      
        dispatch(listAction(allTickets));
    }

export const getSearchApi = () => async (dispatch) => {
    try {
        const { data } = await aviasalesHost.get(`search`);
        dispatch(getTicketsApi(data.searchId));
    } catch (e) {
        console.log(e.message);
    }
}
