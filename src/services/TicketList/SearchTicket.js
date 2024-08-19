/* import {aviasalesHost} from "../aviasalesHost.js";
import {listAction} from "../../store/reducers/TicketList.js";
import {toast} from "react-toastify";

export const getTicketsApi = (id) =>
    async (dispatch) => {
        try {
            const {data} = await aviasalesHost.get(`tickets?searchId=${id}`).catch((e) => {
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
            })

            dispatch(listAction(data));
        } catch (e) {
            console.log(e.message);
        }
    }

export const getSearchApi = () => async (dispatch) => {
    try {
        const {data} = await aviasalesHost.get(`search`);

        dispatch(getTicketsApi(data.searchId));
    } catch (e) {
        console.log(e.message);
    }
}
 */

import {aviasalesHost} from "../aviasalesHost.js";
import {listAction} from "../../store/reducers/TicketList.js";
import {toast} from "react-toastify";

export const getTicketsApi = (id) => 
    async (dispatch) => {
        try {
            const {data} = await aviasalesHost.get(`tickets?searchId=${id}`);
            dispatch(listAction(data));
        } catch (e) {
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
            } else {
                console.log(e.message);
            }
        }
    };

export const getSearchApi = () => 
    async (dispatch) => {
        try {
            const {data} = await aviasalesHost.get(`search`);
            if (data.searchId) {
                dispatch(getTicketsApi(data.searchId));
            } else {
                throw new Error("Search ID not found in response");
            }
        } catch (e) {
            console.log(e.message);
        }
    };
