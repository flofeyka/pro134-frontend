import {OrderSecondStage} from "@comp/pages/order-page/common/OrderSecondStage";
import {OrderFirstStage} from "@comp/pages/order-page/common/OrderFirstStage";
import {useContext} from "react";
import {OrderContext} from "@comp/pages/order-page/context/OrderContext";
import {OrderFirstJuridicalPage} from "@comp/pages/order-page/common/OrderFirstJuridicalPage";
import {OrderSecondJuridicalPage} from "@comp/pages/order-page/common/OrderSecondJuridicalPage";

export const OrderStages = () => {
    const orderData = useContext(OrderContext);

    if (orderData.type === 'juridical') {
        return orderData.stage < 2 ? <OrderFirstJuridicalPage/> : <OrderSecondJuridicalPage/>
    } else {
        return orderData.stage < 2 ? <OrderFirstStage/> : <OrderSecondStage/>
    }
};