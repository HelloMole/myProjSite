<template>
     <a-float-button
        type="primary"
        @click="onChangeDarkMode"
        :style="{
        right: '24px',
        }"
    >
        <template #icon>
            <div>
                <BulbOutlined v-if="isDark"/>
                <BulbFilled v-else />
            </div>
        </template>
    </a-float-button>
    <!-- <a-button type="primary" shape="circle" size="large">2</a-button> -->
</template>

<script lang="ts" setup>
import { useThemeStore } from '../../stores/theme';

const themeStore = useThemeStore();

// 使用 store 中的 isDarkMode
const isDark = computed(() => themeStore.isDarkMode);

const onChangeDarkMode = () => {
    themeStore.toggleDarkMode();
};
</script>