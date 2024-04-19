import { useState } from 'react';
import { Empty, Typography } from 'antd';
import TemplatesGrid from '../SharedComponents/Templates/TemplatesGrid/TemplatesGrid';
import NewTemplateButton from './NewTemplateButton';

const Templates = () => {
  const [maxTemplatesReached, setMaxTemplatesReached] = useState(false);
  const [templatesCount, setTemplatesCount] = useState(0);

  return (
    <>
      <Typography.Title level={2}>
        Templates
      </Typography.Title>
      <NewTemplateButton maxTemplatesReached={maxTemplatesReached} />
      {templatesCount === 0 ? (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 100 }}
          description={
            <Typography.Title level={5}>
              You don't have any templates yet
            </Typography.Title>
          }
        >
        </Empty>
      ) : (
        <>
          <div style={{ margin: '20px 0' }}>
            <TemplatesGrid
              setMaxTemplatesReached={setMaxTemplatesReached}
              setTemplatesCount={setTemplatesCount}
              baseUrl='/edit-template?templateId='
              showActions={true} />
          </div>
        </>
      )}
    </>
  );
};

export default Templates;
