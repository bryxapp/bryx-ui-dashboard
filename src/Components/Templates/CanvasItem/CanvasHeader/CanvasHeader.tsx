import SaveTemplateButton from "./SaveButton";
import CloseTemplateButton from "./CloseButton";
import { CanvasDesignData } from "../../../../utils/types/CanvasInterfaces";
import { Input } from "antd";

interface CanvasHeaderProps {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    friendlyName: string;
    setFriendlyName: (friendlyName: string) => void;
    dataBaseCanvasDesign: CanvasDesignData;
    setDataBaseCanvasDesign: (dataBaseCanvasDesign: CanvasDesignData) => void;
    dataBaseFriendlyName: string;
    setDataBaseFriendlyName: (dataBaseFriendlyName: string) => void;
}


const CanvasHeader = ({
    isLoading,
    setIsLoading,
    friendlyName,
    setFriendlyName,
    dataBaseCanvasDesign,
    setDataBaseCanvasDesign,
    dataBaseFriendlyName,
    setDataBaseFriendlyName
}: CanvasHeaderProps) => {

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
                <Input
                    addonBefore="Template Name"
                    size="large"
                    value={friendlyName}
                    onChange={(event) => setFriendlyName(event.target.value)}
                    style={{ flex: 1, marginRight: '20px' }} // Adjusted width to use flex
                    placeholder="Template Name"
                />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <SaveTemplateButton
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    dataBaseCanvasDesign={dataBaseCanvasDesign}
                    setDataBaseCanvasDesign={setDataBaseCanvasDesign}
                    friendlyName={friendlyName}
                    databaseFriendlyName={dataBaseFriendlyName}
                    setDatabaseFriendlyName={setDataBaseFriendlyName}
                />
                <CloseTemplateButton dataBaseCanvasDesign={dataBaseCanvasDesign} friendlyName={friendlyName} databaseFriendlyName={dataBaseFriendlyName} />
            </div>
        </div>
    );
};

export default CanvasHeader;
