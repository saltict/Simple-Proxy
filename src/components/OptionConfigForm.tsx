import {useContext, useState} from 'react';
import {OptionConfigInterface} from "../types";
import {Form, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import {ThemeContext} from "../providers/themeProvider";

const OptionConfigForm = () => {
  const [form] = useForm<OptionConfigInterface>()
  const themeContext = useContext(ThemeContext);

  const onValuesChange = (changedValues: any, allValues: any) => {
    const changeKeys = Object.keys(changedValues);

    if (changeKeys.includes('theme')) {
      themeContext.setTheme(changedValues.theme)
    }
  }

  return (
    <Form name="option-config"
          form={form}
          title={'Proxy Config'}
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          style={{maxWidth: 600}}
          onValuesChange={onValuesChange}
          initialValues={{
            theme: themeContext.themeName
          }}
    >
      <Form.Item name='theme' label={'Theme Color'}>
        <Select>
          <Select.Option value={'light'}>Light</Select.Option>
          <Select.Option value={'dark'}>Dark</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default OptionConfigForm;
