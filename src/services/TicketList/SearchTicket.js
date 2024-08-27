import { aviasalesHost } from "../aviasalesHost.js";
import { listAction } from "../../store/reducers/TicketList.js";
import { toast } from "react-toastify";

export const getTicketsApi = (id) => async (dispatch) => {
    let allTickets = []; // Массив всех билетов
    let stop = false; // Флаг завершения цикла

    while (!stop) {
        try {
            const { data } = await aviasalesHost.get(`tickets?searchId=${id}`);

            // Добавляем билеты к списку
            allTickets = [...allTickets, ...data.tickets];

            // Обновляем список в Redux store
            dispatch(listAction(allTickets));

            // Проверяем, нужно ли завершить цикл
            stop = data.stop;

        } catch (e) {
            // cервер - игнор, иначе - показываем пользователю ошибку 
            if (e.response && e.response.status >= 500 && e.response.status < 600) {
                toast.error('Ошибка сервера', {
                    position: "bottom-left",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error('Ошибка при загрузке билетов', {
                    position: "bottom-left",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                stop = true; // Прекращаем цикл не сервер ошибка
            }
        }
    }
};

export const getSearchApi = () => async (dispatch) => {
    try {
        const { data } = await aviasalesHost.get('search');
        dispatch(getTicketsApi(data.searchId));
    } catch (e) {
        toast.error('Ошибка при инициализации поиска', {
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
