export type MerchantRouteParams = {
    merchantId: string;
};

export type MerchantRequest = {
    merchantId: number;
};

export type MerchantResponse = {
    name: string;
    vatNumber: string;
    ssn: string;
    registrationTime: string;
    legalFormType: { value: number; name: string };
    merchantStatus: { value: number; name: string };
    merchantPaymentStatus: { value: number; name: string };
    clearingStatus: { value: number; name: string };
    description: string;
    merchantAddresses: Array<{
        street: string;
        city: string;
        postalCode: string;
        email: string;
        support: string;
        website: string;
        phoneNumber: string;
        addressType: { value: number; name: string };
    }>;
    merchantPersons: Array<{
        firstName: string;
        middleName: string;
        lastName: string;
        roles: string[];
        phoneNumber: string;
        email: string;
    }>;
    merchantNotes: Array<{
        text: string;
        createdTime: string;
    }>;
    bankAccounts: Array<{
        bank: string;
        bankAccountNumber: string;
    }>;
    merchantUpcomingPayments: Array<{
        agreementNumber: string;
        numberOfTransactions: number;
        grossAmount: number;
        totalFees: number;
        toBePaid: number;
        scheduledDate: string;
        currency: string;
    }>;
};
