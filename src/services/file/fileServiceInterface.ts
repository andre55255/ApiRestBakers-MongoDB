import { ResultVO } from '../../viewObjects/utils/ResultVO';
import { FileVO } from './../../viewObjects/utils/FileVO';

export interface FileServiceInterface {
    saveOneFileBase64AtDirectory(fileVO: FileVO, entityName: string, entityId: string): ResultVO;

    getUrlOneFileAtDirectory(entityName: string, entityId: string, defaultImg?: boolean): FileVO;
}