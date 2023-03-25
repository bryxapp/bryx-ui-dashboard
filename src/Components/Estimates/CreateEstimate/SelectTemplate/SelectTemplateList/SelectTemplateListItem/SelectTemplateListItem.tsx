import { Link, Paper, Typography } from '@mui/material';
import Feed from '@mui/icons-material/FeedOutlined';
import { TemplateData } from '../../../../../../utils/types/TemplateCreationInterfaces';
interface SelectTemplateListItemProps {
    template: TemplateData;
}
const SelectTemplateListItem = ({template}:SelectTemplateListItemProps) => {
    return (
        <Link href={'/form?templateId=' + template.id} underline='none'>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 12 + 'rem',
                    width: 14 + 'rem',
                    alignItems: 'center',
                }}
            >
                <Feed sx={{ fontSize: 8 + 'rem', color: 'gray' }} />
                <Paper sx={{ height: 5 + 'rem', width: 100 + '%', background: 'gray', justifyContent: 'flex-end', }}>
                    <div style={{
                        padding: .5 + 'rem',
                    }}>
                        <Typography variant="h5" color={'white'} gutterBottom>
                            {template.friendlyName}
                        </Typography>
                    </div>
                </Paper>
            </Paper>
        </Link>
    );
};

export default SelectTemplateListItem;
