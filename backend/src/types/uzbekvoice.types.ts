interface ISpeechToTextResponse {
    id: string;
    result: {
        text: string;
    };
    state: string;
};

export type { ISpeechToTextResponse };