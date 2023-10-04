import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import DescriptionIcon from '@mui/icons-material/Description';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { convertEpochTime } from '../../../utils/time-util';
import Typography from '@mui/material/Typography';
import { EstimateData, EstimateDraftData } from '../../../utils/types/EstimateInterfaces';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import EstimatesDeleteDialog from './EstimatesDeleteDialog';
import EstimatesActionPanel from './EstimatesActionPanel';
import Link from '../../SharedComponents/Link/Link'

interface EstimateListItemProps {
    estimate: EstimateData | EstimateDraftData;
    type: string;
    handleEstimateDelete: (estimateId: string) => void;
    editLink: string;
    itemName: string;
}

const EstimateListItem = ({ estimate, handleEstimateDelete, editLink, itemName, type }: EstimateListItemProps) => {
    const displayDate = convertEpochTime(estimate._ts);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <ListItem
            secondaryAction={
                <EstimatesActionPanel
                    estimate={estimate}
                    setOpen={setOpen}
                    editLink={editLink} />
            }
        >
            <Grid container spacing={2} alignItems="center">
                {!isSmallScreen && (
                    <Grid item xs={1}>
                        <Link to={editLink}>
                            <ListItemAvatar>
                                <Avatar>
                                    <DescriptionIcon />
                                </Avatar>
                            </ListItemAvatar>
                        </Link>
                    </Grid>)
                }
                <Grid item xs={isSmallScreen ? 11 : 10} sm={6} md={8} lg={9} xl={10}>
                    <Link to={editLink}>
                    <ListItemText
                        primary={
                            <Typography
                                variant={isSmallScreen ? 'subtitle1' : 'h5'}
                                component="div"
                                sx={{
                                    flexGrow: 1,
                                    whiteSpace: isSmallScreen ? 'normal' : 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    color: theme.palette.text.primary,
                                }}
                            >
                                {(type === "draft" ? "[DRAFT] " : "") + estimate.estimateName}                            </Typography>
                        }
                        secondary={
                            <Typography
                                variant={isSmallScreen ? 'body2' : 'subtitle2'}
                                component="div"
                                sx={{
                                    flexGrow: 1,
                                    whiteSpace: isSmallScreen ? 'normal' : 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    color: theme.palette.text.primary,
                                }}
                            >
                                {displayDate}
                            </Typography>
                        }
                    />
                    </Link>
                </Grid>
            </Grid>
            <EstimatesDeleteDialog
                open={open}
                setOpen={setOpen}
                estimate={estimate}
                handleEstimateDelete={handleEstimateDelete}
                itemName={itemName}
            />
        </ListItem>
    );
};

export default EstimateListItem;
