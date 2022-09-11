import path from "path";
import fs from "fs";
import { ApiResponseVO } from "../viewObjects/utils/ApiResponseVO";
import { ResultVO } from "../viewObjects/utils/ResultVO";
import logger from "../middlewares/logger";

export function buildApiResponse(
    success: Boolean,
    statusCode: number,
    message?: String | any,
    object?: Object | null
): ApiResponseVO {
    const apiResponse: ApiResponseVO = {
        success,
        statusCode,
        message,
        object,
    };

    return apiResponse;
}

export function buildResult(
    success: Boolean,
    message: String,
    object?: Object | null
): ResultVO {
    const resultDto: ResultVO = {
        success,
        message,
        object,
    };

    return resultDto;
}

export function getBasePath(): string {
    const basepathAux = path.dirname(__dirname).split(path.sep);
    basepathAux.pop();
    const basepath = basepathAux.join(path.sep);
    return basepath;
}

export function getNameOneFileDirectory(filepath: string): string {
    try {
        let filename = null;
        if (!fs.existsSync(filepath)) {
            return filename;
        }
        const files = fs.readdirSync(filepath);
        
        files.forEach((el: string) => {
            filename = el;
        });

        return filename;
    } catch (err: any) {
        logger.error("StaticMethod getNameOneFile - Exceção: " + err);
        return null;
    }
}

export function verifyFileExistAndDelete(filepath: string): boolean {
    try {
        let result = true;
        if (!fs.existsSync(filepath)) {
            return result;
        }
        fs.readdir(filepath, (err, files) => {
            if (err) {
                logger.error("StaticMethods verifyFileExistAndDelete - Erro Fs: " + err);
                result = false;
                return;
            }
    
            files.forEach((el: string) => {
                fs.rm(el, (err) => {
                    if (err) {
                        logger.error("StaticMethods verifyFileExistAndDelete - Erro Fs: " + err)
                        result = false;
                        return;
                    }
                });
            });
        });
        return result;
    } catch (err: any) {
        logger.error("StaticMethod verifyFileExistAndDelete - Exceção: " + err);
        return false;
    }
}

export function saveFileAtDirectoryFromBase64(filepath: string, base64: string, filename: string): boolean {
    try {
        const extension: string = base64.split(";")[0].split("/")[1];
        const codeBase64 = base64.split(",")[1];

        const now = new Date();
        const pathFile = filepath + path.sep + filename + "_" + now.getMilliseconds() + "." + extension;
        
        let result: boolean = true;

        fs.mkdirSync(filepath, { recursive: true });

        fs.writeFileSync(pathFile, codeBase64, "base64");

        return result;
    } catch (err: any) {
        logger.error("StaticMethods saveFileAtDirectoryFromBase64 - Exceção: " + err);
        return false;
    }
}