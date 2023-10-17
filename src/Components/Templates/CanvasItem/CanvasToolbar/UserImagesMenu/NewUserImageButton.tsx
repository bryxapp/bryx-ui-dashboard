import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import logger from "../../../../../logging/logger";
import { uploadImage, getUserImages, getImageDimensions } from "../../../../../utils/api/user-images-api";
import { useCallback } from "react";
import { useAccessToken } from "../../../../../utils/customHooks/useAccessToken";

interface NewUserImageButtonProps {
    maxUserImagesReached: boolean;
    setFetchingUserImages: React.Dispatch<React.SetStateAction<boolean>>;
    setUserImages: React.Dispatch<React.SetStateAction<{ url: string; width: number; height: number; imageDbId: string }[]>>;
}

type ImageApiResponse = {
    imageBlobUrl: string;
    id: string;
};

const NewUserImageButton = ({ maxUserImagesReached, setFetchingUserImages, setUserImages }: NewUserImageButtonProps) => {
    const { auth0User } = useAccessToken();
    const { getAccessToken } = useAccessToken();

    const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setFetchingUserImages(true);
            const token = await getAccessToken();
            if (!token) return;

            await uploadImage(file, token);
            const response = await getUserImages(token);
            const results = response.data.userImages;

            const imagePromises = results.map(async (image: ImageApiResponse) => {
                const { width, height } = await getImageDimensions(image.imageBlobUrl);
                return { url: image.imageBlobUrl, width, height, imageDbId: image.id };
            });

            const imageData = await Promise.all(imagePromises);
            setUserImages(imageData);
        } catch (error) {
            // Handle error as needed
            console.error(error);
        } finally {
            setFetchingUserImages(false);
            logger.trackEvent({
                name: 'New Template Click',
                properties: { menu: 'New Template', user: auth0User?.name, environment: process.env.NODE_ENV },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setFetchingUserImages, setUserImages]);

    const tooltipTitle = maxUserImagesReached
        ? "Maximum number of user images reached"
        : "upload a new user image";

    return (
        <Tooltip title={tooltipTitle}>
            <span> {/* span is added because disabled buttons don't trigger tooltips */}
                <Button variant="contained" component="label" disabled={maxUserImagesReached}>
                    Upload File
                    <input
                        type="file"
                        hidden
                        onChange={handleImageUpload}
                    />
                </Button>
            </span>
        </Tooltip>
    );
};

export default NewUserImageButton;
