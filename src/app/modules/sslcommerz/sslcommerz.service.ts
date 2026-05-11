/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import axios from "axios";
import { envVars } from "./../../config/env";
import { ISSLcommerz } from "./sslcommerz.interface";
import AppError from "../../errorHelper/AppError";

const sslPaymentInit = async (payload: ISSLcommerz) => {
    try {
        const data = {
            store_id: envVars.SSLCOMMERZ_STORE_ID,
            store_passwd: envVars.SSLCOMMERZ_STORE_PASS,
            total_amount: payload.amount,
            currency: "BDT",
            tran_id: payload.transactionId,
            success_url: `${envVars.SSLCOMMERZ_SUCCESS_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=Success`,
            fail_url: `${envVars.SSLCOMMERZ_FAIL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=Failed`,
            cancel_url: `${envVars.SSLCOMMERZ_CANCEL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=Cancel`,
            cus_name: payload.name,
            cus_email: payload.email,
            cus_add1: payload.address,
            cus_add2: "N/A",
            cus_city: "N/A",
            cus_state: "N/A",
            cus_postcode: "N/A",
            cus_country: "Bangladesh",
            cus_phone: payload.phoneNumber,
            cus_fax: "N/A",
            ship_name: "N/A",
            ship_add1: "N/A",
            ship_add2: "N/A",
            ship_city: "N/A",
            ship_state: "N/A",
            ship_postcode: "N/A",
            ship_country: "N/A",
            multi_card_name: "N/A",
        };

        const response = await axios({
            method: "post",
            url: envVars.SSLCOMMERZ_PAYMENT_API,
            data: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        return response.data;
    } catch (error: any) {
        throw new AppError(httpStatus.BAD_REQUEST, error.message, "");
    }
};

export const sslService = {
    sslPaymentInit,
};
