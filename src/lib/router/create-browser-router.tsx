import { MerchantLayout, PrivateLayout, PublicLayout } from "@/layouts";
import {
    ConfirmAccount,
    ForgotPassword,
    Login,
    Dashboard,
    NotFoundPublic,
    NotFoundPrivate,
    Merchants,
    UnpaidPayments,
    Disputes,
    RejectedInputLines,
    Users,
    Merchant,
} from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "@/lib";

export const router = createBrowserRouter([
    {
        path: PATHS.ROOT,
        element: <PublicLayout />,
        errorElement: <NotFoundPublic />,
        children: [
            {
                path: PATHS.LOGIN,
                element: <Login />,
            },
            {
                path: PATHS.CONFIRM_ACCOUNT,
                element: <ConfirmAccount />,
            },
            {
                path: PATHS.FORGOT_PASSWORD,
                element: <ForgotPassword />,
            },
        ],
    },
    {
        path: PATHS.ROOT,
        element: <PrivateLayout />,
        errorElement: <NotFoundPrivate />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: PATHS.MERCHANTS,
                element: <MerchantLayout />,
                children: [
                    {
                        index: true,
                        element: <Merchants />,
                    },
                    {
                        path: PATHS.MERCHANT,
                        element: <Merchant />,
                    },
                ],
            },
            {
                path: PATHS.UNPAID_PAYMENTS,
                element: <UnpaidPayments />,
            },
            {
                path: PATHS.REJECTED_INPUT_LINES,
                element: <RejectedInputLines />,
            },
            {
                path: PATHS.DISPUTES,
                element: <Disputes />,
            },
            {
                path: PATHS.USERS,
                element: <Users />,
            },
        ],
    },
]);
