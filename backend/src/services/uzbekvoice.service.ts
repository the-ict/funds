import type { ISpeechToTextResponse } from "../types/uzbekvoice.types.js";
import logger from "../utils/loggers.js";
import FormData from "form-data";
import axios from "axios";
import fs from "fs";

class UzbekVoiceService {
    private readonly baseUrl: string = process.env.UZBEK_VOICE_API_BASE_URL || "";
    private readonly apiKey: string = process.env.UZBEK_VOICE_API_KEY || "";

    public async convertSpeechToText(audioFileLocation: string): Promise<string> {
        try {
            const data = new FormData();

            data.append("file", fs.createReadStream(audioFileLocation));
            data.append("return_offsets", "false");
            data.append('run_diarization', 'false');
            data.append('language', 'uz');
            data.append('model', 'general');
            data.append('blocking', 'false');

            const response: ISpeechToTextResponse = await axios.post(`${this.baseUrl}/v1/stt`, data, {
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    ...data.getHeaders(),
                }
            }).then(res => res.data);

            return response.result.text;
        } catch (err) {
            logger.error("Failed to convert speech to text", { error: err });
            throw new Error("Failed to convert speech to text", {
                cause: err,
            });
        }
    }
}

export default new UzbekVoiceService();