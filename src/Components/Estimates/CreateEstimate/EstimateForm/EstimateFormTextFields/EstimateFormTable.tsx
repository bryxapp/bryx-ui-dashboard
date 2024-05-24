import React from 'react';
import { TableInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { Input, Row, Col, Card, Typography, Form } from 'antd';
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';

interface EstimateFormTableProps {
    tableInputObj: TableInputObj;
    handleChange: (event: any, inputObjId: string) => void;
    formInputs: EstimateFormFields | null;
    sorting?: boolean;
}

const EstimateFormTable: React.FC<EstimateFormTableProps> = ({
    tableInputObj,
    formInputs,
    handleChange,
    sorting
}) => {

    return (
        <Form.Item
            style={{ marginBottom: '5px' }}
            label={tableInputObj.name}
        >
            <Card bordered style={{ padding: '0', margin: '0' }}>
                <Row gutter={[16, 16]}>
                    {tableInputObj.rows.map((row, rowIndex) => {
                        const totalWidth = row.reduce((sum, cell) => sum + (cell.width || 1), 0);
                        const colSpans = row.map(cell => Math.round((24 * (cell.width || 1)) / totalWidth));

                        // Adjust colSpans to ensure they sum up to 24
                        const totalSpan = colSpans.reduce((sum, span) => sum + span, 0);
                        const difference = 24 - totalSpan;

                        if (difference !== 0) {
                            // Find the index with the maximum width to adjust
                            const adjustIndex = colSpans.findIndex(span => span > 1);
                            colSpans[adjustIndex] += difference;
                        }

                        return (
                            <Col span={24} key={rowIndex}>
                                <Row gutter={[8, 8]}>
                                    {row.map((cell, cellIndex) => {
                                        if (!cell.content) return null;

                                        const colSpan = colSpans[cellIndex];

                                        if (cell.content.type === "CellInput") {
                                            const fieldValue = formInputs ? formInputs[cell.id].value : '';
                                            const numRows = Math.min(3, Math.round(cell.height / (cell.content.fontSize)));
                                            return (
                                                <Col span={colSpan} key={cellIndex}>
                                                    <Input.TextArea
                                                        value={fieldValue}
                                                        onChange={(event) => handleChange(event, cell.id)}
                                                        placeholder={cell.content.textValue}
                                                        disabled={sorting}
                                                        rows={numRows}
                                                    />
                                                </Col>
                                            );
                                        } else if (cell.content.type === "TextCell") {
                                            return (
                                                <Col span={colSpan} key={cellIndex}>
                                                    <Typography.Text>{cell.content.textValue}</Typography.Text>
                                                </Col>
                                            );
                                        }
                                        return null;
                                    })}
                                </Row>
                            </Col>
                        );
                    })}
                </Row>
            </Card>
        </Form.Item>
    );
};

export default EstimateFormTable;
