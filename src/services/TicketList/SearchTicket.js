
import { aviasalesHost } from "../aviasalesHost.js";
import { listAction } from "../../store/reducers/TicketList.js";
import { toast } from "react-toastify";

export const getTicketsApi = (id) => async (dispatch) => {
    let allTickets = []; // Массив всех билетов
    let stop = false; // Флаг завершения цикла

    while (!stop) {
        try {
            const { data } = await aviasalesHost.get(`tickets?searchId=${id}`).catch((e) => {
                if (e.response) {
                    toast.error(`Ошибка сервера`, {
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

            if (data) {
                // билеты к списку
                allTickets = [...allTickets, ...data.tickets];

                // Обновляем список Redux store
                dispatch(listAction(allTickets));

                
                stop = data.stop;
            }

        } catch (e) {
            toast.error(`Ошибка при загрузке билетов`, {
                position: "bottom-left",
                autoClose: 6000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            
        }
    }
};

export const getSearchApi = () => async (dispatch) => {
    try {
        const { data } = await aviasalesHost.get(`search`);
        dispatch(getTicketsApi(data.searchId));
    } catch (e) {
        toast.error(`Ошибка при инициализации поиска`, {
            position: "bottom-left",
            autoClose: 6000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};
