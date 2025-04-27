import {useCallback, useMemo, useState} from 'react';
import {Connection} from "../messaging";
import {BrowserProxyConfig, ProxyConfigFormInterface} from "../types";
import {Button, Form, Input, Select} from "antd";
import {SaveOutlined} from "@ant-design/icons";
import {useForm} from "antd/es/form/Form";
import { useLocalStorage } from '../hooks/useLocalStorage';

interface PresetConfig {
  id: number;
  name: string;
  schema: string;
  host: string;
  port: string;
}

const ProxyConfigForm = () => {
  const [presetMap, setPresetMap] = useLocalStorage<Record<string, PresetConfig>>('proxy-presets', {});
  const [selectedPreset, setSelectedPreset] = useLocalStorage<string>('selected-preset', '0');
  const [form] = useForm<ProxyConfigFormInterface>();

  const initState = useMemo(() => {
    Connection.postMessage({type: 'fetch-proxy'});
    Connection.onMessage.addListener((message) => {
      if (message.type === 'current-proxy-config') {
        const proxySetting = message.value as BrowserProxyConfig;
        onReceiveProxyConfig(proxySetting);
      }
    });

    return {loading: true, enableProxy: false, proxyConfig: ''};
  }, [])

  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(initState.loading);

  const onReceiveProxyConfig = useCallback((proxySetting: BrowserProxyConfig) => {
    const config = proxySetting.value;
    form.setFieldValue('mode', config.mode);
    if (config.mode === 'fixed_servers') {
      setShowDetail(true);
      const singleConfig = config.rules.singleProxy;
      form.setFieldValue('schema', singleConfig.scheme);
      form.setFieldValue('host', singleConfig.host);
      form.setFieldValue('port', singleConfig.port);
    }

    setLoading(false);
  }, [form]);

  const onValuesChange = useCallback((changes: Partial<ProxyConfigFormInterface>) => {
    if (changes.mode) {
      if (changes.mode === 'fixed_servers') {
        const preset = presetMap[`preset_${selectedPreset}`];
        if (preset) {
          form.setFieldsValue({
            presetName: preset.name,
            schema: preset.schema,
            host: preset.host,
            port: preset.port
          });
        }
        setShowDetail(true);
      } else {
        setShowDetail(false);
      }
    }
    
    if (changes.preset) {
      setSelectedPreset(changes.preset);
      if (changes.preset === '0') {
        form.setFieldValue('presetName', '');
      } else {
        const preset = presetMap[`preset_${changes.preset}`];
        if (preset) {
          form.setFieldsValue({
            presetName: preset.name,
            schema: preset.schema,
            host: preset.host,
            port: preset.port
          });
        }
      }
    }
  }, [form, presetMap, setSelectedPreset]);

  const onSave = useCallback(() => {
      const formValues = form.getFieldsValue();
      setLoading(true);

      // Save to preset if in fixed_servers mode
      if (formValues.mode === 'fixed_servers') {
        const newPresets = { ...presetMap };
        const isNew = formValues.preset === '0';
        const presetId = isNew ? Date.now() : parseInt(formValues.preset);
        const presetKey = `preset_${presetId}`;
        newPresets[presetKey] = {
            id: presetId,
            name: formValues.presetName,
            schema: formValues.schema,
            host: formValues.host,
            port: formValues.port
        };
        setPresetMap(newPresets);
        setSelectedPreset(presetId.toString());
      }

      Connection.postMessage({
        type: 'set-proxy',
        value: {
          mode: formValues.mode,
          schema: formValues.schema,
          host: formValues.host,
          port: formValues.port,
        }
      });

      setLoading(false);
    }, [form, presetMap, setPresetMap, setSelectedPreset]);

  return (
    <Form name="proxy-config"
            form={form}
            title={'Proxy Config'}
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            initialValues={{
              preset: selectedPreset || '0',
              presetName: presetMap[`preset_${selectedPreset}`]?.name || '',
            }}
            onValuesChange={onValuesChange}
      >
        <Form.Item name='mode' label={'Proxy mode'}>
          <Select placeholder={'Connection Mode'}>
            <Select.Option value={'fixed_servers'}>Fixed Server</Select.Option>
            <Select.Option value={'direct'}>Direct</Select.Option>
            <Select.Option value={'system'}>System</Select.Option>
          </Select>
        </Form.Item>
        
        {showDetail && (
          <Form.Item name='preset' label={'Preset'}>
            <Select placeholder={'Select a preset or create new'}>
              {Object.values(presetMap).map(preset => (
                <Select.Option key={preset.id.toString()} value={preset.id.toString()}>{preset.name}</Select.Option>
              ))}
              <Select.Option key='0' value='0'>-- Create New --</Select.Option>
            </Select>
          </Form.Item>
        )}
        
        {showDetail && (
          <Form.Item name='presetName' label={'Preset Name'} rules={[{ required: true, message: 'Please input a name for the preset' }]}>
            <Input placeholder="Enter preset name" />
          </Form.Item>
        )}
        
        <Form.Item name='schema' label={'Schema'} hidden={!showDetail}>
          <Select placeholder={'HTTP(S), Sock 4, Sock 5'}>
            <Select.Option value={'http'}>HTTP</Select.Option>
            <Select.Option value={'https'}>HTTPS</Select.Option>
            <Select.Option value={'socks4'}>Sock 4</Select.Option>
            <Select.Option value={'socks5'}>Sock 5</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name='host' label="Host" hidden={!showDetail}>
          <Input type={'text'}/>
        </Form.Item>
        <Form.Item name='port' label="Port" hidden={!showDetail}>
          <Input type={'number'}/>
        </Form.Item>
        <Form.Item style={{textAlign: 'right'}}>
          <Button icon={<SaveOutlined />} type="primary" loading={loading} onClick={() => {onSave()}}>
            Save
          </Button>
        </Form.Item>
      </Form>
  );
};

export default ProxyConfigForm;
