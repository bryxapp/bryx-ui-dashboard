import { Card } from 'antd';
import { TableInputObj } from '../../../../../utils/types/CanvasInterfaces';
import BorderControl from './BorderControl';
import TableManagement from './TableManagement';

interface TablePropertiesProps {
    tableObj: TableInputObj;
}

export default function TableProperties({ tableObj }: TablePropertiesProps) {

    return (
        <Card>
            <BorderControl />
            <div style={{ height: 10 }} />
            <TableManagement />
        </Card>
    );
}