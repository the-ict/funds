interface IGetTokenResponse {
    message: string;
    data: {
        token: string;
    };
    token_type: string;
};

interface IRefreshExistingTokenResponse {
    message: string;
    data: {
        token: string;
    };
    token_type: string;
};

interface ISendSmsResponse {
    id: string;
    message: string;
    status: string;
}

export type {
    IGetTokenResponse,
    IRefreshExistingTokenResponse,
    ISendSmsResponse
};