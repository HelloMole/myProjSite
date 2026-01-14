<template>
    <div>
        <a-space wrap>
        <a-button type="primary" @click="info">Primary Button</a-button>
        <a-button @click="showModal">Default Button</a-button>
        <a-button type="dashed">Dashed Button</a-button>
        <a-button type="text">Text Button</a-button>
        <a-button type="link">Link Button</a-button>
        <StepForwardOutlined />
    </a-space>
    <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
    </div>
    
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue';
// const [messageApi, contextHolder] = message.useMessage();
const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};


const info = () => {
    console.log('点击了按钮')
  message.info('This is a normal message');
};
</script>