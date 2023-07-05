import { ReactComponent as Dashboard } from "@/assets/images/svg/dashboard.svg";
import { ReactComponent as Merchants } from "@/assets/images/svg/merchants.svg";
import { ReactComponent as UnpaidPayments } from "@/assets/images/svg/unpaid-payments.svg";
import { ReactComponent as RejectedInputLines } from "@/assets/images/svg/rejected-input-lines.svg";
import { ReactComponent as Disputes } from "@/assets/images/svg/disputes.svg";
import { ReactComponent as Users } from "@/assets/images/svg/users.svg";
import { PATHS } from "@/lib";

export const navigation = [
    {
        id: 1,
        name: "Dashboard",
        path: PATHS.ROOT,
        icon: Dashboard,
    },
    {
        id: 2,
        name: "Merchants",
        path: PATHS.MERCHANTS,
        icon: Merchants,
    },
    {
        id: 3,
        name: "Unpaid payments",
        path: PATHS.UNPAID_PAYMENTS,
        icon: UnpaidPayments,
    },
    {
        id: 4,
        name: "Rejected input lines",
        path: PATHS.REJECTED_INPUT_LINES,
        icon: RejectedInputLines,
    },
    {
        id: 5,
        name: "Disputes",
        path: PATHS.DISPUTES,
        icon: Disputes,
    },
    {
        id: 6,
        name: "Users",
        path: PATHS.USERS,
        icon: Users,
    },
];
