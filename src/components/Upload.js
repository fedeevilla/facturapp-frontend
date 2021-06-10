// @flow

import React from "react";
import { Upload as AntdUpload, Spin, Icon, Button, message } from "antd";
import { withHandlers, withState, compose } from "recompose";
import * as R from "ramda";

const Upload = ({ label, action, status, options, disabled, onChange, fileType, ...rest }) => (
  <AntdUpload
    accept={fileType}
    action={action}
    data={options}
    showUploadList={false}
    onChange={onChange}
    {...rest}
  >
    <Spin spinning={status === "uploading"}>
      <Button disabled={disabled}>
        <Icon type="upload" /> {label}
      </Button>
    </Spin>
  </AntdUpload>
);

const enhancer = compose(
  withState("status", "setStatus", "init"),
  withHandlers({
    onChange: ({ onChange, setStatus }) => (event) => {
      const status = R.path(["file", "status"], event);
      const file = R.path(["file", "response", "url"], event);

      if (status === "error") {
        message.error("Hubo un error subiendo el archivo, intentá de nuevo mas tarde");
      }

      onChange(file);
      setStatus(status);
    },
  }),
);

export default enhancer(Upload);
