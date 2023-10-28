import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import logger from "../../../../../logging/logger";
import { uploadImage, getUserImages, getImageDimensions } from "../../../../../utils/api/user-images-api";
import { useCallback, useState } from "react";
import { useAuth0User } from "../../../../../utils/customHooks/useAuth0User";
import ErrorModal from "../../../../SharedComponents/ErrorModal/ErrorModal";

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
    const { auth0User, getAccessToken, } = useAuth0User();
    const [error, setError] = useState(false); // Error state

    const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setError(false);
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
            logger.trackException({
                properties: {
                    name: "Image Upload Error",
                    page: "Canvas",
                    description: "Error uploading image",
                    error: error,
                },
            });
            setError(true);
            console.log("Error uploading image:", error);
        } finally {
            setFetchingUserImages(false);
            logger.trackEvent({
                name: 'New UserImage Click',
                properties: { menu: 'New User Image', user: auth0User?.name, environment: process.env.NODE_ENV },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth0User?.sub]);

    const tooltipTitle = maxUserImagesReached
        ? "Maximum number of user images reached"
        : "upload a new user image";

    return (
        <>
            <ErrorModal error={error} setError={setError} />
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
        </>
    );
};

export default NewUserImageButton;
