import React from 'react';
import { TableInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { Input, Row, Col, Card, Typography, Form } from 'antd';
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';

interface EstimateFormTableProps {
    tableInputObj: TableInputObj;
    formInputs: EstimateFormFields;
    handleChange: (event: any, inputObjId: string) => void;
    disabled?: boolean;
}

const EstimateFormTable: React.FC<EstimateFormTableProps> = ({
    tableInputObj,
    formInputs,
    handleChange,
    disabled
}) => {

    return (
        <Form.Item style={{ marginBottom: '5px' }}>
            <Card bordered style={{ padding: '0', margin: '0' }}>
                <Row gutter={[16, 16]}>
                    {tableInputObj.rows.map((row, rowIndex) => (
                        <Col span={24} key={rowIndex}>
                            <Row gutter={[8, 8]}>
                                {row.map((cell, cellIndex) => {
                                    if (!cell.content) return null;
                                    if (cell.content.type === "CellInput") {
                                        const fieldValue = formInputs[cell.id].value;
                                        return (
                                            <Col span={24 / row.length} key={cellIndex}>
                                                <Input.TextArea
                                                    value={fieldValue}
                                                    onChange={(event) => handleChange(event, cell.id)}
                                                    placeholder={cell.content.value}
                                                    disabled={disabled}
                                                />
                                            </Col>
                                        );
                                    } else if (cell.content.type === "TextCell") {
                                        return (
                                            <Col span={24 / row.length} key={cellIndex}>
                                                <Typography.Text>{cell.content.value}</Typography.Text>
                                            </Col>
                                        );
                                    }
                                    return null;
                                })}
                            </Row>
                        </Col>
                    ))}
                </Row>
            </Card>
        </Form.Item>
    );
};

export default EstimateFormTable;