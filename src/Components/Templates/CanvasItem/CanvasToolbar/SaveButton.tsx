import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';


interface SaveButtonProps {
    isLoading: boolean;
    setIsLoading: React.SetStateAction<any>;
    postTemplate: any;
}

export default function SaveButton({ isLoading, setIsLoading, postTemplate }: SaveButtonProps) {

    const handleSave = () => {
        //Show loader until post is complete
        setIsLoading(true)
        postTemplate().then(() => {
            //Hide loader
            setIsLoading(false)
            window.location.href = "/templates";
        });
    }

    if (isLoading) {
        return (
            <Tooltip title="Saving..." placement="bottom">
                <IconButton edge="end" color="inherit" aria-label="save">
                    Loading...
                </IconButton>
            </Tooltip>

        );
    }
    return (
        <Tooltip title="Save your template" placement="bottom">
            <IconButton edge="end" color="inherit" aria-label="save" onClick={handleSave}>
                Save
            </IconButton>
        </Tooltip>
    );
}