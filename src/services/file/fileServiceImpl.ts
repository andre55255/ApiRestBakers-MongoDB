import path from "path";
import {
    buildResult,
    getBasePath,
    getNameOneFileDirectory,
    saveFileAtDirectoryFromBase64,
    verifyFileExistAndDelete,
} from "../../helpers/staticMethods";
import logger from "../../middlewares/logger";
import { FileVO } from "../../viewObjects/utils/FileVO";
import { ResultVO } from "../../viewObjects/utils/ResultVO";
import { FileServiceInterface } from "./fileServiceInterface";

export class FileServiceImpl implements FileServiceInterface {
    public getUrlOneFileAtDirectory(
        entityName: string,
        entityId: string,
        defaultImg?: boolean
    ): FileVO {
        try {
            let basepath;
            let urlAccessFile;
            if (defaultImg) {
                basepath = path.resolve(
                    getBasePath(),
                    "public",
                    entityName,
                    "Unique",
                    "Default"
                );

                urlAccessFile = `${process.env.SSL_URL}://${process.env.BASE_URL}:${process.env.PORT_SERVER}/static/${entityName}/Unique/Default/`;
            } else {
                basepath = path.resolve(
                    getBasePath(),
                    "public",
                    entityName,
                    "Unique",
                    entityId
                );
                urlAccessFile = `${process.env.SSL_URL}://${process.env.BASE_URL}:${process.env.PORT_SERVER}/static/${entityName}/Unique/${entityId}/`;
            }
            const filename = getNameOneFileDirectory(basepath);
            if (!filename) {
                return null;
            }

            const file: FileVO = {
                name: entityName,
                file: urlAccessFile + filename,
                disabled: false,
            };

            return file;
        } catch (err: any) {
            logger.error("FileService getUrlOneFile - Exceção: " + err);
            return null;
        }
    }

    public saveOneFileBase64AtDirectory(
        fileVO: FileVO,
        entityName: string,
        entityId: string
    ): ResultVO {
        try {
            if (!fileVO || !fileVO.file) {
                return buildResult(
                    false,
                    "Arquivo não informado para inserção no diretório"
                );
            }
            const basepath = path.resolve(
                getBasePath(),
                "public",
                entityName,
                "Unique",
                entityId
            );

            const verifyFileDeleted = verifyFileExistAndDelete(basepath);
            if (!verifyFileDeleted) {
                logger.error(
                    "FileService saveOneFileDirectory - Falha ao verificar diretório para inserir arquivo, entidade: " +
                        entityName
                );
                return buildResult(
                    false,
                    "Falha ao verificar diretório para inserção de arquivo"
                );
            }

            const resultSave = saveFileAtDirectoryFromBase64(
                basepath,
                fileVO.file,
                fileVO.name
            );
            if (!resultSave) {
                logger.error(
                    "FileService saveOneFileDirectory - Falha ao salvar arquivo em diretório, entidade: " +
                        entityName
                );
                return buildResult(
                    false,
                    "Falha ao salvar arquivo em diretório"
                );
            }
            return buildResult(
                true,
                "Arquivo salvo com sucesso no diretório: " + basepath
            );
        } catch (err: any) {
            logger.error("FileService SaveOneFile - Exceção: " + err);
            return buildResult(false, "Falha ao salvar arquivo em diretório");
        }
    }
}
