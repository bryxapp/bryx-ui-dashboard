import { useState } from 'react';
import { Typography } from 'antd';
import TemplatesGrid from '../SharedComponents/Templates/TemplatesGrid/TemplatesGrid';
import NewTemplateButton from './NewTemplateButton';

const Templates = () => {
  const [maxTemplatesReached, setMaxTemplatesReached] = useState(false);

  return (
    <>
      <Typography.Title level={2}>
        Templates
      </Typography.Title>
      <NewTemplateButton maxTemplatesReached={maxTemplatesReached} />
      <div style={{ margin: '20px 0' }}>
        <TemplatesGrid
          setMaxTemplatesReached={setMaxTemplatesReached}
          baseUrl='/edit-template?templateId='
          showActions={true} />
      </div>
    </>
  );
};

export default Templates;
